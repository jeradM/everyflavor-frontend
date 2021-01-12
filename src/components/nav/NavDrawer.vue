<template>
  <fragment>
    <transition name="slide">
      <div
        v-if="open"
        class="drawer w-56 bg-body shadow fixed z-40 h-screen top-0 sm:hidden"
      >
        <span class="flex justify-center py-6 border-b bg-nav">
          <Logo />
        </span>
        <ul class="list-none">
          <li
            role="link"
            @click="navigate('/recipes')"
            class="cursor-pointer flex justify-center items-center py-2 border-b"
            :class="{ 'drawer-active-link': $route.name === 'recipes' }"
          >
            Recipes
          </li>
          <li
            role="link"
            @click="navigate('/flavors')"
            class="cursor-pointer flex justify-center items-center py-2"
            :class="{ 'drawer-active-link': $route.name === 'flavors' }"
          >
            Flavors
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="open"
        @click="toggle"
        class="z-30 fixed top-0 left-0 w-screen h-screen bg-black opacity-25 sm:hidden"
      ></div>
    </transition>
  </fragment>
</template>

<script>
import Logo from "@/components/common/Logo";

export default {
  name: "NavDrawer",
  components: { Logo },
  emits: ["toggle"],
  props: {
    open: Boolean
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    navigate(l) {
      console.log(this.$route);
      this.$router.push(l);
      // this.toggle();
    }
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
