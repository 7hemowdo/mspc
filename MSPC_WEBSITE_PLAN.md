# MSPC Website Plan

## 1. Project Definition

This project is not a full e-commerce platform.

It is a modern product catalog website with a very simple admin system.

The main goal is to help MSPC:

- present products in a strong, modern, trustworthy way
- make browsing easy on mobile and slow internet
- let staff add or update products with minimal effort
- keep the system simple enough that the business can use it without training

## 2. Core Product Decision

Build the smallest system that looks premium.

Phase 1 should include:

- public marketing website
- category pages
- product detail pages
- new arrivals section
- featured products section
- simple admin dashboard
- manual product publishing and status control
- product inquiry flow without public price display

Do not build in Phase 1:

- cart
- checkout
- online payment
- public price labels such as Ask for Price
- customer accounts
- stock tracking
- low stock alerts
- order management

## 3. Main Principles

### Simplicity

The system should be easy enough for a non-technical staff member to use in 2 to 3 clicks.

Main admin actions:

1. Add Product
2. Edit Product
3. Hide Product or mark it Out of Stock

### Design Quality

The public website should feel:

- modern
- clean
- technical
- trustworthy
- fast

It should not feel like a generic business template.

### Performance

The site must load well in The Gambia where connections may be slow.

That means:

- small JavaScript payloads
- optimized images
- limited fonts
- no heavy animations
- static pages where possible
- CDN delivery at the edge

### SEO

The site should be structured for Google search from day one.

That means:

- clean URLs
- category and product metadata
- sitemap
- schema markup
- strong internal linking
- mobile-first layout
- location-focused content

## 4. Recommended Technical Direction

### Stack

- Frontend: Astro
- Hosting: Cloudflare Pages
- Backend/API: Cloudflare Workers
- Database: Cloudflare D1
- Image Storage: Cloudflare R2
- Auth: simple admin login

### Why This Stack

- fast static-first frontend
- low hosting cost
- good performance for slow networks
- one provider for the full stack
- simple deployment
- scalable enough for a small to medium catalog website

## 5. Website Structure

### Public Pages

- Home
- About
- Contact
- Categories
- Single Category
- Product Detail
- New Arrivals
- Featured Products
- Store Locations
- Policies

### Homepage Sections

- hero section
- category highlights
- featured products
- new arrivals
- featured brands or manufacturers
- testimonials or trust indicators
- brand trust section
- location/contact section
- WhatsApp call to action

## 6. Product Model

Each product should contain:

- name
- slug
- short description
- full description
- category
- images
- optional price
- show price toggle
- status
- featured toggle
- new arrival toggle
- published toggle
- created date
- updated date

### Product Status

Use only these statuses:

- Available
- Out of Stock
- Hidden

Then use separate toggles for:

- Featured
- New Arrival

This keeps the logic simple.

## 7. Admin UX Plan

The admin must be extremely simple.

### Admin Navigation

- Dashboard
- Products
- Add Product
- Categories
- Settings

### Add Product Flow

1. Click Add Product
2. Enter product name
3. Choose category
4. Add description
5. Upload images
6. Optionally enter price
7. Keep show price off by default
8. Set status
9. Toggle Featured or New Arrival if needed
10. Click Publish

### Product List Features

- search by name
- filter by category
- quick status change
- edit button
- duplicate product button
- hide product button

### Important UX Rules

- use large buttons
- keep the form on one screen if possible
- use smart defaults
- auto-generate slug from product name
- hide advanced fields
- do not expose unnecessary settings

## 8. Design Direction

### Visual Style

The site should look like a modern electronics and appliances brand.

Design goals:

- strong visual hierarchy
- better spacing
- better typography
- clearer calls to action
- sharper product cards
- cleaner navigation
- more confidence and trust

### UI Style Notes

- use one strong heading font and one readable body font
- avoid too many colors
- use clean grids
- keep cards consistent
- use badges for Featured, New Arrival, and Out of Stock
- keep interactions subtle and useful
- keep WhatsApp and inquiry actions visible without clutter

### Mobile UX

Mobile is a first-class target, not a fallback.

Rules:

- large touch targets
- simple menu
- compressed images
- clear category browsing
- visible WhatsApp contact option
- fast product image loading

## 9. SEO Plan

### Technical SEO

- static page generation where possible
- sitemap.xml
- robots.txt
- canonical URLs
- Open Graph tags
- schema markup for LocalBusiness and Product

### On-Page SEO

- keyword-focused page titles
- strong meta descriptions
- descriptive product names
- category landing pages
- location references for The Gambia
- internal links between categories and products
- product type + location targeting in headings and metadata
- descriptive image alt text
- SEO-friendly product descriptions
- unique content on category and product pages

### Local SEO

- Google Business Profile alignment
- consistent phone, address, and business details
- location section on site
- embedded map if useful
- Search Console setup
- basic analytics setup
- local business citations where relevant
- local trust signals such as address, phone, and store location visibility

### Search Visibility Strategy

The goal is not to rank for every electronics search.

The goal is to rank strongly for relevant product and category searches in The Gambia.

This should be done through:

- category pages targeting important product groups
- product pages targeting specific product names and models
- location-aware metadata and headings
- strong internal linking from homepage to categories and products
- clear business identity and local relevance

### Category SEO Strategy

Each important product type should have its own optimized category page.

Examples:

- Electronics
- Home Appliances
- CCTV
- Satellite Equipment
- Solar Equipment
- Electrical Equipment

Each category page should include:

- unique intro text
- category-specific heading
- product grid
- internal links to product pages
- references to availability in The Gambia where natural

### Product SEO Strategy

Each product page should be able to rank independently.

Each product page should include:

- clear product title
- short summary
- full description
- category reference
- product image alt text
- availability state
- optional price if shown
- structured data
- inquiry call to action

### Keyword Strategy

Target keywords should combine:

- product type
- brand or model where relevant
- local intent

Examples:

- electronics in the Gambia
- CCTV cameras in the Gambia
- solar batteries in the Gambia
- home appliances in Banjul
- satellite equipment in the Gambia

### Internal Linking Strategy

Use internal links to help search engines understand the site structure.

Important links:

- homepage to major categories
- category pages to product pages
- product pages to related products
- homepage to featured and new arrival pages
- footer to important site sections

### Content Strategy

The site should not rely only on product uploads.

Useful supporting content may include:

- category introduction content
- brand or manufacturer pages
- buying guide or tips articles later
- FAQs about delivery, availability, and contact

### Authority and Trust Strategy

Search performance will also depend on trust and authority.

Helpful signals:

- complete Google Business Profile
- consistent business details across platforms
- local business directory mentions
- backlinks from local partners or suppliers
- strong contact and location visibility on the site

### SEO Success Expectations

SEO should be treated as gradual growth, not instant ranking.

Success means:

- category pages begin appearing for relevant Gambian searches
- product pages become indexable and discoverable
- branded searches strongly show MSPC
- local customers can find the business for product-related searches

## 10. Performance Plan

The site should be optimized for slow internet from the start.

### Performance Rules

- do not use a heavy frontend framework for the public site
- serve static HTML where possible
- limit third-party scripts
- no autoplay video
- use modern image formats
- lazy-load non-critical images
- preload only important assets
- keep fonts to a minimum
- compress images before upload where possible

### Public Site Strategy

- homepage mostly static
- category pages mostly static
- product pages statically generated or edge-rendered as needed
- admin pages dynamic

## 11. Cloudflare Architecture

### Frontend

Astro site deployed to Cloudflare Pages.

### Backend

Cloudflare Workers exposes a small API for:

- admin authentication
- create product
- update product
- delete or hide product
- upload image metadata
- fetch admin product list

### Database

Cloudflare D1 stores:

- products
- categories
- settings
- users if needed

### File Storage

Cloudflare R2 stores product images.

### Caching

- cache public pages aggressively
- purge or revalidate when product content changes

## 12. Suggested Data Tables

### categories

- id
- name
- slug
- description
- image_url
- sort_order

### products

- id
- category_id
- name
- slug
- short_description
- full_description
- price
- show_price
- status
- is_featured
- is_new_arrival
- is_published
- created_at
- updated_at

### product_images

- id
- product_id
- image_url
- alt_text
- sort_order

### settings

- business_name
- phone
- whatsapp
- email
- address
- hero_title
- hero_subtitle
- social_links

## 13. MVP Scope

The MVP should include only the essentials.

### Public

- homepage
- categories
- product pages
- featured products
- new arrivals
- featured brands section
- contact page
- about page

### Admin

- login
- add product
- edit product
- upload images
- manage categories
- hide product
- change status
- toggle show price
- duplicate product

## 14. Build Order

### Phase 1: Planning

- define sitemap
- define product fields
- define category list
- define visual direction

### Phase 2: Design

- homepage design
- product card design
- category page design
- product detail design
- admin layout design

### Phase 3: Foundation

- Astro setup
- Cloudflare Pages setup
- Worker API setup
- D1 schema setup
- R2 bucket setup

### Phase 4: Public Website

- build homepage
- build navigation and footer
- build category pages
- build product pages
- build contact and about pages

### Phase 5: Admin

- login flow
- product creation form
- product list page
- category management page
- settings page

### Phase 6: SEO and Performance

- metadata
- schema
- sitemap
- image optimization
- caching
- mobile testing

### Phase 7: Launch

- deploy production
- connect domain
- test forms and product publishing
- verify Search Console setup

## 15. Success Criteria

The project is successful if:

- the website feels clearly better than the current MSPC site
- the business can add a new product without help
- the admin flow is easy enough in under 3 clicks to start
- product pages look strong on mobile
- pages load quickly on weak connections
- the site is easy to maintain later

## 16. Final Recommendation

Keep the system small.

The strength of this project should come from:

- better design
- better product presentation
- better mobile experience
- better speed
- very simple admin workflow

Do not overbuild Phase 1.

The right MVP is a premium-looking product catalog with a simple admin panel, not a complex commerce platform.

## 17. High-Value Additions

These additions improve usefulness without making the system harder to operate:

- WhatsApp inquiry button on every product page
- Ask for Price action when public price is hidden
- duplicate product feature in admin for similar products
- featured brands or manufacturers section
- simple product search
- testimonials or trust section
- visible store location and contact block on homepage
- image compression workflow before upload
- basic analytics and Search Console integration
