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
export default {
  props: { data: Object },
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
  },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
    selectedPage() {
      return this.data.selectedPage;
    },
    navbar() {
      return this.data.navbar;
    },
    pages() {
      return this.data.pages;
    },
  },
  data: () => ({}),
  methods: {
    ...mapActions([""]),
    ...mapMutations([""]),
  },
  created() {
    this.data.selectedPage = this.pages[0];
  },
};
</script>

<template>
  <component :is="navbar.type" />
  <div v-for="(bloc, index) in selectedPage.bloc" :key="index">
    <component :is="bloc.type" :id="bloc.id" :ok="true" />
  </div>
</template>

<style lang="scss" scoped></style>
