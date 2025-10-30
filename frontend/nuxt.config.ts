

export default defineNuxtConfig({
  compatibilityDate: "2025-10-30",
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
