<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    userData() {
      return this.user.userData;
    },
  },
  data: () => ({
    itemsRec: [
      { text: "Aperçu", icon: "mdi-chart-bar", to: "dashboard" },
      { text: "Mon Profil", icon: "mdi-account-circle", to: "/MonProfil" },
      { text: "Poster un emploi", icon: "mdi-plus-circle", to: "PosterEmploi" },
      { text: "Mes emplois", icon: "mdi-briefcase-variant", to: "MesEmplois" },
      {
        text: "Trouver candidats",
        icon: "mdi-account-search",
        to: "TrouveCandidat",
      },
      { text: "Paramétres", icon: "mdi-cog", to: "ParametreRec" },
    ],
  }),
};
</script>
<template>
  <v-layout>
    <v-navigation-drawer elevation="2" style="margin-top: 65px">
      <v-list-item align="center">
        <v-avatar
          :image="'http://localhost:8000' + userData.logoPath"
          size="100"
        >
        </v-avatar>
        <h3>{{ userData.nomEntreprise }}</h3>
        <p class="text-capitalize">
          <v-icon size="sm" class="mb-1">mdi-map-marker</v-icon>
          {{ userData.adress }}
        </p>
      </v-list-item>
      <v-divider></v-divider>
      <v-list lines="three">
        <v-list-item
          v-for="(item, i) in itemsRec"
          :key="i"
          :value="item"
          color="indigo"
          :to="item.to"
          style="border-radius: 30px 0 0 30px;"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" class="mt-2" size="27"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<style lang="scss" scoped></style>
