<script>
import { mapState, mapActions, mapGetters } from "vuex";
import logo from "@/assets/logo_text.png";
import bgAdmin from "@/assets/bg-admin.png";
export default {
  name: "authview",
  computed: {
    ...mapState(["login", "user", "offer"]),
    ...mapGetters(["offerCount", "candCount", "recuCount"]),
  },
  data: () => ({
    logo,
    bgAdmin,
    visible: false,
    loading: false,
    form: false,
    data: { mail: "", password: "" },
    rules: {
      required: (value) => !!value || "Champ requis.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      mail: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email invalide.";
      },
    },
  }),
  methods: {
    ...mapActions([
      "loginAdmin",
      "userAuth",
      "showOffer",
      "getCandidats",
      "getRecruteurs",
    ]),
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      setTimeout(() => {
        this.loginAdmin(this.data);
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
    if (this.user.authenticated && this.user.userData.role === "admin") {
      this.$router.push("/admin/dashboard");
    }
  },
};
</script>

<template>
  <!-- <v-btn
      color="white"
      rounded="xl"
      icon="mdi-arrow-left"
      class="ma-3"
      @click="goBack()"
    ></v-btn> -->
  <v-row no-gutters class="bg-white">
    <v-col cols="12" md="6">
      <v-form @submit.prevent="onSubmit" v-model="form">
        <v-col cols="12" lg="4" offset-md="3" class="mt-16">
          <v-img class="mx-aut my-lg-6" max-width="228" :src="logo"></v-img>
        </v-col>
        <v-col cols="12" md="8" lg="6" class="mx-auto mt-md-16">
          <v-snackbar
            :timeout="7000"
            color="red-darken-2 mt-16"
            v-model="login.alert"
            location="top"
          >
            {{ login.message }}
          </v-snackbar>
          <div class="text-body-1 text-medium-emphasis text-center my-6">
            Connectez-vous pour démarrer votre session
          </div>

          <v-text-field
            class="mb-7"
            density="comfortable"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :readonly="loading"
            v-model="data.mail"
            :rules="[rules.required, rules.mail]"
          ></v-text-field>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="comfortable"
            placeholder="Tapez votre mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="data.password"
            :rules="[rules.required, rules.counter]"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            <a
              class="text-decoration-none text-blue ms-auto"
              href="/admin/forgot_password"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mot de passe oublié ?</a
            >
          </div>

          <v-btn
            block
            class="mt-10"
            color="blue"
            size="large"
            rounded="lg"
            :disabled="!form"
            :loading="loading"
            type="submit"
          >
            Se connecter
          </v-btn>
        </v-col>
      </v-form>
    </v-col>
    <v-col cols="12" md="6" class="h-screen">
      <v-img cover height="100%" :src="bgAdmin" class="d-flex align-end pb-16">
        <v-row class="mb-10">
          <v-col cols="auto" class="mb-lg-16 mx-lg-16 mx-md-9">
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
<style lang="scss">
@keyframes number-animation {
  from {
    transform: scale(1);
    opacity: 0.5;
  }
  to {
    transform: scale(1.2);
    opacity: 1;
  }
}

.number-enter-active,
.number-leave-active {
  animation: number-animation 0.5s;
}

.number-enter, .number-leave-to /* .number-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(1);
}
</style>
