<script setup lang="ts">
import OrganizationAbout from './components/OrganizationAbout.vue'
import OrganizationHistory from './components/OrganizationHistory.vue'
import OrganizationItem from '../shared/OrganizationItem.vue'
</script>

<template>
  <OrganizationAbout />

  <OrganizationHistory />

  <OrganizationItem link="/tour"></OrganizationItem>
</template>
