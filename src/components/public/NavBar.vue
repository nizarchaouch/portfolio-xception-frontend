<script>
import logo from "@/assets/logo_text.png";
import Avatar from "@/components/user/avatar.vue";
import Notfi from "@/components/user/Notfi.vue";
import { mapState, mapActions } from "vuex";
export default {
  props: { hidea: String },
  components: { Avatar, Notfi },
  computed: {
    ...mapState(["user"]),
  },
  data: () => ({
    logo: logo,
    nav: null,
    drawer: false,
    hide: "hide",
    itemsRec: [
      { text: "Aperçu", icon: "mdi-chart-bar", to: "dashboard" },
      { text: "Mon Profil", icon: "mdi-account-circle", to: "MonProfil" },
      { text: "Poster un emploi", icon: "mdi-plus-circle", to: "PosterEmploi" },
      { text: "Mes emplois", icon: "mdi-briefcase-variant", to: "MesEmplois" },
      {
        text: "Trouver candidats",
        icon: "mdi-account-search",
        to: "TrouveCandidat",
      },
      { text: "Paramétres", icon: "mdi-cog", to: "ParametreRec" },
    ],
    itemsAdmin: [
      { text: "Aperçu", icon: "mdi-view-dashboard", to: "/admin/dashboard" },
      { text: "Recruteur", icon: "mdi-domain", to: "/admin/recruteur" },
      { text: "Candidat", icon: "mdi-account-group", to: "/admin/candidat" },
      { text: "Emplois", icon: "mdi-briefcase-variant", to: "" },
      { text: "Mon Profil", icon: "mdi-account-circle", to: "" },
    ],
  }),
  methods: {
    ...mapActions(["userAuth"]),
  },
  async mounted() {
    await this.userAuth();
  },
};
</script>

<template>
  <v-layout>
    <v-app-bar :scroll-behavior="hidea ? ' ' : hide">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="hidea != ' '"
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-nav-icon
          v-else
          class="hidden-lg-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-container fluid>
        <!-- logo -->
        <v-row class="justify-space-between">
          <v-col sm="4" md="3" lg="2" class="mt-3">
            <v-img :src="logo" alt="Logo" height="35"></v-img>
          </v-col>
          <!-- tab nav -->
          <v-col md="6" lg="6" class="hidden-sm-and-down" v-if="hidea != ' '">
            <v-tabs
              v-model="nav"
              align-tabs="start"
              color="deep-purple-accent-4"
            >
              <v-tab to="/">accueil</v-tab>
              <v-tab to="template">templates</v-tab>
              <v-tab to="offer">Offres d'emploi</v-tab>
            </v-tabs>
          </v-col>

          <!-- btn login signup -->
          <template v-if="!this.$store.state.user.authenticated">
            <v-col
              xs="1"
              lg="3"
              class="d-flex flex-row d-flex justify-end mt-2"
            >
              <v-btn
                variant="elevated"
                class="text-none ma-1 body"
                rounded="xl"
                color="primary"
                to="login"
              >
                Se connecter
              </v-btn>
              <v-btn
                class="text-none text-subtitle-2 ma-1 pa-0 hidden-xs"
                rounded="xl"
                to="signup"
              >
                S'inscrire
              </v-btn>
            </v-col>
          </template>
          <!-- avatar notif -->
          <template v-else>
            <v-col
              cols="auto"
              xs="1"
              lg="3"
              class="d-flex flex-row-reverse mt-2"
            >
              <Avatar />
              <Notfi />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-layout>
  <!-- nav drawer candidat  -->
  <v-layout>
    <v-navigation-drawer
      v-if="hidea != ' ' && this.user.userData.role === 'candidat'"
      v-model="drawer"
      location="top"
      elevation="10"
      temporary
      permanent
    >
      <v-icon @click="drawer = !drawer" class="ma-3">mdi-close</v-icon>
      <v-list density="compact">
        <v-list-item title="accueil" to="/"> </v-list-item>
        <v-list-item title="templates" to="template"></v-list-item>
        <v-list-item title="Offres d'emploi" to="offer"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- nav drawer recruteur  -->
    <v-navigation-drawer
      v-if="this.user.userData.role === 'recruteur'"
      v-model="drawer"
      location="top"
      elevation="10"
      temporary
      permanent
    >
      <v-row>
        <v-col cols="10">
          <v-list density="compact" lines="one">
            <v-list-item
              v-for="(item, i) in itemsRec"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="1">
          <v-icon @click="drawer = !drawer" class="ma-3">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <!-- admin -->
    <v-navigation-drawer
      v-if="this.user.userData.role === 'admin'"
      v-model="drawer"
      location="top"
      elevation="10"
      temporary
      permanent
    >
      <v-row>
        <v-col cols="10">
          <v-list density="compact" lines="one">
            <v-list-item
              v-for="(item, i) in itemsAdmin"
              :key="i"
              :value="item"
              color="primary"
              :to="item.to"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="1">
          <v-icon @click="drawer = !drawer" class="ma-3">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-layout>
</template>

<style lang="scss" scoped>
.body {
  background-image: linear-gradient(45deg, #d2001a, #7462ff, #f84e21, #23d5ab);
  background-size: 300% 300%;
  animation: color 12s ease-in-out infinite;
  @keyframes color {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
