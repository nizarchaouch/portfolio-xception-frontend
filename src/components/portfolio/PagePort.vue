<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import LTN from "./bloc/navbar/LTN.vue";
import NTL from "./bloc/navbar/NTL.vue";
import CardText from "./bloc/entete/CardText.vue";
import CardText1 from "./bloc/entete/CardText1.vue";
import ITTB from "./bloc/apropos/ITTB.vue";
import TTBI from "./bloc/apropos/TTBI.vue";
import BlocTitre from "./bloc/Titre/BlocTitre.vue";
import BlocParg from "./bloc/Titre/BlocParg.vue";
import BlocTitreBtn from "./bloc/Titre/BlocTitreBtn.vue";
import CardExp from "./bloc/card/CardExp.vue";
import CardSkil from "./bloc/card/CardSkil.vue";
import CardProj from "./bloc/card/CardProj.vue";
export default {
  components: {
    CardText,
    CardText1,
    LTN,
    NTL,
    ITTB,
    TTBI,
    BlocTitre,
    BlocTitreBtn,
    BlocParg,
    CardExp,
    CardSkil,
    CardProj,
  },
  computed: {
    ...mapState(["portfolio", "portfolioss","user"]),
    selectedPage() {
      return this.portfolioss.selectedPage;
    },
    navbar() {
      return this.portfolioss.portfolios.navbar;
    },
    pages() {
      return this.portfolioss.portfolios.pages;
    },
  },
  data: () => ({}),
  methods: {
    ...mapActions([""]),
    ...mapMutations([""]),
  },
  created() {
    this.portfolioss.portfolios.idCandidat = this.user.userData._id;
    this.portfolioss.selectedPage = this.pages[0];
  },
};
</script>

<template>
  <component :is="navbar.type" />
  <CardText1 />
  <CardText />
  <div v-for="(bloc, index) in selectedPage.bloc" :key="index">
    <component :is="bloc.type" :id="bloc.id" :ok="true" />
  </div>
  <!-- {{ pages[0].bloc }} -->
  <!-- {{selectedPage.id }} id page -->
  <!-- <div v-if="portfolio.selectedPage">
    <div>
      {{ portfolioss.selectedPage.bloc }}
    </div>
  </div> -->
  <!-- <LTN /> -->
  <!-- <NTL /> -->
  <!-- <CardText /> -->
  <!-- <TTBI />
  <ITTB /> -->
  <!-- <BlocTitreBtn /> -->
  <!-- <CardExp /> -->
</template>

<style lang="scss" scoped></style>
