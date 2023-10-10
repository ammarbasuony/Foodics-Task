<template>
  <div class="p-10">
    <div class="bg-white px-4 py-5 sm:px-6 rounded-md shadow-sm">
      <div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          Reservations
        </h3>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            class="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            @click="disable"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center">
              <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Disabling ...
            </span>
            <span v-else>Disable Reservations</span>
          </button>
        </div>
      </div>
    </div>

    <BranchesList />
  </div>
</template>

<script>
import { mapStores, mapActions } from "pinia";
import Toast from "awesome-toast-component";

// API
import { controlBranchActivation } from "@/api/branches";

// Components
import BranchesList from "@/components/BranchesList.vue";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

// Icons
import { Loader2 } from "lucide-vue";

export default {
  name: "HomeView",
  components: {
    BranchesList,
    Loader2,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapStores(useBranchStore),
  },
  methods: {
    ...mapActions(useBranchStore, ["fetchBranches"]),
    async disable() {
      if (!this.branchStore.getActiveBranches.length)
        return new Toast("❌ No Active Branches", {
          position: "top",
          theme: "light",
        });

      const calls = [];

      this.branchStore.getActiveBranches.forEach((branch) => {
        calls.push(controlBranchActivation(branch.id, false));
      });

      this.loading = true;
      await Promise.all(calls);
      this.loading = false;

      this.fetchBranches();

      new Toast("✅ Branches disabled successfully", {
        position: "top",
        theme: "light",
      });
    },
  },
};
</script>
