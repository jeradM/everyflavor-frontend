<template>
  <span
    class="switch"
    role="checkbox"
    @click="toggle"
    :style="cssVars()"
    :aria-label="label"
    :aria-checked="on"
  >
    <span class="slider" :class="{ on, 'cursor-pointer': !readOnly }"></span>
  </span>
</template>

<script>
export default {
  name: "Toggle",
  props: {
    on: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Toggle"
    },
    size: {
      type: Number,
      default: 40
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cssVars() {
      const width = this.size;
      const height = this.size / 1.8;
      const toggle = height - width / 7;
      const shadow = this.size / 40;
      const offset = this.size / 12;
      const onOffset = this.size / 2;
      return {
        "--width": `${width}px`,
        "--height": `${height.toFixed(2)}px`,
        "--toggle": `${toggle.toFixed(2)}px`,
        "--shadow": `${shadow.toFixed(2)}px`,
        "--shadow-blur": `${(shadow * 2).toFixed(2)}px`,
        "--offset": `${offset.toFixed(2)}px`,
        "--on-offset": `${onOffset.toFixed(2)}px`
      };
    },
    toggle(event) {
      if (this.readOnly) return;
      this.$emit("toggled", { value: !this.on, event });
    }
  }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: var(--width);
  height: var(--height);
}

/* The slider */
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-toggle-background);
  -webkit-transition: 0.2s;
  transition: 0.2s;
  display: flex;
  align-items: center;
}

.slider:before {
  /* position: absolute; */
  content: "";
  height: var(--toggle);
  width: var(--toggle);
  margin-left: var(--offset);
  bottom: var(--offset);
  background-color: var(--color-bg-body);
  -webkit-transition: 0.2s;
  transition: all 0.2s ease-out;
  box-shadow: var(--shadow) var(--shadow) var(--shadow-blur) rgba(0, 0, 0, 0.3);
}

.on.slider {
  background-color: var(--color-bg-secondary);
}

.on.slider:before {
  margin-left: var(--on-offset);
}

/* Rounded sliders */
.slider {
  border-radius: var(--width);
}

.slider:before {
  border-radius: 99%;
}
</style>
