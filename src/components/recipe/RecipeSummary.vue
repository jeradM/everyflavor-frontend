<template>
  <div class="flex items-center justify-between sm:justify-end">
    <span class="mr-4">Total Flavor: {{ totalFlavor }}%</span>
    <span class="mr-4">Steep: {{ recipe.steepDays }} days</span>
    <span class="mr-4">Temp: {{ recipe.temp }}</span>
    <span class="mr-4" v-if="recipe.snv">Shake and Vape</span>
  </div>
</template>

<script>
import sumBy from "lodash/sumBy";
export default {
  name: "RecipeSummary",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalFlavor() {
      const t = sumBy(this.recipe.flavors, "percentM");
      return parseFloat((t / 1000).toFixed(2));
    }
  }
};
</script>

<style></style>
