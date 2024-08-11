<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapMutations, mapActions } from "vuex";
import router from "@/router";
import logo_text from "@/assets/logo_text.png";
import logo from "@/assets/logo.png";
import Avatar from "@/components/user/avatar.vue";
import Notfi from "@/components/user/Notfi.vue";
export default {
  components: { Avatar, Notfi },
  computed: {
    ...mapState(["candidat", "user", "portfolioss"]),
  },
  data: () => ({
    logo_text: logo_text,
    logo: logo,
    nav: null,
    loading: false,
    dialog: false,
    toggle: "laptop",
  }),
  methods: {
    ...mapMutations(["addElement"]),
    ...mapActions(["userAuth", "addModel", "addPortfolio"]),
    add() {
      this.loading = true;
      this.addModel();
      setTimeout(() => {
        this.loading = false;
        router.push("/admin/modele");
      }, 3000);
    },
    addPortf() {
      this.loading = true;
      this.addPortfolio();
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
  mounted() {
    this.userAuth();
  },
};
</script>

<template>
  <v-layout>
    <v-app-bar elevation="0" height="55" border>
      <v-container fluid>
        <!-- logo -->
        <v-row class="justify-space-between" dense>
          <v-col cols="1" class="d-flex">
            <router-link
              :to="
                this.user.userData.role === 'candidat'
                  ? '/'
                  : '/admin/dashboard'
              "
            >
              <img
                :src="logo_text"
                alt="Logo"
                height="35"
                class="mt-1 hidden-md-and-down"
              />
              <img
                :src="logo"
                alt="Logo"
                height="35"
                class="mt-1 hidden-md-and-up"
              />
            </router-link>
            <v-divider vertical class="border-opacity-25 mx-5"></v-divider>
          </v-col>
          <!-- avatar notif -->
          <v-col cols="3" class="d-flex flex-row-reverse">
            <template v-if="this.user.userData.role === 'candidat'">
              <Avatar />
              <Notfi />
              <v-divider vertical class="bo rder-opacity-25 mx-2"></v-divider>
              <!-- sauvegarder & aperçu -->
              <div>
                <v-btn
                  color="#651FFF"
                  variant="text"
                  class="mt-2 text-body-2"
                  @click="loading = !loading"
                  >Aperçu</v-btn
                >
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  color="deep-purple-accent-4"
                ></v-progress-linear>
              </div>
              <v-btn
                variant="text"
                class="mt-2 text-body-2 text-none"
                :loading="loading"
                @click="addPortf"
                >Sauvegarder</v-btn
              >
            </template>
            <template v-else>
              <div>
                <v-btn
                  color="blue-darken-4"
                  variant="tonal"
                  class="mt-2 text-none rounded-pill"
                  @click="dialog = true"
                  >Publier</v-btn
                >
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  color="deep-purple-accent-4"
                ></v-progress-linear>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" width="auto">
        <v-card
          width="400"
          prepend-icon="mdi-book-plus"
          title="Publier le modèle"
        >
          <template v-slot:text>
            <h4>Nom de modèle</h4>
            <v-text-field
              label="Label"
              variant="underlined"
              v-model="this.portfolioss.portfolios.nom"
            ></v-text-field>
          </template>
          <template v-slot:actions>
            <v-btn
              :loading="loading"
              class="ms-auto"
              text="Publier"
              @click="add"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <!-- nav bar modifier page  -->
    <!-- <v-app-bar elevation="1" height="40">
      <v-container fluid>
        //Page
        <v-row dense>
          <v-col cols="2" class="d-flex pa-2">
            <p class="mt-2">Page:</p>
            &nbsp; &nbsp;
            <v-select
              density="compact"
              variant="solo-filled"
              hide-details
              color="blue"
              bg-color="transparent"
              :items="[
                'Californiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
            ></v-select>
          </v-col>
          <v-divider vertical class="border-opacity-25 mx-3"></v-divider>
          //moblie & laptop
          <v-col cols="auto">
            <v-btn-toggle mandatory color="blue-lighten-3" v-model="toggle">
              <v-btn icon="mdi-laptop" value="laptop"></v-btn>
            </v-btn-toggle>
            <v-btn-toggle mandatory color="blue-lighten-3" v-model="toggle">
              <v-btn icon="mdi-cellphone" value="phone"></v-btn>
            </v-btn-toggle>
          </v-col>
          //domaine
          <v-divider vertical class="border-opacity-25 mx-3"></v-divider>
          <v-col cols="6" class="d-flex mt-1">
            <v-icon class="mt-2">mdi-web</v-icon> &nbsp;
            <a class="mt-2 text-decoration-none text-black">
              http://localhost:8080/portfolio/name
            </a>
          </v-col>
          <v-divider vertical class="border-opacity-25 mx-3"></v-divider>
        </v-row>
      </v-container>
    </v-app-bar> -->
    <!-- nav drawer -->
    <v-navigation-drawer
      temporary
      location="left"
      elevation="10"
      permanent
      width="480"
      v-model="drawer"
    >
    </v-navigation-drawer>
  </v-layout>
</template>

<style lang="scss" scoped></style>
