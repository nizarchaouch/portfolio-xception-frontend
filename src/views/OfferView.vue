<script>
import { mapState, mapActions } from "vuex";
import DialogDetail from "@/components/offer/DialogDetail.vue";
import NavBar from "@/components/public/NavBar.vue";
import FilterOffer from "@/components/offer/FilterOffer.vue";
export default {
  name: "offer",
  components: {
    NavBar,
    DialogDetail,
    FilterOffer,
  },
  computed: {
    ...mapState(["offer", "candOffer"]),
    offerShow() {
      return this.offer.offerData;
    },
    filteredOffers() {
      let filtered = this.offerShow;

      // Appliquer le filtre par recherche
      if (this.search.trim() !== "") {
        filtered = filtered.filter((item) => {
          if (item) {
            return (
              item.nomEntreprise
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              item.titre.toLowerCase().includes(this.search.toLowerCase()) ||
              item.description.toLowerCase().includes(this.search.toLowerCase())
            );
          } else {
            return false;
          }
        });
      }

      // Appliquer le filtre par localite, typeContrat, langue
      if (this.filter.localite.length > 0) {
        filtered = filtered.filter((item) =>
          this.filter.localite.includes(item.position)
        );
      }

      if (this.filter.typeContrat.length > 0) {
        filtered = filtered.filter((item) =>
          this.filter.typeContrat.includes(item.typeOffer)
        );
      }

      if (this.filter.langue.length > 0) {
        filtered = filtered.filter((item) =>
          this.filter.langue.includes(item.langue)
        );
      }

      if (this.filter.genre.length > 0) {
        filtered = filtered.filter((item) =>
          this.filter.genre.includes(item.genre)
        );
      }

      return filtered;
    },
  },
  data: () => ({
    toggle: "card",
    search: "",
    tab: 1,
    filter: { localite: [], typeContrat: [], langue: [], genre: [] },
  }),
  methods: {
    ...mapActions(["userAuth", "showOffer"]),
    updateFilter(newFilter) {
      this.filter = newFilter;
    },
  },
  mounted() {
    this.userAuth();
    this.showOffer();
  },
};
</script>

<template>
  <v-snackbar
    :timeout="2000"
    :color="candOffer.color"
    v-model="candOffer.alert"
    location="top"
  >
    {{ candOffer.message }}
  </v-snackbar>
  <NavBar />
  <v-card class="mt-16 bg-transparent" flat>
    <v-data-iterator
      :items="filteredOffers"
      :items-per-page="6"
      :search="search"
    >
      <template v-slot:header>
        <v-container fluid>
          <v-row class="mt-4">
            <!-- filter -->
            <v-col cols="12" sm="2" lg="2">
              <FilterOffer @filter-update="updateFilter" />
            </v-col>
            <!-- cherche -->
            <v-col cols="12" md="8">
              <v-text-field
                v-model="search"
                density="comfortable"
                placeholder="Chercher"
                prepend-inner-icon="mdi-magnify"
                variant="solo"
                style="border: 1px solid blue"
                class="rounded-pill"
                rounded="xl"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="2" align-self="end">
              <v-btn-toggle
                mandatory
                v-model="toggle"
                class="float-right d-none d-sm-flex"
                color="blue"
              >
                <v-btn icon="mdi-apps" value="card"></v-btn>
                <v-btn
                  icon="mdi-format-list-bulleted-square"
                  value="list"
                ></v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid v-if="toggle === 'card'">
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.title"
              cols="12"
              sm="6"
              md="6"
              lg="4"
            >
              <v-card
                class="mb-6 rounded-xl"
                border
                flat
                style="border: 1px solid gray"
              >
                <v-list-item>
                  <v-banner
                    class="text-h6"
                    :avatar="'http://localhost:8000' + item.raw.logo"
                    lines="one"
                    :text="item.raw.nomEntreprise"
                  ></v-banner>
                  <v-banner class="text-h6" lines="one" :text="item.raw.titre">
                  </v-banner>
                  <v-banner
                    lines="three"
                    :text="item.raw.description"
                  ></v-banner>
                  <div class="d-flex justify-space-around mt-3">
                    <p>
                      <v-icon class="me-2">mdi-calendar-range</v-icon
                      >{{ item.raw.date_creation.split("T")[0] }}
                    </p>
                    <p>
                      <v-icon class="pb-1">mdi-map-marker</v-icon
                      >{{ item.raw.position }}
                    </p>
                  </div>
                  <div class="float-right">
                    <DialogDetail :obj="item" />
                  </div>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else class="pa-2" value="list">
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.title"
              cols="12"
              lg="10"
              xl="8"
              class="mx-auto"
            >
              <v-card class="mb-6 rounded-shaped" border>
                <v-list-item class="mb-2">
                  <v-banner
                    class="text-h6"
                    :avatar="'http://localhost:8000' + item.raw.logo"
                    lines="one"
                    :text="item.raw.nomEntreprise"
                  ></v-banner>
                  <v-banner class="text-h6" lines="one" :text="item.raw.titre">
                  </v-banner>
                  <v-banner
                    lines="three"
                    :text="item.raw.description"
                  ></v-banner>
                  <div class="d-flex justify-space-between mt-3">
                    <p>
                      <v-icon class="me-2">mdi-calendar-range</v-icon
                      >{{ item.raw.date_creation.split("T")[0] }}
                    </p>
                    <p>
                      <v-icon>mdi-google-maps</v-icon>{{ item.raw.position }}
                    </p>
                    <div class="float-right">
                      <DialogDetail :obj="item" />
                    </div>
                  </div>
                </v-list-item>
              </v-card>
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
</template>
<style lang="scss"></style>
