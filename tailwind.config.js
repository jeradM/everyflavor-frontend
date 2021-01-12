module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      textColor: {
        body: "var(--color-text-body)",
        soft: "var(--color-text-soft)",
        ghost: "var(--color-text-ghost)",
        nav: "var(--color-text-nav)",
        default: "var(--color-text-default)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        info: "var(--color-text-info)",
        success: "var(--color-text-success)",
        warning: "var(--color-text-warning)",
        error: "var(--color-text-error)",
        "icon-primary": "var(--color-bg-primary)",
        "icon-secondary": "var(--color-bg-secondary)"
      },
      backgroundColor: {
        body: "var(--color-bg-body)",
        "body-accent": "var(--color-bg-body-accent)",
        gray: "var(--color-gray)",
        nav: "var(--color-bg-nav)",
        default: "var(--color-bg-default)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        info: "var(--color-bg-info)",
        success: "var(--color-bg-success)",
        warning: "var(--color-bg-warning)",
        error: "var(--color-bg-error)"
      },
      borderColor: {
        default: "var(--color-border-default)",
        inverse: "var(--color-border-inverse)"
      },
      divideColor: {
        default: "var(--color-border-default)"
      },
      borderRadius: {
        none: "0",
        btn: "var(--rounded-btn)"
      }
    }
  },
  variants: {},
  plugins: []
};
