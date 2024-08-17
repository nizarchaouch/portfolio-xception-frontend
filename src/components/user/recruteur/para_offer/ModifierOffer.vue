<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: { obj: String, tab: Boolean, role: Boolean },
  computed: {
    ...mapState(["user", "offer", "profilRec"]),
    ...mapGetters(["getDataRec"]),
  },
  data() {
    return {
      drawer: true,
      dialog: false,
      form: false,
      typeEmploi: [
        "CDI",
        "CDD",
        "CIVP",
        "Karama",
        "Temps plein",
        "Saisonnier",
        "Freelance / Indépendant",
        "Temps partiel",
        "Stage",
      ],
      data: {
        id: null,
        idRec: null,
        logo: "",
        nomEntreprise: "",
        position: "",
        titre: "",
        niveauCand: "",
        experience: "",
        langue: "",
        salaire: "",
        vacants: 1,
        typeOffer: "",
        genre: "",
        date_expiration: "",
        description: "",
        exigence: "",
      },
      rules: {
        required: (value) => !!value || "Champ requis.",
        counter: (value) => value.length >= 2 || "Minimum 200 caractères",
      },
    };
  },
  methods: {
    ...mapActions(["userAuth", "updatedOffer", "addOffer", "getRecruteurs"]),
    async submitForm() {
      if (this.form) {
        if (this.obj) {
          delete this.data.idRec;
          delete this.data.logo;
          delete this.data.nomEntreprise;
          await this.updatedOffer(this.data);
        } else {
          const secteurEtPosition = this.getDataRec(
            this.data.nomEntreprise
          );
          if (secteurEtPosition) {
            this.data.idRec = secteurEtPosition.idRec;
            this.data.logo = secteurEtPosition.logo;
            this.data.secteur = secteurEtPosition.secteur;
            this.data.position = secteurEtPosition.position;
          }
          await this.addOffer(this.data);
        }
        // window.location.reload();
      } else {
        console.log("Form is invalid");
      }
    },
    closeDialog() {
      this.dialog = false;
      window.location.reload();
    },
  },
  created() {
    if (this.obj) {
      this.data.id = this.obj._id;
      this.data.idRec = this.obj.idRec;
      this.data.logo = this.obj.logo;
      this.data.position = this.obj.position;
      this.data.titre = this.obj.titre;
      this.data.niveauCand = this.obj.niveauCand;
      this.data.experience = this.obj.experience;
      this.data.langue = this.obj.langue;
      this.data.salaire = this.obj.salaire;
      this.data.vacants = this.obj.vacants;
      this.data.typeOffer = this.obj.typeOffer;
      this.data.genre = this.obj.genre;
      this.data.date_expiration = this.obj.date_expiration.split("T")[0];
      this.data.description = this.obj.description;
      this.data.exigence = this.obj.exigence;
    }
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("login");
    } else {
      this.getRecruteurs();
    }
  },
};
</script>
<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="this.role"
        v-bind="activatorProps"
        class="text-none"
        color="blue"
        variant="tonal"
        rounded
        prepend-icon="mdi-plus"
      >
        Ajouter
      </v-btn>
      <v-btn
        v-else-if="this.tab"
        v-bind="activatorProps"
        variant="plain"
        class="mt-1"
        icon
      >
        <v-icon size="30">mdi-progress-pencil</v-icon>
      </v-btn>
      <v-list-item
        v-else
        v-bind="activatorProps"
        link
        title="Modifier"
        prepend-icon="mdi-pencil"
      ></v-list-item>
    </template>
    <v-form @submit.prevent="submitForm" v-model="form">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="closeDialog()"></v-btn>

        <v-toolbar-title v-if="this.role">Ajouter Offer</v-toolbar-title>
        <v-toolbar-title v-else>Modifier Offer</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            text="Enregistrer"
            color="indigo"
            type="submit"
            class="text-none font-weight-bold"
            size="large"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container class="bg-white h-screen" fluid>
        <v-row>
          <v-col cols="12">
            <!--  -->
            <v-row justify="center">
              <v-col cols="12" md="9">
                <p class="text-subtitle-2 text-medium-emphasis">
                  Titre de l'emploi <span class="text-red">*</span>
                </p>
                <v-text-field
                  v-model="data.titre"
                  variant="outlined"
                  color="blue"
                  :rules="[rules.required]"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!--  -->
            <v-row justify="center">
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">Éducation</p>
                <v-text-field
                  v-model="data.niveauCand"
                  variant="outlined"
                  color="blue"
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">Expérience</p>
                <v-text-field
                  v-model="data.experience"
                  variant="outlined"
                  color="blue"
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">Langue</p>
                <v-text-field
                  v-model="data.langue"
                  variant="outlined"
                  color="blue"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!--  -->
            <v-row justify="center">
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">
                  Salaire personnalisé
                </p>
                <v-text-field
                  v-model="data.salaire"
                  variant="outlined"
                  color="blue"
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">
                  Nombre total de postes vacants
                </p>
                <v-text-field
                  v-model="data.vacants"
                  variant="outlined"
                  color="blue"
                  type="Number"
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">
                  Type d'emploi <span class="text-red">*</span>
                </p>
                <v-select
                  v-model="data.typeOffer"
                  variant="outlined"
                  color="blue"
                  :items="typeEmploi"
                  :rules="[rules.required]"
                >
                </v-select>
              </v-col>
            </v-row>
            <!--  -->
            <v-row justify="center">
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">Genre</p>
                <v-select
                  v-model="data.genre"
                  variant="outlined"
                  color="blue"
                  :items="['homme', 'femme']"
                  hide-details
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="3">
                <p class="text-subtitle-2 text-medium-emphasis">
                  Date limite expirée <span class="text-red">*</span>
                </p>
                <v-text-field
                  v-model="data.date_expiration"
                  variant="outlined"
                  color="blue"
                  :rules="[rules.required]"
                  type="date"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <p
                  class="text-subtitle-2 text-medium-emphasis"
                  v-if="this.role"
                >
                  Nom de l'entreprise <span class="text-red">*</span>
                </p>
                <v-autocomplete
                  v-if="this.role"
                  v-model="data.nomEntreprise"
                  :items="this.profilRec.nomEntreprise"
                  variant="outlined"
                  color="blue"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!--  -->
            <v-row justify="center">
              <v-col cols="12" md="5" offset-sm="1">
                <h3 class="mb-3">
                  Description de l'emploi <span class="text-red">*</span>
                </h3>
                <v-textarea
                  v-model="data.description"
                  clearable
                  counter
                  rows="10"
                  variant="outlined"
                  color="blue"
                  :rules="[rules.required, rules.counter]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="5">
                <h3 class="mb-3">
                  Exigences de l'emploi <span class="text-red">*</span>
                </h3>
                <v-textarea
                  v-model="data.exigence"
                  clearable
                  counter
                  rows="10"
                  variant="outlined"
                  color="blue"
                  :rules="[rules.required, rules.counter]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-dialog>
</template>
