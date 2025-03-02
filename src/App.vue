<script setup lang="ts">
import {  RouterView} from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
<div class="container">
    <AppHeader>
      <template #title>{{$route.meta.title}}</template>
    </AppHeader>
    <main>
      <RouterView />
    </main>
</div>
</template>

<style scoped>
</style>
