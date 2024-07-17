<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
export default {
  components: { NavBar, SideBar, DialogDetail, DialogModifier },
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
    };
  },
  methods: {
    ...mapActions(["userAuth", "showOfferRec", "getOfferApp", "delOffer"]),
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
          <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
              <v-row>
                <v-col cols="12" md="4"
                  ><h3 class="mb-6 mt-2">
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
              <!--  -->
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
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<style lang="scss" scoped></style>
