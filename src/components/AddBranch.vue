<template>
  <div class="grid grid-cols-1">
    <div class="p-5 font-semibold">Add Branches</div>

    <div class="bg-[#f7f8fb] border-t border-b border-[#d5dae6] p-8">
      <div>Branches</div>
      <v-select
        class="mt-3"
        :options="branchStore.getInActiveBranches"
        :multiple="true"
        placeholder="Select Branches"
        v-model="branches"
      />
    </div>

    <div class="p-5 flex justify-end gap-2">
      <button
        class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 shadow-sm border border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
        @click="closeModal"
      >
        Close
      </button>
      <button
        class="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
        @click="save"
      >
        <span v-if="loading" class="flex">
          <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> Saving
          ...
        </span>
        <span v-else>Save</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores, mapActions } from "pinia";
import Toast from "awesome-toast-component";

// Icons
import { Loader2 } from "lucide-vue";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

// API
import { controlBranchActivation } from "@/api/branches";

export default {
  name: "AddBranchView",
  computed: {
    ...mapStores(useBranchStore),
  },
  components: {
    Loader2,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      branches: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions(useBranchStore, ["fetchBranches"]),
    async save() {
      if (!this.branches.length)
        return new Toast("⚠ Please select branches", {
          position: "top",
          theme: "light",
        });

      const calls = [];
      
      this.branches.forEach((branch) => {
        calls.push(controlBranchActivation(branch.code, true));
      });

      this.loading = true;
      await Promise.all(calls);
      this.loading = false;

      this.closeModal();
      this.fetchBranches();

      new Toast("✅ Branches added successfully", {
        position: "top",
        theme: "light",
      });
    },
  },
};
</script>
