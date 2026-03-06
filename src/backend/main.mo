import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  // Types
  type Category = { #sedan; #suv; #electric; #sports };
  type Car = {
    id : Nat;
    name : Text;
    category : Category;
    price : Nat;
    description : Text;
    horsepower : Nat;
    acceleration : Text;
    topSpeed : Nat;
    featured : Bool;
  };

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    carId : Nat;
    preferredDate : Text;
  };

  // Cars
  let cars = Map.fromIter<Nat, Car>(
    [
      (0, {
        id = 0;
        name = "M3";
        category = #sports;
        price = 69900;
        description = "High-performance sports sedan";
        horsepower = 503;
        acceleration = "3.8s";
        topSpeed = 155;
        featured = true;
      }),
      (1, {
        id = 1;
        name = "M5";
        category = #sports;
        price = 104495;
        description = "Luxury sports sedan";
        horsepower = 600;
        acceleration = "3.2s";
        topSpeed = 190;
        featured = true;
      }),
      (2, {
        id = 2;
        name = "7 Series";
        category = #sedan;
        price = 86495;
        description = "Luxury sedan";
        horsepower = 375;
        acceleration = "5.2s";
        topSpeed = 155;
        featured = false;
      }),
      (3, {
        id = 3;
        name = "X5";
        category = #suv;
        price = 60200;
        description = "Luxury SUV";
        horsepower = 335;
        acceleration = "5.3s";
        topSpeed = 130;
        featured = true;
      }),
      (4, {
        id = 4;
        name = "i8";
        category = #sports;
        price = 147500;
        description = "Plug-in hybrid sports car";
        horsepower = 369;
        acceleration = "4.2s";
        topSpeed = 155;
        featured = false;
      }),
      (5, {
        id = 5;
        name = "iX";
        category = #electric;
        price = 83300;
        description = "All-electric SUV";
        horsepower = 516;
        acceleration = "4.4s";
        topSpeed = 124;
        featured = false;
      }),
    ].values(),
  );

  // Bookings
  var bookingId = 0;
  let bookings = Map.empty<Nat, Booking>();

  // Car functions
  public query ({ caller }) func getAllCars() : async [Car] {
    cars.values().toArray();
  };

  public query ({ caller }) func getCarsByCategory(category : Category) : async [Car] {
    let filtered = cars.values().filter(
      func(car) {
        car.category == category;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getFeaturedCars() : async [Car] {
    let filtered = cars.values().filter(
      func(car) {
        car.featured;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getCarById(id : Nat) : async Car {
    switch (cars.get(id)) {
      case (null) { Runtime.trap("Car not found") };
      case (?car) { car };
    };
  };

  // Booking functions
  public shared ({ caller }) func submitBooking(name : Text, email : Text, phone : Text, carId : Nat, preferredDate : Text) : async Nat {
    switch (cars.get(carId)) {
      case (null) { Runtime.trap("Car not found") };
      case (?_) {
        let booking : Booking = {
          id = bookingId;
          name;
          email;
          phone;
          carId;
          preferredDate;
        };
        bookings.add(bookingId, booking);
        bookingId += 1;
        booking.id;
      };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };
};
