# Golf Cart USA - Marketplace Website Specification

## 1. Project Overview
- **Project Name**: Golf Cart USA
- **Type**: Golf cart marketplace with admin panel
- **Core Functionality**: Browse, search, filter golf carts; admin can add/edit/delete listings
- **Target Users**: Golf cart buyers (USA/Canada), dealers
- **Deployment**: Namecheap static hosting

## 2. SEO Specification

### On-Page SEO
- Unique meta titles/descriptions per page
- Semantic HTML5 structure
- Schema.org structured data (Product, Organization, FAQ)
- Open Graph + Twitter Cards
- Canonical URLs

### Technical SEO
- Fast load times (minimal JS, optimized CSS)
- Responsive mobile-first design
- Image alt text
- Clean URL structure (/listing.html?id=xxx)
- XML sitemap generation

### Local SEO
- USA/Canada location targeting
- State/province filtering
- Contact information consistent

## 3. UI/UX Specification

### Color Palette
- **Primary Green**: #1B5E20 (forest green - golf theme)
- **Accent Green**: #4CAF50
- **Dark**: #1A1A1A
- **Light**: #F5F5F5
- **White**: #FFFFFF
- **Text**: #333333

### Typography
- **Headings**: "Outfit", sans-serif (bold, modern)
- **Body**: "DM Sans", sans-serif

### Layout
- Header: Logo + nav + search
- Hero: Search bar with location/price filters
- Featured Listings grid
- Category browse
- Footer with SEO links

## 4. Pages

### index.html (Home)
- Hero with search
- Featured listings (6)
- Categories (New, Used, Custom, Commercial)
- Why Choose Us
- FAQ section
- SEO content

### listing.html
- Single listing view
- Image gallery
- Specifications
- Contact form
- Related listings
- Schema.org Product markup

### admin.html
- Dashboard with stats
- Add new listing form
- Edit existing listings
- Delete listings
- All listings table

## 5. Admin Features

### Listing Fields
- Title
- Price
- Year
- Make/Brand
- Model
- Condition (New, Used, Refurbished)
- Type (Gas, Electric, Lithium)
- Seats (2, 4, 6)
- Color
- Mileage
- Description
- Features (checkboxes)
- Images (URLs)
- Location (State)
- Contact info

### Data Storage
- localStorage for demo
- Export/Import JSON functionality

## 6. Acceptance Criteria
- [ ] All pages load without errors
- [ ] Admin can add/edit/delete listings
- [ ] Listings persist in localStorage
- [ ] Search and filters work
- [ ] SEO meta tags present
- [ ] Schema.org data validates
- [ ] Mobile responsive
