<script setup lang="ts">;
import Footer from './pages/shared/Footer.vue'
import Header from './pages/shared/Header.vue'
import HomePage from './pages/shared/HomePage.vue'
import Home from './pages/home/Home.vue'
import MusicSchool from './pages/musicalschool/MusicSchool.vue'
import HomeAdmin from './pages/home-admin/HomeAdmin.vue'
import AddOrganization from './pages/add-organization/AddOrganization.vue'
import EditOrganization from './pages/edit-organization/EditOrganization.vue'
import ToursLocations from './pages/locations/ToursLocations.vue'
import AddLocation from './pages/add-location/AddLocation.vue'
import EditLocation from './pages/edit-location/EditLocation.vue'
import ConfirmSaveAddBox from './pages/shared/ConfirmSaveAddBox.vue'
import AvtorizationBox from './pages/shared/AvtorizationBox.vue'
import ConfirmExitBox from './pages/shared/CondirmExitBox.vue'
import ConfirmAddBox from './pages/shared/ConfirmAddBox.vue'
import ConfirmDelBox from './pages/shared/ConfirmDelBox.vue'
import TourAdmin from './pages/tour-admin/TourAdmin.vue'
import TourPolz from './pages/tour-polz/TourPolz.vue'
import Admins from './pages/admins/Admins.vue'
import AddAdmin from './pages/add-admin/AddAdmin.vue'
import EditAdmin from './pages/edit-admin/EditAdmin.vue'
</script>

<template>

    <EditAdmin />

</template>

<style>
template {
    width: 100%;
    /* ширина */
    margin: auto;
    /* отступы */
    font-family: Rubik, sans-serif;
    /* шрифт */
}

.content {
    margin: auto;
    /* отступы */
    max-width: 1170px;
    /* макс ширина */
    width: 100%;
    /* ширина */
    font-family: Rubik, sans-serif;
    /* шрифт */
}
</style>