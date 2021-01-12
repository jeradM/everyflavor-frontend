<template>
  <main>
    <NavBar
      :drawerOpen="drawerOpen"
      @toggle="toggleDrawer"
      @account-clicked="toggleAccount"
      @keydown.esc="closeAll"
      @close-auth="toggleAccount(false)"
    />

    <AuthPopup
      :open="accountOpen"
      @logged-in="toggleAccount(false)"
      @keydown.esc="toggleAccount(false)"
      @close-auth="toggleAccount(false)"
    />
    <NavDrawer :open="drawerOpen" @toggle="toggleDrawer" />
    <div class="content container mx-auto mt-16">
      <router-view :key="$route.fullPath" />
    </div>
  </main>
</template>

<script>
import AuthPopup from "@/components/nav/AuthPopup";
import NavBar from "@/components/nav/NavBar";
import NavDrawer from "@/components/nav/NavDrawer";
import eventBus from "@/event-bus";

import "toastify-js/src/toastify.css";

export default {
  name: "App",
  components: { AuthPopup, NavDrawer, NavBar },
  data() {
    return {
      accountOpen: false,
      drawerOpen: false,
      theme: "light"
    };
  },
  computed: {},
  methods: {
    toggleTheme() {
      const oldTheme = this.theme;
      const newTheme = this.theme === "light" ? "dark" : "light";
      this.theme = newTheme;
      const body = document.querySelector("body");
      body.classList.add(`theme-${newTheme}`);
      body.classList.remove(`theme-${oldTheme}`);
    },
    toggleDrawer(open) {
      if (open == null) this.drawerOpen = !this.drawerOpen;
      else this.drawerOpen = !!open;
    },
    toggleAccount(open) {
      if (open == null) this.accountOpen = !this.accountOpen;
      else this.accountOpen = !!open;
    },
    closeAll() {
      this.toggleDrawer(false);
      this.toggleAccount(false);
    }
  },
  mounted() {
    this.$store.dispatch("tags/fetchTags");
    this.$store.dispatch("user/fetchUser");
    this.$store.dispatch("flavors/fetchFlavors");

    const _t = this;
    eventBus.on("flavors:loaded", () =>
      _t.$store.dispatch("flavors/indexFlavors")
    );
    eventBus.on("showLogin", () => (_t.accountOpen = true));
    eventBus.on("hideLogin", () => (_t.accountOpen = false));
  }
};
</script>

<style>
.nav-link.router-link-active:not(.brand) {
  color: var(--color-bg-primary);
  position: relative;
}
.nav-link.router-link-active:not(.brand):after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-bg-primary);
}
.toast {
  background: transparent;
}
</style>
