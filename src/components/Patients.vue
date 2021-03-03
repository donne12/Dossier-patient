// Patients
<template>
  <div>
    <h1>Patients</h1>
    <form class="form-inline" v-on:submit.prevent="rechercher">
      <label class="sr-only" for="nom_de_famille">Nom de famille</label>
      <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="nom_de_famille" placeholder="Nom de famille" v-model="search.nom_de_famille">

      <label class="sr-only" for="prenom">Prénom</label>
      <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="prenom" placeholder="Prénom" v-model="search.prenom">

      <label class="sr-only" for="cni">Numéro de CNI</label>
      <input type="text" class="form-control form-control-sm mb-2 mr-sm-2" id="cni" placeholder="Numéro de CNI" v-model="search.cni">
      
      <button type="submit" class="btn btn-sm btn-primary mb-2">Rechercher</button>
    </form>


    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Nom de famille</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Groupe Sanguin</th>
          <th>CNI</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="patients.length">
          <tr v-for="patient in patients" v-bind:key="patient.id">
            <td>{{ patient.nom_de_famille }}</td>
            <td>{{ patient.prenom }}</td>
            <td>{{ patient.sexe }}</td>
            <td>{{ patient.groupe_sanguin }}</td>
            <td>{{ patient.cni }}</td>
            <td>{{ patient.tel }}</td>
            <td>
                <router-link :to="{ name: 'FichePatient', params: {id: patient.id }}" class="btn btn-sm btn-primary">
                  Afficher
                </router-link>
              &nbsp   &nbsp
                <router-link :to="{ name: 'ModifierPatient', params: {id: patient.id }}" class="btn btn-sm btn-warning">
                  Modifier
                </router-link>
            </td>
          </tr>
      </tbody>
      <tbody v-else>
        <tr><td colspan="7" class="text-center">Aucun patient trouvé</td></tr>
      </tbody>
    </table>

    <nav aria-label="Pagination" v-if="this.patients.length">
      <ul class="pagination pagination-sm justify-content-center">
        <li class="page-item" v-bind:class="{ disabled: hasPrevLink == false }">
          <a class="page-link" @click="paginatePrev()">< Précédent</a>
        </li>
        <li class="page-item" v-bind:class="{ disabled: hasNextLink == false }">
          <a class="page-link" @click="paginateNext()">Suivant ></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { db } from '../config/db';
export default {
  name: 'Patients',
  data() {
    return {
      orderBy: ['o_nom_de_famille', 'o_prenom'],
      direction: 'asc',
      page: 1,
      hitsPerPage: 10,
      currentPageLastDoc: {},
      currentPageFirstDoc: {},
      patients: [],
      search: {},
      patientsRef: db.collection('patients'),
      hasPrevLink: false,
      hasNextLink: false
    }
  },
  created() {
    this.patientsRef
      .orderBy(this.orderBy[0], this.direction)
      .orderBy(this.orderBy[1], this.direction)
      .limit(this.hitsPerPage)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let patient = {id: doc.id};
          Object.assign(patient, doc.data()); 
          this.patients.push(patient);
        });
        this.currentPageFirstDoc = snap.docs[0];
        this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
        this.hasPrev();
        this.hasNext();
      });
  },
  methods: {
    rechercher() {
      this.patientsRef = db.collection('patients')

      if (this.search.nom_de_famille)
        this.patientsRef = this.patientsRef.where('nom_de_famille', '==', this.search.nom_de_famille.toUpperCase())
      if (this.search.prenom)
        this.patientsRef = this.patientsRef.where('prenom', '==', this.search.prenom)
      if (this.search.cni)
        this.patientsRef = this.patientsRef.where('cni', '==', this.search.cni)
      
      this.patientsRef
        .orderBy(this.orderBy[0], this.direction)
        .orderBy(this.orderBy[1], this.direction)
        .limit(this.hitsPerPage)
        .get()
        .then(snap => {
          this.patients = [];
          snap.forEach(doc => {
            let patient = {id: doc.id};
            Object.assign(patient, doc.data()); 
            this.patients.push(patient);
          });
          this.currentPageFirstDoc = snap.docs[0];
          this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
          this.hasPrev();
          this.hasNext();
        });
    },
    paginateNext() {   
      this.patientsRef
        .orderBy(this.orderBy[0], this.direction)
        .orderBy(this.orderBy[1], this.direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageLastDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[0];
            this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
            this.patients = [];
            snap.forEach(doc => {
              let patient = {id: doc.id};
              Object.assign(patient, doc.data()); 
              this.patients.push(patient);
            });
            this.hasPrev();
            this.hasNext(); 
          }
        });
    },
    paginatePrev() {
      let direction = (this.direction == 'asc') ? 'desc' : 'asc';
      this.patientsRef
        .orderBy(this.orderBy[0], direction)
        .orderBy(this.orderBy[1], direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageFirstDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[snap.docs.length - 1];
            this.currentPageLastDoc = snap.docs[0];
            this.patients = [];
            snap.forEach(doc => {
              let patient = {id: doc.id};
              Object.assign(patient, doc.data()); 
              this.patients.push(patient);
            });
            this.patients.reverse();
            this.hasPrev();
            this.hasNext();
          }
        });
    },
    hasNext() {
      this.patientsRef
        .orderBy(this.orderBy[0], this.direction)
        .orderBy(this.orderBy[1], this.direction)
        .limit(1)
        .startAfter(this.currentPageLastDoc)
        .get()
        .then(snap => {
          if(snap.docs.length)
            this.hasNextLink = true;
          else
            this.hasNextLink = false;
        });
    },
    hasPrev() {
      let direction = (this.direction == 'asc') ? 'desc' : 'asc';
      this.patientsRef
        .orderBy(this.orderBy[0], direction)
        .orderBy(this.orderBy[1], direction)
        .limit(1)
        .startAfter(this.currentPageFirstDoc)
        .get()
        .then(snap => {
          if(snap.docs.length)
            this.hasPrevLink = true;
          else
            this.hasPrevLink = false;
        });
    }
  }
}
</script>