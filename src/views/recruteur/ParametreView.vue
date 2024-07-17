<script>
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";
import { mapState, mapActions } from "vuex";
import InfoEnt from "@/components/user/recruteur/parametre/InfoEnt.vue";
import InfoFond from "@/components/user/recruteur/parametre/InfoFond.vue";
import LinkRes from "@/components/user/recruteur/parametre/LinkRes.vue";
export default {
  components: { NavBar, SideBar, InfoEnt, InfoFond, LinkRes },
  computed: {
    ...mapState(["user"]),
    userData() {
      return this.user.userData;
    },
  },
  data() {
    return {
      drawer: true,
      tab: 1,
    };
  },
  methods: { ...mapActions(["userAuth"]) },
  async mounted() {
    await this.userAuth();

    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat" ||
      this.user.userData.role === "admin"
    ) {
      this.$router.push("login");
    } else {
      // await this.showOfferRec(this.user.userData._id);
    }
  },
};
</script>
<template>
  <NavBar :hidea="' '" />
  <SideBar />
  <v-container fluid>
    <v-row class="mt-14">
      <v-col cols="12" lg="10" offset-lg="2">
        <v-row>
          <v-col
            cols="12"
            sm="11"
            class="mx-xs-auto mx-sm-auto mx-md-auto mx-lg-auto mx-xl-0"
          >
            <h2>Paramètres</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="11">
            <v-card class="bg-tabs" border>
              <v-tabs v-model="tab" color="deep-purple-accent-4">
                <v-tab :value="1" class="text-none">
                  <v-icon size="x-large">mdi-account-supervisor-circle</v-icon
                  >&nbsp; Informations sur l'entreprise
                </v-tab>
                <v-tab :value="2" class="text-none">
                  <v-icon size="x-large">mdi-account-circle</v-icon>&nbsp;
                  Informations sur la fondation
                </v-tab>
                <v-tab :value="3" class="text-none">
                  <v-icon size="x-large">mdi-web</v-icon>&nbsp; Profil sur les
                  réseaux sociaux
                </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item :value="1">
                  <InfoEnt />
                </v-window-item>
                <v-window-item :value="2">
                  <InfoFond />
                </v-window-item>
                <v-window-item :value="3">
                  <LinkRes />
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.bg-tabs {
  // background-color: rgba(245, 245, 245, 0.482);
  background-color: rgba(0, 187, 255, 0.122);
}
</style>
