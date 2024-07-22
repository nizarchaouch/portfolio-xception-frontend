<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/admin/SideAdmin.vue";
import DialogDetail from "@/components/user/admin/candidat/VoirDetail.vue";
export default {
  props: { id: String },
  components: { NavBar, SideBar, DialogDetail },
  computed: {
    ...mapState(["user", "profilRec", "candOffer", "offer"]),
  },
  data() {
    return {
      drawer: true,
      page: 1,
      userData: [],
      items: [],
      sortBy: [],
      selectedEtat: "Tous",
      search: "",
      headers: [
        {
          key: "titre",
          title: "Titre d'emploi",
        },
        { key: "secteur", title: "Secteur" },
        { key: "date_creation", title: "Date de création" },
        { key: "date_expiration", title: "Date d'expiration" },
        { title: "Action", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions([
      "userAuth",
      "getOfferApp",
      "infoRec",
      "updateVerif",
      "getAll",
      "showOfferById",
    ]),
    changeEtat(id, verifier, statut) {
      const data = {
        id: id,
        verifier: verifier,
        statut: statut,
      };
      this.updateVerif(data);
    },
    updateItemsData() {
      this.items = this.candOffer.candData.map((item, index) => {
        // console.log(this.candOffer.candData[index].etat);
        const info = {
          ...this.candOffer.infoData[index],
          etat: this.candOffer.candData[index].etat,
        };
        console.log(info);
        return info;
      });
    },

    filterItems() {
      return this.items.filter((item) => {
        // console.log(this.items);
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
    this.userData = this.user.userData;
    if (this.user.userData.role !== "admin") {
      this.$router.push("/login");
    } else {
      if (this.user.userData.role === "candidat") {
        this.userData = this.user.userData;
      } else {
        await this.infoRec(this.id);
        this.userData = this.profilRec.InfoRec;
        await this.getAll(this.userData._id);
        this.updateItemsData();
      }
    }
  },
};
</script>
<template>
  <NavBar hidea=" " />
  <!-- <SideBar /> -->
  <v-container fluid>
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
              max-width="120"
              :src="'http://localhost:8000' + userData.imagePath"
            ></v-img>
          </v-col>

          <!-- nom & prenom -->
          <v-col cols="auto">
            <h3 class="text-capitalize text-center">
              {{ userData.prenom }} {{ userData.nom }}
            </h3>
            <h3 class="text-capitalize text-center font-weight-thin">
              {{ userData.titre_emploi }}
            </h3>
          </v-col>
          <!-- contact  -->
          <v-col cols="auto" class="ms-3">
            <a
              :href="'mailto:' + userData.mail"
              class="mt-4 text-decoration-none text-black"
            >
              <v-icon>mdi-email-outline</v-icon> {{ userData.mail }}
            </a>
            <p class="my-4 text-capitalize">
              <v-icon>mdi-calendar-range</v-icon>
              {{ userData.dateNais && userData.dateNais.split("T")[0] }}
            </p>
            <a
              :href="'tel:' + userData.tel"
              class="mt-4 text-decoration-none text-black"
            >
              <v-icon>mdi-phone-outline</v-icon> +216 {{ userData.tel }}
            </a>
            <p class="mt-4 text-capitalize">
              <v-icon>mdi-map-marker</v-icon> {{ userData.adress }}
            </p>
            <!-- social Links -->
            <p
              class="mt-4"
              v-for="(link, index) in userData.socialLinks"
              :key="index"
            >
              <v-icon v-if="link.platform === 'Autre'">mdi-earth</v-icon>
              <v-icon v-else>mdi-{{ link.platform }}</v-icon>
              <a :href="'https://' + link.url" target="_blank">
                {{ link.url }}</a
              >
            </p>
          </v-col>
          <v-col>
            <div class="d-flex" v-if="this.user.userData.role === 'admin'">
              <v-switch
                hide-details
                color="green"
                class="me-4"
                v-model="userData.verifier"
                @change="
                  changeEtat(userData._id, userData.verifier, userData.statut)
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
                  changeEtat(userData._id, userData.verifier, userData.statut)
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
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="8" xl="9">
        <v-col cols="12" sm="11" class="mx-auto">
          <h3>Emplois appliqués
            <span class="text-grey-darken-2">({{ this.candOffer.candData.length }})</span>
          </h3>
        </v-col>
        <v-card class="ma-3" rounded="xl">
          <v-row class="mt-1" justify="center">
            <v-col cols="6" sm="4">
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
            <v-col cols="5" sm="5">
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
          <v-data-table
            v-model:sort-by="sortBy"
            :loading="loading"
            :headers="headers"
            :items="filterItems()"
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
                      class="cursor-pointer font-weight-bold"
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
                  style="width: 35%"
                >
                  <v-row no-gutters>
                    <v-col cols="12" lg="3">
                      <v-avatar
                        size="large"
                        class="mt-2 ms-6"
                        :image="'http://localhost:8000' + item.logo"
                      >
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" lg="9" class="ps-2">
                      <span> {{ item.titre }} </span>
                      <p class="text-subtitle-2">{{ item.typeOffer }}</p>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-subtitle-1" style="width: 20%">
                  {{ item.secteur }}
                </td>
                <td
                  class="text-subtitle-1 text-medium-emphasis ps-5"
                  style="width: 15%"
                >
                  {{ item.date_creation.split("T")[0] }}
                </td>
                <td
                  class="text-subtitle-1 text-medium-emphasis ps-5"
                  style="width: 15%"
                >
                  {{ item.date_expiration.split("T")[0] }}
                </td>
                <td style="width: 10%">
                  <!-- btn voir deati -->
                  <DialogDetail :obj="item" />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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
