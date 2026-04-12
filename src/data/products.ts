export type ProductStatus = "available" | "out-of-stock" | "hidden";

export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  featured?: boolean;
};

export type Product = {
  name: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  status: ProductStatus;
  isFeatured: boolean;
  isNewArrival: boolean;
  specs: { label: string; value: string }[];
};

export const categories: Category[] = [
  {
    name: "Electrical Products",
    slug: "electrical-products",
    description:
      "Switchgear, breakers, power supplies, wiring components, and electrical installation essentials.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKvd9QmuVMonSLYFIIraUkl7PBfT_AfXHrQY-b35-vGxuiVSKCrS_47gmkleZBHX8qo65-GzvoDi-BVOHMB_mm8OQ_zr-cbGmQgyGesQC-XOhM5Aw_0UcyWsG-DtgIUBlugNDovgb-fndlCtRtOta5mQs7tP6jzDiePjzJnjtzCYprpuvNT1xNSfi3ga5mnLqKh8QXF5qoxuLnnQItY3aALfuxz8mOZ2E_8EQ1q361BiwyV31g9yMr29iM8WjYtJVDxDxmqWX3cko",
    featured: true
  },
  {
    name: "Power Backup",
    slug: "power-backup",
    description:
      "UPS systems, inverters, stabilizers, and batteries for homes, offices, and business continuity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFFqJSK0Yjn61WrFzLcADlIaE61Q3kuhoPorg74d89lopp5CYA3NIqIKocTAOrFdln18F0rVJMuFhnXJ-r8Qg1ufAKVCAzWjKm3K3weGGOUnPZwZrOYUNez7-7jJDNm11RqoOBODDYsBRaFb6QHFXqAn4WIC2nu3-7SW3nexX50zD8lDL7Yi7LLtczMoAo-DC11L-iopxAjZSV4e_QUH-R_M5QCZyariCEO1qhbQ37EfPh8o5frkYG8myiSLHQPBqTpXg2YEi8cUw",
    featured: true
  },
  {
    name: "Routers & Networking",
    slug: "routers-networking",
    description:
      "Routers, switches, access points, and network hardware for stable connectivity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq6XA0-y5H4sFxA_i7W9owOZ5wxBCQrBHPEEAFnLu4hl8SmHoKsY4GDPML-Hbes1gl4go9xcSlSw-Fvya_ToVHek49m78EDcpqlobceRPYTfLZvFNKp8ZCzIlYKkB_ydCGyjSbfdoC18YQ1--709fhlshwG3t3IBjwPCyIgLZjTELl7Nc5MHePRKxtfN7w0n8MZewA69Pk6JtuJJlzFjXqWMPlXWtBuwi2oyz-poeOx8Wh9PK6SEE-0cRgTFB-9iW5Ot_JxAnoGxs",
    featured: true
  },
  {
    name: "NanoStations",
    slug: "nanostations",
    description:
      "Long-range wireless bridge equipment for outdoor point-to-point connectivity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxGAcmdOOQkxCUhSTS2sbnxtBgj_Pe5xKTMAbW6OmFMTMUgYOIAaHVhZhRi390CDNykIz_lMQBaMHdvDp3nnXMJ_-UdLYy3KUGGM4kL07Dkbk3OMJc37GtLQti_UNvAm_2GYj3mGKpIEj-PU2NOYG1qARrLcBrcFJ0q1TKEdm6cvLWEYBIdLiYeUcLK0TtB5TWzc4VnTV9QqYEwEHn8fbXYdjjQWDHhW6GXA-8edUN1DL46Rturf0luA2qFFbboGmVMIlTtOMXxD4"
  },
  {
    name: "CCTV & Security",
    slug: "cctv-security",
    description:
      "CCTV cameras, security accessories, and surveillance products for homes and businesses.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAE587pvIxJWQ0Z3cG3au5ItcbgrVPalrEWEFix1eOMH4_GFPQL_uShsrSMRvAhT4plizTXu3aTZXtGOfWRecZcVPp-0frj9y8w15LbvkF4qASBMmYZhvPmfYUsUwWTEqCA1PbWhKLFaYIeb_nxQd7eyIse2yw3O0dvB5JW2VddZ9gb0IM1mWrBF75GiLaV1uh--GUkjwP5iorBHzb2rAmMk3_av0qXcl9VbDcPur_7gzhI-I2E_lRzJ_8XiZNwqlzNHDx4laAAlw"
  },
  {
    name: "Solar & Power Equipment",
    slug: "solar-power-equipment",
    description:
      "Solar controllers, panels, and power accessories for backup and off-grid systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSe7P8Mk9t5F_lJI3h2KsrFRPP2QVPRZfIK4ZL2rV-AfJcJpuG9XtAv_F6EYOdft2-cchtzON5R9a-4TBXtXkkqmYbHx4EUPF2_fMyAOAD6_Rt-0KHPNcudJ2aTu_-psNNHSv1YtWqM1FgXyjy6B6sMJeplkyN8GPqJ9LgPccuihBh1TYJcitUXmNOwpuek-hi1Db7QrXxPxbu4w3U2-sj3iqXI0OEhgwagoq73QriVqGLbAVHzIne8FCDiQdyMEeLgKySsAlN2-I"
  },
  {
    name: "Cables & Accessories",
    slug: "cables-accessories",
    description:
      "Network cables, power cables, connectors, mounting hardware, and installation accessories.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Q4H2nOf-fi_PPEcMVJYBKUJo7YZ6lZGUlM63kKU-6YS7Xn0GhEXuBRRq2HEB10q4xZch64MBGHlRmRBtEGyhH9haWO_eQYrXIBcEcLQP5XmaYB4Kbm75BSMeois-ocxyRgrc_xg8jA49qLLLLmcbvN3-2wzmuUeYphqucZidKUaXs9j6_XJu0d4yv6iDETdhgJ8pIkJO9j1FMoiRn0T3j1lWlp6r5kOYTe-cVhNTtmxZfYD1BOr3qL-MkWywHk5OpK755KNxYk"
  }
];

export const products: Product[] = [
  {
    name: "Ubiquiti NanoStation M5",
    slug: "ubiquiti-nanostation-m5",
    categorySlug: "nanostations",
    shortDescription:
      "Outdoor wireless bridge for point-to-point and point-to-multipoint network links.",
    fullDescription:
      "The Ubiquiti NanoStation M5 is a compact outdoor wireless CPE for long-range 5 GHz connectivity. Use it for homes, offices, remote sites, and installer bridge links.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrQMavdYTVBe4FLFurNzP2DqGOJ7KL08n_tgmkTfqwm652FY7lznZflQ4cBT7Xe16yPV9IxGxz9Ysul2mTxoTTp--bAHhK7F1xovZKpfbMp_6nZUjjznrUoyFGLECw1VT672nqMNhZpm3TMkWLHYq6uJtZDKc8evy_psFBgG6HuwYY4PnEg2ZWF5tdpaF7Kmm2dfF6XJi3zvLd6rMP_FxwXC4N3Zzfmj4SgVHXo2pTvZ70NSkuroezJR4yT4E6AkgKQ3rgq7x6Awc",
    status: "available",
    isFeatured: true,
    isNewArrival: true,
    specs: [
      { label: "Frequency", value: "5 GHz" },
      { label: "Throughput", value: "150+ Mbps" },
      { label: "Range", value: "15+ km" },
      { label: "Power", value: "Passive PoE" }
    ]
  },
  {
    name: "TP-Link Archer AX55",
    slug: "tp-link-archer-ax55",
    categorySlug: "routers-networking",
    shortDescription:
      "AX3000 dual-band Wi-Fi 6 router for fast and stable home or office networking.",
    fullDescription:
      "A dual-band Wi-Fi 6 router for homes, offices, and small business networks that need fast internet sharing.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSrTTwAIySMDwHvoE9Rj87l_wgVG6KPr9jm5xDfMVnrKe3iP1Dv9F6EljZ3U7-EdjnYrb1NqgWK7O1quG1WsVjm4goeNGsxkGNDw0UKxG6Y5-G7zgC5k37mH1S5a7amxKVsvKlrkK9JNbOVMHNwe_DePIsxVU6Ah7biKqso-f93uyZF89uiKlKNrkHJVZJdmrlDpinX7dCGY8GctzeULLaSU4qqVTUolPiGjZUzfnH64vq54ENgNX9xAjgS9k-wBhujZChjriW6rk",
    status: "available",
    isFeatured: true,
    isNewArrival: false,
    specs: [
      { label: "Wi-Fi", value: "Wi-Fi 6" },
      { label: "Speed", value: "AX3000" },
      { label: "Ports", value: "Gigabit Ethernet" }
    ]
  },
  {
    name: "24-Port Gigabit Switch",
    slug: "24-port-gigabit-switch",
    categorySlug: "routers-networking",
    shortDescription:
      "Rack-friendly switch for offices, CCTV installations, and business networks.",
    fullDescription:
      "A 24-port gigabit network switch for wired office networks, CCTV systems, and installation work.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDX793IsKCBlmF4JAdlcNgjLhTnnsScGCBq03ZE5KpOt-yFEg998bF6rQWOiNJE33PW4hCKyC3WBsN-l0jYCXsnStt6aLXhI8_6Goj1n94Mo0HYXC7IGk7ZfgKdpRFcp9CdkEbrF5sP58bESdHXR70vEtC-LbczrBzl5NPcLSzPQFSWn4WvKT1bC8QP2vEsAJkD2tvme8c7k4Bj4_K3PTEOG2NQaR5fo6ayaJVAHffhcOFqKOhVpICjOXY7seARRLQYgKC-Xa0VtLE",
    status: "available",
    isFeatured: true,
    isNewArrival: false,
    specs: [
      { label: "Ports", value: "24 Gigabit" },
      { label: "Use", value: "Office/CCTV" },
      { label: "Mounting", value: "Rack-friendly" }
    ]
  },
  {
    name: "Cat6 RJ45 Connectors",
    slug: "cat6-rj45-connectors",
    categorySlug: "cables-accessories",
    shortDescription:
      "Gold-plated RJ45 connectors for Cat6 network cable termination.",
    fullDescription:
      "Cat6 RJ45 connectors for network installers, office cabling, CCTV networks, and Ethernet terminations.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeHVw_hdgSgtpkyFymb6LvQ-xpk7jqbtRG2hv7qvkJ-UCd2QHfbax4Y4zfAjiaWm0czVopmqXEZ1gd2e4dlhC6Duv7mCZjAcI4uoBZSmCEG5WvZcWINv2qbKTAAXZAWwbImAxYg8d-mKKitbOFqJPabBuotjDDT7WpnrIavKx4pZt7HzBSJmb_IQCa1wJ7S83rDDc5pocisyfDn9xL16E5D0y-eTXI6Fekn6dgRLe4pNTiZfMxHgjvIhAicUR8DVIF-e__GWxFWzQ",
    status: "available",
    isFeatured: false,
    isNewArrival: true,
    specs: [
      { label: "Type", value: "RJ45" },
      { label: "Cable", value: "Cat6" },
      { label: "Use", value: "Networking" }
    ]
  },
  {
    name: "Pure Sine Wave Inverter 5kVA",
    slug: "pure-sine-wave-inverter-5kva",
    categorySlug: "power-backup",
    shortDescription:
      "Backup power inverter for offices, homes, and sensitive electrical equipment.",
    fullDescription:
      "A pure sine wave inverter suitable for dependable backup power where stable output matters for electronics, networking equipment, and office devices.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRXJNBYoZEkr57P2R0DaUYY0kMGBMeqvgP2awSlNEROsZiyv3HUS0FKt9S_ZucioPVbjewQSa_plk0E8jYuHLSqHsVFBcblWv6pNhlxXpwWZsVT7uQxnXj2ViF7q43Q5ou23BXx2e3NY2YaolqiD24NmVDj3TjEbq4mHadkqc-UqhdM1__YOaWAJmVMdzQyGk9iwI1GA0QE5JLLG0B2HkOoyAet3b9LQ9o-GZPnBoD9pWC786nVwt_F5c5LnWuwJ5Eqw0ZnnB5-uo",
    status: "available",
    isFeatured: true,
    isNewArrival: false,
    specs: [
      { label: "Capacity", value: "5kVA" },
      { label: "Waveform", value: "Pure sine wave" },
      { label: "Use", value: "Backup power" }
    ]
  },
  {
    name: "Smart UPS Backup Unit 1500VA",
    slug: "smart-ups-backup-unit-1500va",
    categorySlug: "power-backup",
    shortDescription:
      "UPS backup unit for routers, office systems, and essential electronics.",
    fullDescription:
      "A smart UPS backup unit for protecting important devices from outages, surges, and unstable power.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5uuaDhKxSMglbEnxHSUvtQ_MvUR_rxq6mnx41I7qSemG1h4aBzaOEQbPhbRM1rVj4zKqwbZeiHUohLvOxSdQdzool8dOo_ctOLsTE7HBk8ZZsRRGkkm1lKKzfgruj7q6j2YQWMoS6eVafiij0rdmesAB58B_TlLXHr9ji-vn0JloVWLdxOF8WExvEeZ_dmqswBCCh-qFAtW4ipulBdwsauhe_2YHC_8bFmWvtu0pCJ7Vy1WTYI2R-Bu4kKTxQecNFPsXdumhI80M",
    status: "available",
    isFeatured: false,
    isNewArrival: true,
    specs: [
      { label: "Capacity", value: "1500VA" },
      { label: "Protection", value: "Surge/backup" },
      { label: "Use", value: "Office equipment" }
    ]
  },
  {
    name: "MPPT Solar Charge Controller 60A",
    slug: "mppt-solar-charge-controller-60a",
    categorySlug: "solar-power-equipment",
    shortDescription:
      "Solar charge controller for efficient battery charging and solar power management.",
    fullDescription:
      "An MPPT solar charge controller for managing solar input, improving charging efficiency, and supporting backup power systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBALqMNkTZ_xqjAGnfbaVlKig5A9SXZC6RKL79QMIF4IfgpwxfXWr84ALnyrS0DCVuTqS0-d2p_lfdoSBDAz3IRIcnYkfVikeYekmBKs7BSrR-rrrakhfi8jbzr0WWAzs7YFttK49NlTe5FPEk9mKd79LirTKcBZa9REGgPaXWJ8aV57Xt1p5FzIaLUuTpjrKr-tIG6tDy_5yYc3Jr2vbepLqrvWMcT4xa3vBNUjmQPYXWuS4XgJ6v0dcpcNDNqGjRi5jcoMeaoY58",
    status: "available",
    isFeatured: false,
    isNewArrival: true,
    specs: [
      { label: "Current", value: "60A" },
      { label: "Type", value: "MPPT" },
      { label: "Use", value: "Solar charging" }
    ]
  },
  {
    name: "4K IP Dome Camera",
    slug: "4k-ip-dome-camera",
    categorySlug: "cctv-security",
    shortDescription:
      "High-resolution CCTV camera for shops, offices, homes, and commercial spaces.",
    fullDescription:
      "A 4K IP dome camera for shops, offices, homes, and commercial spaces.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKE7JZHK0hgeulLXdy7e80nM5eev-k_dSGSbWSl5Ub2NbxptpT0rlJNbmmAjMXBVmfRwqAT3HVTrBoW4gEJRSUaBGfxrpyZ1cy-2rC8qK44kgJc0i0nWDtFsSz605ysnX-z0eR2wRUcFAkfN48sSSTixmB7vkBrABzw-VYnZKHGF_8eXbw3TZqZ62A5BR-loyav7bXyTGjmfvfIRqnqEA1caMI7oNfNoz4tn_Hp2slCDv3JvsJ-DONQnuPDyHkxEHzOzpvADWGZzo",
    status: "available",
    isFeatured: true,
    isNewArrival: false,
    specs: [
      { label: "Resolution", value: "4K" },
      { label: "Type", value: "IP dome" },
      { label: "Use", value: "Surveillance" }
    ]
  },
  {
    name: "DIN-Rail Power Supply",
    slug: "din-rail-power-supply",
    categorySlug: "electrical-products",
    shortDescription:
      "Compact DIN-rail power supply for panels, control boxes, and electrical installations.",
    fullDescription:
      "A DIN-rail power supply for technical installations, low-voltage equipment, and electrical control panels.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWJqzEwP4uZTw4-Nztha3WTMnAuq5o1s5XbIvOBuqXC1qAZo4vo_QvPktClhrBYs8-OKDOGm0Iavl_8Accaxr3oHXj82t3PyxiAPyGV1aO2T6RB8QYGqHDhKlwC9z65Jtr11JsVcliwN2tKh7g-8fOcnTv3RmI2IXjIG-vP8gCDoTa8XwHiGSnlFVpNZR9HMq5bJYE7lLGh5IQsDnStxiXl96tlh4txDmkMhvsGoW0ISpfkFwN5p2EA8Zl34zklhfq7a55VPtMPD4",
    status: "out-of-stock",
    isFeatured: false,
    isNewArrival: true,
    specs: [
      { label: "Mounting", value: "DIN rail" },
      { label: "Use", value: "Electrical panels" },
      { label: "Status", value: "Ask for restock" }
    ]
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function visibleProducts() {
  return products.filter((product) => product.status !== "hidden");
}
