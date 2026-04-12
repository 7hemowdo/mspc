# MSPC Design Implementation Notes

## Source Direction

Use the Google Stitch exports in `~/Downloads/final/stitch` as visual references only.
Do not copy the generated HTML directly into production code.

Reference pages:

- `all_categories`
- `routers_networking`
- `ubiquiti_nanostation_m5`
- `about_us`
- `mspc_technical_core/DESIGN.md`

## Visual Thesis

MSPC should feel like a simple, premium technical catalog: deep-blue structure, strong orange action, clean white space, and practical local trust.

## Content Plan

- Home: product promise, core categories, featured products, new arrivals, trust, contact
- Categories: all product groups with simple browsing paths
- Category detail: searchable/filterable product grid with inquiry actions
- Product detail: image, status, specs, Ask on WhatsApp, request product info
- About and Contact: local presence, support, business trust

## Interaction Thesis

- Navigation and filters should be immediate and lightweight.
- Product cards should reveal action clearly without commerce behavior.
- WhatsApp should remain visible but not clutter the interface.

## Product Direction

MSPC is a product catalog website, not an e-commerce store.

MSPC sells:

- Electrical products
- Power backup systems
- Routers
- Networking equipment
- NanoStations
- CCTV/security equipment
- Solar and power equipment
- Cables and accessories
- Technical installation products

Do not build:

- Cart
- Checkout
- Payment
- Buy Now
- Add to Cart
- Customer accounts
- Order tracking
- Quantity selectors
- Profile page
- Deals page

## Logo

Use a centralized `Logo` component.

Current logo asset:

- `public/mspc-logo.png`

This PNG was extracted from `/home/mowdo/Downloads/MSPC Trading logo.pdf`, cropped, and converted to a transparent-background web image.

## Colors

Primary blue:

- `#181C7F`
- `#010063`

Primary orange:

- `#E98321`
- `#FE9332`
- `#924C00` for dark orange text

Support green:

- `#3C8137`

Neutral base:

- Background: `#FFFFFF` or `#F8F9FB`
- Soft section background: `#F2F4F6`
- Text: `#191C1E`
- Muted text: `#464652`
- Border/outline: `#E1E2E4`

Color usage:

- Blue: structure, headings, navigation, trust framing
- Orange: primary CTAs, active states, section markers, Featured and New Arrival badges
- Green: WhatsApp, Available status, success/trust states

Keep the page mostly white/light gray. Make orange stronger than the Stitch category/listing pages did.

## Typography

Use only:

- Headings: Sora
- Body/UI: Inter

Do not use Space Grotesk, Plus Jakarta Sans, decorative fonts, or script fonts.

## Layout

Use a simple grid, clear spacing, strong alignment, and consistent product cards.
Use 6px to 8px border radius as the default.

Avoid:

- Visual clutter
- Decorative blobs
- Heavy shadows
- Glassmorphism
- Too many icons
- Too many cards
- Overly rounded UI

## Navigation

Main navigation:

- Home
- Categories
- New Arrivals
- Featured Products
- About
- Contact

Always include a visible WhatsApp/contact action.

Mobile navigation must not include Shop, Deals, Profile, or Account.

## Product Cards

Product cards should include:

- Product image
- Product name
- Category
- Short description
- Status badge
- `View Details`

Product cards should not repeat WhatsApp buttons on every item. Keep cards focused on `View Details`; product detail pages, the header, footer, and contact bands handle WhatsApp inquiry.

Status badges:

- Available: green
- Out of Stock: neutral/muted
- Featured: orange
- New Arrival: orange

Do not disable WhatsApp just because a product is out of stock. Users may still ask about restock or alternatives.

## Data Consistency

A product must have the same status everywhere. Render status from one shared product data source.

## Copy Rules

Use practical product language.

Prefer:

- Reliable electrical, networking, and backup power products in The Gambia.
- Browse products for connectivity, power protection, security, and electrical installations.
- Ask about availability on WhatsApp.
- Local support for homes, offices, shops, and installers.

Avoid:

- Technical Authority
- Precision engineering
- Digital excellence
- Engineering hub
- Curated service
- Checkout
- Shop
- Deals
- Profile

Replace `Browse Tools` with `Browse Products` or `View Category`.

## Filters and Sorting

Because price is optional and hidden by default, avoid price-first sorting.

Use:

- Latest Arrivals
- Available
- Featured
- Category
- Product Type

Avoid:

- Price: Low to High
- Deals
- Discounts

## Final Goal

A simple, premium, logo-consistent catalog website for MSPC focused on electrical products, networking equipment, routers, NanoStations, power backup, CCTV/security, solar power equipment, cables, and technical accessories in The Gambia.
