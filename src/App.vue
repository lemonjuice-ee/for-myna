<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

// See vite.config.ts for details about automatic imports
const route = useRoute()

useHead({
  title: () => route.meta.title || 'NBA App',
  meta: [
    {
      property: 'og:title',
      content: () => route.meta.title,
    },
    {
      name: 'twitter:title',
      content: () => route.meta.title,
    },
  ],
})
</script>
<template>
  <router-view />
  <Analytics />
</template>
