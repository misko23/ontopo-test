<template>
  <header class="header">
    <nav class="side-nav">
      <ul class="nav-links">
        <li><RouterLink to="/">Početna</RouterLink></li>
        <li><RouterLink to="/search">Pretraga</RouterLink></li>
      </ul>
    </nav>
    <h1><slot name="title"></slot></h1>
    <div class="logo">ontópo</div>
  </header>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue'
defineComponent({
  name: 'RestaurantsList',
})
</script>
<style scoped>
/* Left-side Navigation */
.side-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-links {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  position: relative;
}

.nav-links a {
  text-decoration: none;
  font-size: 16px;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active,
.active-nav-link {
  background: #0096ff;
  color: white !important;
}
/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-links {
    gap: 0px;
  }
}
</style>
