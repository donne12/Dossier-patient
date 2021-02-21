<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <ul class="navbar-nav">
        <button class="btn btn-sm btn-outline-primary" type="button">
          <li class="nav-item">
            <router-link :to="{ name: 'Accueil' }" class="nav-link"><h6><strong>Accueil</strong></h6></router-link>
          </li>
        </button>
        &nbsp
        <button class="btn btn-sm btn-outline-primary" type="button">
          <li class="nav-item">
            <router-link :to="{ name: 'AjouterPatient' }" class="nav-link"><h6><strong>Ajouter un patient</strong></h6></router-link>
          </li>
        </button>
        &nbsp
        <button class="btn btn-sm btn-outline-primary" type="button">
          <li class="nav-item">
            <router-link :to="{ name: 'Patients' }" class="nav-link"><h6><strong>Tous les patients</strong></h6></router-link>
          </li>
        </button>
        &nbsp
        <button class="btn btn-sm btn-outline-danger" type="button">
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link"><h6><strong>Déconnexion</strong></h6></a>
          </li>
        </button>
      </ul>
    </nav>

    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Bahnschrift', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container {
  padding-left: 20px;
  padding-right: 20px;
}
/*
input[type=text] {
  text-transform: uppercase;
}*/
input[type=text]::placeholder {
  text-transform: none;
}
</style>


<script>
import Firebase from 'firebase'

export default {
	name: 'App',
	methods: {
		logout() {
			Firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
      // .catch(function(error) {
      //   // An error happened.
      // });
		}
	}
}
</script>
