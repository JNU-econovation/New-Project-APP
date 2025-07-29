import { create } from "zustand";

interface ReportPositionStore {
  reportPosition: { latitude: number; longitude: number } | null;
  setReportPosition: (position: {
    latitude: number;
    longitude: number;
  }) => void;
}

export const useReportPositionStore = create<ReportPositionStore>(
  (set, get) => ({
    reportPosition: null,
    setReportPosition: (position) => set({ reportPosition: position }),
  }),
);
