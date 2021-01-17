<template>
  <div :class="getClasses('wrapper')">
    <input
      :value="value"
      class="text-input"
      :class="getClasses('input')"
      type="text"
      @keyup="changed"
      @keyup.enter="clicked"
      :placeholder="placeholder"
    />
    <span
      v-if="button"
      class="absolute inset-y-0 right-0 flex items-center pr-2"
    >
      <button :class="getClasses('button')" @click="clicked">
        <svg-icon type="mdi" :path="iconPath" :class="getClasses('icon')" />
      </button>
    </span>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import debounce from "lodash/debounce";

export default {
  name: "Search",
  components: { SvgIcon },
  data() {
    return {
      searchString: ""
    };
  },
  props: {
    value: String,
    classes: Object,
    placeholder: String,
    iconPath: String,
    button: Boolean
  },
  methods: {
    changed: debounce(function(e) {
      this.$emit("changed", e.target.value);
      this.$emit("input", e.target.value);
    }, 100),
    clicked() {
      this.$emit("search", this.searchString);
    },
    getClasses(el) {
      if (!["wrapper", "input", "button", "icon"].includes(el)) return {};
      let classes = {};
      if (el === "wrapper") {
        classes = {
          flex: true,
          relative: true
        };
      } else if (el === "input") {
        classes = {
          "flex-grow": true,
          "focus:outline-none": true,
          "py-2": true,
          "px-4": true,
          "pr-10": this.button
        };
      } else if (el === "button") {
        classes = {
          "p-1": true,
          "focus:outline-none": true
        };
      }
      if (this.classes && this.classes[el]) {
        if (Array.isArray(this.classes[el]))
          this.classes[el].forEach(c => (classes[c] = true));
        else Object.assign(classes, this.classes[el]);
      }
      return classes;
    }
  }
};
</script>

<style scoped></style>
