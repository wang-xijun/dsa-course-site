<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(
  defineProps<{
    src: string
    title: string
    height?: string
  }>(),
  {
    height: '560px'
  }
)

const frameSrc = computed(() => withBase(props.src))
</script>

<template>
  <div class="interactive-frame">
    <div class="interactive-frame__bar">
      <strong>{{ title }}</strong>
      <a :href="frameSrc" target="_blank" rel="noreferrer">新窗口打开</a>
    </div>
    <iframe
      class="interactive-frame__body"
      :src="frameSrc"
      :title="title"
      :style="{ height }"
      loading="lazy"
    />
  </div>
</template>
