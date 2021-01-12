<template>
  <div class="flex items-center select-none">
    <span @click="setOffset(0)" :class="buttonClasses(offset <= 0)"
      ><svg-icon type="mdi" :path="firstPage" :size="iconSize"
    /></span>
    <span @click="setOffset(offset - limit)" :class="buttonClasses(offset <= 0)"
      ><svg-icon type="mdi" :path="prevPage" :size="iconSize"
    /></span>
    <select
      @change="setPage"
      :value="currentPage()"
      class="default px-1"
      :disabled="disabled"
    >
      <template v-for="i in numPages()">
        <option :value="i" :key="i">{{ i }}</option>
      </template>
    </select>
    <span
      @click="setOffset(offset + limit)"
      :class="buttonClasses(offset >= total - limit)"
      ><svg-icon type="mdi" :path="nextPage" :size="iconSize"
    /></span>
    <span
      @click="setOffset(limit * (numPages() - 1))"
      :class="buttonClasses(offset >= total - limit)"
      ><svg-icon type="mdi" :path="lastPage" :size="iconSize"
    /></span>
  </div>
</template>

<script>
import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight
} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
export default {
  name: "Pagination",
  components: { SvgIcon },
  data() {
    return {
      iconSize: 28,
      firstPage: mdiChevronDoubleLeft,
      prevPage: mdiChevronLeft,
      nextPage: mdiChevronRight,
      lastPage: mdiChevronDoubleRight
    };
  },
  props: {
    limit: Number,
    offset: Number,
    total: Number,
    disabled: Boolean
  },
  methods: {
    setLimit(l) {
      if (this.disabled) return;
      return this.$emit("limit", l);
    },
    setOffset(o) {
      if (this.disabled) return;
      let _o = o;
      if (o < 0) _o = 0;
      if (o >= this.total) _o = this.offset;
      return this.$emit("offset", _o);
    },
    setPage(e) {
      if (this.disabled) return;
      const p = parseInt(e.target.value);
      return this.setOffset((p - 1) * this.limit);
    },
    numPages() {
      return Math.ceil(this.total / this.limit);
    },
    currentPage() {
      return Math.ceil(this.offset / this.limit + 1);
    },
    buttonClasses(check) {
      return {
        "text-body": !check && !this.disabled,
        "text-gray-600": check || this.disabled,
        "cursor-pointer": !check && !this.disabled
      };
    }
  }
};
</script>

<style scoped></style>
