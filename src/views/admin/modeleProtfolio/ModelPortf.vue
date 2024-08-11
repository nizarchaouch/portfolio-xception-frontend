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
    portfolioView() {
      // this.portfolioss.portfolios = this.portfolioss.modelPort[0];
      return `/portfolio_${this.portfolioss.modelPort[0].nom}/${this.portfolioss.modelPort[0].pages[0].name}`;
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
    games: [
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png",
        title: "Template 1",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png",
        title: "Template 2",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png",
        title: "Template 3",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png",
        title: "Template 4",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png",
        title: "Template 5",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png",
        title: "Template 6",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png",
        title: "Template 7",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png",
        title: "Template 8",
      },
    ],
  }),
  methods: {
    ...mapActions(["userAuth", "getAllModel"]),
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
  <NavBar hidea=" " />
  <SideAdmin />
  <v-container class="mt-16" fluid>
    <v-col cols="12" lg="10" offset-lg="2">
      <v-card>
        <!-- <iframe src="/" width="500" height="250" frameborder="0"></iframe> -->
        <!-- {{this.portfolioss.modelPort[0]}} -->
        <v-data-iterator :items="games" :items-per-page="6" :search="search">
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
                      <v-img :src="item.raw.img"></v-img>
                      <v-overlay
                        :model-value="isHovering"
                        class="align-center justify-center"
                        scrim
                        contained
                      >
                        <v-btn
                          variant="flat"
                          class="text-none d-flex align-center ma-2 rounded-pill"
                          size="large"
                          color="#5865f2"
                        >
                          Modifier
                        </v-btn>
                        <v-btn
                          variant="outlined"
                          class="text-none d-flex align-center ma-2 ms-6 rounded-pill"
                          size="large"
                          color="white"
                          :to="portfolioView"
                        >
                          Voir
                        </v-btn>
                      </v-overlay>
                    </v-card>
                  </v-hover>

                  <v-list-item class="mb-2">
                    <div>
                      <v-btn color="red" variant="text" size="">
                        <v-icon color="red" size="x-large" class="mb-1"
                          >mdi-delete-circle</v-icon
                        >
                      </v-btn>
                      {{ item.raw.title }}
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
