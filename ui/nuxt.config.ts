import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  modules: ['@primevue/nuxt-module', '@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  primevue: {
    components: {
      include: ['Button', 'DataTable', 'Divider', 'Listbox', 'Skeleton', 'Card', 'Panel', 'Badge', 'Tag', 'Carousel' ,'TabList', 'Tab', 'TabPanels', 'TabPanel', 'Chip']
    },
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          // prefix: 'p',
          darkModeSelector: 'light',
          cssLayer: false
        }
      },
    }
  }
})