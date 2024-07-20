<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
export default {
  name: "candidatures",
  computed: {
    ...mapState(["user", "candidat", "candOffer"]),
  },
  data: () => ({
    items: [],
    selectedEtat: "Tous",
    search: "",
  }),
  components: {
    NavBar,
  },

  methods: {
    ...mapActions([
      "userAuth",
      "updated",
      "getAll",
      "delOffer",
      "deleteCandOffer",
    ]),

    updateItemsData() {
      this.items = this.candOffer.candData
        .map((item, index) => {
          const info = this.candOffer.infoData[index];
          if (info) {
            return {
              img: info.logo || "",
              nomEntreprise: info.nomEntreprise || "",
              titre: info.titre || "No title",
              date: item.date.split("T")[0],
              etat: item.etat,
              reponse: item.etat,
            };
          } else {
            this.deleteCandOffer(item._id);
            return null;
          }
        })
        .filter((item) => item !== null); // Filter out any null entries
    },

    filterItems() {
      return this.items.filter((item) => {
        const matchEtat =
          this.selectedEtat === "Tous" || item.etat === this.selectedEtat;
        const matchSearch = item.titre
          .toLowerCase()
          .includes(this.search.toLowerCase());
        return matchEtat && matchSearch;
      });
    },
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur" ||
      this.user.userData.role === "admin"
    ) {
      this.$router.push("login");
    } else {
      await this.getAll(this.user.userData._id);
      this.updateItemsData();
    }
  },
};
</script>
<template>
  <NavBar />
  <!-- Candidatures envoyées -->
  <v-container class="mt-16" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="10" xl="8" class="mx-auto">
        <h1>Candidatures envoyées</h1>
        <span
          >Vos candidatures envoyées à l'aide de la fonctionnalité postuler sont
          répertoriées ici.</span
        >
      </v-col>
    </v-row>
    <!-- card candid -->
    <v-sheet
      height="auto"
      max-width="1250"
      class="mx-auto pa-1 mt-3"
      rounded="xl"
    >
      <v-row class="ma-6" justify="center">
        <v-col cols="12" sm="4">
          <!-- cherhcer -->
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Recherche"
            append-inner-icon="mdi-magnify"
            style="max-width: 300px; border: 1px solid blue"
            variant="solo"
            class="rounded-pill"
            rounded="xl"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-select
            label="Etat"
            density="comfortable"
            :items="['Tous', 'En Attend', 'Accepte', 'Refuser']"
            v-model="selectedEtat"
            variant="outlined"
            style="max-width: 300px"
            color="indigo"
            class="ms-md-auto text-indigo-darken-4"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h2 class="text-center mb-6" v-if="filterItems().length === 0">
            Aucune candidature correspondante trouvée.
          </h2>
          <v-expansion-panels
            class="mb-6"
            v-for="(item, index) in filterItems()"
            :key="index"
            v-else
          >
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-avatar
                  :image="'http://localhost:8000' + item.img"
                  class="me-2 me-4"
                  size="x-large"
                ></v-avatar>
                <div>
                  <p>
                    {{ item.nomEntreprise }}
                  </p>
                  <br />
                  <p>
                    {{ item.titre }}
                  </p>
                  <br />
                  <p>{{ item.date }}</p>
                </div>
                <template v-slot:actions>
                  <v-chip
                    class="text-capitalize"
                    color="deep-orange-darken-1"
                    variant="outlined"
                    v-if="item.etat === 'En Attend'"
                  >
                    <v-icon icon="mdi-timer-sand-complete" start></v-icon>
                    {{ item.etat }}
                  </v-chip>
                  <v-chip
                    class="text-capitalize"
                    color="green"
                    variant="outlined"
                    v-else-if="item.etat === 'Accepte'"
                  >
                    <v-icon icon="mdi-check-circle" start></v-icon>
                    {{ item.etat }}
                  </v-chip>
                  <v-chip
                    class="text-capitalize"
                    color="error"
                    variant="outlined"
                    v-else
                  >
                    <v-icon icon="mdi-alert-circle" start></v-icon>
                    {{ item.etat }}
                  </v-chip>
                  <v-icon icon="mdi-menu-down" class="mt-1"> </v-icon>
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text v-if="item.etat === 'En Attend'">
                <p class="text-h6">En Attend de réponse à votre demande</p>
              </v-expansion-panel-text>
              <v-expansion-panel-text v-else>
                <p class="text-h6">
                  {{ item.nomEntreprise }} répond à votre demande: accepte
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style lang="scss" scoped></style>
