<template>
  <div class="flex flex-col p-4">
    <section
      :class="{ 'has-error': getError('title') }"
      class="flex flex-col mb-2 relative"
    >
      <label for="recipe-name" class="label">Name</label>
      <input
        type="text"
        id="recipe-name"
        class="text-input"
        v-model="recipe.title"
        @input="clearError('title')"
        :title="getError('title')"
      />
    </section>
    <section
      class="flex flex-col my-4 relative"
      :class="{ 'has-error': getError('description') }"
    >
      <label for="recipe-description" class="label">Description</label>
      <textarea
        id="recipe-description"
        rows="5"
        v-model="recipe.description"
        class="text-input"
        @input="clearError('description')"
        :title="getError('description')"
      />
    </section>
    <section>
      <h2 class="label">Tags</h2>
      <Chips
        label="tags"
        :search-fn="searchTags"
        :values="recipe.tags"
        :value-fn="v => v.tag"
        @add="addTag"
        @delete="deleteTag"
      />
    </section>
    <section class="mt-4">
      <h2 class="label">Collaborators</h2>
      <Chips
        label="collaborators"
        :search-fn="searchUsers"
        :values="recipe.collaborators"
        :value-fn="v => `@${v.username}`"
        @add="addCollab"
        @delete="deleteCollab"
      />
    </section>
    <section :class="{ 'has-error': getError('flavors') }" class="my-4">
      <div class="flex items-center">
        <h2 class="label">Flavors</h2>
        <button
          tabindex="-1"
          class="label select-none cursor-pointer"
          @click="addFlavor"
          aria-label="add flavor"
        >
          <svg-icon type="mdi" :path="mdiPlus" :size="16" />
        </button>
      </div>
      <RecipeFormFlavors
        :recipe-flavors="recipe.flavors"
        @flavor-changed="flavorChanged"
        @percent-changed="percentChanged"
        @delete-flavor="deleteFlavor"
        :errors="getFlavorErrors()"
      />
    </section>
    <section class="my-4">
      <h2 class="label mb-4">Options</h2>
      <div class="flex flex-col sm:flex-row text-sm">
        <div class="flex ml-4 sm:ml-2 mr-4 items-center mb-2 sm:mb-0">
          <span class="mr-3 w-40 sm:w-auto">Work in Progress</span>
          <Toggle
            :size="35"
            label="work in progress"
            :on="recipe.wip"
            @toggled="v => setBoolField('wip', v)"
          />
        </div>
        <div class="flex mx-4 items-center mb-2 sm:mb-0">
          <span class="mr-3 w-40 sm:w-auto">Public</span>
          <Toggle
            :size="35"
            label="public"
            :on="recipe.public"
            @toggled="v => setBoolField('public', v)"
          />
        </div>
        <div class="flex mx-4 items-center mb-2 sm:mb-0">
          <span class="mr-3 w-40 sm:w-auto">Shake and Vape</span>
          <Toggle
            :size="35"
            label="shake and vape"
            :on="recipe.snv"
            @toggled="v => setBoolField('snv', v)"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row text-sm sm:mt-4">
        <div
          :class="{ 'has-error': getError('steepDays') }"
          class="flex ml-4 sm:ml-2 mr-4 items-center mb-2 md:mb-0"
        >
          <label for="steep-days" class="mr-3 w-40 md:w-auto">Steep Days</label>
          <input
            id="steep-days"
            type="text"
            class="text-input w-24"
            :value="recipe.steepDays"
            :title="getError('steepDays')"
            @input="e => setIntField('steepDays', { value: e.target.value })"
          />
        </div>
        <div
          :class="{ 'has-error': getError('vgPercent') }"
          class="flex ml-4 sm:ml-2 mr-4 items-center mb-2 md:mb-0"
        >
          <label for="vg-percent" class="mr-3 w-40 md:w-auto">Best VG %</label>
          <input
            id="vg-percent"
            type="text"
            class="text-input w-24"
            :value="recipe.vgPercentM"
            :title="getError('vgPercentM')"
            @input="e => setIntField('vgPercentM', { value: e.target.value })"
          />
        </div>
        <div
          :class="{ 'has-error': getError('temp') }"
          class="flex ml-4 sm:ml-2 mr-4 items-center mb-2 md:mb-0"
        >
          <label for="temp" class="mr-3 w-40 md:w-auto">Best Temp</label>
          <input
            id="temp"
            type="text"
            class="text-input w-24"
            :value="recipe.temp"
            :title="getError('temp')"
            @input="e => setIntField('temp', { value: e.target.value })"
          />
        </div>
      </div>
    </section>
    <div class="w-full text-right">
      <button class="btn bg-primary text-primary" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus, mdiLoading } from "@mdi/js";

import Chips from "@/components/common/controls/Chips";
import RecipeFormFlavors from "./RecipeFormFlavors";
import Toggle from "@/components/common/controls/Toggle";
import notifications from "@/notifications";
import { arraysMatch } from "@/util/helpers";
import { fetchRecipe, saveRecipe } from "@/util/recipe";
import { searchUsers } from "@/util/user";
import { canEditRecipe } from "@/util/auth";

export default {
  name: "RecipeForm",
  components: { Chips, Toggle, RecipeFormFlavors, SvgIcon },
  props: {
    recipeId: Number,
    onSave: Function,
    remix: Boolean,
    newVersion: Boolean
  },
  data() {
    return {
      recipe: { flavors: [], tags: [] },
      errors: [],
      tags: [],
      loading: true
    };
  },
  computed: {
    flavorsLoaded() {
      return this.$store.state.flavors.loaded;
    },
    mdiPlus: () => mdiPlus,
    mdiLoading: () => mdiLoading
  },
  methods: {
    async save() {
      const { recipe, errors } = await saveRecipe(this.recipe);
      this.errors = errors;
      if (!errors && recipe) {
        notifications.success("Recipe Saved");
        this.recipe = { ...recipe };
      }
      this.$router.push(`/recipe/view/${recipe.id}`);
    },
    getRecipeFlavor(idx) {
      return this.recipe.flavors[idx] || {};
    },
    addFlavor() {
      this.$set(this.recipe.flavors, this.recipe.flavors.length, {});
      this.clearError("flavors");
    },
    flavorChanged({ flavorId, idx }) {
      const rf = this.getRecipeFlavor(idx);
      rf.flavorId = flavorId;
      if (!rf.percentM) {
        rf.percentM = this.$store.getters["flavors/byId"](
          rf.flavorId
        ).avgPercent;
      }
      this.$set(this.recipe.flavors, idx, Object.assign({}, rf));
      this.clearError(["flavors", idx, "flavorId"]);
    },
    percentChanged({ idx, percent }) {
      const rf = this.getRecipeFlavor(idx);
      rf.percentM = isNaN(percent) ? percent : percent * 1000;
      this.$set(this.recipe.flavors, idx, Object.assign({}, rf));
      this.clearError(["flavors", idx, "percent"]);
    },
    deleteFlavor(idx) {
      this.recipe.flavors.splice(idx, 1);
    },
    setIntField(field, { value }) {
      const v = /^\d+$/.test(value) ? parseInt(value) : value;
      this.recipe[field] = v;
      this.clearError(field);
    },
    setBoolField(field, { value }) {
      this.recipe[field] = !!value;
      this.clearError(field);
    },
    getError(field) {
      const f = typeof field === "string" ? field.split(".") : field;
      const e = this.errors && this.errors.find(e => arraysMatch(e.path, f));
      if (e) return e.message;
      return null;
    },
    getFlavorErrors() {
      return this.errors.filter(e => e.path[0] === "flavors");
    },
    clearError(field) {
      const f = typeof field === "string" ? field.split(".") : field;
      this.errors = this.errors.filter(e => !arraysMatch(e.path, f));
    },
    searchTags(q, setResults) {
      const res = this.$store.getters["tags/search"](q);
      setResults && setResults.call && setResults(res);
    },
    addTag(t) {
      this.recipe.tags.push(t);
    },
    deleteTag(i) {
      this.recipe.tags.splice(i, 1);
    },
    async searchUsers(q, setResults) {
      const res = await searchUsers(q);
      setResults(res);
    },
    addCollab(c) {
      this.recipe.collaborators.push(c);
    },
    deleteCollab(i) {
      this.recipe.collaborators.splice(i, 1);
    }
  },
  async mounted() {
    if (this.recipeId) {
      const r = await fetchRecipe(this.recipeId);
      if (this.remix || this.newVersion) {
        this.recipe = {
          id: null,
          uuid: this.newVersion ? r.uuid : null,
          title: !this.newVersion ? r.title + " (Remix)" : r.title,
          description: this.newVersion ? r.description : "",
          collaborators: this.newVersion ? r.collaborators : [],
          tags: r.tags,
          flavors: r.flavors.map(({ flavorId, percentM }) => ({
            flavorId,
            percentM
          })),
          remixOfId: this.remix ? this.recipeId : r.remixOfId,
          public: r.public,
          snv: r.snv,
          wip: r.wip
        };
      } else {
        if (!canEditRecipe(r)) {
          this.$router.push("/recipes");
          return;
        }
        this.recipe = r;
      }
    } else {
      this.recipe = { flavors: [], tags: [], collaborators: [] };
    }
    this.loading = false;
  }
};
</script>

<style scoped></style>
