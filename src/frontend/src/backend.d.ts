import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    carId: bigint;
    name: string;
    email: string;
    preferredDate: string;
    phone: string;
}
export interface Car {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    acceleration: string;
    category: Category;
    price: bigint;
    topSpeed: bigint;
    horsepower: bigint;
}
export enum Category {
    suv = "suv",
    sedan = "sedan",
    sports = "sports",
    electric = "electric"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllCars(): Promise<Array<Car>>;
    getCarById(id: bigint): Promise<Car>;
    getCarsByCategory(category: Category): Promise<Array<Car>>;
    getFeaturedCars(): Promise<Array<Car>>;
    submitBooking(name: string, email: string, phone: string, carId: bigint, preferredDate: string): Promise<bigint>;
}
