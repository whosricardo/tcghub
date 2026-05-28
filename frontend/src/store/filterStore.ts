import { create } from "zustand";

interface FilterStoreProps {
  filterState: string[];
  addFilterState: (filter: string) => void;
  removeFilterState: (filter: string) => void;
}

export const useFilterStore = create<FilterStoreProps>()((set) => ({
  filterState: [],

  addFilterState: (filter) =>
    set((state) => ({
      filterState: state.filterState.includes(filter)
        ? state.filterState
        : [...state.filterState, filter],
    })),

  removeFilterState: (filterToRemove) =>
    set((state) => ({
      filterState: state.filterState.filter(
        (filter) => filter !== filterToRemove
      ),
    })),
}));