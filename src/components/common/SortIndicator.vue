<template>
  <span :class="classes">
    <svg-icon type="mdi" :path="icon" :size="size || 24" />
  </span>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
export default {
  name: "SortIndicator",
  components: { SvgIcon },
  props: {
    active: Boolean,
    desc: Boolean,
    classes: String,
    size: Number,
  },
  computed: {
    icon() {
      return !this.active ? "" : this.desc ? mdiChevronDown : mdiChevronUp;
    },
  },
};
</script>

<style scoped></style>
