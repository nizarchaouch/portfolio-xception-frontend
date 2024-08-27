<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import LTN from "@/components/portfolio/bloc/navbar/LTN.vue";
import NTL from "@/components/portfolio/bloc/navbar/NTL.vue";
import CardText from "@/components/portfolio/bloc/entete/CardText.vue";
import ITTB from "@/components/portfolio/bloc/apropos/ITTB.vue";
import TTBI from "@/components/portfolio/bloc/apropos/TTBI.vue";
import BlocTitre from "@/components/portfolio/bloc/Titre/BlocTitre.vue";
import BlocParg from "@/components/portfolio/bloc/Titre/BlocParg.vue";
import BlocTitreBtn from "@/components/portfolio/bloc/Titre/BlocTitreBtn.vue";
import CardExp from "@/components/portfolio/bloc/card/CardExp.vue";
import CardSkil from "@/components/portfolio/bloc/card/CardSkil.vue";
import CardProj from "@/components/portfolio/bloc/card/CardProj.vue";
export default {
  props: { id: String },
  components: {
    CardText,
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
    ...mapState(["portfolioss"]),
    selectedPage() {
      return this.portfolioss.selectedPage;
    },
    navbar() {
      return this.portfolioss.ModelPortf.navbar;
    },
    pages() {
      return this.portfolioss.ModelPortf.pages;
    },
  },
  data: () => ({}),
  methods: {
    ...mapActions(["getModelPortfolio"]),
    ...mapMutations([""]),
  },
  created() {
    if (this.id) {
      this.getModelPortfolio(this.id);      
    } else {
      console.error("ID prop is missing.");
    }
    this.portfolioss.selectedPage = this.pages[0];
  },
};
</script>

<template>
  <component :is="navbar.type" :voir="true" :model="true" />
  <div v-for="(bloc, index) in selectedPage.bloc" :key="index">
    <component :is="bloc.type" :id="bloc.id" :ok="true" :voir="true" />
  </div>
</template>

<style lang="scss" scoped></style>
