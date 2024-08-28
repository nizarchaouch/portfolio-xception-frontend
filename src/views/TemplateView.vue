<script>
import NavBar from "@/components/public/NavBar.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "template",
  components: {
    NavBar,
  },
  computed: {
    ...mapState(["user", "portfolioss"]),
    portfolioFirstPageLink() {
      return this.portfolioss.portfolios.pages.length > 0
        ? `/portfolio_${this.portfolioss.portfolios.nom}/${this.portfolioss.portfolios.pages[0].name}`
        : "";
    },
  },
  methods: {
    ...mapActions(["userAuth", "getAllModel"]),
  },
  async mounted() {
    await this.userAuth();
    await this.getAllModel();
  },
};
</script>
<template lang="">
  <NavBar />
  <v-container class="mt-16 px-xl-16" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="10" xl="8" class="ma-lg-9">
        <h1>Sélectionnez le template que vous aimez</h1>
      </v-col>
    </v-row>
    <v-card>
      <v-data-iterator
        :items="portfolioss.modelPort"
        :items-per-page="6"
        :search="search"
      >
        <template v-slot:header>
          <v-toolbar class="px-2">
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

                <v-list-item>
                  <p class="text-body-1 font-weight-bold">
                    {{ item.raw.nom }}
                  </p>
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
  </v-container>
</template>
