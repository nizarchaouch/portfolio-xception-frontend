<script>
import { mapState, mapActions } from "vuex";
import logo from "@/assets/logo_text.png";
export default {
  name: "authview",
  computed: {
    ...mapState(["login", "user"]),
  },
  data: () => ({
    logo: logo,
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
    ...mapActions(["loginUser", "userAuth"]),
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      setTimeout(() => {
        this.loginUser(this.data);
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
  <div class="body h-screen w-100">
    <v-btn
      color="white"
      rounded="xl"
      icon="mdi-arrow-left"
      class="ma-3"
      @click="goBack()"
    ></v-btn>
    <v-form @submit.prevent="onSubmit" v-model="form">
      <div>
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="10"
          max-width="400"
          rounded="lg"
        >
          <v-snackbar
            :timeout="7000"
            color="red-darken-2 mt-16"
            v-model="login.alert"
            location="top"
          >
            {{ login.message }}
          </v-snackbar>
          <v-img class="mx-auto my-6" max-width="228" :src="logo"></v-img>
          <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :readonly="loading"
            v-model="data.mail"
            :rules="[rules.required, rules.mail]"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Mot de passe

            <a
              class="text-caption text-decoration-none text-blue"
              href="/forgot_password"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mot de passe oublié ?</a
            >
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Tapez votre mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :readonly="loading"
            v-model="data.password"
            :rules="[rules.required, rules.counter]"
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
            Se connecter
          </v-btn>

          <v-card-text class="text-center">
            <v-btn class="text-blue" variant="text" to="signup">
              <p class="text-decoration-underline">S'inscrire maintenant</p>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-form>
  </div>
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
