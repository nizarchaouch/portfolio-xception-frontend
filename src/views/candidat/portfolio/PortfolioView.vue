<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/portfolio/NavBar.vue";
import PagePort from "@/components/portfolio/PagePort.vue";
import SideModEntet from "@/components/portfolio/sidebar/SideModEntet.vue";
import SidebarM from "@/components/portfolio/sidebar/SideBarM.vue";
export default {
  components: {
    NavBar,
    PagePort,
    SideModEntet,
    SidebarM,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "portfolio"]),
  },
  methods: {
    ...mapActions(["userAuth"]),
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "recruteur"
    ) {
      this.$router.push("/login");
    }
  },
};
</script>
<template>
  <v-container fluid>
    <v-row>
      <NavBar />
    </v-row>
    <v-row class="mt-13">
      <v-col
        :cols="portfolio.SideModEntet || portfolio.sideBarM ? 10 : 12"
        :class="!(portfolio.SideModEntet || portfolio.sideBarM) ? 'mx-auto' : ''"
      >
        <div :class="(portfolio.SideModEntet || portfolio.sideBarM) ? 'me-13' : ''">
          <PagePort />
        </div>
      </v-col>
      <v-col cols="3" v-if="portfolio.SideModEntet">
        <SideModEntet />
      </v-col>
      <v-col cols="3" v-if="portfolio.sideBarM">
        <SidebarM />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss"></style>
