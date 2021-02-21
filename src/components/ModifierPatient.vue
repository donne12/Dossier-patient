// ModifierPatient.vue

<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Modifier Patient</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="modifierPatient">
                    <div class="form-group">
                        <label>Nom de famille</label>
                        <input type="text" name="nom_de_famille" class="form-control" required v-model="patient.nom_de_famille"/>
                    </div>
                    <div class="form-group">
                        <label>Prénoms</label>
                        <input type="text" name="prenom" class="form-control" required v-model="patient.prenom"/>
                    </div>
										<div class="form-group">
                        <label>Sexe (M/F)</label>
                        <input maxlength="1" type="text" name="sexe" class="form-control" v-model="patient.sexe"/>
                    </div>
										<div class="form-group">
                        <label>Numéro de CNI (Carte nationale d'identité)</label>
                        <input type="text" name="cni" class="form-control" v-model="patient.cni"/>
                    </div>
										<div class="form-group">
                        <label>Numéro de téléphone</label>
                        <input maxlength="8"  type="text" name="tel" class="form-control" v-model="patient.tel"/>
                    </div>
										<div class="form-group">
                        <label>Groupe sanguin</label>
                        <input maxlength="3" type="text" name="groupe_sanguin" class="form-control" v-model="patient.groupe_sanguin"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Modifier"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { db } from '../config/db';

export default {
  components: {

  },
  data () {
    return {
      patient: {}
    }
  },
	created() {
		db.collection('patients').doc(this.$route.params.id).get().then(doc => {
      this.patient = { 
				id: doc.id,
				o_nom_de_famille: doc.data().nom_de_famille.toUpperCase(),
				o_prenom: doc.data().prenom
			};
      Object.assign(this.patient, doc.data());
    });
	},
  methods: {
    modifierPatient() {
			this.patient.nom_de_famille = this.patient.nom_de_famille.toUpperCase();
      db.collection('patients').doc(this.$route.params.id).set(this.patient).then(() => {
        this.$router.push('/fiche/' + this.patient.id);
      });
    }
  }
}
</script>