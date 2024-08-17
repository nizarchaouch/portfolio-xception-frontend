<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { secteurName } from "@/components/secteur";
import { cityName } from "@/components/city";
import NavBar from "@/components/public/NavBar.vue";
import SideAdmin from "@/components/user/admin/SideAdmin.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
import AddRecu from "@/components/user/admin/recruteur/AddRecu.vue";
export default {
  components: {
    NavBar,
    SideAdmin,
    DialogDetail,
    DialogModifier,
    AddRecu,
  },
  computed: {
    ...mapState(["user", "offer", "candOffer", "profilRec"]),
    ...mapGetters(["offerCount", "latestOffers", "getrecu", "recuCount"]),
    userData() {
      return this.user.userData;
    },
    offerData() {
      return this.offer.offerData;
    },
    countApp() {
      return this.candOffer.countApp || [];
    },

    filteredOffre() {
      let filtered = this.offerData;

      // Apply search filter
      if (this.search.trim() !== "") {
        filtered = filtered.filter((item) => {
          if (item && item.nomEntreprise && item.titre) {
            return (
              item.nomEntreprise
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              item.titre.toLowerCase().includes(this.search.toLowerCase())
            );
          }
          return false;
        });
      }

      // Apply sector filter only if selectedSecteur is not empty or null
      if (this.selectedSecteur && this.selectedSecteur.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedSecteur.includes(item.secteur)
        );
      }

      // Apply location filter only if selectedEmplacement is not empty or null
      if (this.selectedEmplacement && this.selectedEmplacement.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedEmplacement.includes(item.position)
        );
      }

      // Apply job type filter only if selectedType is not empty or null
      if (this.selectedType && this.selectedType.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedType.includes(item.typeOffer)
        );
      }

      if (this.selectedStartDate) {
        filtered = filtered.filter((item) => {
          const creationDate = new Date(item.date_creation);
          return creationDate >= new Date(this.selectedStartDate);
        });
      }

      if (this.selectedEndDate) {
        filtered = filtered.filter((item) => {
          const creationDate = new Date(item.date_creation);
          return creationDate <= new Date(this.selectedEndDate);
        });
      }

      return filtered;
    },
  },
  data() {
    return {
      secteurName,
      cityName,
      drawer: true,
      loading: false,
      snackConf: false,
      deleteId: null,
      offerCountRec: {},
      selectedSecteur: null,
      selectedEmplacement: null,
      selectedType: null,
      selectedStartDate: null,
      selectedEndDate: null,
      selectedStatut: "Tous",
      search: "",
      sortBy: [],
      typeEmploi: [
        "CDI",
        "CDD",
        "CIVP",
        "Karama",
        "Temps plein",
        "Saisonnier",
        "Freelance / Indépendant",
        "Temps partiel",
        "Stage",
      ],
      headers: [
        {
          key: "nomEntreprise",
          title: "Titre d'emploi",
        },
        { key: "emploi", title: "Candidature" },
        { key: "date_creation", title: "Date de création" },
        { key: "date_expiration", title: "Date d'expiration" },
        { key: "secteur", title: "Secteur" },
        { key: "typeOffer", title: "Type d'emploi" },
        { title: "Action", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "showOffer",
      "showOfferRec",
      "getOfferApp",
      "delOffer",
      "getRecruteurs",
      "updated",
      "updateVerif",
      "deltRecu",
    ]),
    ...mapMutations(["RestCountApp"]),
    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    delet() {
      this.delOffer(this.deleteId);
      this.snackConf = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    extractOfferIds() {
      this.RestCountApp();
      this.offerIds = this.offerData.map((offer) => offer._id);
      this.offerIds.forEach((id) => {
        this.getOfferApp(id);
      });
    },
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur" ||
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("login");
    } else {
      setTimeout(() => {
        this.extractOfferIds();
      }, 10);
      this.getRecruteurs();
      this.showOffer();
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="1000"
    :color="profilRec.color"
    v-model="profilRec.alert"
    location="top"
  >
    {{ profilRec.message }}
  </v-snackbar>
  <!-- snackbar confirme -->
  <v-snackbar
    v-model="snackConf"
    vertical
    location="center"
    color="light-blue-lighten-4"
    :timeout="-1"
  >
    <div class="text-subtitle-1 font-weight-bold pa-2">
      Voulez-vous vraiment supprimer cette offre ?
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
  <NavBar :hidea="' '" />
  <SideAdmin />
  <v-container fluid class="h-screen" style="background-color: #f2f7ff">
    <v-col cols="12" lg="10" offset-lg="1">
      <v-row class="mt-12">
        <v-col cols="12" offset-lg="1">
          <v-card flat border>
            <v-card-title class="d-flex align-center pe-2">
              <v-row no-gutters>
                <v-col cols="12" class="d-flex justify-space-between pa-2">
                  <h3 class="mb-6 mt-2">
                    Liste d'emplois
                    <span class="text-grey-darken-2">({{ offerCount }})</span>
                  </h3>
                  <!-- <AddRecu :role="true" /> -->
                  <DialogModifier :role="true" />
                </v-col>
                <v-col cols="10" md="2" class="mb-2">
                  <h5 class="ms-1">Recherche</h5>
                  <v-text-field
                    v-model="search"
                    color="blue"
                    placeholder="Recherche"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="compact"
                    hide-details
                    single-line
                  ></v-text-field>
                </v-col>
                <v-col cols="10" md="2" class="ps-md-2">
                  <h5 class="ms-1">Secteur</h5>
                  <v-autocomplete
                    placeholder="Tous"
                    :items="secteurName"
                    v-model="selectedSecteur"
                    multiple
                    chips
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="10" md="2" class="ps-md-2">
                  <h5 class="ms-1">Emplacement</h5>
                  <v-autocomplete
                    placeholder="Tous"
                    :items="cityName"
                    v-model="selectedEmplacement"
                    multiple
                    chips
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="10" md="2" class="ps-md-2">
                  <h5 class="ms-1">Type d'emploi</h5>
                  <v-autocomplete
                    placeholder="Tous"
                    :items="typeEmploi"
                    v-model="selectedType"
                    multiple
                    chips
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="10" md="2" class="ps-md-2">
                  <h5 class="ms-1">Date de début</h5>
                  <v-text-field
                    v-model="selectedStartDate"
                    type="Date"
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>
                <v-col cols="10" md="2" class="ps-md-2">
                  <h5 class="ms-1">Date de fin</h5>
                  <v-text-field
                    v-model="selectedEndDate"
                    type="Date"
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              v-model:sort-by="sortBy"
              :loading="loading"
              :headers="headers"
              :items="filteredOffre"
              :search="search"
              hover
              style="border: 1px solid #e0e0e0"
            >
              <template
                v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }"
              >
                <tr style="background-color: #435ebe" class="text-white">
                  <template v-for="column in columns" :key="column.key">
                    <td>
                      <span
                        class="cursor-pointer font-weight-bold ms-2"
                        @click="() => toggleSort(column)"
                        >{{ column.title }}</span
                      >
                      <template v-if="isSorted(column)">
                        <v-icon :icon="getSortIcon(column)"></v-icon>
                      </template>
                    </td>
                  </template>
                </tr>
              </template>
              <!--  -->
              <template v-slot:item="{ item }">
                <tr>
                  <td
                    class="text-subtitle-1 font-weight-bold pa-1 overflow-hidden"
                    style="width: 20%"
                  >
                    <v-row no-gutters>
                      <v-col cols="auto">
                        <v-avatar
                          size="small"
                          class="my-1 mt-2 mx-1"
                          :image="'http://localhost:8000' + item.logo"
                        >
                        </v-avatar>
                      </v-col>
                      <v-col cols="10">
                        <span>
                          {{ item.titre }}
                          <p class="text-caption text-medium-emphasis ms-1">
                            {{ item.nomEntreprise }} - {{ item.position }}
                          </p>
                        </span>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="text-subtitle-1" style="width: 10%">
                    <v-btn variant="text" class="text-none" size="">
                      <v-icon>mdi-account-multiple</v-icon>
                      <template v-for="app in countApp" :key="app.id">
                        <span v-if="app.id === item._id">
                          {{ app.count }} Applications
                        </span>
                      </template>
                    </v-btn>
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-5"
                    style="width: 10%"
                  >
                    {{ item.date_creation.split("T")[0] }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-5"
                    style="width: 10%"
                  >
                    {{ item.date_expiration.split("T")[0] }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-6"
                    style="width: 15%"
                  >
                    {{ item.secteur }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-6"
                    style="width: 10%"
                  >
                    {{ item.typeOffer }}
                  </td>
                  <td style="width: 12%">
                    <div class="d-flex">
                      <!-- btn voir profil -->
                      <DialogDetail :obj="item" :tab="true" />
                      <!-- setting -->
                      <DialogModifier :obj="item" :tab="true" />
                      <v-btn
                        variant="plain"
                        class="mt-1"
                        icon
                        @click="confirmDeletionDialog(item._id)"
                      >
                        <v-icon size="30" color="red"
                          >mdi-delete-outline</v-icon
                        >
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<style lang="scss" scoped></style>
