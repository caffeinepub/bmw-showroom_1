# BMW Showroom

## Current State
The app has a BMW Showroom with a hero section, brand highlights, featured cars, a cars grid with category filtering, car detail modals, and a booking modal (triggered from the navbar CTA or from each car's detail). The booking modal collects name, email, phone, and preferred date and submits via `submitBooking` backend call. There is no dedicated Test Drive section on the page.

## Requested Changes (Diff)

### Add
- A dedicated "Book a Test Drive" full-page section between the cars grid and the footer, with an immersive layout: left side has a large BMW image and key selling points ("30-minute personalized drive", "No commitment required", "Expert BMW advisor"), and the right side contains the inline booking form (name, email, phone, preferred car model selector, preferred date).
- A "Book a Test Drive" CTA button in the hero alongside the existing "Explore Models" button, which scrolls down to the new test drive section.
- The new section should have an `id="test-drive"` for scroll targeting.
- A "Test Drive" nav link in the navbar that scrolls to the section.

### Modify
- `HeroSection`: Add a second CTA "Book a Test Drive" button that scrolls to `#test-drive`.
- `Navbar`: Add a "Test Drive" nav link alongside the category tabs; clicking it scrolls to `#test-drive`.
- `App.tsx`: Pass `onTestDrive` callback to `HeroSection` and wire the `#test-drive` scroll target.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `TestDriveSection.tsx` component with a two-column layout. Left: hero image + selling points. Right: self-contained booking form using `useSubmitBooking` hook and `useAllCars` for the car dropdown. Shows success state inline after submission.
2. Update `HeroSection.tsx` to accept and wire an `onBookTestDrive` prop that scrolls to `#test-drive`, adding the second CTA button.
3. Update `Navbar.tsx` to add a "Test Drive" nav item that scrolls to `#test-drive`.
4. Update `App.tsx` to render `<TestDriveSection />` between `CarsGrid` and `Footer`, and wire the scroll callback to `HeroSection`.
