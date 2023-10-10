<template>
  <div
    class="w-full bg-white border-[#d5dae6] p-2 rounded-md border flex items-center justify-between"
  >
    <div
      v-if="!branchStore.selectedBranch.reservation_times[day]"
      class="text-sm"
    >
      Add Available Reservation Times
    </div>
    <div v-else class="flex gap-2">
      <div
        class="border border-primary rounded-md relative group"
        v-for="(slot, index) in branchStore.selectedBranch.reservation_times[
          day
        ]"
        :key="slot.id"
      >
        <X
          class="w-4 h-4 text-gray-100 cursor-pointer bg-gray-900 rounded-xl absolute right-[-8px] top-[-8px] z-40 hidden group-hover:block"
          @click="branchStore.removeTimeSlot(index, day)"
        />
        <vue-timepicker
          class="[&>input]:!border-0 !w-[62px] [&>input]:!w-full [&>input]:!outline-0 [&>input]:bg-[unset] [&>input]:!text-sm"
          v-model="slot[0]"
        />
        -
        <vue-timepicker
          class="[&>input]:!border-0 !w-[62px] [&>input]:!w-full [&>input]:!outline-0 [&>input]:bg-[unset] [&>input]:!text-sm"
          v-model="slot[1]"
        />
      </div>
    </div>
    <div
      class="border border-gray-300 right-0 p-2 rounded-md cursor-pointer"
      @click="branchStore.addTimeSlot(day)"
    >
      <Plus class="w-4 h-4 text-gray-400" />
    </div>
  </div>
</template>
<script>
import { mapStores, mapActions } from "pinia";

// Icons
import { Plus, X } from "lucide-vue";

// Stores
import { useBranchStore } from "@/store/useBranchStore";

export default {
  name: "TimePickerView",
  components: {
    Plus,
    X,
  },
  props: ["day"],
  computed: {
    ...mapStores(useBranchStore),
  },
  methods: {
    ...mapActions(useBranchStore, ["updateTimeSlot"]),
  },
};
</script>
