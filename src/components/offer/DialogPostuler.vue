<script>
import { mapState, mapActions } from "vuex";
export default {
  props: { idoffer: String },
  computed: {
    ...mapState(["user"]),
    userData() {
      return this.user.userData;
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      idPortfolio: true,
      cvPath: true,
      cv: "Portfolio",
      letter: "",
      portfolioExists: null,
    };
  },
  methods: {
    ...mapActions(["addCandOffer", "checkPortfolio"]),
    async checkIfPortfolioExists() {
      this.portfolioExists = await this.checkPortfolio(this.userData._id);
    },
    postuler() {
      const data = {
        idCandidat: this.user.userData._id,
        idOffer: this.idoffer,
        cv: this.cv,
        letter: this.letter,
      };
      this.loading = true;
      this.addCandOffer(data);
      setTimeout(() => {
        this.loading = false;
        this.dialog = false;
      }, 2000);
    },
  },
  created() {
    this.checkIfPortfolioExists();
  },
};
</script>
<template>
  <div class="pa-4 text-center">
    <template v-if="!this.user.authenticated && dialog">
      <!-- {{ this.$router.push("/login") }} -->
      <v-btn
        v-bind="activatorProps"
        text="Login"
        color="blue-darken-4"
        variant="tonal"
        rounded="lg"
        to="login"
      ></v-btn>
    </template>
    <v-dialog v-else max-width="500" v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          text="Postuler maintenant"
          color="blue-darken-4"
          variant="tonal"
          rounded="xl"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-container fluid class="bg-white">
          <v-row>
            <!-- cv alert -->
            <v-alert
              v-if="!userData.cvPath && cv === 'CV'"
              color="#C51162"
              icon="mdi-alert-circle"
              theme="dark"
              border
            >
              <p>Aucun CV trouvé pour envoyer</p>
              <span class="text-caption"
                >télécharger votre CV pour postuler</span
              >
            </v-alert>
            <!-- protf alert -->
            <v-alert
              v-if="!portfolioExists && cv === 'Portfolio'"
              color="#C51162"
              icon="mdi-alert-circle"
              theme="dark"
              border
            >
              <p>Aucun portfolio trouvé pour envoyer</p>
              <span class="text-caption">Créer un portfolio pour postuler</span>
            </v-alert>
            <!-- cv -->
            <v-col cols="12">
              <p class="mb-2">Votre CV</p>
              <v-select
                chips
                v-model="cv"
                :disabled="loading"
                density="compact"
                label="Select"
                color="cyan"
                :items="['Portfolio', 'CV']"
                variant="outlined"
                hide-details
              >
                <template v-slot:append-inner>
                  <template v-if="cv === 'CV'">
                    <v-icon v-if="!userData.cvPath" color="red">
                      mdi-alert-circle
                    </v-icon>
                    <v-icon v-else color="green">mdi-check-bold</v-icon>
                  </template>
                  <template v-else>
                    <v-icon v-if="!portfolioExists" color="red">
                      mdi-alert-circle
                    </v-icon>
                    <v-icon v-else color="green">mdi-check-bold</v-icon>
                  </template>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12">
              <!-- letter -->
              <p>Lettre de motivation</p>
              <v-textarea
                v-model="letter"
                :disabled="loading"
                color="cyan"
                clearable
                label="Lettre de motivation"
                hide-details
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="end" class="pa-2">
            <v-btn
              text="Annuler"
              variant="text"
              @click="isActive.value = false"
            ></v-btn>

            <v-btn
              color="blue-darken-3"
              text="Postuler"
              variant="flat"
              :disabled="
                (!userData.cvPath && cv === 'CV') ||
                (!portfolioExists && cv === 'Portfolio')
              "
              :loading="loading"
              @click="postuler()"
            ></v-btn>
          </v-row>
        </v-container>
      </template>
    </v-dialog>
  </div>
</template>
