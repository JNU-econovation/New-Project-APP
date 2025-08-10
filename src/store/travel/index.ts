import { TravelState } from "@model/travel";
import { Alert } from "react-native";
import { create } from "zustand";

interface TravelStateStore {
  travelState: TravelState;
  intervalId: number | null;
  setTravelState: (state: TravelState) => void;
  setIntervalId: (id: number | null) => void;
}

const useTravelStateStore = create<TravelStateStore>((set) => ({
  travelState: "idle",
  intervalId: null,
  setTravelState: (state) => set({ travelState: state }),
  setIntervalId: (id) => set({ intervalId: id }),
}));

export default useTravelStateStore;
