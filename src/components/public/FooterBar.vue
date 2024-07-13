<script>
import logo from "@/assets/logo_text.png";
export default {
  data: () => ({
    logo: logo,
  }),
};
</script>

<template>
  <footer class="bg-blue pt-9 text-center flex-column mt-2" style="margin-bottom: 0">
    <v-row justify="center">
      <v-col cols="12" md="4" class="mx-4">
        <v-img :src="logo" width="230"></v-img>
        <p class="text-body-1 text-left my-2">
          Appelle maintenant:
          <a
            href="tel:+21652641659"
            class="text-gray-10 text-decoration-none text-white"
          >
            +216 52 641 659</a
          >
        </p>
        <p class="text-body-1 text-justify">
          Créer portfolio et découvrez des opportunités sur mesure pour les
          demandeurs d'emploi et les meilleurs talents pour les employeurs
        </p>
      </v-col>
      <v-col cols="2" class="mx-3">
        <span class="text-h6 font-weight-bold">Entreprise</span>
        <div class="d-flex flex-column mx-auto">
          <v-btn variant="plain" class="text-none">Accueil</v-btn>
          <v-btn variant="plain" class="text-none">Contact</v-btn>
          <v-btn variant="plain" class="text-none">A propos</v-btn>
          <v-btn variant="plain" class="text-none">Connexion</v-btn>
        </div>
      </v-col>
      <v-col cols="2" class="mx-3">
        <span class="text-h6 font-weight-bold">Candidat</span>
        <div class="d-flex flex-column mx-auto">
          <v-btn variant="plain" class="text-none"
            >Parcourir les candidateurs</v-btn
          >
          <v-btn variant="plain" class="text-none">Parcourir les emplois</v-btn>
          <v-btn variant="plain" class="text-none">Connexion</v-btn>
        </div>
      </v-col>
      <v-col cols="2" class="mx-3">
        <span class="text-h6 font-weight-bold">Recruteur</span>
        <div class="d-flex flex-column mx-auto">
          <v-btn variant="plain" class="text-none">Publier une annonce</v-btn>
          <v-btn variant="plain" class="text-none">Trouver Candidat</v-btn>
          <v-btn variant="plain" class="text-none">Dashboard</v-btn>
          <v-btn variant="plain" class="text-none">Connexion</v-btn>
        </div>
      </v-col>
    </v-row>
    <div class="mt-4 pb-6">
      © portfolio xception {{ new Date().getFullYear() }} | All Rights Reserved
    </div>
  </footer>
</template>

<style lang="scss" scoped>
div {
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .v-btn:hover {
    &::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("https://img.icons8.com/?size=100&id=7789&format=png&color=FFFFFF")
        no-repeat;
      background-size: contain;
      animation: fadeIn 0.6s;
    }
  }
}
</style>
