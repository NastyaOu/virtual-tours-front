<script setup lang="ts">
import OrganizationAbout from './components/OrganizationAbout.vue'
import OrganizationHistory from './components/OrganizationHistory.vue'
import OrganizationItem from '../shared/OrganizationItem.vue'
import type { IOrganization } from '@/interfaces/Organization'
import { onMounted, ref } from 'vue'
import { getOrganization } from '@/services/organization-service'
import { useRoute } from 'vue-router'
import { getFileName } from '@/helpers'

const organization = ref<IOrganization>({
  description: '',
  history: [],
  idOrganization: 0,
  image: '',
  name: ''
})

const route = useRoute()

onMounted(() => {
  getOrganization(Number(route.params.id)).then((res) => {
    organization.value = res
  })
})
</script>

<template>
  <OrganizationAbout :name="organization!.name" :description="organization!.description" />

  <OrganizationHistory :history="organization.history" />

  <OrganizationItem
    :link="`/organization/${route.params.id}/tour`"
    :name="organization!.name"
    :img-src="getFileName(organization!.image)"
  />
</template>
