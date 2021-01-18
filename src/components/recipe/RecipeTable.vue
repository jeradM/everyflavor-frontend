<template>
  <table :class="classes">
    <tr>
      <th class="table-header">Vendor</th>
      <th class="table-header">Flavor</th>
      <th class="table-header">%</th>
    </tr>
    <tbody>
      <tr
        v-for="(rf, i) of flavors"
        :key="rf.flavorId"
        :class="{ 'bg-default-gray': striped && i % 2 === 0 }"
      >
        <td class="table-cell">{{ vendor(rf) }}</td>
        <td class="table-cell">{{ flavor(rf) }}</td>
        <td class="table-cell">{{ rf.percent / 1000 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "RecipeTable",
  methods: {
    vendor(rf) {
      const f = this.$store.getters["flavors/byId"](rf.flavorId);
      return f.vendor && f.vendor.abbreviation;
    },
    flavor(rf) {
      const f = this.$store.getters["flavors/byId"](rf.flavorId);
      return f.name;
    }
  },
  props: {
    flavors: {
      type: Array,
      required: true
    },
    striped: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
