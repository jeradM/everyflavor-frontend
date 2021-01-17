<template>
  <div :class="classes">
    <div class="flex" :class="{ 'my-1': spaced }">
      <span class="w-1/6 md:w-1/12 inline-block px-2 table-cell">
        {{ vendor }}
      </span>
      <span
        :class="{ 'has-error': flavorError }"
        class="flex-grow inline-block px-2"
      >
        <span class="text-xs" v-if="readOnly">
          <router-link
            :to="`/flavors/${recipeFlavor.flavorId}`"
            class="hover-link"
          >
            {{ flavorName }}
          </router-link>
        </span>
        <AutoComplete
          v-if="!readOnly"
          v-model="flavorName"
          placeholder="Flavor Name"
          :classes="'text-xs'"
          :search-fn="flavorSearchFn"
          :results-value-fn="f => f && `${f.vendor.abbreviation} ${f.name}`"
          @selected="flavorSelected"
        />
      </span>
      <span
        :class="{ 'has-error': percentError, 'text-right': readOnly }"
        class="w-1/6 md:w-1/12 inline-block px-2"
      >
        <span class="text-xs text-right" v-if="readOnly">{{ percent }}</span>
        <input
          v-if="!readOnly"
          type="text"
          aria-label="flavor percentage"
          :value="percent"
          placeholder="%"
          @change="percentChanged($event.target.value)"
          class="text-input text-xs min-w-0 text-right w-full"
        />
      </span>
      <span
        class="w-16 inline-block px-2 text-center flex items-center justify-end cursor-pointer text-gray-700"
      >
        <span class="mr-1" @click="deleteFlavor">
          <SvgIcon v-if="!readOnly" type="mdi" :path="deleteIcon" :size="16" />
        </span>
        <span class="ml-1">
          <SvgIcon
            type="mdi"
            :path="toggleIcon"
            :size="20"
            @click="isOpen = !isOpen"
          />
        </span>
      </span>
    </div>
    <div v-if="isOpen"></div>
  </div>
</template>

<script>
import AutoComplete from "@/components/common/controls/AutoComplete";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose, mdiChevronDown, mdiChevronUp } from "@mdi/js";

export default {
  name: "RecipeFormFlavor",
  components: { AutoComplete, SvgIcon },
  emits: ["flavor-changed", "percent-changed", "delete-flavor"],
  data() {
    return {
      isOpen: false,
      flavorName: ""
    };
  },
  props: {
    recipeFlavor: Object,
    spaced: Boolean,
    classes: [String, Object],
    errors: {
      type: Array,
      default: () => []
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.flavorName = this.flavor && this.flavor.name;
  },
  computed: {
    flavor() {
      if (!this.recipeFlavor || !this.recipeFlavor.flavorId) return null;
      return this.$store.getters["flavors/flavorsObj"][
        this.recipeFlavor.flavorId
      ];
    },
    vendor() {
      if (!this.recipeFlavor || !this.flavor) return "";
      return this.flavor.vendor.abbreviation;
    },
    percent() {
      if (!this.recipeFlavor) return 0;
      const p = this.recipeFlavor.percentM;
      if (isNaN(p)) {
        return p;
      }
      return parseFloat((p / 1000).toFixed(2));
    },
    deleteIcon() {
      return mdiClose;
    },
    toggleIcon() {
      return this.isOpen ? mdiChevronUp : mdiChevronDown;
    },
    percentError() {
      return this.errors.find(e => e.path[2] === "percent");
    },
    flavorError() {
      return this.errors.find(e => e.path[2] === "flavorId");
    }
  },
  methods: {
    flavorSearchFn(s, setResults) {
      const params = {
        query: s,
        limit: 25,
        offset: 0,
        sort: "",
        reverse: false
      };
      const res = this.$store.getters["flavors/search"](params);
      setResults(res);
    },
    percentChanged(p) {
      this.$emit("percent-changed", p);
    },
    flavorSelected(f) {
      this.$emit("flavor-changed", f);
      this.flavorName = f.name;
    },
    deleteFlavor() {
      this.$emit("delete-flavor");
    }
  }
};
</script>

<style scoped></style>
