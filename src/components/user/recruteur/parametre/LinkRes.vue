<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user", "profilRec"]),
  },
  data() {
    return {
      loading: false,
      socialLinks: [],
      platformOptions: [
        "Twitter",
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Autre",
      ],
    };
  },
  methods: {
    ...mapActions(["userAuth", "updated"]),
    addLink() {
      this.socialLinks.push({ platform: "", url: "" });
    },
    removeLink(index) {
      this.socialLinks.splice(index, 1);
    },
    saveChanges() {
      const data = {
        id: this.user.userData._id,
        socialLinks: this.socialLinks,
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
    this.socialLinks = this.user.userData.socialLinks || [
      { platform: "LinkedIn", url: "" },
    ];
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
  <v-sheet :elevation="2" class="rounded-lg pa-7">
    <v-row v-for="(link, index) in socialLinks" :key="index" no-gutters>
      <v-col cols="2">
        <v-select
          v-model="link.platform"
          :items="platformOptions"
          label="Sélectionner une option"
        ></v-select>
      </v-col>
      <v-col cols="9">
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
    <v-row justify="center">
      <v-col cols="12">
        <div
          @click="addLink"
          class="bg-grey-lighten-2 pa-3 me-9 text-center cursor-pointer"
        >
          <v-icon class="mb-1">mdi-plus-circle-outline</v-icon> &nbsp;
          <span class="text- -1">Ajouter un nouveau lien social</span>
        </div>
      </v-col>
      <!-- btn submit -->
      <v-col cols="12">
        <v-btn
          @click="saveChanges"
          color="blue"
          class="text-none font-weight-bold float-right"
          size="large"
          :loading="loading"
        >
          Enregistrer les modifications
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped></style>
