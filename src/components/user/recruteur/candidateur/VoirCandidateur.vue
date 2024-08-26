<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/admin/SideAdmin.vue";
import DialogDetail from "@/components/user/admin/candidat/VoirDetail.vue";
export default {
  name: "VoirCandidateur",
  props: { obj: Object },
  components: { NavBar, SideBar, DialogDetail },
  computed: {
    ...mapState(["candOffer", "portfolioss"]),
  },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    ...mapActions(["deleteCandOffer", "getPortfolio"]),
    viewPortfolio() {
      const url =
        "/PortfolioXception." + this.obj.nom + "-" + this.obj.prenom + "/page";
      window.open(url, "_blank");
    },
  },
};
</script>
<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="text-none"
        variant="tonal"
        append-icon="mdi-chevron-right"
        color="light-blue-darken-4"
      >
        <p class="text-subtitle-1 font-weight-bold">Détails du candidat</p>
      </v-btn>
    </template>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

      <v-toolbar-title class="text-capitalize"
        >Profil {{ obj.prenom }} {{ obj.nom }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="obj.cv === 'Portfolio'"
          text="Voir CV"
          color="indigo"
          class="text-none font-weight-bold"
          size="large"
          target="_blank"
          :to="{
            name: 'voir',
            params: {
              nom: this.obj.nom,
              prenom: this.obj.prenom,
              page: 'page',
            },
            query: { id: this.obj._id },
          }"
        ></v-btn>
        <v-btn
          v-else
          text="Voir CV"
          color="indigo"
          class="text-none font-weight-bold"
          size="large"
          target="_blank"
          :href="'http://localhost:8000/' + obj.cvPath"
        ></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid class="h-screen" style="background-color: #f2f7ff">
      <v-row class="mt-16">
        <v-col cols="12" sm="8" md="4" lg="4" xl="3" class="mx-auto mx-md-0">
          <v-col cols="12" sm="11" class="mx-auto">
            <h3>Détails du candidat</h3>
          </v-col>
          <v-card class="pa-3 ma-3" rounded="xl">
            <!-- image profil -->
            <v-col cols="auto" class="d-flex justify-center">
              <v-img
                class="rounded-circle"
                style="border: 2px solid blue"
                max-width="140"
                :src="'http://localhost:8000' + obj.imagePath"
              ></v-img>
            </v-col>

            <!-- nom & prenom -->
            <v-col cols="auto">
              <h3 class="text-capitalize text-center">
                {{ obj.prenom }} {{ obj.nom }}
              </h3>
              <h3 class="text-capitalize text-center font-weight-thin">
                {{ obj.titre_emploi }}
              </h3>
            </v-col>
            <!-- contact  -->
            <v-col cols="auto" class="ms-3">
              <a
                :href="'mailto:' + obj.mail"
                class="mt-4 text-decoration-none text-black"
              >
                <v-icon>mdi-email-outline</v-icon> {{ obj.mail }}
              </a>
              <p class="my-4 text-capitalize">
                <v-icon>mdi-calendar-range</v-icon>
                {{ obj.dateNais && obj.dateNais.split("T")[0] }}
              </p>
              <a
                :href="'tel:' + obj.tel"
                class="mt-4 text-decoration-none text-black"
              >
                <v-icon>mdi-phone-outline</v-icon> +216 {{ obj.tel }}
              </a>
              <p class="mt-4 text-capitalize">
                <v-icon>mdi-map-marker</v-icon> {{ obj.adress }}
              </p>
              <!-- social Links -->
              <p
                class="mt-4"
                v-for="(link, index) in obj.socialLinks"
                :key="index"
              >
                <v-icon v-if="link.platform === 'Autre'">mdi-earth</v-icon>
                <v-icon v-else>mdi-{{ link.platform }}</v-icon>
                <a :href="'https://' + link.url" target="_blank">
                  {{ link.url }}</a
                >
              </p>
            </v-col>
            <!-- btn accepte & refuser -->
            <v-col cols="auto">
              <v-btn color="success" variant="tonal">Accepter</v-btn>
              <v-btn color="red" variant="tonal" class="float-end me-3"
                >Refuser</v-btn
              >
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" lg="8" xl="9">
          <v-col cols="12" sm="11" class="mx-auto">
            <h3>Lettre de motivation</h3>
          </v-col>
          <v-card class="ma-3" rounded="xl" min-height="200">
            <p
              class="ma-3 pa-3 text-body-1"
              style="white-space: pre-wrap; font-family: monospace, monospace"
            >
              {{ obj.letter || "Il n'y a pas de lettre de motivation" }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
<style lang="scss" scoped>
h3 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: 500;
}
</style>
