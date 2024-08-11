<script>
import { mapState, mapActions, mapGetters } from "vuex";
import logo from "@/assets/logo_text.png";
import bgAdmin from "@/assets/bg-admin.png";
export default {
  name: "authview",
  computed: {
    ...mapState(["forgot", "user", "offer"]),
    ...mapGetters(["offerCount", "candCount", "recuCount"]),
  },
  data: () => ({
    logo,
    bgAdmin,
    loading: false,
    form: false,
    mail: "",
    rules: {
      required: (value) => !!value || "Champ requis.",
      mail: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email invalide.";
      },
    },
  }),
  methods: {
    ...mapActions([
      "forgotPwd",
      "userAuth",
      "showOffer",
      "getCandidats",
      "getRecruteurs",
    ]),
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      setTimeout(() => {
        this.forgotPwd(this.mail);
        this.loading = false;
      }, 500);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.userAuth();
    this.showOffer();
    this.getCandidats();
    this.getRecruteurs();
    if (this.user.authenticated && this.user.userData.role === "recruteur") {
      this.$router.push("/dashboard");
    } else if (
      this.user.authenticated &&
      this.user.userData.role === "candidat"
    ) {
      this.$router.push("/profil");
    }
  },
};
</script>

<template>
  <v-snackbar
    :timeout="7000"
    color="red-darken-2 mt-16"
    v-model="forgot.alert"
    location="top"
  >
    {{ forgot.message }}
  </v-snackbar>
  <v-row no-gutters class="bg-white">
    <v-col cols="12" md="6">
      <v-form @submit.prevent="onSubmit" v-model="form">
        <v-col cols="12" lg="4" offset-md="3" class="mt-16">
          <v-img class="mx-aut my-lg-6" max-width="228" :src="logo"></v-img>
        </v-col>
        <v-col cols="12" md="8" lg="6" class="mx-auto mt-16">
          <h2 class="text-center">Mot de passe oublié?</h2>
          <p class="text-subtitle-2 text-center">
            Ne vous inquiétez pas, cela arrive la plupart du temps.
          </p>
          <p class="text-subtitle-2 text-center">
            Tapez votre email pour réinitialiser votre mot de passe.
          </p>
          <div class="text-subtitle-1 text-medium-emphasis mt-4">E-mail</div>

          <v-text-field
            density="comfortable"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :readonly="loading"
            v-model="mail"
            :rules="[rules.required, rules.mail]"
          ></v-text-field>

          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            rounded="lg"
            :disabled="!form"
            :loading="loading"
            type="submit"
          >
            Envoyer
          </v-btn>
          <v-row justify="center">
            <p class="text-none text-subtitle-2 mt-2 ms-3">
              Se souvenir du mot de passe?
            </p>
            <v-btn class="text-blue" variant="plain" to="login">
              <p class="text-decoration-underline text-none">Se connecter</p>
            </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-col>
    <v-col cols="12" md="6" class="h-screen">
      <v-img cover height="100%" :src="bgAdmin" class="d-flex align-end pb-16">
        <v-row class="mb-10">
          <v-col cols="auto" class="mb-lg-16 mx-md-9 mx-lg-16 mx-md-9">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
              class="ms-16"
            >
              <v-icon color="white" size="30">mdi-briefcase-eye-outline</v-icon>
            </v-btn>
            <p class="text-white mt-2 ms-16 text-h6">{{ offerCount }}</p>
            <p class="text-grey-lighten-1 ms-16 font-weight-bold">Offres</p>
          </v-col>
          <v-col cols="auto" class="mb-lg-16 mx-2 mx-lg-16 mx-md-9">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
            >
              <v-icon color="white" size="30">mdi-domain</v-icon>
            </v-btn>
            <p class="text-white mt-2 text-h6">{{ recuCount }}</p>
            <p class="text-grey-lighten-1 font-weight-bold">Entreprises</p>
          </v-col>
          <v-col cols="auto" class="mb-lg-16 mx-2 mx-lg-16 mx-md-9">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
            >
              <v-icon color="white" size="30">mdi-account-outline</v-icon>
            </v-btn>
            <p class="text-white mt-2 text-h6">{{ candCount }}</p>
            <p class="text-grey-lighten-1 font-weight-bold">Candidats</p>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
