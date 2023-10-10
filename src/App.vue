<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "pinia";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

export default {
  name: "App",
  methods: {
    ...mapActions(useBranchStore, ["fetchBranches"]),
  },
  async created() {
    this.fetchBranches();
  },
};
</script>
