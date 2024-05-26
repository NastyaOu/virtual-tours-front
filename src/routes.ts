import Home from './pages/home/Home.vue'
import Organization from './pages/organization/Organization.vue'
import HomeAdmin from './pages/home-admin/HomeAdmin.vue'
import AddOrganization from './pages/add-organization/AddOrganization.vue'
import EditOrganization from './pages/edit-organization/EditOrganization.vue'
import ToursLocations from './pages/locations/ToursLocations.vue'
import AddLocation from './pages/add-location/AddLocation.vue'
import EditLocation from './pages/edit-location/EditLocation.vue'
import TourAdmin from './pages/tour-admin/TourAdmin.vue'
import TourUser from './pages/tour-user/TourUser.vue'
import Admins from './pages/admins/Admins.vue'
import AddAdmin from './pages/add-admin/AddAdmin.vue'
import EditAdmin from './pages/edit-admin/EditAdmin.vue'

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/organization/:id',
    children: [
      {
        path: '/organization/:id/tour',
        component: TourUser
      },
      {
        path: '',
        component: Organization
      }
    ]
  },
  {
    path: '/admin',
    meta: {
      requiresAuth: true
    },
    redirect: '/admin/organizations',
    children: [
      {
        path: '/admin/organizations',
        children: [
          {
            path: '/admin/organizations/new',
            component: AddOrganization
          },
          {
            path: '/admin/organizations/:id',
            children: [
              {
                path: '/admin/organizations/:id/locations',
                children: [
                  {
                    path: '/admin/organizations/:id/locations/new',
                    component: AddLocation
                  },
                  {
                    path: '/admin/organizations/:id/locations/:locationId',
                    children: [
                      {
                        path: '/admin/organizations/:id/locations/:locationId/tour',
                        component: TourAdmin
                      },
                      {
                        path: '',
                        component: EditLocation
                      }
                    ]
                  },
                  {
                    path: '',
                    component: ToursLocations
                  }
                ]
              },
              {
                path: '',
                component: EditOrganization
              }
            ]
          },
          {
            path: '',
            component: HomeAdmin
          }
        ]
      },
      {
        path: '/admin/staff',
        children: [
          {
            path: '/admin/staff/new',
            component: AddAdmin
          },
          {
            path: '/admin/staff/:id',
            component: EditAdmin
          },
          {
            path: '',
            component: Admins
          }
        ]
      }
    ]
  }
]
