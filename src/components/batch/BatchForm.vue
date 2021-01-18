<template>
  <div class="pb-4">
    <recipe-header classes="border p-4" :recipe="recipe" compact />
    <div class="flex flex-col sm:flex-row mt-2">
      <div class="w-full sm:w-1/2 m:float-left sm:pr-1">
        <section class="border p-4">
          <h4 class="label font-bold mb-3">Nicotine</h4>
          <div class="inline-input flex items-center">
            <label class="text-label text-xs">Use Nicotine</label>
            <span>
              <Toggle :on="batch.useNic" @toggled="toggleNic" />
            </span>
          </div>
          <div class="inline-input flex items-center">
            <label for="nic-strength" class="text-label text-xs"
              >Strength (mg/ml)</label
            >
            <input
              id="nic-strength"
              type="text"
              class="text-input"
              v-model.number="batch.nicStrength"
              :disabled="!batch.useNic"
            />
          </div>
          <div class="inline-input flex items-center">
            <label class="text-label text-xs">Base VG/PG %</label>
            <span class="flex vg-pg items-center">
              <input
                type="text"
                class="text-input"
                v-model="nicVg"
                aria-label="nic vg %"
                :disabled="!batch.useNic"
              />
              <SvgIcon type="mdi" :path="slash" />
              <input
                type="text"
                class="text-input"
                v-model="nicPg"
                aria-label="nic vg %"
                :disabled="!batch.useNic"
              />
            </span>
          </div>
        </section>
      </div>
      <div class="w-full sm:w-1/2 m:float-left sm:pl-1 mt-2 sm:mt-0">
        <section class="border p-4">
          <h4 class="label font-bold mb-3">Finished Batch</h4>
          <div class="inline-input flex items-center">
            <label for="batch-strength" class="text-label text-xs"
              >Nic Strength</label
            >
            <input
              id="batch-strength"
              type="text"
              class="text-input"
              v-model.number="batch.batchStrength"
              :disabled="!batch.useNic"
            />
          </div>
          <div class="inline-input flex items-center">
            <label for="batch-size" class="text-label text-xs"
              >Batch Size</label
            >
            <input
              id="batch-size"
              type="text"
              class="text-input"
              v-model="batchSize"
            />
          </div>
          <div class="inline-input flex items-center flex-grow">
            <label id="nic-vg" class="text-label text-xs">Batch VG %</label>
            <span class="flex vg-pg items-center">
              <input
                type="text"
                class="text-input"
                v-model="batchVg"
                aria-label="batch vg %"
                :disabled="batch.maxVg"
              />
              <div class="flex items-center ml-4">
                <label class="text-label text-xs">Max</label>
                <span class="flex vg-pg items-center">
                  <Toggle :on="batch.maxVg" @toggled="toggleMaxVg" />
                </span>
              </div>
            </span>
          </div>
        </section>
      </div>
    </div>
    <Mix :batch="batch" @set-flavor-vg="setFlavorVg" editing />
    <div v-if="loggedIn" class="flex justify-end mt-3">
      <button class="btn primary" @click="save">Save Batch</button>
    </div>
  </div>
</template>

<script>
import RecipeHeader from "../recipe/RecipeHeader";
import Toggle from "@/components/common/controls/Toggle";
import { truncateTo } from "../../util/helpers";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSlashForward } from "@mdi/js";
import Mix from "./Mix.vue";
import { fetchRecipe } from "@/util/recipe";
import { saveBatch } from "@/util/batch";

export default {
  name: "BatchForm",
  components: {
    RecipeHeader,
    Toggle,
    SvgIcon,
    Mix
  },
  data() {
    return {
      batch: {
        nicVgM: 0,
        nicStrength: 48,
        batchVgM: 70000,
        batchStrength: 6,
        batchSizeM: 30000,
        useNic: true,
        maxVg: false,
        flavors: []
      },
      recipe: {},
      saved: null
    };
  },
  props: {
    recipeId: {
      type: Number,
      required: true
    }
  },
  computed: {
    slash: () => mdiSlashForward,
    loggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
    nicVg: {
      get() {
        if (!this.batch.useNic) return "";
        if (isNaN(this.batch.nicVgM)) return "";
        const dis = (this.batch.nicVgM / 1000).toFixed(2);
        return parseFloat(dis).toString();
      },
      set(val) {
        if (isNaN(val) || val.endsWith(".")) return;
        let vg = truncateTo(val, 2);
        const vgF = parseFloat(vg);
        if (vgF > 100) vg = "100";
        else if (vgF < 0) vg = "0";
        this.batch.nicVgM = parseInt(parseFloat(vg) * 1000);
        this.$forceUpdate();
      }
    },
    nicPg: {
      get() {
        if (!this.batch.useNic) return "";
        if (isNaN(this.batch.nicVgM)) return "";
        const vg = this.batch.nicVgM / 1000;
        return parseFloat((100 - vg).toFixed(2)).toString();
      },
      set(val) {
        if (isNaN(val) || val.endsWith(".")) return;
        let pg = truncateTo(val, 2);
        const pgF = parseFloat(pg);
        if (pgF > 100) pg = "100";
        else if (pgF < 0) pg = "0";
        this.batch.nicVgM = parseInt(100000 - parseFloat(pg) * 1000);
        this.$forceUpdate();
      }
    },
    batchSize: {
      get() {
        if (isNaN(this.batch.batchSizeM)) return "";
        return parseFloat(
          parseFloat(this.batch.batchSizeM / 1000).toFixed(2)
        ).toString();
      },
      set(val) {
        if (isNaN(val) || val.endsWith(".")) return;
        this.batch.batchSizeM = parseInt(parseFloat(truncateTo(val, 2)) * 1000);
        this.$forceUpdate();
      }
    },
    batchVg: {
      get() {
        if (this.batch.maxVg) return "";
        if (isNaN(this.batch.batchVgM)) return "";
        const dis = (this.batch.batchVgM / 1000).toFixed(2);
        return parseFloat(dis).toString();
      },
      set(val) {
        if (isNaN(val) || val.endsWith(".")) return;
        let vg = truncateTo(val, 2);
        const vgF = parseFloat(vg);
        if (vgF > 100) vg = "100";
        else if (vgF < 0) vg = "0";
        this.batch.batchVgM = parseInt(parseFloat(vg) * 1000);
        this.$forceUpdate();
      }
    },
    batchPg: {
      get() {
        if (isNaN(this.batch.batchVgM)) return "";
        const vg = this.batch.batchVgM / 1000;
        return parseFloat((100 - vg).toFixed(2)).toString();
      },
      set(val) {
        if (isNaN(val) || val.endsWith(".")) return;
        let pg = truncateTo(val, 2);
        const pgF = parseFloat(pg);
        if (pgF > 100) pg = "100";
        else if (pgF < 0) pg = "0";
        this.batch.batchVgM = parseInt(100000 - parseFloat(pg) * 1000);
        this.$forceUpdate();
      }
    }
  },
  methods: {
    toggleNic(e) {
      this.batch.useNic = e.value;
      if (!e.value) {
        this.saved = { ...this.batch };
        this.batch.nicStrength = null;
        this.batch.nicVgM = null;
        this.batch.batchStrength = null;
      } else {
        this.batch.nicStrength = this.saved.nicStrength;
        this.batch.nicVgM = this.saved.nicVgM;
        this.batch.batchStrength = this.saved.batchStrength;
        this.saved = null;
      }
    },
    toggleMaxVg(e) {
      this.batch.maxVg = e.value;
    },
    setFlavorVg({ idx, value }) {
      this.batch.flavors[idx].vg = value;
    },
    async save() {
      const { batch } = await saveBatch(this.batch);
      this.$router.push(`/batch/view/${batch.id}`);
    }
  },
  async mounted() {
    this.recipe = await fetchRecipe(this.recipeId);
    this.batch.flavors = this.recipe.flavors.map(f => ({
      flavorId: f.flavorId,
      percentM: f.percentM,
      vg: false
    }));
    this.batch.recipeId = this.recipeId;
  }
};
</script>

<style scoped>
/* .inline-input:not(:last-child) {
  margin-bottom: 0.5rem;
} */
.inline-input {
  height: 36px;
}
.inline-input > *:first-child {
  flex: 0 0 40%;
  max-width: 40%;
}
.inline-input > * {
  flex: 1 0 55%;
  max-width: 55%;
}
.vg-pg > input {
  max-width: 30%;
}
</style>
