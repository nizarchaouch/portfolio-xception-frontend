<script>
import { mapState, mapActions } from "vuex";
import { cityName } from "@/components/city";
import { secteurName } from "@/components/secteur";
export default {
  computed: {
    ...mapState(["user", "profilRec"]),
  },
  data() {
    return {
      cityName,
      secteurName,
      form: false,
      loading: false,
      logoForUpload: null,
      logoUrl: "",
      nomEntreprise: "",
      secteur: "",
      description: "",
      adress: "",
      identifiant: "",
      fondee: "",
      taill_ent: "",
      rules: {
        required: (value) => !!value || "Champ requis.",
      },
      taillOptions: [
        "10-20 Employés",
        "20-50 Employés",
        "50-100 Employés",
        "100-150 Employés",
        "200+ Employés",
      ],
    };
  },
  methods: {
    ...mapActions(["userAuth", "updated", "upload"]),
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.logoForUpload = file;
        const data = {
          id: this.user.userData._id,
          logoForUpload: this.logoForUpload,
        };
        this.upload(data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert("Veuillez sélectionner un fichier image.");
      }
    },
    onSubmit() {
      if (!this.form) return;
      const data = {
        id: this.user.userData._id,
        nomEntreprise: this.nomEntreprise,
        secteur: this.secteur,
        description: this.description,
        adress: this.adress,
        identifiant: this.identifiant,
        fondee: this.fondee,
        taill_ent: this.taill_ent,
      };
      this.loading = true;
      this.userAuth();
      this.updated(data);
      this.userAuth();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
  async created() {
    await this.userAuth();
    this.logoUrl = "http://localhost:8000" + this.user.userData.logoPath;
    this.nomEntreprise = this.user.userData.nomEntreprise;
    this.secteur = this.user.userData.secteur;
    this.description = this.user.userData.description;
    this.adress = this.user.userData.adress;
    this.identifiant = this.user.userData.identifiant;
    this.fondee = this.user.userData.fondee;
    this.taill_ent = this.user.userData.taill_ent;
  },
  async mounted() {
    await this.userAuth();

    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("login");
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="7000"
    color="blue-darken-2 mt-16"
    v-model="profilRec.alert"
    location="top"
  >
    {{ profilRec.message }}
  </v-snackbar>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-sheet :elevation="2" class="rounded-lg pa-7">
      <v-row no-gutters>
        <v-col cols="9" md="10" xl="11">
          <h2>Paramètres voter informations sur l'entreprise</h2>
        </v-col>
      </v-row>
      <v-row>
        <!-- col logo -->
        <v-col cols="12" md="3" lg="2">
          <h4 class="mb-4 ms-7 text-medium-emphasis">Image du logo</h4>
          <label for="logo" class="cursor-pointer">
            <v-tooltip text="Click pour change l'image" location="left">
              <template v-slot:activator="{ props }">
                <v-badge
                  v-bind="props"
                  class="ms-4"
                  floating
                  color="blue"
                  icon="mdi-image-edit-outline"
                  offset-y="8"
                  offset-x="5"
                >
                  <v-avatar size="150" rounded="0" :image="logoUrl"> </v-avatar>
                </v-badge>
              </template>
            </v-tooltip>
          </label>
          <input
            type="file"
            id="logo"
            class="d-none"
            accept="image/*"
            @change="handleFileChange"
          />
        </v-col>
        <!-- nom & secteur -->
        <v-col cols="12" md="3">
          <h4 class="mb-4 text-medium-emphasis">
            Nom de l'entreprise <span class="text-red">*</span>
          </h4>
          <v-text-field
            v-model="nomEntreprise"
            variant="outlined"
            color="blue"
            :rules="[rules.required]"
          >
          </v-text-field>
          <!-- secteur -->
          <h4 class="mb-4 text-medium-emphasis">
            Secteur <span class="text-red">*</span>
          </h4>
          <v-autocomplete
            v-model="secteur"
            :items="secteurName"
            color="blue"
            variant="outlined"
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-col>
        <!-- fondee & adress -->
        <v-col cols="12" md="3">
          <h4 class="mb-4 text-medium-emphasis">Année de création</h4>
          <v-text-field
            v-model="fondee"
            variant="outlined"
            color="blue"
            type="Number"
          >
          </v-text-field>
          <!-- adress -->
          <h4 class="mb-4 text-medium-emphasis">
            Emplacement de l'entreprise<span class="text-red">*</span>
          </h4>
          <v-autocomplete
            v-model="adress"
            :items="cityName"
            color="blue"
            variant="outlined"
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-col>
        <!-- tail & tel -->
        <v-col cols="12" md="3">
          <h4 class="mb-4 text-medium-emphasis">Taille de l'entreprise</h4>
          <v-select
            v-model="taill_ent"
            :items="taillOptions"
            variant="outlined"
            color="blue"
          ></v-select>
          <!-- tel -->
          <h4 class="mb-4 text-medium-emphasis">
            Identifiant Unique (RC/ RNE / MF)
          </h4>
          <v-text-field
            v-model="identifiant"
            readonly
            variant="outlined"
            color="grey"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
    <!-- decription -->
    <v-sheet :elevation="2" class="rounded-lg pa-7 mt-4">
      <v-row no-gutters>
        <v-col cols="9" md="10" xl="11">
          <h3>À propos de nous</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            color="blue"
            rows="15"
            clearable
            counter
            variant="outlined"
            :rules="[rules.required]"
          ></v-textarea>
        </v-col>
        <!-- btn submit -->
        <v-col cols="12">
          <v-btn
            color="blue"
            type="submit"
            class="text-none font-weight-bold float-right"
            size="large"
            :loading="loading"
          >
            Enregistrer les modifications
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-form>
</template>

<style lang="scss"></style>
