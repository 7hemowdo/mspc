# MikroTik Hotspot Reference

This document records the current MikroTik hAP ax3 hotspot setup for MSPC/KIBIRI HOTSPOT. Use it as the network reference when building the hotspot/customer application later.

## Device

- Router: MikroTik hAP ax3
- Router identity shown in terminal: `KIBIRI HOTSPOT`
- ISP/upstream cable: connected to the PoE in/out port, which is expected to be `ether1-WAN`
- MikroTik Wi-Fi SSID: intentionally not used for clients
- Client access plan: clients should connect through a wired hotspot port or through an external access point connected to a hotspot bridge port

## Current Topology

```text
ISP / upstream router
        |
        | DHCP address: 192.168.0.105/24
        |
ether1-WAN
        |
bridgeLocal
        |
MikroTik internet uplink

bridge-hotspot
        |
Hotspot client network: 10.0.0.0/19
Gateway: 10.0.0.1
DHCP pool: 10.0.0.2-10.0.31.254
```

Important: `bridgeLocal` is currently the uplink/WAN side because the DHCP client is running on `bridgeLocal`, not directly on `ether1-WAN`.

## Working State

The ISP/uplink DHCP client is working:

```mikrotik
/ip dhcp-client print
```

Expected:

```text
INTERFACE    STATUS  ADDRESS
bridgeLocal  bound   192.168.0.105/24
```

The invalid DHCP client on `ether1-WAN` was removed. There should only be one DHCP client, on `bridgeLocal`.

The hotspot service is now active. It should no longer show `I` / invalid:

```mikrotik
/ip hotspot print
```

Expected:

```text
NAME      INTERFACE       ADDRESS-POOL  PROFILE  IDLE-TIMEOUT
hotspot1  bridge-hotspot  hs-pool       hsprof1  5m
```

The hotspot NAT rules exist, and the manual masquerade rule exists:

```mikrotik
/ip firewall nat print
```

Required manual rule:

```text
chain=srcnat action=masquerade src-address=10.0.0.0/19 out-interface=bridgeLocal
comment="masquerade hotspot clients"
```

## Hotspot Network

Hotspot address:

```text
10.0.0.1/19 on bridge-hotspot
```

DHCP pool:

```text
hs-pool = 10.0.0.2-10.0.31.254
```

DHCP server:

```text
dhcp-hotspot on bridge-hotspot
lease-time=30m
```

DHCP network:

```text
address=10.0.0.0/19
gateway=10.0.0.1
dns-server=10.0.0.1
```

Hotspot profile:

```text
hsprof1
hotspot-address=10.0.0.1
dns-name=kibiri.to
login-by=cookie,http-chap,http-pap,mac-cookie
```

## Device Mode

The hotspot was previously invalid because device-mode did not allow Hotspot:

```text
inactivated, not allowed by device-mode
```

This was fixed by enabling Hotspot in device-mode:

```mikrotik
/system/device-mode/update hotspot=yes
```

RouterOS required a restart/physical confirmation. After the router restarted, `hotspot1` became valid.

Check device-mode with:

```mikrotik
/system/device-mode/print
```

## Safe Mode

Before bridge, firewall, NAT, DHCP, or device-mode changes, enable Safe Mode.

In terminal:

```mikrotik
Ctrl+X
```

In WinBox/WebFig:

```text
Toggle the Safe Mode button at the top of the page.
```

Why: if a change locks you out, MikroTik rolls back changes from that Safe Mode session when the session disconnects.

## Lockout Lesson

Do not move `bridgeLocal` from `LAN` to `WAN` while managing the router from that side.

That caused management access to be blocked because the firewall has a rule that drops router access from the WAN interface list:

```text
drop router access from WAN
```

If locked out, use WinBox MAC address login from the Neighbors tab.

Recovery commands if `bridgeLocal` is accidentally added to `WAN`:

```mikrotik
/interface list member remove [find interface=bridgeLocal list=WAN]
:if ([:len [/interface list member find interface=bridgeLocal list=LAN]] = 0) do={
  /interface list member add interface=bridgeLocal list=LAN
}
```

## Commands Already Applied

Removed the invalid DHCP client from the slave interface:

```mikrotik
/ip dhcp-client remove [find interface=ether1-WAN]
```

Added NAT for hotspot clients:

```mikrotik
/ip firewall nat add chain=srcnat src-address=10.0.0.0/19 out-interface=bridgeLocal action=masquerade comment="masquerade hotspot clients"
```

Enabled Hotspot device-mode:

```mikrotik
/system/device-mode/update hotspot=yes
```

Enabled hotspot after device-mode confirmation:

```mikrotik
/ip hotspot enable hotspot1
```

## External AP / Wired Client Setup

MikroTik Wi-Fi does not need to be enabled because clients will not connect directly to the MikroTik Wi-Fi SSID.

For hotspot clients to connect, assign one physical Ethernet port to `bridge-hotspot`, then connect an external AP or switch to that port.

Example using `ether2`:

```mikrotik
/interface bridge port set [find interface=ether2] bridge=bridge-hotspot
```

Important: do not move the port currently used to manage the router.

Current bridge-port observation before choosing a hotspot port:

```text
ether1-WAN -> bridgeLocal
ether2     -> bridgeLocal, inactive
ether3     -> bridgeLocal, inactive
ether4     -> bridgeLocal, inactive
ether5     -> bridgeLocal, inactive
wifi1      -> bridge-hotspot, inactive
wifi2      -> bridge-hotspot, inactive
```

Because no client was connected, DHCP leases and hotspot active users were empty.

## Validation Commands

Run these after connecting an external AP or test client to a hotspot port:

```mikrotik
/ip dhcp-server lease print
/ip hotspot host print
/ip hotspot active print
/ip firewall nat print
```

Expected behavior:

- A connected client should receive a `10.0.x.x` address.
- The device should appear in `/ip hotspot host print`.
- The device appears in `/ip hotspot active print` only after hotspot login/authentication.
- The client should be redirected to the hotspot login page.

## Application-Building Notes

The future hotspot application should treat MikroTik as the network enforcement device.

Likely RouterOS integration points:

```mikrotik
/ip hotspot user
/ip hotspot active
/ip hotspot host
/ip dhcp-server lease
```

Useful app features later:

- Create hotspot users/vouchers.
- Set user profile, time limit, or data limit.
- View active sessions.
- Disconnect an active user.
- Show lease/host status for troubleshooting.
- Keep business logic in the app, but apply access control through RouterOS Hotspot users/profiles.

Current assumptions for the app:

- Hotspot interface: `bridge-hotspot`
- Hotspot name: `hotspot1`
- Hotspot profile: `hsprof1`
- Hotspot DNS name: `kibiri.to`
- Hotspot subnet: `10.0.0.0/19`
- Hotspot gateway: `10.0.0.1`
- Hotspot DHCP pool: `hs-pool`
- Upstream/WAN path: `bridgeLocal`
- NAT out-interface: `bridgeLocal`
- MikroTik built-in Wi-Fi is not part of the client access plan
