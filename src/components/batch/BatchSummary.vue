<template>
  <div class="flex items-center justify-between sm:justify-end">
    <span class="mr-4">Amount: {{ batchSize }}ml</span>
    <span class="mr-4">VG/PG: {{ baseRatio }}</span>
    <span class="mr-4">Flavor: {{ flavorTotal }}%</span>
    <span>Strength: {{ nicStrength || 0 }} mg/ml</span>
  </div>
</template>

<script>
import sumBy from "lodash/sumBy";
export default {
  name: "BatchSummary",
  props: {
    flavors: {
      type: Array,
      required: true,
    },
    totalVg: {
      type: Number,
      required: true,
    },
    totalPg: {
      type: Number,
      required: true,
    },
    nicStrength: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    batchSize() {
      return (this.totalVg + this.totalPg) / 1000;
    },
    baseRatio() {
      const total = this.totalVg + this.totalPg;
      const vg = parseFloat(((this.totalVg / total) * 100).toFixed(1));
      const pg = 100 - vg;
      return `${parseFloat(vg.toFixed(2))}/${parseFloat(pg.toFixed(2))}`;
    },
    flavorTotal() {
      return parseFloat(
        sumBy(this.flavors, (f) => parseFloat(f.percent)).toFixed(2)
      );
    },
  },
};
</script>

<style></style>
