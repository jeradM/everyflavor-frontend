<template>
  <div class="relative w-full">
    <input
      type="text"
      class="text-input w-full"
      :class="classes"
      :aria-label="label"
      :value="value"
      @input.stop="search"
      @keydown.down="handleDown"
      @keydown.up="handleUp"
      @keydown.enter="handleEnter"
      @keydown.tab="handleTab"
      @keydown.esc="(isOpen = false), (selectedIdx = 0)"
    />
    <div v-show="isOpen" class="absolute shadow-md w-full p-2 z-40 bg-body">
      <ul
        class="list-none cursor-pointer overflow-y-auto"
        ref="optionsContainer"
      >
        <li
          v-if="results.length === 0"
          class="text-sm mb-1 py-1 px-2 rounded-sm cursor-default"
        >
          No Results
        </li>
        <li
          v-for="(r, i) of results"
          :key="resultsValueFn(r)"
          @click="setSelected(r)"
          @mouseover="setSelectedIdx(i)"
          class="text-sm py-1 px-2 rounded-sm autocomplete-item"
          :class="{
            'bg-secondary': selectedIdx === i,
            'text-secondary': selectedIdx === i
          }"
        >
          {{ resultsValueFn(r) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  name: "AutoComplete",
  props: {
    value: String,
    label: {
      type: String,
      default: "autocomplete input"
    },
    searchFn: {
      type: Function,
      required: true
    },
    resultsValueFn: {
      type: Function,
      default: v => v
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    tabSelect: {
      type: Boolean,
      default: true
    },
    classes: String
  },
  data() {
    return {
      isOpen: false,
      selectedIdx: 0,
      results: []
    };
  },
  methods: {
    setSelectedIdx(idx) {
      this.selectedIdx = idx;
      this.ensureVisible();
    },
    handleUp() {
      if (this.selectedIdx <= 0) return;
      this.setSelectedIdx(this.selectedIdx - 1);
    },
    handleDown() {
      if (!this.isOpen) {
        this.isOpen = true;
        return;
      }
      if (this.selectedIdx >= this.results.length - 1) return;
      this.setSelectedIdx(this.selectedIdx + 1);
    },
    ensureVisible() {
      const item = this.$el.querySelector(
        `.autocomplete-item:nth-child(${this.selectedIdx + 1})`
      );
      const itemTop = item.clientHeight * this.selectedIdx;
      const itemBottom = itemTop + item.clientHeight;

      const container = this.$refs.optionsContainer;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (itemBottom > containerBottom) {
        container.scrollTop += itemBottom - containerBottom;
      } else if (itemTop < containerTop) {
        container.scrollTop -= containerTop - itemTop;
      }
    },
    handleEnter() {
      if (!this.isOpen) return;
      if (this.selectedIdx < 0) return;
      const s = this.results[this.selectedIdx];
      if (!s) return;
      this.setSelected(s);
    },
    handleTab() {
      if (!this.tabSelect) return;
      this.handleEnter();
    },
    search: debounce(function(e) {
      const t = this;
      this.selectedIdx = 0;
      this.searchFn(e.target.value, r => {
        t.results = r;
        t.isOpen = true;
      });
      this.$emit("input", e.target.value);
    }, 200),
    setSelected(v) {
      this.$emit("selected", v);
      this.isOpen = false;
      this.results = [];
      this.selectedIdx = 0;
    },
    handleBlur(e) {
      if (this.$el.contains(e.target)) return;
      this.isOpen = false;
      this.results = [];
    }
  },
  mounted() {
    document.addEventListener("click", this.handleBlur);
  },
  unmounted() {
    document.removeEventListener("click", this.handleBlur);
  }
};
</script>

<style scoped>
ul {
  max-height: 10rem;
}
</style>
