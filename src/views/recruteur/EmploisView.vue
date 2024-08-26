<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
import VoirCandidateur from "@/components/user/recruteur/candidateur/VoirCandidateur.vue";
export default {
  components: {
    NavBar,
    SideBar,
    DialogDetail,
    DialogModifier,
    VoirCandidateur,
  },
  computed: {
    ...mapState(["user", "offer", "candOffer"]),
    ...mapGetters(["offerCount", "latestOffers"]),
    userData() {
      return this.user.userData;
    },
    offerData() {
      return this.offer.offerData;
    },
    countApp() {
      return this.candOffer.countApp || [];
    },
  },
  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null,
      selectedEtat: null,
      search1: "",
      drawer: true,
      loading: false,
      snackConf: false,
      deleteId: null,
      search: "",
      sortBy: [{ key: "date_creation", order: "asc" }],
      headers: [
        {
          key: "titre",
          title: "Emploi",
        },
        { key: "date_creation", title: "Date de création" },
        { key: "Applications", title: "Applications" },
        { key: "Action", title: "Action", sortable: false },
      ],
      headersCandidat: [
        {
          key: "titre",
          title: "Nom et Prenom",
        },
        { key: "date_creation", title: "E-mail" },
        { key: "Applications", title: "Date de la demande" },
        { key: "Applications", title: "État" },
        { key: "Action", title: "Action", sortable: false },
      ],
      showJobList: true,
      selectedOffer: null,
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "showOfferRec",
      "getOfferApp",
      "delOffer",
      "getDataCand",
    ]),
    ...mapMutations(["RestCountApp"]),
    filteredCand() {
      let filtered = this.candOffer.candData;
      // Apply search filter
      if (this.search1.trim() !== "") {
        filtered = filtered.filter((item) => {
          if (item && item.nom && item.prenom) {
            return (
              item.nom.toLowerCase().includes(this.search1.toLowerCase()) ||
              item.prenom.toLowerCase().includes(this.search1.toLowerCase())
            );
          }
          return false;
        });
      }
      if (this.selectedEtat && this.selectedEtat.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedEtat.includes(item.etat)
        );
      }
      if (this.selectedStartDate) {
        filtered = filtered.filter((item) => {
          const creationDate = new Date(item.date);
          return creationDate >= new Date(this.selectedStartDate);
        });
      }
      if (this.selectedEndDate) {
        filtered = filtered.filter((item) => {
          const creationDate = new Date(item.date);
          return creationDate <= new Date(this.selectedEndDate);
        });
      }
      return filtered;
    },
    extractOfferIds() {
      this.RestCountApp();
      this.offerIds = this.offerData.map((offer) => offer._id);
      this.offerIds.forEach((id) => {
        this.getOfferApp(id);
      });
    },
    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    delet() {
      this.delOffer(this.deleteId);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    viewCandidates(offer) {
      this.selectedOffer = offer;
      this.showJobList = false;
      this.getDataCand(offer._id);
    },
    backToJobList() {
      this.showJobList = true;
      this.selectedOffer = null;
    },
  },
  async mounted() {
    await this.userAuth();

    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat" ||
      this.user.userData.role === "admin"
    ) {
      this.$router.push("login");
    } else {
      await this.showOfferRec(this.user.userData._id);
      this.extractOfferIds();
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="1000"
    color="blue-darken-2"
    v-model="offer.alert"
    location="top"
  >
    {{ offer.message }}
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
  <SideBar />
  <v-container fluid class="bg-white h-screen">
    <v-col cols="12" lg="10" offset-lg="1">
      <v-row class="mt-12">
        <v-col cols="12" offset-lg="1">
          <!-- Conditional Rendering for Job List -->
          <v-card flat v-if="showJobList">
            <v-card-title class="d-flex align-center pe-2">
              <v-row>
                <v-col cols="12" md="4">
                  <h3 class="mb-6 mt-2">
                    Mes emplois
                    <span class="text-grey-darken-2">({{ offerCount }})</span>
                  </h3>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    label="Titre d'emploi, description etc..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              v-model:sort-by="sortBy"
              :loading="loading"
              :headers="headers"
              :items="offerData"
              :search="search"
              hover
              style="border: 1px solid #e0e0e0"
            >
              <template
                v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }"
              >
                <tr class="bg-blue-lighten-4">
                  <template v-for="column in columns" :key="column.key">
                    <td>
                      <span
                        class="ms-3 cursor-pointer"
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
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-subtitle-1 font-weight-bold">
                    {{ item.titre }}
                  </td>
                  <td class="text-subtitle-1" style="width: 15%">
                    Publié: {{ item.date_creation.split("T")[0] }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis"
                    style="width: 15%"
                  >
                    <v-icon>mdi-account-multiple</v-icon> &thinsp;
                    <template v-for="app in countApp" :key="app.id">
                      <span v-if="app.id === item._id">
                        {{ app.count }} Applications
                      </span>
                    </template>
                  </td>
                  <td style="width: 10%">
                    <div class="d-flex">
                      <!-- btn voir candidats -->
                      <v-btn
                        class="pa-3 ma-3 text-none responsive-"
                        width="282"
                        height="51"
                        variant="tonal"
                        color="light-blue-darken-4"
                        @click="viewCandidates(item)"
                      >
                        <p class="text-subtitle-1 font-weight-bold">
                          Voir les candidatures
                        </p>
                      </v-btn>
                      <!-- setting -->
                      <v-btn variant="plain" class="float-end mt-4">
                        <v-icon size="30">mdi-cog-outline</v-icon>
                        <v-menu activator="parent">
                          <v-list>
                            <DialogDetail :obj="item" />
                            <DialogModifier :obj="item" />
                            <v-list-item
                              link
                              title="Supprimer"
                              prepend-icon="mdi-delete-empty"
                              @click="confirmDeletionDialog(item._id)"
                            ></v-list-item>
                          </v-list>
                        </v-menu>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>

          <!-- Conditional Rendering for Candidate List -->
          <v-card flat v-else>
            <v-card-title class="d-flex align-center pe-2 mb-2">
              <v-btn @click="backToJobList" icon variant="tonal">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <h3 class="ms-2">
                Candidatures pour "{{ selectedOffer.titre }}"
              </h3>
            </v-card-title>
            <!-- List of candidates for the selected offer -->
            <v-row class="mb-16" no-gutters>
              <!-- filter -->
              <v-row no-gutters>
                <v-col cols="10" md="2" class="ms-6">
                  <h5 class="ms-1">Recherche</h5>
                  <v-text-field
                    v-model="search1"
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
                  <h5 class="ms-1">État</h5>
                  <v-autocomplete
                    placeholder="Tous"
                    :items="['Accepte', 'En Attend', 'Refuser']"
                    v-model="selectedEtat"
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
              <!-- TABLEAU -->
              <v-col cols="12" class="px-5">
                <v-data-table
                  v-model:sort-by="sortBy"
                  :loading="loading"
                  :headers="headersCandidat"
                  :items="filteredCand()"
                  :search="search"
                  hover
                  style="border: 1px solid #e0e0e0"
                >
                  <template
                    v-slot:headers="{
                      columns,
                      isSorted,
                      getSortIcon,
                      toggleSort,
                    }"
                  >
                    <tr class="bg-blue-lighten-4">
                      <template v-for="column in columns" :key="column.key">
                        <td>
                          <span
                            class="ms-1 cursor-pointer"
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
                  <template v-slot:item="{ item }">
                    <tr>
                      <td class="text-subtitle-1 font-weight-bold">
                        <v-row no-gutters>
                          <v-col cols="auto">
                            <v-avatar
                              size="large"
                              class="my-1 mx-1"
                              :image="'http://localhost:8000' + item.imagePath"
                            >
                            </v-avatar>
                          </v-col>
                          <v-col cols="auto" class="pt-3">
                            {{ item.nom }} {{ item.prenom }}
                          </v-col>
                        </v-row>
                      </td>
                      <td class="text-subtitle-1">
                        {{ item.mail }}
                      </td>
                      <td class="text-subtitle-1">
                        {{ item.date.split("T")[0] }}
                      </td>
                      <td class="text-subtitle-1">
                        <v-icon
                          class="mb-1"
                          :color="
                            item.etat === 'En Attend'
                              ? 'orange'
                              : item.etat === 'Accepte'
                              ? 'green'
                              : 'red'
                          "
                          >mdi-circle</v-icon
                        >
                        {{ item.etat }}
                      </td>
                      <td style="width: 20%">
                        <div class="d-flex">
                          <!-- btn voir candidats
                          <v-btn
                            class="text-none me-2"
                            variant="tonal"
                            color="light-blue-darken-4"
                          >
                            <p class="text-subtitle-1 font-weight-bold">
                              Voir CV
                            </p>
                            <v-icon size="large">mdi-chevron-right</v-icon>
                          </v-btn> -->
                          <!--  -->
                          <VoirCandidateur :obj="item" />
                        </div>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<style lang="scss" scoped></style>
