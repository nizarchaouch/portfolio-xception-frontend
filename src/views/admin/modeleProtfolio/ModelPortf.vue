<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideAdmin from "@/components/user/admin/SideAdmin.vue";
import CardTemplate from "@/components/template/CardTemplate.vue";
import PortfView from "@/views/admin/modeleProtfolio/PortfView.vue";
export default {
  name: "template",
  computed: {
    ...mapState(["user", "portfolioss"]),
    portfolioFirstPageLink() {
      return this.portfolioss.portfolios.pages.length > 0
        ? `/portfolio_${this.portfolioss.portfolios.nom}/${this.portfolioss.portfolios.pages[0].name}`
        : "";
    },
  },
  components: {
    NavBar,
    SideAdmin,
    CardTemplate,
    PortfView,
  },
  data: () => ({
    search: "",
    snackConf: false,
    deleteId: null,
  }),
  methods: {
    ...mapActions(["userAuth", "getAllModel", "deltModel"]),
    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    delet() {
      this.deltModel(this.deleteId);
      this.snackConf = false;
      setTimeout(() => {
        window.location.reload();
      }, 200);
    },
  },
  mounted() {
    this.userAuth();
  },
  async mounted() {
    await this.userAuth();
    await this.getAllModel();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur" ||
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("login");
    } else {
    }
  },
};
</script>
<template lang="">
  <v-snackbar
    v-model="snackConf"
    vertical
    location="center"
    color="light-blue-lighten-4"
    :timeout="-1"
  >
    <div class="text-subtitle-1 font-weight-bold pa-2">
      Voulez-vous vraiment supprimer ce modèle ?
    </div>

    <p class="text-medium-emphasis">
      <v-icon>mdi-alert-octagon-outline</v-icon> cette action ne peut pas ètre
      annulée
    </p>

    <template v-slot:actions>
      <v-btn variant="text" @click="snackConf = false"> Non </v-btn>
      <v-btn color="white" variant="tonal" class="mx-3 bg-red" @click="delet()">
        Oui
      </v-btn>
    </template>
  </v-snackbar>
  <NavBar hidea=" " />
  <SideAdmin />
  <v-container class="mt-16" fluid>
    <v-col cols="12" lg="10" offset-lg="2">
      <v-card>
        <v-data-iterator
          :items="portfolioss.modelPort"
          :items-per-page="6"
          :search="search"
        >
          <template v-slot:header>
            <v-toolbar class="pa-2">
              <v-text-field
                v-model="search"
                density="comfortable"
                placeholder="Recherche"
                prepend-inner-icon="mdi-magnify"
                style="max-width: 300px"
                variant="solo"
                clearable
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                class="text-none"
                color="blue"
                variant="tonal"
                rounded
                prepend-icon="mdi-plus"
                :to="portfolioFirstPageLink"
              >
                Ajouter
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:default="{ items }">
            <v-container class="pa-2" fluid>
              <v-row dense>
                <v-col v-for="item in items" :key="item.title" cols="12" md="4">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card class="mb-6" border flat v-bind="props">
                      <div style="overflow: hidden; width: 100%; height: 250px">
                        <iframe
                          :src="`http://localhost:8080/Model.${item.raw.nom}/page%201id=${item.raw._id}`"
                          style="
                            transform: scale(0.4);
                            transform-origin: 0 0;
                            width: 256.8%;
                            height: 620px;
                          "
                        ></iframe>
                      </div>
                      <v-overlay
                        :model-value="isHovering"
                        class="align-center justify-center"
                        scrim
                        contained
                      >
                        <v-btn
                          variant="flat"
                          class="text-none d-flex align-center ma-2 mx-auto rounded-pill"
                          size="large"
                          color="#5865f2"
                        >
                          Modifier
                        </v-btn>
                        <v-btn
                          variant="outlined"
                          class="text-none d-flex align-center ma-2 mx-auto rounded-pill"
                          size="large"
                          color="white"
                          target="_blank"
                          :to="{
                            name: 'voirModel',
                            params: {
                              nom: item.raw.nom,
                              page: 'page',
                              id: item.raw._id,
                            },
                          }"
                        >
                          Voir
                        </v-btn>
                      </v-overlay>
                    </v-card>
                  </v-hover>

                  <v-list-item class="mb-2">
                    <div>
                      <v-btn
                        color="red"
                        variant="text"
                        size=""
                        @click="confirmDeletionDialog(item.raw._id)"
                      >
                        <v-icon color="red" size="x-large" class="mb-1"
                          >mdi-delete-circle</v-icon
                        >
                      </v-btn>
                      {{ item.raw.nom }}
                    </div>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="mdi-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              ></v-btn>

              <div class="mx-2 text-caption">
                Page {{ page }} sur {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="mdi-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              ></v-btn>
            </div>
          </template>
        </v-data-iterator>
      </v-card>
    </v-col>
  </v-container>
</template>
