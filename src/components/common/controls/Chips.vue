<template>
  <div class="border flex flex-wrap items-center">
    <div class="flex flex-shrink flex-wrap">
      <span
        v-for="(chip, i) of values"
        :key="i"
        class="bg-secondary text-secondary ml-1 my-1 text-xs flex items-stretch rounded-lg leading-none"
      >
        <span
          class="px-2 py-1"
          :aria-label="'chip with value ' + valueFn(chip)"
          >{{ valueFn(chip) }}</span
        >
        <span
          @click="deleteChip(i)"
          class="px-2 py-1 cursor-pointer"
          role="button"
          aria-label="delete"
          >x</span
        >
      </span>
    </div>
    <div class="flex-grow">
      <AutoComplete
        v-model="val"
        :label="label"
        :search-fn="search"
        :results-value-fn="valueFn"
        @selected="addChip"
        @keydown.delete="deleteLast"
        classes="border-none focus:outline-none"
      />
    </div>
  </div>
</template>

<script>
import AutoComplete from "@/components/common/controls/AutoComplete";

export default {
  name: "Chips",
  components: { AutoComplete },
  data() {
    return {
      val: "",
    };
  },
  props: {
    label: {
      type: String,
      default: "Chips Input",
    },
    values: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: null,
    },
    searchFn: {
      type: Function,
    },
    valueFn: {
      type: Function,
      default: (v) => v,
    },
  },
  methods: {
    search(q, callback) {
      if (q === null || q === "") callback([]);
      if (this.searchFn) this.searchFn(q, callback);
      else callback(this.items.filter((i) => i.toLowerCase().startsWith(q)));
    },
    addChip(v) {
      this.$emit("add", v);
      this.val = "";
    },
    deleteChip(i) {
      this.$emit("delete", i);
    },
    deleteLast() {
      if (this.val !== "") return;
      this.$emit("delete", this.values.length - 1);
    },
  },
};
</script>

<style scoped></style>
