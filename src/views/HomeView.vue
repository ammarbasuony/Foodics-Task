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
          >
            Disable Reservations
          </button>
        </div>
      </div>
    </div>

    <BranchesList />
  </div>
</template>

<script>
import BranchesList from "@/components/BranchesList.vue";

export default {
  name: "HomeView",
  components: {
    BranchesList,
  },
};
</script>
