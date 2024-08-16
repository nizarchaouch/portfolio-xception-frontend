<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
export default {
  components: { NavBar, SideBar, DialogDetail, DialogModifier },
  computed: {
    ...mapState(["user", "offer", "candOffer"]),
    ...mapGetters(["latestOffers", "offerCount"]),
    userData() {
      return this.user.userData;
    },
    offerData() {
      return this.offer.offerData;
    },
    countApp() {
      return this.candOffer.countApp || [];
    },
    AppPerMonth() {
      return this.candOffer.AppPerMonth;
    },
  },
  data() {
    return {
      drawer: true,
      snackConf: false,
      deleteId: null,
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "initializeChart",
      "showOfferRec",
      "getOfferApp",
      "delOffer",
    ]),
    ...mapMutations(["RestCountApp"]),
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

    OffersPerMonth() {
      const offersPerMonth = new Array(12).fill(0);
      this.offerData.forEach((offer) => {
        const month = new Date(offer.date_creation).getMonth() + 1;
        offersPerMonth[month]++;
      });
      return (this.offersPerMonth = offersPerMonth);
      // console.log(offersPerMonth);
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
      setTimeout(() => {
        this.initializeChart({
          offer: this.OffersPerMonth(),
          applique: this.AppPerMonth,
        });
      }, 10);
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
  <NavBar hidea=" " />
  <SideBar />
  <v-container class="bg-white" fluid>
    <v-row class="mt-16">
      <v-col cols="12" lg="9" xl="10" offset-lg="2">
        <v-row no-gutters>
          <v-col cols="12">
            <h3 class="text-capitalize">
              hello, {{ userData.civilite === "homme" ? "Mr" : "Ms" }}
              {{ userData.prenom + " " + userData.nom }}
            </h3>
          </v-col>
          <v-col cols="12">
            <span>
              Voici vos activités quotidiennes et vos opportunités de carrière
            </span>
          </v-col>
        </v-row>
        <!-- cards -->
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-sheet
              :max-height="105"
              :max-width="320"
              class="ma-3 mx-auto"
              color="#90c1f2b6"
              rounded="lg"
              elevation="3"
            >
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-row>
                      <h2 class="ms-4 mt-4">{{ offerCount }}</h2>
                    </v-row>
                    <v-row>
                      <span class="ms-4 text-body-2 text-medium-emphasis"
                        >Offres d'emploi</span
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-icon size="45" class="mt-3" color="blue"
                      >mdi-briefcase-variant-outline</v-icon
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-sheet
              :max-height="105"
              :max-width="320"
              class="ma-3 rounded-lg mx-auto"
              color="#fdf1d7"
              elevation="3"
            >
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-row>
                      <h2 class="ms-4 mt-4">
                        {{ this.candOffer.totalCandOffers }}
                      </h2>
                    </v-row>
                    <v-row>
                      <span class="ms-4 text-body-2 text-medium-emphasis"
                        >Candidats</span
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-icon size="45" class="mt-3" color="orange"
                      >mdi-card-account-details-outline</v-icon
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-sheet
              :max-height="105"
              :max-width="320"
              class="ma-3 rounded-lg mx-auto"
              color="#ffdbdb"
              elevation="3"
            >
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-row>
                      <h2 class="ms-4 mt-4">
                        {{ this.candOffer.totalCandWait }}
                      </h2>
                    </v-row>
                    <v-row>
                      <span class="ms-4 text-body-2 text-medium-emphasis"
                        >Candidats en attente</span
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-icon size="45" class="mt-3" color="red"
                      >mdi-account-clock</v-icon
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- charts -->
        <v-row class="mt-10">
          <v-col cols="12" md="8">
            <v-sheet class="rounded-lg pa-3 ma-3" rounded border>
              <h4>Offre et candidature par mois</h4>
              <canvas
                id="myChart"
                style="width: 100%; max-height: 400px"
              ></canvas>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="4">
            <v-sheet
              :width="auto"
              class="rounded-lg mx-auto pa-3 ma-3"
              rounded
              border
            >
              <h4>Type d'offres</h4>
              <canvas
                id="myChart2"
                style="max-width: 500px; max-height: 400px"
              ></canvas>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- tableau emploi -->
        <v-row>
          <v-col cols="12" class="d-flex justify-space-between px-14">
            <h4>Emplois récents</h4>
            <v-btn
              variant="plain"
              class="text-none"
              append-icon="mdi-arrow-right"
              :ripple="false"
              to="MesEmplois"
              >Voir tout</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="mb-16" no-gutters>
          <v-col cols="12" class="px-5">
            <v-table hover>
              <thead>
                <tr  class="bg-blue-lighten-4">
                  <th class="text-left" style="width: 30%">Emploi</th>
                  <th class="text-left" style="width: 20%">Date de création</th>
                  <th class="text-left" style="width: 20%">Applications</th>
                  <th class="text-left ps-14">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in latestOffers" :key="item.name">
                  <td class="text-subtitle-1 font-weight-bold">
                    {{ item.titre }}
                  </td>
                  <td class="text-subtitle-1">
                    Publié: {{ item.date_creation.split("T")[0] }}
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis">
                    <v-icon>mdi-account-multiple</v-icon>
                    <template v-for="app in countApp" :key="app.id">
                      <span v-if="app.id === item._id">
                        {{ app.count }} Applications
                      </span>
                    </template>
                  </td>
                  <td>
                    <div class="d-flex">
                      <!-- btn voir candidats -->
                      <v-btn
                        class="pa-3 ma-3 text-none responsive-"
                        width="282"
                        height="51"
                        variant="tonal"
                        color="light-blue-darken-4"
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
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
