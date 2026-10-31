// main.js

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import Moment from 'moment'
import App from './App.vue'
import Firebase from './config/db'

import AjouterPatient from './components/AjouterPatient.vue'
import ModifierPatient from './components/ModifierPatient.vue'
import FichePatient from './components/FichePatient.vue'
import Patients from './components/Patients.vue'
import Accueil from './components/Accueil.vue'
import Login from './components/Login.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
      name: 'Login',
      path: '/login',
      component: Login
  },
  {
    name: 'Accueil',
    path: '/accueil',
    component: Accueil,
    meta: {
      requiresAuth: true
    }
  },
  {
      name: 'AjouterPatient',
      path: '/ajouter',
      component: AjouterPatient,
      meta: {
        requiresAuth: true
      }
  },
  {
      name: 'ModifierPatient',
      path: '/modifier/:id',
      component: ModifierPatient,
      meta: {
        requiresAuth: true
      }
  },
  {
      name: 'Patients',
      path: '/patients',
      component: Patients,
      meta: {
        requiresAuth: true
      }
  },
  {
      name: 'FichePatient',
      path: '/fiche/:id',
      component: FichePatient,
      meta: {
        requiresAuth: true
      }
  },
];

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const currentUser = Firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) return { name: 'Login' }
  if (!requiresAuth && currentUser) return { name: 'Accueil' }
  return true
})

let app
Firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    app = createApp(App).use(router)
    // replaces the Vue 2 `date` filter
    app.config.globalProperties.$date = (value, format) => (value ? Moment(String(value.toDate())).format(format) : undefined)
    app.mount('#app')
  }
});
