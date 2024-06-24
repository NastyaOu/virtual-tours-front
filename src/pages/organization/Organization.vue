<script setup lang="ts">
import OrganizationAbout from './components/OrganizationAbout.vue'
import OrganizationHistory from './components/OrganizationHistory.vue'
import OrganizationItem from '../shared/OrganizationItem.vue'
import type { IOrganization } from '@/interfaces/Organization'
import { onMounted, ref } from 'vue'
import { getOrganization } from '@/services/organization-service'
import { useRoute } from 'vue-router'
import { getFileName } from '@/helpers'

// ref-ссылка=реактивная переменная(могут изменяться в коде)
const organization = ref<IOrganization>({
  description: '',
  history: [],
  idOrganization: 0,
  image: '',
  name: ''
})

// получаем текущий путь
const route = useRoute()

// получаем одну организацию и в качестве параметра передаем id
// onMounted-когда компонент полностью отрисован,встроен в страницу и им можно пользоваться
onMounted(() => {
  getOrganization(Number(route.params.id)).then((res) => {
    // записываем то, что пришло с бэка
    organization.value = res
  })
})
</script>

<template>
  <OrganizationAbout :name="organization!.name" :description="organization!.description" />

  <OrganizationHistory :history="organization.history" />

  <!-- двоеточие для использования параметров из кода, для реактивных(могут изменяться в коде) то же самое -->
   <!-- получаем ссылку, название организации и путь до медиа -->
    <!-- путь формируется функцией getFileName -->
  <OrganizationItem
    :link="`/organization/${route.params.id}/tour`" 
    :name="organization!.name"
    :img-src="getFileName(organization!.image)"
  />
</template>
