<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapGetters } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import SideAdmin from "@/components/user/admin/SideAdmin.vue";
export default {
  components: {
    NavBar,
    SideAdmin,
  },
  computed: {
    ...mapState(["user", "profilAdmin"]),
    ...mapGetters([""]),
    userData() {
      return this.user.userData;
    },
  },
  data() {
    return {
      loading: false,
      showPwd: false,
      image: "",
      data: {
        id: null,
        fileForUpload: null,
        imageUrl: "",
        nom: "",
        prenom: "",
        mail: "",
        tel: "",
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(["userAuth", "updatedAdmin"]),
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.data.fileForUpload = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          console.log("URL de l'image:", this.image);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Veuillez sélectionner un fichier image.");
      }
    },
    onSubmit() {
      this.loading = true;
      const dataToSend = { ...this.data };
      if (!this.data.password) {
        delete dataToSend.password;
      }
      this.updatedAdmin(dataToSend);
      setTimeout(() => {
        this.loading = false;
        window.location.reload();
      }, 500);
    },
  },
  async created() {
    await this.userAuth();
    this.data.id = this.user.userData._id;
    this.data.imageUrl = "http://localhost:8000" + this.user.userData.imagePath;
    this.data.nom = this.user.userData.nom;
    this.data.prenom = this.user.userData.prenom;
    this.data.mail = this.user.userData.mail;
    this.data.tel = this.user.userData.tel;
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
    }
  },
};
</script>
<template>
  <!-- container info comptz -->
  <v-snackbar
    :timeout="7000"
    :color="profilAdmin.color"
    v-model="profilAdmin.alert"
    location="top"
  >
    {{ profilAdmin.message }}
  </v-snackbar>
  <NavBar hidea=" " />
  <SideAdmin />
  <v-container fluid style="background-color: #f2f7ff" class="h-screen">
    <v-row class="mt-16">
      <v-col cols="12" lg="9" xl="10" offset-lg="3" offset-xl="2">
        <v-row no-gutters>
          <v-col cols="12">
            <h2 class="text-capitalize">Mon Profil</h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <!-- col image -->
          <v-col cols="12" md="3" lg="2">
            <label for="logo" class="cursor-pointer">
              <v-tooltip text="Click pour change l'image" location="left">
                <template v-slot:activator="{ props }">
                  <v-badge
                    v-bind="props"
                    class="ms-4"
                    floating
                    color="blue"
                    icon="mdi-image-edit-outline"
                    offset-y="10"
                    offset-x="30"
                  >
                    <v-avatar
                      size="150"
                      :image="
                        image
                          ? image
                          : 'http://localhost:8000' + this.userData.imagePath
                      "
                    >
                    </v-avatar>
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
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">Nom</h4>
            <v-text-field
              v-model="data.nom"
              density="comfortable"
              variant="outlined"
              color="blue"
            >
            </v-text-field>
          </v-col>
          <!--  -->
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">Prenom</h4>
            <v-text-field
              v-model="data.prenom"
              density="comfortable"
              variant="outlined"
              color="blue"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <!--  -->
        <v-row justify="center">
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">E-mail</h4>
            <v-text-field
              density="comfortable"
              variant="outlined"
              color="blue"
              disabled
              v-model="data.mail"
            >
            </v-text-field>
          </v-col>
          <!--  -->
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">Téléphone</h4>
            <v-text-field
              density="comfortable"
              variant="outlined"
              color="blue"
              v-model="data.tel"
              type="Number"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="8">
            <v-checkbox
              label="Changer le mot de passe"
              color="indigo"
              v-model="showPwd"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
        <!--  -->
        <v-row justify="center" v-if="showPwd">
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">Mot de passe</h4>
            <v-text-field
              density="comfortable"
              variant="outlined"
              color="blue"
              type="password"
              v-model="data.password"
            >
            </v-text-field>
          </v-col>
          <!--  -->
          <v-col cols="12" md="4">
            <h4 class="mb-4 text-medium-emphasis">Confirme mot de passe</h4>
            <v-text-field density="comfortable" variant="outlined" color="blue">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="3">
            <v-btn
              color="indigo"
              class="text-none"
              rounded="pill"
              size="large"
              @click="onSubmit()"
              >Sauvegarder</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.profil::before {
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
