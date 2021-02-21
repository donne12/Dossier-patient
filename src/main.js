// main.js

import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Moment from 'moment'
import App from './App.vue'
import Firebase from 'firebase'

import AjouterPatient from './components/AjouterPatient.vue'
import ModifierPatient from './components/ModifierPatient.vue'
import FichePatient from './components/FichePatient.vue'
import Patients from './components/Patients.vue'
import Accueil from './components/Accueil.vue'
import Login from './components/Login.vue'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Moment)
Vue.config.productionTip = false

const routes = [
  {
    path: '*',
    redirect: 'Login',
  },
  {
    path: '/',
    redirect: 'Login',
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

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeEach ((to, from, next) => {
  let currentUser = Firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if(requiresAuth && !currentUser) next('login')
  else if(!requiresAuth && currentUser) next('accueil')
  else next()
})

Vue.filter('date', function(value, format) {
  if (value) {
    return Moment(String(value.toDate())).format(format)
  }
})

let app;
Firebase.auth().onAuthStateChanged(function() {
  if(!app) {
    app = new Vue({
      render: h => h(App),
      router
    }).$mount('#app')
  }
});