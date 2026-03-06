import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import type { Car } from "./backend.d";
import BookingModal from "./components/BookingModal";
import BrandHighlights from "./components/BrandHighlights";
import CarDetailModal from "./components/CarDetailModal";
import CarsGrid from "./components/CarsGrid";
import FeaturedSection from "./components/FeaturedSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleViewCar = (car: Car) => {
    setSelectedCar(car);
    setIsDetailOpen(true);
  };

  const handleBookCar = (car: Car) => {
    setBookingCar(car);
    setIsDetailOpen(false);
    setIsBookingOpen(true);
  };

  const handleBookFromDetail = () => {
    if (selectedCar) {
      handleBookCar(selectedCar);
    }
  };

  const handleScrollToModels = () => {
    document.getElementById("models")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body noise-bg">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onBookTestDrive={() => setIsBookingOpen(true)}
      />

      <main>
        <HeroSection onExplore={handleScrollToModels} />
        <BrandHighlights />
        <FeaturedSection onViewCar={handleViewCar} />
        <CarsGrid
          activeCategory={activeCategory}
          onViewCar={handleViewCar}
          onCategoryChange={setActiveCategory}
        />
      </main>

      <Footer />

      <CarDetailModal
        car={selectedCar}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBook={handleBookFromDetail}
      />

      <BookingModal
        car={bookingCar}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.005 250)",
            border: "1px solid oklch(0.28 0.01 250)",
            color: "oklch(0.96 0.005 250)",
          },
        }}
      />
    </div>
  );
}
