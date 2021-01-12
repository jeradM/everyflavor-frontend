<template>
  <span>
    <span v-if="!compact" class="logo select-none" :class="classes">
      <span class="logoE bg-primary rounded text-primary py-1 px-2 font-bold"
        >E</span
      >
      very Flavor
    </span>
    <span
      v-if="compact"
      class="logoE bg-primary rounded text-primary py-1 px-2 font-bold"
      :class="classes"
      >E</span
    >
  </span>
</template>

<script>
export default {
  name: "Logo",
  props: {
    classes: {
      type: [Array, String, Object],
      default: () => [],
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
