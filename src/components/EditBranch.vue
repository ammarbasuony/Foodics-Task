<template>
  <div class="grid grid-cols-1">
    <div class="p-5 font-semibold">
      Edit {{ branchData.name }} Reservation Settings
    </div>

    <div class="bg-[#f7f8fb] border-t border-b border-[#d5dae6] p-8">
      <div
        class="bg-[#f7f8fb] border-t border-b border-[#d5dae6] p-3 text-sm text-gray-500"
      >
        Branch working hours are {{ branchData.opening_from }} -
        {{ branchData.opening_to }}
      </div>

      <div class="mt-6">
        <div>Reservation Duration</div>
        <input
          type="number"
          class="w-full border border-[#d5dae6] p-2 h-[35px] rounded-md mt-2"
          v-model="reservation_duration"
        />
      </div>

      <div class="mt-6">
        <div>Tables</div>
        <v-select
          class="mt-2"
          :options="branchData.tables"
          v-model="tables"
          :multiple="true"
        />
      </div>

      <div class="mt-6">
        <div class="flex items-start justify-between">
          Saturday
          <span
            class="text-primary cursor-pointer"
            @click="applySatSlotForAllDays"
            >Apply on all days</span
          >
        </div>
        <TimePicker day="saturday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Sunday</div>
        <TimePicker day="sunday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Monday</div>
        <TimePicker day="monday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Tuesday</div>
        <TimePicker day="tuesday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Wednesday</div>
        <TimePicker day="wednesday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Thursday</div>
        <TimePicker day="thursday" class="mt-2" />
      </div>
      <div class="mt-6">
        <div class="flex items-start justify-between">Friday</div>
        <TimePicker day="friday" class="mt-2" />
      </div>
    </div>

    <div class="p-5 flex justify-between gap-2">
      <button
        class="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-normal text-red-500 hover:bg-red-100 active:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
      >
        <span v-if="loadingDisable" class="flex items-center">
          <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-red-500" />
          Disabling ...
        </span>
        <span v-else @click="disableReservation">Disable Reservations</span>
      </button>
      <div class="flex gap-2">
        <button
          class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 shadow-sm border border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
          @click="closeModal"
        >
          Close
        </button>
        <button
          class="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
        >
          <span v-if="loadingSave" class="flex items-center">
            <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Saving ...
          </span>
          <span v-else @click="saveBranch">Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import Toast from "awesome-toast-component";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

// Components
import TimePicker from "@/shared/TimePicker.vue";

// API
import { controlBranchActivation, updateBranch } from "@/api/branches";
import { controlTableActivation } from "@/api/tables";

// Icons
import { Loader2 } from "lucide-vue";

export default {
  name: "EditBranchView",
  components: {
    TimePicker,
    Loader2,
  },
  data() {
    return {
      tables: [],
      reservation_duration: 0,
      loadingDisable: false,
      loadingSave: false,
    };
  },
  computed: {
    ...mapState(useBranchStore, ["getSelectedBranch"]),
    branchData() {
      return this.getSelectedBranch;
    },
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString();
    },
    async disableReservation() {
      this.loadingDisable = true;
      await controlBranchActivation(this.branchId, false);
      this.loadingDisable = false;

      this.fetchBranches();

      new Toast("✅ Branch disabled successfully", {
        position: "top",
        theme: "light",
      });

      this.closeModal();
    },
    async saveBranch() {
      const tableCalls = [];

      this.branchData.tables.forEach((table) => {
        tableCalls.push(controlTableActivation(table.code, false));
      });

      this.tables.forEach((table) => {
        tableCalls.push(controlTableActivation(table.code, true));
      });

      this.loadingSave = true;

      await Promise.all(tableCalls);
      const { message, errors } = await updateBranch(this.branchId, {
        reservation_duration: this.reservation_duration,
        reservation_times: this.branchData.reservation_times,
      });

      this.loadingSave = false;

      if (errors) {
        new Toast(`❌ ${message}`, {
          position: "top",
          theme: "light",
        });
        return;
      }

      this.fetchBranches();

      new Toast("✅ Branch saved successfully", {
        position: "top",
        theme: "light",
      });

      this.closeModal();
    },
    ...mapActions(useBranchStore, [
      "selectBranch",
      "applySatSlotForAllDays",
      "fetchBranches",
    ]),
  },
  created() {
    this.selectBranch(this.branchId);
    this.tables = this.branchData.activeTables;
    this.reservation_duration = this.branchData.reservation_duration;
  },
};
</script>
