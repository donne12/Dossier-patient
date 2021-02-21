// AjouterNote.vue

<template>
  <div class="container">
        <h3>Ajouter une note</h3>
        <form v-on:submit.prevent="ajouterNote">
            <div class="form-group">
                <label>Note</label>
                <textarea name="note" class="form-control" required v-model="note.note"></textarea>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Valider"/>
            </div>
        </form>
    </div>
</template>

<script>
import { db } from '../config/db';
export default {
	name: 'AjouterNote',
	components: {

    },
	data () {
		return {
			note: {}
		}
	},
	methods: {
		ajouterNote(e) {
            this.note.created_at = new Date();
			db.collection('patients').doc(this.$route.params.id).collection('notes').add(this.note).then(function(){
                e.target.reset();
            });
		}
	}
}
</script>