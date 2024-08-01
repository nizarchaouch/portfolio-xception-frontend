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

    filteredRecu() {
      let filtered = this.getrecu;

      // Apply search filter
      if (this.search.trim() !== "") {
        filtered = filtered.filter((item) => {
          if (item) {
            return (
              item.nomEntreprise
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              item.identifiant
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              item.mail.toLowerCase().includes(this.search.toLowerCase())
            );
          } else {
            return false;
          }
        });
      }

      // Apply sector filter only if selectedSecteur is not empty or null
      if (this.selectedSecteur && this.selectedSecteur.length > 0) {
        filtered = filtered.filter((item) =>
          this.selectedSecteur.includes(item.secteur)
        );
      }

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
          key: "nomEntreprise",
          title: "Nom de l'entreprise",
        },
        { key: "emploi", title: "Emploi" },
        { key: "secteur", title: "Secteur" },
        { key: "adress", title: " Emplacement" },
        { key: "fondee", title: "Fondée en" },
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
      "getRecruteurs",
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
        this.extractOfferRec();
      }, 10);
      this.getRecruteurs();
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
      Voulez-vous vraiment supprimer cette recruteur ?
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
                    Liste d'entreprises
                    <span class="text-grey-darken-2">({{ recuCount }})</span>
                  </h3>
                  <AddRecu :role="true" />
                </v-col>
                <v-col cols="10" md="3" class="mb-2">
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
                <v-col cols="10" md="2" class="ms-md-5">
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
                <v-col cols="10" md="2" class="ms-md-5">
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
                <v-col cols="10" md="2" class="ms-md-5">
                  <h5 class="ms-1">Vérification de l'E-mail</h5>
                  <v-select
                    :items="['Tous', 'vérifié', 'non vérifié']"
                    v-model="selectedVerif"
                    color="blue"
                    variant="outlined"
                    density="compact"
                  ></v-select>
                </v-col>
                <v-col cols="10" md="2" class="ms-md-5">
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
              :items="filteredRecu"
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
                          class="my-1 mx-1"
                          :image="'http://localhost:8000' + item.logoPath"
                        >
                        </v-avatar>
                      </v-col>
                      <v-col cols="8">
                        <span>
                          {{ item.nomEntreprise }}
                          <p class="text-caption text-medium-emphasis">
                            {{ item.mail }}
                          </p>
                        </span>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="text-subtitle-1" style="width: 7%">
                    {{ offerCountRec[item._id] }} emplois
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-5"
                    style="width: 15%"
                  >
                    {{ item.secteur }}
                  </td>
                  <td
                    class="text-subtitle-1 text-medium-emphasis ps-5"
                    style="width: 7%"
                  >
                    {{ item.adress }}
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis ps-6">
                    {{ item.fondee }}
                  </td>
                  <td class="text-subtitle-1" style="width: 15%">
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
                    style="width: 15%"
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
                  <td style="width: 12%">
                    <div class="d-flex">
                      <!-- btn voir profil -->
                      <v-btn
                        class="text-none mt-2"
                        variant="text"
                        append-icon="mdi-chevron-right"
                        color="light-blue-darken-4"
                        target="_blank"
                        :to="{
                          name: 'profilRec',
                          params: {
                            name: item.nomEntreprise,
                            id: item._id,
                          },
                        }"
                      >
                        <p class="text-subtitle-1 font-weight-bold">
                          Voir le profil
                        </p>
                      </v-btn>
                      <!-- setting -->
                      <AddRecu :obj="item" />
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
