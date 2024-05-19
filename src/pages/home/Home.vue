<script setup lang="ts">
import HomeAside from './components/HomeAside.vue'
import HomeAbout from './components/HomeAbout.vue'
import OrganizationItem from '../shared/OrganizationItem.vue'
</script>

<template>
  <HomeAside />

  <HomeAbout />

  <OrganizationItem link="/organization" />
</template>
