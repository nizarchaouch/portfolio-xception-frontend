<script>
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
import logo from "@/assets/logo_text.png";
import bgAdmin from "@/assets/bg-admin.png";

export default {
  name: "authview",
  computed: {
    ...mapState(["forgot", "user"]),
  },
  data() {
    const route = useRoute();
    return {
      logo,
      bgAdmin,
      visible: false,
      loading: false,
      form: false,
      password: "",
      passwordcheck: "",
      rules: {
        required: (value) => !!value || "Champ requis.",
        counter: (value) => value.length >= 0 || "Minimum 8 caractères",
        passwordMatch: (value) => {
          return (
            value === this.passwordcheck ||
            "Les mots de passe ne correspondent pas."
          );
        },
      },
      route,
    };
  },
  methods: {
    ...mapActions(["resetPwd", "userAuth"]),
    onSubmit() {
      const resetToken = this.route.params.token; // Access route params here
      if (!this.form) return;
      this.loading = true;
      const data = {
        resetToken,
        password: this.password,
      };
      setTimeout(() => {
        this.resetPwd(data);
        this.loading = false;
      }, 500);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.userAuth();
    if (this.user.authenticated && this.user.userData.role === "recruteur") {
      this.$router.push("/dashboard");
    }
    if (this.user.authenticated && this.user.userData.role === "candidat") {
      this.$router.push("/profil");
    }
  },
};
</script>

<template>
  <v-row no-gutters class="bg-white">
    <v-col cols="6">
      <v-form @submit.prevent="onSubmit" v-model="form">
        <v-col cols="4" offset-lg="3" class="mt-16">
          <v-img class="mx-aut my-6" max-width="228" :src="logo"></v-img>
        </v-col>
        <v-col cols="6" class="mx-auto mt-16">
          <v-snackbar
            :timeout="7000"
            color="red-darken-2 mt-16"
            v-model="forgot.alert"
            location="top"
          >
            {{ forgot.message }}
          </v-snackbar>
          <h2 class="text-center">Réinitialiser le mot de passe</h2>
          <div class="text-subtitle-1 text-medium-emphasis mt-4">
            Saisir le nouveau mot de passe
          </div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="comfortable"
            placeholder="Tapez votre nouveau mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="password"
            :rules="[rules.required, rules.counter, rules.counter]"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <div class="text-subtitle-1 text-medium-emphasis mt-4">
            Confirmez le mot de passe
          </div>
          <v-text-field
            :type="visible ? 'text' : 'password'"
            density="comfortable"
            placeholder="Confirme mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="passwordcheck"
            :rules="[rules.required, rules.passwordMatch]"
            @click:append-inner="visible = !visible"
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
        </v-col>
      </v-form>
    </v-col>
    <v-col cols="6" class="h-screen">
      <v-img cover :src="bgAdmin" class="d-flex align-end pb-16">
        <v-row class="mb-10">
          <v-col cols="auto" class="mb-16 mx-16">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
              class="ms-16"
            >
              <v-icon color="white" size="30">mdi-briefcase-eye-outline</v-icon>
            </v-btn>
            <p class="text-white mt-2 ms-16 text-h6">2</p>
            <p class="text-grey-lighten-1 ms-16 font-weight-bold">Offres</p>
          </v-col>
          <v-col cols="auto" class="mb-16 mx-16">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
            >
              <v-icon color="white" size="30">mdi-domain</v-icon>
            </v-btn>
            <p class="text-white mt-2 text-h6">2</p>
            <p class="text-grey-lighten-1 font-weight-bold">Entreprises</p>
          </v-col>
          <v-col cols="auto" class="mb-16 mx-16">
            <v-btn
              :ripple="false"
              elevation="0"
              color="rgba(255, 255, 255, 0.106)"
              size="64"
            >
              <v-icon color="white" size="30">mdi-account-outline</v-icon>
            </v-btn>
            <p class="text-white mt-2 text-h6">2</p>
            <p class="text-grey-lighten-1 font-weight-bold">Candidats</p>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
  </v-row>
  <!-- <div class="body h-screen w-100">
    <v-form @submit.prevent="onSubmit" v-model="form" class="pt-16">
      <div>
        <v-card
          class="mx-auto pa-8 pb-8"
          elevation="10"
          max-width="420"
          rounded="lg"
        >
          <v-snackbar
            :timeout="7000"
            color="red-darken-2 mt-16"
            v-model="forgot.alert"
            location="top"
          >
            {{ forgot.message }}
          </v-snackbar>
          <h2 class="text-center">Réinitialiser le mot de passe</h2>
          <div class="text-subtitle-1 text-medium-emphasis mt-4">
            Saisir le nouveau mot de passe
          </div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Tapez votre nouveau mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="password"
            :rules="[rules.required, rules.counter, rules.counter]"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <div class="text-subtitle-1 text-medium-emphasis mt-4">
            Confirmez le mot de passe
          </div>
          <v-text-field
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirme mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="passwordcheck"
            :rules="[
              rules.required,
              rules.passwordMatch,
            ]"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            rounded="lg"
            :disabled="!form"
            :loading="loading"
            type="submit"
          >
            Envoyer
          </v-btn>
        </v-card>
      </div>
    </v-form>
  </div> -->
</template>
<style lang="scss">
.body {
  background-image: linear-gradient(45deg, #d2001a, #7462ff, #f84e21, #23d5ab);
  background-size: 300% 300%;
  animation: color 12s ease-in-out infinite;
  @keyframes color {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
