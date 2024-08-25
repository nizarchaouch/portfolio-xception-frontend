<script>
import { mapState, mapActions } from "vuex";
import { secteurName } from "@/components/secteur";
import { cityName } from "@/components/city";
import defaultprofil from "@/assets/defaultprofil.png";
export default {
  props: { obj: Object, role: Boolean },
  computed: {
    ...mapState(["user", "offer", "profilRec"]),
  },
  data() {
    return {
      dialog: false,
      form: false,
      cityName,
      secteurName,
      loading: false,
      adress: "",
      fileForUpload: null,
      imagePath: defaultprofil,
      nom: "",
      prenom: "",
      dateNais: "",
      mail: "",
      tel: null,
      civilite: "",
      titre_emploi: "",
      password: "",
      socialLinks: [{ platform: "Autre", url: "" }],
      platformOptions: [
        "Twitter",
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Autre",
      ],
      rules: {
        required: (value) => !!value || "Champ requis.",
        counter: (value) => value.length > 0 || "Minimum 8 caractères",
        mail: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalide.";
        },
        tel: (value) => {
          const pattern = /^[7839452]{1}[0-9]{7}$/;
          return pattern.test(value) || "Numéro invalide.";
        },
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
    ...mapActions(["userAuth", "updatedOffer", "addCand", "updated"]),
    addLink() {
      this.socialLinks.push({ platform: "", url: "" });
    },
    removeLink(index) {
      this.socialLinks.splice(index, 1);
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imagePreviewUrl = URL.createObjectURL(file);
        this.fileForUpload = file;
        this.imagePreviewUrl = imagePreviewUrl;
      } else {
        alert("Veuillez sélectionner un fichier image.");
      }
    },
    async submitForm() {
      if (this.form) {
        const data = {
          fileForUpload: this.fileForUpload,
          imagePath: this.imagePath,
          nom: this.nom,
          prenom: this.prenom,
          dateNais: this.dateNais,
          tel: this.tel,
          civilite: this.civilite,
          adress: this.adress,
          mail: this.mail,
          titre_emploi: this.titre_emploi,
          socialLinks: this.socialLinks,
          password: this.password,
        };
        this.loading = true;
        if (this.obj) {
          data.id = this.obj._id;
          if (!data.password) {
            delete data.password;
          }
          this.updated(data);
        } else {
          this.addCand(data);
        }
        setTimeout(() => {
          this.loading = false;
          if (
            this.profilRec.message === "Ajouté avec succès" ||
            this.profilRec.message === "Mise à jour réussie"
          ) {
            window.location.reload();
          }
        }, 500);
      } else {
        console.log("Form is invalid");
      }
    },
  },
  created() {
    if (this.obj) {
      this.socialLinks = this.obj.socialLinks || [
        { platform: "LinkedIn", url: "" },
      ];
      this.adress = this.obj.adress;
      this.titre_emploi = this.obj.titre_emploi;
      this.imagePath = "http://localhost:8000" + this.obj.imagePath;
      this.nom = this.obj.nom;
      this.prenom = this.obj.prenom;
      this.civilite = this.obj.civilite;
      this.dateNais = this.obj.dateNais && this.obj.dateNais.split("T")[0];
      this.tel = this.obj.tel;
      this.mail = this.obj.mail;
    }
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat" ||
      this.user.userData.role === "recruteur"
    ) {
      this.$router.push("login");
    }
  },
};
</script>
<template>
  <v-snackbar
    :timeout="1200"
    :color="profilRec.color"
    v-model="profilRec.alert"
    location="top"
  >
    {{ profilRec.message }}
  </v-snackbar>
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
      <v-btn v-else v-bind="activatorProps" variant="plain" class="mt-1" icon>
        <v-icon size="30">mdi-progress-pencil</v-icon>
      </v-btn>
    </template>
    <v-form @submit.prevent="submitForm" v-model="form">
      <v-toolbar color="white">
        <v-btn icon="mdi-close" @click="this.dialog = false"></v-btn>

        <v-toolbar-title v-if="this.role">Ajouter un candidat</v-toolbar-title>
        <v-toolbar-title v-else>Modifier le candidat</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            text="Enregistrer"
            color="indigo"
            type="submit"
            class="text-none font-weight-bold"
            size="large"
            :loading="this.loading"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container
        class="h-screen overflow-auto"
        fluid
        style="background-color: #f2f7ff"
      >
        <v-row>
          <v-col cols="12">
            <v-card class="pa-3" border>
              <v-row no-gutters>
                <v-col cols="9" md="10" xl="11">
                  <h2>Informations personnelles</h2>
                </v-col>
              </v-row>
              <v-row>
                <!-- col logo -->
                <v-col cols="12">
                  <label
                    for="image"
                    class="cursor-pointer d-flex justify-center"
                  >
                    <v-tooltip text="Click pour change l'image" location="left">
                      <template v-slot:activator="{ props }">
                        <v-badge
                          v-bind="props"
                          class="ms-4"
                          floating
                          color="blue"
                          icon="mdi-image-edit-outline"
                          offset-y="12"
                          offset-x="8"
                        >
                          <v-avatar
                            size="150"
                            :image="imagePreviewUrl || imagePath"
                          >
                          </v-avatar>
                        </v-badge>
                      </template>
                    </v-tooltip>
                  </label>
                  <input
                    type="file"
                    id="image"
                    class="d-none"
                    accept="image/*"
                    @change="handleFileChange"
                  />
                </v-col>
                <!-- nom & secteur -->
                <v-col cols="12" md="4">
                  <h4 class="mb-4 text-medium-emphasis">
                    Nom <span class="text-red">*</span>
                  </h4>
                  <v-text-field
                    v-model="nom"
                    density="comfortable"
                    variant="outlined"
                    color="blue"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                  <h4 class="mb-4 text-medium-emphasis">Date de Naissance</h4>
                  <v-text-field
                    v-model="dateNais"
                    density="comfortable"
                    variant="outlined"
                    color="blue"
                    type="Date"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- prnom -->
                  <h4 class="mb-4 text-medium-emphasis">
                    Prénom <span class="text-red">*</span>
                  </h4>
                  <v-text-field
                    v-model="prenom"
                    density="comfortable"
                    variant="outlined"
                    color="blue"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <!-- tel -->
                  <h4 class="mb-4 text-medium-emphasis">
                    Téléphone <span class="text-red">*</span>
                  </h4>
                  <v-text-field
                    v-model="tel"
                    variant="outlined"
                    density="comfortable"
                    color="blue"
                    type="Number"
                    :rules="[rules.tel]"
                  >
                  </v-text-field>
                </v-col>
                <!-- tail & tel -->
                <v-col cols="12" md="4">
                  <!-- mail -->
                  <h4 class="mb-4 text-medium-emphasis">
                    E-mail<span class="text-red">*</span>
                  </h4>
                  <v-text-field
                    v-model="mail"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                    :rules="[rules.required, rules.mail]"
                  ></v-text-field>
                  <!-- sexe -->
                  <h4 class="mb-4 text-medium-emphasis">
                    Civilité<span class="text-red">*</span>
                  </h4>
                  <v-select
                    :items="['homme', 'femme']"
                    v-model="civilite"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <!--  -->
                <v-col cols="12" md="4">
                  <!-- pwd -->
                  <h4 class="mb-4 text-medium-emphasis">Adresse</h4>
                  <v-autocomplete
                    v-model="adress"
                    :items="cityName"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="4">
                  <!-- pwd -->
                  <h4 class="mb-4 text-medium-emphasis">Role/Position</h4>
                  <v-text-field
                    v-model="titre_emploi"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <!-- pwd -->
                <v-col cols="12" md="4" v-if="this.role">
                  <h4 class="mb-4 text-medium-emphasis">
                    Mots de passe<span class="text-red">*</span>
                  </h4>
                  <v-text-field
                    v-model="password"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                    :rules="[rules.required, rules.counter]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" v-else>
                  <!-- pwd update -->
                  <h4 class="mb-4 text-medium-emphasis">Mots de passe</h4>
                  <v-text-field
                    v-model="password"
                    density="comfortable"
                    color="blue"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-3 mt-3" border>
              <h2 class="mb-5">Détails sociaux</h2>
              <v-row
                v-for="(link, index) in socialLinks"
                :key="index"
                no-gutters
              >
                <v-col cols="2">
                  <v-select
                    v-model="link.platform"
                    :items="platformOptions"
                    label="Sélectionner une option"
                  ></v-select>
                </v-col>
                <v-col cols="8" md="9">
                  <v-text-field
                    v-model="link.url"
                    label="Lien de profil / URL..."
                  ></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-icon
                    @click="removeLink(index)"
                    size="x-large"
                    class="ms-3 mt-3"
                    color="red"
                    >mdi-close-circle-outline</v-icon
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div
                    @click="addLink"
                    class="bg-grey-lighten-2 pa-3 mx-2 text-center cursor-pointer"
                  >
                    <v-icon class="mb-1">mdi-plus-circle-outline</v-icon> &nbsp;
                    <span class="text- -1">Ajouter un nouveau lien social</span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-dialog>
</template>
