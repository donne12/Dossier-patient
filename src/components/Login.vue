// Login.vue

<template>
  <div>
		<h1>Se connecter</h1>
		<form v-if="(phoneIsValid == false)" @submit.prevent="signInWithPhone">
			<div class="form-group">
				<label>Numéro de téléphone</label>
				<input type="text" name="tel" class="form-control" placeholder="taper votre numéro ici" required v-model="user.tel"/>
			</div>
			<div class="form-group">
				<div id="recaptcha-container"></div>
			</div>
			<div class="form-group">
				<input type="submit" class="btn btn-primary" value="Valider"/>
			</div>
		</form>
		<form v-if="phoneIsValid" @submit.prevent="confirmCode">
			<div class="form-group">
				<label>Code de vérification</label>
				<input type="number" name="tel" class="form-control" placeholder="taper le code ici" required v-model="user.code"/>
			</div>
			<div class="form-group">
				<input type="submit" class="btn btn-primary" value="Valider"/>
			</div>
		</form>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
	name: 'Login',
	data() {
		return {
			phoneIsValid: false,
			user: {}
		}
	},
	methods: {
		signInWithPhone() {
			Firebase.auth().languageCode = 'fr';
			window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier('recaptcha-container');
		//	this.user.tel = '+228'+this.user.tel;
			Firebase.auth().signInWithPhoneNumber(this.user.tel, window.recaptchaVerifier)
				.then(confirmationResult => {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
					window.confirmationResult = confirmationResult;
					this.phoneIsValid = true;
				}).catch(() => {
					// Error; SMS not sent
					window.grecaptcha.reset(window.recaptchaWidgetId);
					this.phoneIsValid = false;
				});
		},
		confirmCode() {
			window.confirmationResult.confirm(this.user.code).then(() => {
				// User signed in successfully.
				// var user = result.user;
				this.$router.replace('/accueil');
			})
			// .catch(function (error) {
			// 	// User couldn't sign in (bad verification code?)
			// 	// eslint-disable-next-line no-console
			// 	// console.log('cannot sign in');
			// });
		}
	}
}
</script>