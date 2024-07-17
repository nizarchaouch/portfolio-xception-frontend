<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import DialogPwd from "@/components/user/DialogPwd.vue";
import { cityName } from "@/components/city";
export default {
  name: "profil",
  computed: {
    ...mapState(["user", "candidat"]),
  },

  components: {
    NavBar,
    DialogPwd,
  },
  data() {
    return {
      cityName,
      loading: false,
      platformOptions: [
        "twitter",
        "facebook",
        "linkedin",
        "github",
        "instagram",
        "Autre",
      ],
      data: {
        id: null,
        fileForUpload: null,
        imageUrl: "",
        nom: "",
        prenom: "",
        dateNais: "",
        tel: "",
        adress: "",
        titre_emploi: "",
        socialLinks: [],
      },
    };
  },
  methods: {
    ...mapActions(["userAuth", "updated"]),
    cleanedEmail() {
      return this.user.userData.mail.trim().replace(/;$/, "");
    },
    addLink() {
      this.data.socialLinks.push({ platform: "", url: "" });
    },
    removeLink(index) {
      this.data.socialLinks.splice(index, 1);
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.data.fileForUpload = file;
        this.updated(this.data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert("Veuillez sélectionner un fichier image.");
      }
    },
    onSubmit() {
      this.loading = true;
      this.updated(this.data);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
  async created() {
    await this.userAuth();
    this.data.id = this.user.userData._id;
    this.data.imageUrl = "http://localhost:8000" + this.user.userData.imagePath;
    this.data.nom = this.user.userData.nom;
    this.data.prenom = this.user.userData.prenom;
    if (this.user.userData.dateNais) {
      this.data.dateNais = this.user.userData.dateNais.split("T")[0];
    } else {
      this.data.dateNais = "";
    }
    this.data.tel = this.user.userData.tel;
    this.data.adress = this.user.userData.adress;
    this.data.titre_emploi = this.user.userData.titre_emploi;
    this.data.socialLinks = this.user.userData.socialLinks;
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur"||
      this.user.userData.role === "admin"
    ) {
      this.$router.push("login");
    }
  },
};
</script>
<template>
  <NavBar />
  <!-- container info comptz -->
  <v-snackbar
    :timeout="7000"
    color="blue-darken-2 mt-16"
    v-model="candidat.alert"
    location="top"
  >
    {{ candidat.message }}
  </v-snackbar>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="11" md="10" xl="8" class="pa-5 ma-3 ms-8">
        <h1 class="title">Mon Profil</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="9" md="5" xl="3">
        <v-card class="pa-3 ma-3" rounded="xl">
          <!-- image profil -->
          <v-col cols="auto" class="d-flex justify-center">
            <label for="image" class="cursor-pointer">
              <v-tooltip text="Click pour change l'image" location="top">
                <template v-slot:activator="{ props }">
                  <v-badge
                    v-bind="props"
                    color="blue"
                    icon="mdi-image-edit-outline"
                    offset-x="-16"
                    offset-y="12"
                  ></v-badge>
                </template>
              </v-tooltip>
              <v-img
                class="rounded-circle"
                style="border: 2px solid blue"
                width="120"
                :src="data.imageUrl"
              ></v-img>
            </label>
            <input
              type="file"
              id="image"
              class="d-none"
              accept="image/*"
              @change="handleFileChange"
            />
          </v-col>
          <!-- nom & prenom -->
          <v-col cols="auto">
            <h3 class="text-capitalize text-center">
              bienvenue, {{ data.prenom }} {{ data.nom }}
            </h3>
            <h3 class="text-capitalize text-center font-weight-thin">
              {{ data.titre_emploi }}
            </h3>
          </v-col>
          <!-- contact  -->
          <v-col cols="auto" class="ms-3">
            <a
              :href="'mailto:' + this.user.userData.mail"
              class="mt-4 text-decoration-none text-black"
            >
              <v-icon>mdi-email-outline</v-icon> {{ this.user.userData.mail }}
            </a>
            <p class="my-4 text-capitalize">
              <v-icon>mdi-calendar-range</v-icon> {{ data.dateNais }}
            </p>
            <a
              :href="'tel:' + data.tel"
              class="mt-4 text-decoration-none text-black"
            >
              <v-icon>mdi-phone-outline</v-icon> +216 {{ data.tel }}
            </a>
            <p class="mt-4 text-capitalize">
              <v-icon>mdi-map-marker</v-icon> {{ data.adress }}
            </p>
            <!-- social Links -->
            <p
              class="mt-4"
              v-for="(link, index) in data.socialLinks"
              :key="index"
            >
              <v-icon v-if="link.platform === 'Autre'">mdi-earth</v-icon>
              <v-icon v-else>mdi-{{ link.platform }}</v-icon>
              <a :href="'https://' + link.url" target="_blank">
                {{ link.url }}</a
              >
            </p>
          </v-col>
        </v-card>
      </v-col>
      <!-- card modifier -->
      <v-col cols="12" sm="12" md="7" xl="8">
        <v-card class="pa-6 ma-3" rounded="xl">
          <v-row>
            <v-col cols="9" md="10" xl="11">
              <h1>Paramètres du compte</h1>
              <span
                >Consultez et mettez à jour vos informations de compte, votre
                profil et bien plus.</span
              >
            </v-col>
            <v-col cols="3" md="2" xl="1">
              <DialogPwd />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">Nom</p>
              <v-text-field variant="solo-inverted" v-model="data.nom">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">Prenom</p>
              <v-text-field variant="solo-inverted" v-model="data.prenom">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">Telephone</p>
              <v-text-field
                variant="solo-inverted"
                v-model="data.tel"
                type="number"
              >
              </v-text-field>
            </v-col>

            <!-- aaa -->
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">
                Date de Naissance
              </p>
              <v-text-field
                type="date"
                variant="solo-inverted"
                v-model="data.dateNais"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">
                Gouvernorat (Adress)
              </p>
              <!-- <v-text-field variant="solo-inverted" v-model="data.adress">
              </v-text-field> -->
              <v-autocomplete
                v-model="data.adress"
                :items="cityName"
                variant="solo-inverted"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4">
              <p class="text-subtitle-2 text-medium-emphasis">
                Role/Position
                <v-tooltip text="Votre poste actuel ou profession">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-alert-circle</v-icon>
                  </template>
                </v-tooltip>
              </p>
              <v-text-field variant="solo-inverted" v-model="data.titre_emploi">
              </v-text-field>
            </v-col>
          </v-row>
          <!-- social profil -->
          <v-row>
            <v-col cols="12">
              <h3 class="d-inline">Profil Social</h3>
              <!-- <v-icon class="float-right" color="blue">mdi-plus-circle</v-icon> -->
              <v-btn
                color="indigo"
                class="float-right text-none"
                variant="outlined"
                @click="addLink()"
                >Ajouter un lien</v-btn
              >
            </v-col>
            <v-divider class="border-opacity-25"></v-divider>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="d-flex"
              v-for="(link, index) in data.socialLinks"
              :key="index"
            >
              <div class="w-25">
                <v-select
                  v-model="link.platform"
                  :items="platformOptions"
                  class="text-capitalize"
                  variant="outlined"
                  density="compact"
                  color="blue"
                  hide-details
                >
                </v-select>
              </div>
              <div class="w-75">
                <v-text-field
                  v-model="link.url"
                  variant="outlined"
                  density="compact"
                  color="blue"
                  hide-details
                  :prepend-inner-icon="'mdi-' + link.platform"
                >
                  <template v-slot:append-inner>
                    <v-btn
                      icon="mdi-close-circle-outline"
                      size="smal"
                      color="red"
                      variant="text"
                      @click="removeLink(index)"
                    ></v-btn>
                  </template>
                </v-text-field>
              </div>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="indigo"
                @click="onSubmit()"
                class="text-none font-weight-bold float-right"
                size="large"
                :loading="loading"
              >
                Enregistrer les modifications
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.title::before {
  content: " ";
  background-color: #233eae;
  width: 6px;
  height: 30px;
  position: absolute;
  left: 5%;
  top: 110px;
  border-radius: 15px;
}
</style>
