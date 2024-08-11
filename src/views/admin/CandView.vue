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
import AddCand from "@/components/user/admin/candidat/AddCand.vue";
export default {
  components: {
    NavBar,
    SideAdmin,
    DialogDetail,
    DialogModifier,
    AddCand,
  },
  computed: {
    ...mapState(["user", "offer", "candOffer", "candidat"]),
    ...mapGetters(["offerCount", "latestOffers", "getcand", "candCount"]),
    offerData() {
      return this.offer.offerData;
    },
    countApp() {
      return this.candOffer.countApp || [];
    },

    filteredCand() {
      let filtered = this.getcand;

      // Apply search filter getCandidats
      if (this.search.trim() !== "") {
        filtered = filtered.filter((item) => {
          if (item) {
            return (
              item.nom.toLowerCase().includes(this.search.toLowerCase()) ||
              item.prenom.toLowerCase().includes(this.search.toLowerCase()) ||
              item.mail.includes(this.search)
            );
          } else {
            return false;
          }
        });
      }

      // Apply sector filter only if selectedSecteur is not empty or null
      if (this.selectedEmplacement && this.selectedEmplacement.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedEmplacement.includes(item.adress)
        );
      }

      if (this.selectedVerif !== "Tous") {
        const verif = this.selectedVerif === "vérifié";
        filtered = filtered.filter((item) => item.verifier === verif);
      }

      if (this.selectedStatut !== "Tous") {
        const statut = this.selectedStatut === "activé";
        console.log(statut);
        filtered = filtered.filter((item) => item.statut === statut);
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
      selectedVerif: "Tous",
      selectedStatut: "Tous",
      search: "",
      sortBy: [],
      headers: [
        {
          key: "nom",
          title: "Nom et Prenom",
        },
        { key: "mail", title: "E-mail" },
        { key: "titre_emploi", title: "Role/Position " },
        { key: "adress", title: " Gouvernorat" },
        { title: "vérification de l'E-mail", sortable: false },
        { title: "Statut du compte", sortable: false },
        { title: "Action", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "showOfferRec",
      "getOfferApp",
      "delOffer",
      "getCandidats",
      "updated",
      "updateVerif",
      "deltRecu",
    ]),
    ...mapMutations(["RestCountApp"]),
    async extractOfferRec() {
      let recuIds = this.getrecu.map((recu) => recu._id);

      for (let id of recuIds) {
        await this.showOfferRec(id);
        //console.log(id);
        // console.log(this.offerCount);
        // this.offerCountRec.push(this.offerCount);
        this.offerCountRec[id] = this.offerCount;
      }
      // return offerCountRec;
    },

    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    delet() {
      this.deltRecu(this.deleteId);
      this.snackConf = false;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    changeEtat(id, verifier, statut) {
      const data = {
        id: id,
        verifier: verifier,
        statut: statut,
      };
      this.updateVerif(data);
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
        // this.extractOfferRec();
      }, 10);
      this.getCandidats();
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="1000"
    :color="candidat.color"
    v-model="candidat.alert"
    location="top"
  >
    {{ candidat.message }}
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
      Voulez-vous vraiment supprimer cette candidat ?
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
                <v-col cols="12" sm="10" xl="11" class="pa-2">
                  <h3 class="mb-6 mt-2">
                    Liste des candidats
                    <span class="text-grey-darken-2">({{ candCount }})</span>
                  </h3>
                </v-col>
                <v-col cols="12" sm="2" xl="1" class="pa-2">
                  <AddCand :role="true" />
                </v-col>
                <v-col cols="9" md="3" class="mb-2">
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
                <v-col cols="9" md="2" class="ms-md-5">
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
                <v-col cols="9" md="2" class="ms-md-5">
                  <h5 class="ms-1">Vérification de l'E-mail</h5>
                  <v-select
                    :items="['Tous', 'vérifié', 'non vérifié']"
                    v-model="selectedVerif"
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-select>
                </v-col>
                <v-col cols="9" md="2" class="ms-md-5">
                  <h5 class="ms-1">Statut du compte</h5>
                  <v-select
                    :items="['Tous', 'activé', 'désactivé']"
                    v-model="selectedStatut"
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              v-model:sort-by="sortBy"
              :loading="loading"
              :headers="headers"
              :items="filteredCand"
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
                  >
                    <v-row no-gutters>
                      <v-col cols="auto">
                        <v-avatar
                          size="large"
                          class="my-1 ms-1"
                          :image="'http://localhost:8000' + item.imagePath"
                        >
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto" class="pt-3 ps-2">
                        <span> {{ item.nom }} {{ item.prenom }} </span>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="text-subtitle-1" style="width: 15%">
                    {{ item.mail }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-5"
                    style="width: 17%"
                  >
                    {{ item.titre_emploi }}
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis ps-5">
                    {{ item.adress }}
                  </td>
                  <td class="text-subtitle-1" style="width: 13%">
                    <v-switch
                      hide-details
                      inset
                      color="green"
                      v-model="item.verifier"
                      @change="changeEtat(item._id, item.verifier, item.statut)"
                    >
                      <template v-slot:label>
                        <p class="text-black hidden-md-and-down">
                          {{ item.verifier ? "vérifié" : "non vérifié" }}
                        </p>
                      </template>
                    </v-switch>
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis"
                    style="width: 13%"
                  >
                    <v-switch
                      hide-details
                      inset
                      color="green"
                      v-model="item.statut"
                      @change="changeEtat(item._id, item.verifier, item.statut)"
                    >
                      <template v-slot:label>
                        <p class="text-black hidden-md-and-down">
                          {{ item.statut ? "activé" : "désactivé" }}
                        </p>
                      </template>
                    </v-switch>
                  </td>
                  <td style="width: 10%">
                    <div class="d-flex">
                      <!-- btn voir profil -->
                      <v-btn
                        class="text-none mt-2"
                        variant="text"
                        append-icon="mdi-chevron-right"
                        color="light-blue-darken-4"
                        target="_blank"
                        :to="{
                          name: 'ProfilCand',
                          params: {
                            id: item._id,
                          },
                        }"
                      >
                        <p class="text-subtitle-1 font-weight-bold">
                          Voir le profil
                        </p>
                      </v-btn>
                      <!-- setting -->
                      <AddCand :obj="item" />
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
