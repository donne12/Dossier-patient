// Notes
<template>
  <div>
    <h1>Notes</h1>
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-if="notes.length">
          <tr v-for="note in notes" v-bind:key="note.id">
            <td>{{ note.note }}</td>
            <td nowrap>{{ note.created_at | date('DD-MM-YYYY hh:mm:ss') }}</td>
          </tr>
      </tbody>
      <tbody v-else>
        <tr><td colspan="2" class="text-center">Aucune note trouvée</td></tr>
      </tbody>
    </table>

    <nav aria-label="Pagination" v-if="this.notes.length">
      <ul class="pagination pagination-sm justify-content-center">
        <li class="page-item" v-bind:class="{ disabled: hasPrevLink == false }">
          <a class="page-link" @click="paginatePrev()">Précédents</a>
        </li>
        <li class="page-item" v-bind:class="{ disabled: hasNextLink == false }">
          <a class="page-link" @click="paginateNext()">Suivants</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import { db } from '../config/db';

export default {
  name: 'Notes',
  data() {
    return {
      orderBy: 'created_at',
      direction: 'desc',
      page: 1,
      hitsPerPage: 3,
      currentPageLastDoc: {},
      currentPageFirstDoc: {},
      notes: [],
      hasPrevLink: false,
      hasNextLink: false
    }
  },
  created() {
    let notesRef = db
      .collection('patients')
      .doc(this.$route.params.id).collection('notes')
      .orderBy(this.orderBy, this.direction)
      .limit(this.hitsPerPage);
      
    notesRef.onSnapshot(snap => {
      if (snap.docs.length) {
        this.notes = [];
        snap.forEach(doc => {
          let note = {id: doc.id};
          Object.assign(note, doc.data()); 
          this.notes.push(note);
        });
        this.currentPageFirstDoc = snap.docs[0];
        this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
        this.hasPrev();
        this.hasNext();
      }
    });
  },
  methods: {
    paginateNext() {
        
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, 'desc')
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageLastDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[0];
            this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
            this.notes = [];
            snap.forEach(doc => {
              let note = {id: doc.id};
              Object.assign(note, doc.data()); 
              this.notes.push(note);
            });
            this.hasPrev();
            this.hasNext(); 
          }
        });
    },
    paginatePrev() {
      let direction = (this.direction == 'asc') ? 'desc' : 'asc';
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageFirstDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[snap.docs.length - 1];
            this.currentPageLastDoc = snap.docs[0];
            this.notes = [];
            snap.forEach(doc => {
              let note = {id: doc.id};
              Object.assign(note, doc.data()); 
              this.notes.push(note);
            });
            this.notes.reverse();
            this.hasPrev();
            this.hasNext(); 
          }
        });
    },
    hasNext() {
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, this.direction)
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
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, direction)
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