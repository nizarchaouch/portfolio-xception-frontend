<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import defaultprofil from "@/assets/defaultprofil.png";
export default {
  props: { obj: Object, role: Boolean },
  computed: {
    ...mapState(["profilAdmin"]),
  },
  data: () => ({
    dialog: false,
    loading: false,
    form: false,
    fileForUpload: null,
    imagePath: defaultprofil,
    nom: "",
    prenom: "",
    mail: "",
    tel: null,
    password: "",
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
  }),
  methods: {
    ...mapActions(["userAuth", "addAdmin", "updatedAdmin"]),
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
          tel: this.tel,
          mail: this.mail,
          password: this.password,
        };
        this.loading = true;
        if (this.obj) {
          data.id = this.obj._id;
          if (!data.password) {
            delete data.password;
          }
          this.updatedAdmin(data);
        } else {
          this.addAdmin(data);
        }
        setTimeout(() => {
          this.loading = false;
          if (
            this.profilAdmin.message === "Ajouté avec succès" ||
            this.profilAdmin.message === "Mise à jour réussie"
          ) {
            // window.location.reload();
          }
        }, 500);
      } else {
        console.log("Form is invalid");
      }
    },
  },
  created() {
    if (this.obj) {
      this.imagePath = "http://localhost:8000" + this.obj.imagePath;
      this.nom = this.obj.nom;
      this.prenom = this.obj.prenom;
      this.tel = this.obj.tel;
      this.mail = this.obj.mail;
    }
  },
};
</script>
<template>
  <v-dialog v-model="dialog" max-width="600">
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
        <v-icon size="30">mdi-account-reactivate-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <template v-slot:title>
        <v-col cols="12" class="d-flex">
          <p class="pt-2">
            <v-icon size="small" class="mb-1">mdi-account</v-icon> Ajouter un
            administrateur
          </p>
          <v-spacer></v-spacer>
          <v-btn variant="plain" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </template>
      <v-form @submit.prevent="submitForm" v-model="form">
        <v-card-text>
          <v-row justify="center">
            <v-col cols="auto">
              <label for="image" class="cursor-pointer d-flex justify-center">
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
          </v-row>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="nom"
                label="Nom"
                variant="underlined"
                color="indigo"
                class="mx-2"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="prenom"
                label="Prénom"
                persistent-hint
                variant="underlined"
                color="indigo"
                class="mx-2"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="mail"
                label="Email"
                variant="underlined"
                color="indigo"
                class="mx-2"
                :rules="[rules.required, rules.mail]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="tel"
                label="Téléphone"
                variant="underlined"
                color="indigo"
                class="mx-2"
                type="Number"
                :rules="[rules.tel]"
              ></v-text-field>
            </v-col>

            <!-- pwd -->
            <v-col cols="12" md="4" v-if="this.role">
              <v-text-field
                v-model="password"
                label="Mots de passe"
                class="mx-2"
                color="indigo"
                variant="underlined"
                :rules="[rules.required, rules.counter]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" v-else>
              <!-- pwd update -->
              <v-text-field
                v-model="password"
                label="Mots de passe"
                class="mx-2"
                color="indigo"
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none font-weight-bold"
            color="indigo"
            text="Enregistrer"
            type="submit"
            :loading="loading"
          ></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<style lang=""></style>
