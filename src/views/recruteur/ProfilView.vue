<script>
import { mapState, mapActions, mapGetters } from "vuex";
import DialogDetail from "@/components/offer/DialogDetail.vue";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
export default {
  props: { id: String },
  components: { NavBar, SideBar, DialogDetail },
  computed: {
    ...mapState(["user", "offer", "profilRec"]),
    ...mapGetters(["offerCount"]),
    showOffer() {
      return this.offer.offerData;
    },
  },
  data() {
    return {
      drawer: true,
      page: 1,
      userData: [],
    };
  },
  methods: {
    ...mapActions(["userAuth", "showOfferRec", "infoRec", "updateVerif"]),
    scrollToOffer() {
      const element = document.getElementById("listeOffer");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    this.userData = this.user.userData;
    if (!this.id && !this.user.userData.role === "recruteur") {
      this.$router.push("login");
    } else {
      if (this.user.userData.role === "recruteur") {
        this.userData = this.user.userData;
        this.showOfferRec(this.user.userData._id);
      } else {
        await this.infoRec(this.id);
        this.userData = this.profilRec.InfoRec;
        this.showOfferRec(this.id);
      }
    }
  },
};
</script>
<template>
  <template v-if="this.user.userData.role === 'recruteur'">
    <NavBar hidea=" " />
    <SideBar />
  </template>
  <template v-else>
    <NavBar />
  </template>
  <v-container fluid>
    <v-row class="mt-16">
      <v-col
        cols="12"
        lg="10"
        xl="10"
        :offset-lg="this.user.userData.role === 'recruteur' ? 2 : 1"
      >
        <v-row>
          <v-col cols="12" sm="11" class="mx-auto">
            <h3>Détails de l'entreprise</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="11" class="mx-auto">
            <v-sheet :elevation="4" class="rounded-lg pa-8">
              <v-row>
                <v-col cols="auto">
                  <v-avatar
                    size="68"
                    rounded="0"
                    class="rounded-lg ms-4"
                    :image="'http://localhost:8000' + userData.logoPath"
                  >
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="3">
                  <p class="font-weight-bold text-h6">
                    {{ userData.nomEntreprise }}
                  </p>
                  <span class="text-subtitle-1 text-medium-emphasis">
                    {{ userData.secteur }}
                  </span>
                  <div
                    class="d-flex"
                    v-if="this.user.userData.role === 'admin'"
                  >
                    <v-switch
                      hide-details
                      color="green"
                      class="me-4"
                      v-model="userData.verifier"
                      @change="
                        changeEtat(
                          userData._id,
                          userData.verifier,
                          userData.statut
                        )
                      "
                    >
                      <template v-slot:label>
                        <p class="text-black">
                          {{ userData.verifier ? "vérifié" : "non vérifié" }}
                        </p>
                      </template>
                    </v-switch>
                    <v-switch
                      hide-details
                      color="green"
                      v-model="userData.statut"
                      @change="
                        changeEtat(
                          userData._id,
                          userData.verifier,
                          userData.statut
                        )
                      "
                    >
                      <template v-slot:label>
                        <p class="text-black">
                          {{ userData.statut ? "activé" : "désactivé" }}
                        </p>
                      </template>
                    </v-switch>
                  </div>
                </v-col>
                <!-- Suivez-nous sur -->
                <v-col cols="auto">
                  <v-row class="mt-2" no-gutters>
                    <v-col cols="auto" class="mt-1">
                      <span
                        class="font-weight-bold text-h6 ms-lg-9"
                        v-if="
                          userData.socialLinks &&
                          userData.socialLinks.length > 0
                        "
                      >
                        Suivez-nous sur:
                      </span>
                    </v-col>
                    <v-col
                      cols="auto"
                      class="ms-2"
                      v-for="(link, index) in userData.socialLinks"
                      :key="index"
                    >
                      <!-- icon facebook -->
                      <v-btn
                        v-if="link.platform === 'Facebook'"
                        :href="link.url"
                        size="40"
                        variant="text"
                        class="mx-1"
                        color="indigo"
                      >
                        <v-avatar
                          image="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
                        >
                        </v-avatar>
                      </v-btn>
                      <!-- btn linekdin -->
                      <v-btn
                        v-if="link.platform === 'LinkedIn'"
                        :href="link.url"
                        size="40"
                        variant="text"
                        class="mx-1"
                        color="blue"
                      >
                        <v-avatar
                          image="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                        >
                        </v-avatar>
                      </v-btn>
                      <!-- btn twitter -->
                      <v-btn
                        v-if="link.platform === 'Twitter'"
                        :href="link.url"
                        size="40"
                        variant="text"
                        class="mx-1"
                        color="black"
                      >
                        <v-avatar
                          image="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000"
                        >
                        </v-avatar>
                      </v-btn>
                      <!-- btn Instagram -->
                      <v-btn
                        v-if="link.platform === 'Instagram'"
                        :href="link.url"
                        size="40"
                        variant="text"
                        class="mx-1"
                        color="red-darken-3"
                      >
                        <v-avatar
                          image="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
                        >
                        </v-avatar>
                      </v-btn>
                      <!-- btn autre -->
                      <v-btn
                        v-if="link.platform === 'Autre'"
                        :href="link.url"
                        size="40"
                        variant="text"
                        class="mx-1"
                        color="black"
                      >
                        <v-avatar
                          size="35"
                          image="https://img.icons8.com/?size=100&id=2963&format=png&color=000000"
                        >
                        </v-avatar>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- btn -->
                <v-col cols="auto" class="me-xs-auto ms-sm-auto">
                  <v-btn
                    color="blue-darken-4"
                    class="text-none font-weight-bold mt-3"
                    size="large"
                    append-icon="mdi-arrow-right"
                    @click="scrollToOffer()"
                  >
                    Offres d'emploi
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- Description de l'entreprise -->
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="7" md="8">
            <v-sheet :elevation="2" class="rounded-lg pa-8">
              <h4>Description de l'entreprise</h4>
              <p class="text-medium-emphasis text-justify mt-1">
                {{ userData.description }}
              </p>
            </v-sheet>
          </v-col>
          <!-- fondee && taille -->
          <v-col cols="12" sm="4" md="3">
            <v-sheet :elevation="2" class="rounded-lg pa-7">
              <v-row justify="space-between">
                <v-col cols="auto">
                  <v-icon size="x-large" color="blue-lighten-2" class="mb-2">
                    mdi-domain
                  </v-icon>
                  <p
                    class="mb-2 text-caption text-medium-emphasis text-uppercase"
                  >
                    Fondée en
                  </p>
                  <p class="text-body-2">{{ userData.fondee }}</p>
                </v-col>
                <!--  -->
                <v-col cols="auto">
                  <v-icon size="x-large" color="blue-lighten-2" class="mb-2">
                    mdi-badge-account-outline
                  </v-icon>
                  <p
                    class="mb-2 text-caption text-medium-emphasis text-uppercase"
                  >
                    Taille de l'entreprise
                  </p>
                  <p class="text-body-2">{{ userData.taill_ent }}</p>
                </v-col>
              </v-row>
            </v-sheet>
            <!-- local tel mail -->
            <v-sheet
              :elevation="2"
              class="rounded-lg pa-2 mt-4 overflow-hidden"
            >
              <h3 class="py-4">Informations de contact</h3>
              <v-row justify="space-between">
                <v-col cols="auto">
                  <!-- row empla & tel -->
                  <v-row>
                    <!-- EMPLACEMENT -->
                    <v-col cols="1" class="ms-2">
                      <v-icon
                        size="large"
                        color="blue-lighten-2"
                        class="mt-2 pe-2"
                      >
                        mdi-map-marker-radius
                      </v-icon>
                    </v-col>
                    <v-col cols="auto">
                      <span
                        class="mb-2 text-caption text-medium-emphasis text-uppercase"
                      >
                        emplacement
                      </span>
                      <p class="text-body-2">{{ userData.adress }}</p>
                    </v-col>
                    <!--  Téléphone -->
                    <div class="d-flex">
                      <v-col cols="1" class="mx-2">
                        <v-icon
                          size="large"
                          color="blue-lighten-2"
                          class="mt-2 pe-2"
                        >
                          mdi-phone-in-talk
                        </v-icon>
                      </v-col>
                      <v-col cols="auto">
                        <span
                          class="mb-2 text-caption text-medium-emphasis text-uppercase"
                        >
                          Téléphone
                        </span>
                        <p class="text-body-2">+216 {{ userData.tel }}</p>
                      </v-col>
                    </div>
                  </v-row>
                  <!-- row mail -->
                  <v-row>
                    <v-col cols="1" class="ms-2">
                      <v-icon
                        size="large"
                        color="blue-lighten-2"
                        class="mt-2 pe-2"
                      >
                        mdi-email-outline
                      </v-icon>
                    </v-col>
                    <v-col cols="auto">
                      <span
                        class="mb-2 text-caption text-medium-emphasis text-uppercase"
                      >
                        Adresse e-mail
                      </span>
                      <p class="mb-2 text-body-2">{{ userData.mail }}</p>
                    </v-col>
                  </v-row>
                  <!-- row site web
                  <v-row>
                    <v-col cols="1" class="ms-2">
                      <v-icon
                        size="large"
                        color="blue-lighten-2"
                        class="mt-2 pe-2"
                      >
                        mdi-web
                      </v-icon>
                    </v-col>
                    <v-col cols="auto">
                      <span
                        class="mb-2 text-caption text-medium-emphasis text-uppercase"
                      >
                        Site web
                      </span>
                      <p class="mb-2 text-body-2">chaouchnizar1@gmail.com</p>
                    </v-col>
                  </v-row> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- offer d'emploi  -->
        <v-row>
          <v-col cols="11">
            <h3 class="ms-15 mb-6 mt-2">Offres d'emploi ({{ offerCount }})</h3>
          </v-col>
        </v-row>
        <!-- liste offer -->
        <v-col cols="11" class="mx-auto">
          <v-data-iterator
            :items="showOffer"
            :items-per-page="6"
            v-model:page="page"
            id="listeOffer"
          >
            <template v-slot:default="{ items }">
              <v-container class="pa-2">
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
                          lines="one"
                          :text="item.raw.titre"
                        >
                        </v-banner>
                        <v-banner
                          lines="three"
                          :text="item.raw.description"
                        ></v-banner>
                        <div class="d-flex justify-space-around mt-3">
                          <p>
                            <v-icon class="me-2 text-body-1"
                              >mdi-calendar-range</v-icon
                            >{{ item.raw.date_creation.split("T")[0] }}
                          </p>
                          <p>
                            <v-icon class="pb-1 text-body-1"
                              >mdi-map-marker</v-icon
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
            </template>

            <template v-slot:footer="{ pageCount }">
              <v-pagination
                v-if="pageCount != 1"
                v-model="page"
                :length="pageCount"
                :total-visible="10"
                rounded="circle"
                color="indigo"
                prev-icon="mdi-arrow-left"
                next-icon="mdi-arrow-right"
              ></v-pagination>
            </template>
          </v-data-iterator>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
h3 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: 500;
}
</style>
