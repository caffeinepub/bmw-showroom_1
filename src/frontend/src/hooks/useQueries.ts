import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Car } from "../backend.d";
import type { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useAllCars() {
  const { actor, isFetching } = useActor();
  return useQuery<Car[]>({
    queryKey: ["cars", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCars();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedCars() {
  const { actor, isFetching } = useActor();
  return useQuery<Car[]>({
    queryKey: ["cars", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedCars();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCarsByCategory(category: Category | "all") {
  const { actor, isFetching } = useActor();
  return useQuery<Car[]>({
    queryKey: ["cars", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "all") return actor.getAllCars();
      return actor.getCarsByCategory(category as Category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      carId,
      preferredDate,
    }: {
      name: string;
      email: string;
      phone: string;
      carId: bigint;
      preferredDate: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(name, email, phone, carId, preferredDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
