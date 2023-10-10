<template>
  <div class="mt-8">
    <button
      class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 shadow-sm border border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
      @click="showAddModal"
    >
      Add Branches
    </button>
    <div class="mt-2 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Branch
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Number of Tables
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Reservation Duration
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="branch in branchStore.getActiveBranches"
                  :key="branch.email"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ branch.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ branch.reference }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ getActiveTablesFromBranch(branch) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ branch.reservation_duration }} Minutes
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <a
                      href="#"
                      class="text-primary hover:text-primary-dark"
                      @click.prevent="showEditModal(branch.id)"
                      >Edit<span class="sr-only">, {{ branch.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <modal
      name="add-branches"
      classes="rounded-md overflow-visible"
      height="auto"
    >
      <AddBranch :closeModal="hideAddModal" />
    </modal>

    <modal
      name="edit-branch"
      classes="rounded-md overflow-visible"
      height="auto"
    >
      <EditBranch :closeModal="hideEditModal" :branchId="currentBranchId" />
    </modal>
  </div>
</template>

<script>
import { mapStores } from "pinia";

import AddBranch from "./AddBranch.vue";
import EditBranch from "./EditBranch.vue";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

export default {
  name: "BranchesList",
  components: {
    AddBranch,
    EditBranch,
  },
  data() {
    return {
      currentBranchId: null,
    };
  },
  computed: {
    ...mapStores(useBranchStore),
  },
  methods: {
    showAddModal() {
      this.$modal.show("add-branches");
    },
    hideAddModal() {
      this.$modal.hide("add-branches");
    },
    showEditModal(branchId) {
      this.$modal.show("edit-branch");
      this.currentBranchId = branchId;
    },
    hideEditModal() {
      this.$modal.hide("edit-branch");
    },
    getActiveTablesFromBranch(branch) {
      let numOftables = 0;

      branch.sections.forEach((section) => {
        section.tables.forEach((table) => {
          if (table.accepts_reservations) {
            numOftables++;
          }
        });
      });

      return numOftables;
    },
  },
};
</script>
