<script>
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { NavBar, SideBar },
  computed: {
    ...mapState(["user", "offer"]),
    userData() {
      return this.user.userData;
    },
  },
  data() {
    return {
      drawer: true,
      form: false,
      typeEmploi: [
        "CDI ",
        "CDD ",
        "CIVP",
        "Karama",
        "Temps plein",
        "Saisonnier",
        "Temps partiel",
        "Freelance / Indépendant",
        "Stage",
        "Alternance ",
        "Contrat saisonnier",
        "Contrat d'apprentissage",
      ],
      data: {
        idRec: "",
        nomEntreprise: "",
        secteur: "",
        logo: "",
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
        counter: (value) => value.length >= 200 || "Minimum 200 caractères",
      },
    };
  },
  methods: {
    ...mapActions(["userAuth", "addOffer"]),
    async submitForm() {
      if (this.form) {
        this.data.idRec = this.userData._id;
        this.data.nomEntreprise = this.userData.nomEntreprise;
        this.data.secteur = this.userData.secteur;
        this.data.logo = this.userData.logoPath;
        this.data.position = this.userData.adress;
        await this.addOffer(this.data);
        window.location.reload();
      } else {
        console.log("Form is invalid");
      }
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
    }
  },
};
</script>
<template>
  <NavBar hidea=" " />
  <SideBar />
  <v-container class="bg-white" fluid>
    <v-snackbar
      :timeout="2000"
      color="blue-darken-2"
      v-model="offer.alert"
      location="top"
    >
      {{ offer.message }}
    </v-snackbar>
    <v-row class="mt-16">
      <v-col cols="12" lg="10" xl="10" offset-lg="2">
        <v-row no-gutters>
          <v-col cols="10" offset-md="1">
            <h2>Poster un emploi</h2>
          </v-col>
        </v-row>
        <!--  -->
        <v-form @submit.prevent="submitForm" v-model="form">
          <v-row>
            <v-col cols="12" md="9" offset-md="1">
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
          <v-row>
            <v-col cols="12" md="3" offset-md="1">
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
          <v-row>
            <v-col cols="12" md="3" offset-md="1">
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
          <v-row>
            <v-col cols="12" md="3" offset-md="1">
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
          </v-row>
          <!--  -->
          <v-row>
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
          <v-col cols="12">
            <v-btn
              color="blue"
              type="submit"
              class="text-none font-weight-bold float-right"
              size="large"
              append-icon="mdi-arrow-right-thick"
            >
              Poster un emploi
            </v-btn>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
input[type="date"]::-webkit-calendar-picker-indicator {
  bottom: 0;
  cursor: pointer;
  height: 20px;
  left: 85%;
  position: fixed;
  right: 0px;
  top: 30%;
  width: auto;
}
</style>
