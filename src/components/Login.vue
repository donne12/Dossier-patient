<template>
	<div class="column">
		<h2>Se connecter</h2>
		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-md-offset-3">
			<label>E-mail</label>
			<input type="email" v-model="formData.email" class="form-control" placeholder="email">
			<br>
			<label>Mot de passe</label>
			<input type="password" v-model="formData.password" class="form-control" placeholder="mot de passe">
			<br>
			<button class="btn btn-primary" @click="signIn">Valider</button>
		</div>
	</div>
</template>

<script>
	import Firebase from 'firebase';
	export default {
		name: 'SignIn',
		data () {
			return {
				formData:{
					email:'',
					password:''
				}
			}
		},
		methods: {
			signIn(){
				Firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
						.then((user)=>{
							this.$router.replace('/accueil')
						})
						.catch((e)=>{
							alert(e.message)
						})
			}
		},
		created(){
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>