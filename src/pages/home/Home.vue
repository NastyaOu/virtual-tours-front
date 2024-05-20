<script setup lang="ts">
import HomeAside from './components/HomeAside.vue'
import HomeAbout from './components/HomeAbout.vue'
import OrganizationItem from '../shared/OrganizationItem.vue'
import { getOrganizations } from '@/services/organization-service'

import { ref, onMounted } from 'vue'
import type { IOrganization } from '@/interfaces/Organization'
import { getFileName } from './../../helpers'

const organizations = ref<IOrganization[]>()

onMounted(() => {
  getOrganizations().then((res) => {
    organizations.value = res
  })
})
</script>

<template>
  <HomeAside />

  <HomeAbout />

  <OrganizationItem
    v-for="organization of organizations"
    :key="organization.idOrganization"
    :link="`/organization/${organization.idOrganization}`"
    :name="organization.name"
    :img-src="getFileName(organization.image)"
  />
</template>
