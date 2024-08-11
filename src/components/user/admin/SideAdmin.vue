<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    userData() {
      return this.user.userData;
    },
  },
  data: () => ({
    itemsAdmin: [
      { text: "Aperçu", icon: "mdi-view-dashboard", to: "/admin/dashboard" },
      { text: "Recruteur", icon: "mdi-domain", to: "/admin/recruteur" },
      { text: "Candidat", icon: "mdi-account-group", to: "/admin/candidat" },
      { text: "Emplois", icon: "mdi-briefcase-variant", to: "/admin/emploi" },
      { text: "Modèles de portfolio", icon: "mdi-card-account-details", to: "/admin/modele" },
    ],
  }),
  methods: {
    ...mapActions(["Logout"]),
  },
};
</script>
<template>
  <v-layout>
    <v-navigation-drawer elevation="2" width="300" style="margin-top: 65px">
      <v-list-item class="py-3">
        <v-row>
          <v-col cols="auto">
            <v-avatar
              :image="'http://localhost:8000' + userData.imagePath"
              size="50"
              rounded
            >
            </v-avatar>
          </v-col>
          <v-col cols="auto">
            <v-row no-gutters>
              <h3>{{ userData.nom }} {{ userData.prenom }}</h3></v-row
            >
            <v-row no-gutters><p>Admin</p></v-row>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-list lines="one" class="mx-5">
        <v-list-item
          v-for="(item, i) in itemsAdmin"
          :key="i"
          :value="item"
          class="my-2 rounded-lg"
          color="#435ebe"
          variant="elevated"
          elevation="0"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="27"></v-icon>
          </template>

          <v-list-item-title
            v-text="item.text"
            class="mt-1"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-col class="h-50 d-flex flex-column justify-end">
        <v-divider class="border-opacity-50 mb-2"></v-divider>
        <v-btn
          to="/"
          target="_blank"
          variant="elevated"
          elevation="0"
          color="#435ebe"
          size="large"
          class="text-none my-2 rounded-lg w-100"
        >
          <template v-slot:prepend>
            <v-icon size="large">mdi-web</v-icon>
          </template>
          Visiter site Web
        </v-btn>
        <v-btn
          to="/"
          variant="outlined"
          elevation="0"
          color="#435ebe"
          size="large"
          class="text-none my-2 rounded-lg w-100"
        >
          <template v-slot:prepend>
            <v-icon size="large" class="pe-7">mdi-cog</v-icon>
          </template>
          Paramètres
        </v-btn>
        <v-btn
          variant="outlined"
          elevation="0"
          color="red"
          size="large"
          class="text-none my-2 rounded-lg w-100"
          @click="Logout()"
        >
          <template v-slot:prepend>
            <v-icon size="large" class="pe-7">mdi-logout</v-icon>
          </template>
          Se déconnecter
        </v-btn>
      </v-col>
    </v-navigation-drawer>
  </v-layout>
</template>
<style lang="scss" scoped></style>
