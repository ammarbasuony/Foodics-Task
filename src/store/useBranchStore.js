import { defineStore } from "pinia";

// API
import { getBranches } from "@/api/branches";

export const useBranchStore = defineStore("branch", {
  state: () => ({
    branches: [],
    selectedBranch: {},
  }),
  getters: {
    getActiveBranches() {
      return this.branches.filter((branch) => branch.accepts_reservations);
    },
    getBranchDetails() {
      return this.branchDetails;
    },
    getInActiveBranches() {
      return this.branches
        .filter((branch) => !branch.accepts_reservations)
        .map((branch) => ({
          label: `${branch.name} - (${branch.reference})`,
          code: branch.id,
        }));
    },
    getBranchById: (state) => (id) => {
      return state.branches.find((branch) => branch.id === id);
    },
    getSelectedBranch: (state) => {
      return state.selectedBranch;
    },
  },
  actions: {
    async fetchBranches() {
      const { data } = await getBranches();
      this.setBranches(data);
    },
    setBranches(branches) {
      this.branches = branches;
    },
    selectBranch(id) {
      const current = this.getBranchById(id);

      let allTables = [];
      let activeTables = [];

      current.sections.forEach((section) => {
        section.tables.forEach((table) => {
          if (table.accepts_reservations)
            activeTables.push({
              label: `${section.name} - ${table.name}`,
              code: table.id,
              accepts_reservations: table.accepts_reservations,
            });

          allTables.push({
            label: `${section.name} - ${table.name}`,
            code: table.id,
            accepts_reservations: table.accepts_reservations,
          });
        });
      });

      this.selectedBranch.id = current.id;
      this.selectedBranch.name = current.name;
      this.selectedBranch.opening_from = current.opening_from;
      this.selectedBranch.opening_to = current.opening_to;
      this.selectedBranch.tables = allTables;
      this.selectedBranch.activeTables = activeTables;
      this.selectedBranch.reservation_times = current.reservation_times;
      this.selectedBranch.reservation_duration = current.reservation_duration;
    },
    addTimeSlot(day) {
      if (this.selectedBranch.reservation_times[day].length >= 3) return;

      this.selectedBranch.reservation_times[day].push(["00:00", "00:00"]);
    },
    removeTimeSlot(index, day) {
      this.selectedBranch.reservation_times[day].splice(index, 1);
    },
    applySatSlotForAllDays() {
      const saturday = this.selectedBranch.reservation_times.saturday;
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ];

      days.forEach((day) => {
        this.selectedBranch.reservation_times[day] = [...saturday];
      });
    },
  },
});
