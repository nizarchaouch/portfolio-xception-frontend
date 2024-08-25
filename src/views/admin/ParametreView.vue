<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideAdmin from "@/components/user/admin/SideAdmin.vue";
import DialogDetail from "@/components/user/recruteur/para_offer/DialogVoirDeta.vue";
import DialogModifier from "@/components/user/recruteur/para_offer/ModifierOffer.vue";
import AddAdmin from "@/components/user/admin/AddAdmin.vue";
export default {
  components: {
    NavBar,
    SideAdmin,
    DialogDetail,
    DialogModifier,
    AddAdmin,
  },
  computed: {
    ...mapState(["user", "profilAdmin"]),
    admins() {
      return this.profilAdmin.admins;
    },
  },
  data() {
    return {
      loading: false,
      snackConf: false,
      deleteId: null,
      search: "",
      sortBy: [],
      headers: [
        {
          key: "nom",
          title: "Nom et Prenom",
        },
        { key: "mail", title: "E-mail" },
        { key: "tel", title: " Téléphone" },
        { title: "vérification de l'E-mail", sortable: false },
        { title: "Statut du compte", sortable: false },
        { title: "Action", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions(["userAuth", "getAdmins", "deltRecu","updateVerif"]),

    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    delet() {
      this.deltRecu(this.deleteId);
      this.snackConf = false;
      window.location.reload();
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
      this.getAdmins();
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="1000"
    :color="profilAdmin.color"
    v-model="profilAdmin.alert"
    location="top"
  >
    {{ profilAdmin.message }}
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
      Voulez-vous vraiment supprimer cet administrateur ?
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
  <v-container fluid class="h-screen" style="background-color: #ffff">
    <v-col cols="12" lg="10" offset-lg="1">
      <v-row class="mt-12">
        <v-col cols="12" offset-lg="1">
          <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
              <v-row no-gutters>
                <v-col cols="12" sm="10" md="auto" lg="3" xl="3" class="pa-2">
                  <h3 class="mb-6 mt-2">Liste des administrateurs</h3>
                </v-col>
                <v-col cols="9" md="6" lg="6" xl="6" class="mb-2 ms-3">
                  <v-text-field
                    v-model="search"
                    color="blue"
                    class="mt-3"
                    placeholder="Recherche"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="compact"
                    rounded="pill"
                    hide-details
                    single-line
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="auto" lg="1" offset-lg="2" class="pa-2 mt-2 ms-auto">
                  <AddAdmin :role="true" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              v-model:sort-by="sortBy"
              :loading="loading"
              :headers="headers"
              :items="admins"
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
                  <td class="text-subtitle-1">
                    {{ item.mail }}
                  </td>
                  <td class="text-subtitle-1 text-medium-emphasis ps-5">
                    +216 {{ item.tel || "-" }}
                  </td>
                  <td class="text-subtitle-1">
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
                  <td class="text-subtitle-1 text-medium-emphasis">
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
                  <td>
                    <div class="d-flex">
                      <!-- setting -->
                      <AddAdmin :obj="item" />
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
