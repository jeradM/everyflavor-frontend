<template>
  <header
    id="navbar"
    class="z-40 flex items-stretch fixed mt-0 top-0 shadow bg-nav text-nav w-full px-8 h-16 shadow"
  >
    <div class="flex items-stretch pr-4 flex-grow sm:flex-grow-0">
      <span class="flex items-center inline-block sm:hidden" @click="toggle">
        <svg-icon
          :path="menuIcon"
          type="mdi"
          class="cursor-pointer select-none"
        />
      </span>
      <router-link
        :to="{ path: '/' }"
        class="block flex items-center px-1 mr-3 ml-5 brand"
      >
        <Logo :compact="windowWidth < 640" classes="text-xl" />
      </router-link>
    </div>
    <div class="sm:items-stretch px-4 flex-grow hidden sm:flex">
      <router-link
        :to="{ path: '/recipes' }"
        class="nav-link block flex items-center px-1 mx-2 font-alt"
      >
        <span>Recipes</span>
      </router-link>
      <router-link
        :to="{ path: '/flavors' }"
        class="nav-link block flex items-center px-1 mx-2 font-alt"
      >
        <span>Flavors</span>
      </router-link>
    </div>
    <div class="flex items-center px4 flex-grow-0">
      <router-link to="/recipe/create" class="btn primary">
        New Recipe
      </router-link>
      <span
        class="pl-6 pr4 cursor-pointer"
        role="button"
        aria-haspopup="true"
        @click="accountClicked"
      >
        <svg-icon
          type="mdi"
          :path="personIcon"
          :class="{ 'text-icon-secondary': loggedIn }"
        />
      </span>
    </div>
  </header>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu, mdiAccount } from "@mdi/js";
import Logo from "@/components/common/Logo";

export default {
  name: "NavBar",
  components: { Logo, SvgIcon },
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  computed: {
    menuIcon: () => mdiMenu,
    personIcon: () => mdiAccount,
    loggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    accountClicked() {
      this.$emit("account-clicked");
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    closeAuth() {
      this.$emit("close-auth");
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped></style>
