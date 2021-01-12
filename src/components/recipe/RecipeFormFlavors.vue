<template>
  <fragment>
    <div
      class="w-full text-center px-4 py-3 text-sm"
      v-if="recipeFlavors.length === 0 || !flavorsLoaded"
    >
      <span :class="errors.length !== 0 && 'red'">No Flavors</span>
    </div>
    <div
      class="w-full flex flex-col items-stretch"
      v-if="recipeFlavors.length > 0 && flavorsLoaded"
    >
      <div class="w-full flex">
        <span class="table-header px-1 w-1/6 md:w-1/12 inline-block text-left"
          >Vendor</span
        >
        <span class="table-header px-3 flex-grow inline-block text-left"
          >Flavor</span
        >
        <span class="table-header px-3 w-1/6 md:w-1/12 inline-block text-right"
          >%</span
        >
        <span class="w-16 table-header pr-2 inline-block text-right"></span>
      </div>
      <template v-for="(rf, idx) of recipeFlavors">
        <RecipeFormFlavor
          spaced
          :key="rf.id"
          :classes="{ 'bg-body-accent': striped && idx % 2 === 0 }"
          :errors="errors.filter(e => parseInt(e.path[1]) === idx)"
          :recipe-flavor="rf"
          :read-only="readOnly"
          @flavor-changed="f => flavorChanged(f, idx)"
          @percent-changed="p => percentChanged(p, idx)"
          @delete-flavor="deleteFlavor(idx)"
        />
      </template>
    </div>
  </fragment>
</template>
<script>
import RecipeFormFlavor from "./RecipeFormFlavor";
export default {
  name: "RecipeFormFlavors",
  emits: ["flavor-changed", "percent-changed", "delete-flavor"],
  components: { RecipeFormFlavor },
  props: {
    recipeFlavors: {
      type: Array,
      default: () => []
    },
    readOnly: Boolean,
    striped: Boolean,
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    flavorsLoaded() {
      return this.$store.state.flavors.loaded;
    }
  },
  methods: {
    flavorChanged(flavor, idx) {
      this.$emit("flavor-changed", { flavorId: flavor.id, idx });
    },
    percentChanged(percent, idx) {
      this.$emit("percent-changed", { percent, idx });
    },
    deleteFlavor(idx) {
      this.$emit("delete-flavor", idx);
    }
  }
};
</script>

<style scoped></style>
