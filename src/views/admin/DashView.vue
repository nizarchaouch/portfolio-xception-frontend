<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideAdmin from "@/components/user/admin/SideAdmin.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
import { secteurName } from "@/components/secteur";
export default {
  components: { NavBar, SideAdmin, DialogDetail, DialogModifier },
  computed: {
    ...mapState(["user", "offer", "candOffer", "profilRec", "candidat"]),
    ...mapGetters(["latestOffers", "offerCount", "candCount", "recuCount"]),
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
      drawer: true,
      snackConf: false,
      deleteId: null,
      cards: [
        {
          titre: "Total des candidats",
          icon: "mdi-account-group",
          color: "#9694ff",
          number: 0,
        },
        {
          titre: "Total des employeurs",
          icon: "mdi-domain",
          color: "#57caeb",
          number: 0,
        },
        {
          titre: "Total utilisateurs vérifiés",
          icon: "mdi-account-check",
          color: "#5ddab4",
          number: 0,
        },
        {
          titre: "Tous les emplois",
          icon: "mdi-briefcase",
          color: "#ff7976",
          number: 0,
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "initializeChartAdmin",
      "showOffer",
      "getOfferApp",
      "delOffer",
      "getCandidats",
      "getRecruteurs",
      "getLastUser",
    ]),
    ...mapMutations(["RestCountApp"]),
    typeParOffre() {
      const count = {};
      this.offerData.forEach((offre) => {
        if (count[offre.typeOffer]) {
          count[offre.typeOffer]++;
        } else {
          count[offre.typeOffer] = 1;
        }
      });
      return count;
    },
    offresParSecteur() {
      const count = {};
      secteurName.forEach((secteur) => {
        count[secteur] = 0;
      });

      this.offerData.forEach((offre) => {
        if (count[offre.secteur]) {
          count[offre.secteur]++;
        } else {
          count[offre.secteur] = 1;
        }
      });

      return count;
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
    updateCards() {
      const count= this.profilRec.recuVerif + this.candidat.candVerif
      this.cards[0].number = this.candCount;
      this.cards[1].number = this.recuCount;
      this.cards[2].number = count ;
      this.cards[3].number = this.offerCount;
    },
  },
  async mounted() {
    await this.userAuth();
    setTimeout(() => {}, 15);
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur" ||
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("login");
    } else {
      setTimeout(() => {
        this.extractOfferIds();
        this.initializeChartAdmin({
          offresParSecteur: this.offresParSecteur(),
          typeParOffre: this.typeParOffre(),
        });
        this.updateCards();
      }, 15);
      this.showOffer();
      this.getCandidats();
      this.getRecruteurs();
      this.getLastUser();
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
  <SideAdmin />
  <v-container fluid style="background-color: #f2f7ff">
    <v-row class="mt-16">
      <v-col cols="12" lg="9" xl="10" offset-lg="3" offset-xl="2">
        <v-row no-gutters>
          <v-col cols="12">
            <h2 class="text-capitalize">Statistiques</h2>
          </v-col>
        </v-row>
        <!-- cards -->
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            xl="3"
            v-for="card in cards"
            :key="card"
          >
            <v-sheet
              :max-height="105"
              :max-width="320"
              class="pa-3 mx-auto"
              rounded="lg"
              elevation="1"
            >
              <v-container>
                <v-row>
                  <v-col cols="auto">
                    <div
                      class="pa-2 rounded-lg"
                      :style="'background-color:' + card.color"
                    >
                      <v-icon size="30" color="white">
                        {{ card.icon }}
                      </v-icon>
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <v-row>
                      <span
                        class="ms-4 mt-3 text-body-2 text-medium-emphasis"
                        style="color: #7c8db5 !important"
                        >{{ card.titre }}</span
                      >
                    </v-row>
                    <v-row>
                      <h3 class="ms-4 mt-1">{{ card.number }}</h3>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- charts -->
        <v-row class="mt-10" no-gutters>
          <v-col cols="12">
            <v-sheet class="rounded-lg pa-3 my-3" rounded border>
              <h4 class="ms-4 mt-1">Nombre d'offres par secteur</h4>
              <canvas
                id="ChartAdmin"
                style="width: 100%; max-height: 450px"
              ></canvas>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- tableau emploi -->
        <v-row>
          <v-col cols="12" md="8" class="d-flex justify-space-between px-14">
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
          <v-col cols="12" md="8" class="px-5">
            <v-table hover>
              <thead>
                <tr style="background-color: #435ebe" class="text-white">
                  <th class="text-left font-weight-bold" style="width: 30%">
                    Emploi
                  </th>
                  <th class="text-left font-weight-bold" style="width: 20%">
                    Date de création
                  </th>
                  <th class="text-left font-weight-bold" style="width: 20%">
                    Applications
                  </th>
                  <th class="text-left font-weight-bold ps-14">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in latestOffers" :key="item.name">
                  <td class="text-subtitle-1 font-weight-bold">
                    {{ item.titre }}
                  </td>
                  <td class="text-subtitle-1">
                    {{ item.date_creation.split("T")[0] }}
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
          <v-col cols="12" md="4">
            <v-sheet
              :width="auto"
              max-height="450"
              class="rounded-lg mx-auto pa-3"
              rounded
              border
            >
              <h4 class="mb-4">Nombre d'offres par type</h4>
              <canvas
                id="ChartAdmin2"
                style="max-width: 500px; max-height: 360px"
              ></canvas>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- tableau user -->
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-space-between px-5 my-3">
            <h4>Derniers utilisateurs</h4>
          </v-col>
        </v-row>
        <v-row class="mb-16" no-gutters>
          <v-col cols="12" class="px-3">
            <v-table hover>
              <thead>
                <tr style="background-color: #435ebe" class="text-white">
                  <th class="text-left font-weight-bold" style="width: 5%">
                    <p class="ms-2">#</p>
                  </th>
                  <th class="text-left font-weight-bold" style="width: 30%">
                    Nom et Prenom
                  </th>
                  <th class="text-left font-weight-bold" style="width: 30%">
                    E-mail
                  </th>
                  <th
                    class="text-left font-weight-bold ps-7"
                    style="width: 12%"
                  >
                    Role
                  </th>
                  <th class="text-left font-weight-bold" style="width: 12%">
                    Verification
                  </th>
                  <th
                    class="text-left ps-7 font-weight-bold"
                    style="width: 20%"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in candidat.lasteUser"
                  :key="item.name"
                >
                  <td class="text-subtitle-1 font-weight-bold pa-5">
                    <p class="ms-2">{{ index + 1 }}</p>
                  </td>
                  <td class="text-subtitle-1 font-weight-bold">
                    {{ item.nom }} {{ item.prenom }}
                  </td>
                  <td class="text-subtitle-1">
                    {{ item.mail }}
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis">
                    <span
                      :class="[
                        'pa-1',
                        'px-2',
                        'text-capitalize',
                        'rounded-lg',
                        item.role === 'candidat' ? 'bg-green' : 'bg-blue',
                      ]"
                    >
                      {{ item.role }}
                    </span>
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis">
                    <!-- <v-icon>{{item.verifier?'mdi-check':"mdi-close"}}</v-icon> -->
                    {{ item.verifier ? "vérifié" : "non vérifié" }}
                  </td>
                  <td>
                    <div class="d-flex">
                      <!-- setting -->
                      <v-btn variant="plain" class="float-end">
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
