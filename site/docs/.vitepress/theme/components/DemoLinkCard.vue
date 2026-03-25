<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  href: string
  title: string
  description?: string
}>()

const resolvedHref = computed(() => withBase(props.href))
</script>

<template>
  <div class="demo-link-card">
    <div class="demo-link-card__content">
      <strong>{{ title }}</strong>
      <p v-if="description">{{ description }}</p>
    </div>
    <a class="demo-link-card__action" :href="resolvedHref" target="_blank" rel="noreferrer">
      打开演示
    </a>
  </div>
</template>
