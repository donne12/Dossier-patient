// Accueil.vue

<template>
  <div>
    <h1>Accueil</h1>
    <img src="telecharger.ico">
    <p>Bienvenue sur le gestionnaire de <strong>dossiers patients</strong>.
      Dans cette application, vous avez accès aux données de tous les patients de votre hôpital.
    </p>

    <h4>Vous pouvez:</h4>
    <ol>
      <li>Gérer vos patients</li>
      <li>Afficher l'historique des consultations et observations émises sur le patient par les médecins précédents</li>
      <li>Émettre vos observations</li>
    </ol>

    <footer><strong>DCN Technologies Product ©2021</strong></footer>

  </div>

</template>

<script>
export default {
  name: 'Accueil'
}
</script>