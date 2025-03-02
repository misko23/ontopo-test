
<template>
  <div class="home-page">
    <img :src="'/home.png'"  alt="Home Image" class="home-image"/>
    </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
  .home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .home-image {
    width: 100%;
    height: auto;
  }
</style>
