<template>
  <div class="border p-4 mt-2" :class="{ 'has-error': !!err }">
    <div v-if="!!err" class="text-center text-sm">{{ err }}</div>
    <table v-if="!err" class="w-full">
      <thead>
        <th class="table-header w-2/3">Ingredient</th>
        <th
          class="table-header lowercase cursor-pointer w-1/12"
          :class="{ 'font-bold': hideMl }"
          @click="toggleG"
        >
          g
        </th>
        <th
          class="table-header lowercase cursor-pointer w-1/12"
          :class="{ 'font-bold': hideG }"
          @click="toggleMl"
        >
          ml
        </th>
        <th class="table-header w-1/12">%</th>
        <th class="table-header w-1/12">VG</th>
      </thead>
      <tbody>
        <tr
          v-for="(f, idx) of mix.flavors"
          :key="f.flavorId"
          :class="{ 'border-b border-inverse': idx === mix.flavors.length - 1 }"
        >
          <td class="table-cell">
            <router-link :to="`/flavors/${f.flavorId}`" class="hover-link">
              {{ flavorName(f.flavorId) }}
            </router-link>
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideG, 'font-bold': hideMl }"
          >
            {{ f.grams }}
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideMl, 'font-bold': hideG }"
          >
            {{ f.ml }}
          </td>
          <td class="table-cell">{{ f.percent }}</td>
          <td class="px-3 align-middle">
            <Toggle
              :read-only="!editing"
              :size="20"
              :on="f.vg"
              @toggled="toggleFlavorVg(idx, $event)"
            />
          </td>
        </tr>
        <tr v-if="batch.useNic">
          <td class="table-cell">
            Nicotine
            <span class="text-soft"
              >({{ batch.nicStrength }} mg/ml, {{ batch.nicVgM / 1000 }}/{{
                100 - batch.nicVgM / 1000
              }})</span
            >
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideG, 'font-bold': hideMl }"
          >
            {{ mix.nic.grams }}
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideMl, 'font-bold': hideG }"
          >
            {{ mix.nic.ml }}
          </td>
          <td class="table-cell">{{ mix.nic.percent }}</td>
          <td />
        </tr>
        <tr v-if="!batch.maxVg" class="border-b">
          <td class="table-cell">Propylene Glycol (PG)</td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideG, 'font-bold': hideMl }"
          >
            {{ mix.pg.grams }}
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideMl, 'font-bold': hideG }"
          >
            {{ mix.pg.ml }}
          </td>
          <td class="table-cell">{{ mix.pg.percent }}</td>
          <td />
        </tr>
        <tr class="border-b">
          <td class="table-cell">Vegetable Glycerin (VG)</td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideG, 'font-bold': hideMl }"
          >
            {{ mix.vg.grams }}
          </td>
          <td
            class="table-cell"
            :class="{ 'text-ghost': hideMl, 'font-bold': hideG }"
          >
            {{ mix.vg.ml }}
          </td>
          <td class="table-cell">{{ mix.vg.percent }}</td>
          <td />
        </tr>
      </tbody>
    </table>
    <div v-if="!err" class="mt-3 text-soft text-xs">
      <BatchSummary
        :flavors="mix.flavors"
        :totalVg="mix.totalVg"
        :totalPg="mix.totalPg"
        :nicStrength="batch.batchStrength"
      />
    </div>
  </div>
</template>

<script>
import BatchSummary from "./BatchSummary";
import Toggle from "@/components/common/controls/Toggle";
import { truncateTo } from "../../util/helpers";

export default {
  name: "Mix",
  emits: ["error"],
  components: { BatchSummary, Toggle },
  data() {
    return {
      mix: {
        nic: {},
        vg: {},
        pg: {},
        flavors: [],
        totalVg: 0,
        totalPg: 0,
      },
      totalVg: 0,
      totalPg: 0,
      hideG: false,
      hideMl: false,
      err: null,
    };
  },
  props: {
    batch: {
      type: Object,
      required: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    batch: {
      handler() {
        this.updateMix();
      },
      deep: true,
    },
  },
  methods: {
    flavorName(flavorId) {
      const f = this.$store.getters["flavors/byId"](flavorId);
      return `${f.vendor.abbreviation} ${f.name}`;
    },
    toggleG() {
      this.hideG = false;
      this.hideMl = !this.hideMl;
    },
    toggleMl() {
      this.hideMl = false;
      this.hideG = !this.hideG;
    },
    toggleFlavorVg(idx, val) {
      const value = val.value;
      this.$emit("set-flavor-vg", { idx, value });
    },
    updateMix() {
      this.err = null;
      this.mix.totalVg = 0;
      this.mix.totalPg = 0;
      if (this.batch.useNic) {
        this.err = this.updateNic();
        if (this.err) return;
      }
      this.err = this.updateFlavors();
      if (this.err) return;
      this.err = this.updateDiluents();
    },
    updateNic() {
      if (this.batch.nicStrength > 1000 || this.batch.nicStrength < 0) {
        return "Invalid nicotine strength";
      }
      const nicVg = this.batch.nicVgM / 1000;
      const ng = getNicGravity(this.batch.nicStrength, nicVg);
      const nicPercent = this.batch.batchStrength / this.batch.nicStrength;
      const nicAmount = parseInt(nicPercent * this.batch.batchSizeM);
      this.mix.totalVg = (nicVg / 100) * nicAmount;
      this.mix.totalPg = ((100 - nicVg) / 100) * nicAmount;
      this.mix.nic = {
        ml: (nicAmount / 1000).toFixed(2),
        grams: ((nicAmount * ng) / 1000).toFixed(2),
        percent: ((nicAmount / this.batch.batchSizeM) * 100).toFixed(2),
      };
    },
    updateFlavors() {
      this.mix.flavors = [];
      this.batch.flavors.forEach((bf) => {
        const r = bf.percentM / 1000 / 100;
        const a = r * this.batch.batchSizeM;
        const g = bf.vg ? a * vgDensity : a * pgDensity;
        if (bf.vg) this.mix.totalVg += a;
        else this.mix.totalPg += a;
        this.mix.flavors.push({
          flavorId: bf.flavorId,
          vg: bf.vg,
          ml: (a / 1000).toFixed(2),
          grams: (g / 1000).toFixed(2),
          percent: (r * 100).toFixed(2),
        });
      });
    },
    updateDiluents() {
      let requiredVg;
      if (this.batch.maxVg) {
        requiredVg =
          this.batch.batchSizeM - this.mix.totalVg - this.mix.totalPg;
      } else {
        const vgPercent = this.batch.batchVgM / 1000 / 100;
        const targetVg = vgPercent * this.batch.batchSizeM;
        requiredVg = targetVg - this.mix.totalVg;
      }
      if (requiredVg < 0) {
        return "Cannot mix this VG/PG ratio";
      }
      this.mix.totalVg += requiredVg;
      const vgMl = requiredVg / 1000;
      this.mix.vg = {
        ml: vgMl.toFixed(2),
        grams: (vgMl * vgDensity).toFixed(2),
        percent: ((requiredVg * 100) / this.batch.batchSizeM).toFixed(2),
      };

      if (this.batch.maxVg) return;

      const requiredPg =
        this.batch.batchSizeM - this.mix.totalVg - this.mix.totalPg;
      if (requiredPg < 0) {
        const maxVg = this.mix.totalVg + requiredPg;
        const maxVgRatio = truncateTo((maxVg / this.batch.batchSizeM) * 100, 1);
        return `Cannot mix this VG/PG ratio. Max VG is ${maxVgRatio}`;
      }
      this.mix.totalPg += requiredPg;
      const pgMl = requiredPg / 1000;
      this.mix.pg = {
        ml: pgMl.toFixed(2),
        grams: (pgMl * pgDensity).toFixed(2),
        percent: ((requiredPg * 100) / this.batch.batchSizeM).toFixed(2),
      };
    },
  },
  mounted() {
    this.updateMix();
  },
};

const vgDensity = 1.261;
const pgDensity = 1.0363;
const nicDensity = 1.01;
const getNicGravity = (baseStrength, baseVg) => {
  const basePercent = baseStrength / 10;
  const restPercent = (100 - basePercent) / 100;
  const vgPercent = restPercent * (baseVg / 100);
  const pgPercent = restPercent * ((100 - baseVg) / 100);
  return (
    (basePercent / 100) * nicDensity +
    vgPercent * vgDensity +
    pgPercent * pgDensity
  );
};
</script>

<style scoped>
table tr:nth-child(odd) {
  background: var(--color-bg-body-accent);
}
.first-base-row {
  border-top-width: 1px;
  border-top-color: var(--color-border-inverse);
}
</style>
