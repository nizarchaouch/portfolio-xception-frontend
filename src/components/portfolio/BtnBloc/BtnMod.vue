<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  props: { showButton: Boolean, id: Number },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
  },
  data: () => ({}),
  methods: {
    ...mapActions(["delBloc", "duplBloc"]),
    onClickDeltBloc() {
      this.delBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
      });
    },
    onClickDuplBloc() {
      this.duplBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
        type: this.portfolioss.selectedPage.bloc[this.id].type,
        settings: this.portfolioss.selectedPage.bloc[this.id].settings,
      });
    },

    onClickModBloc() {
      this.portfolio.SideModEntet = true;
      this.portfolio.blocmodif = this.id;
    },
  },
};
</script>
<template>
  <v-row style="height: 0" v-if="!portfolio.dialogA">
    <v-btn
      v-if="showButton"
      color="white"
      prepend-icon="mdi-auto-fix"
      class="animation text-none ms-6 mt-5"
      style="z-index: 3"
    >
      Modifier le desgin
    </v-btn>
    <v-card
      v-if="showButton"
      class="animation ms-sm-auto me-6 mt-5 pa-2 ms-6"
      flat
      elevation="2"
      style="z-index: 3"
    >
      <v-btn
        border
        color="white"
        prepend-icon="mdi-pencil"
        class="text-none"
        elevation="0"
        @click="onClickModBloc"
      >
        Modifier le bloc
      </v-btn>
      <v-card class="pa-2 my-1 d-flex justify-space-between" flat border>
        <v-btn variant="text" size="40" @click="onClickDuplBloc">
          <v-icon>mdi-content-copy</v-icon>
          <v-tooltip activator="parent" location="bottom">Dupliquer</v-tooltip>
        </v-btn>
        <v-btn variant="text" size="40" :disabled="this.id === 0">
          <v-icon>mdi-arrow-up</v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Déplacer vers le haut</v-tooltip
          >
        </v-btn>
        <v-btn
          variant="text"
          size="40"
          :disabled="this.id === this.portfolioss.selectedPage.bloc.length - 1"
        >
          <v-icon>mdi-arrow-down</v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Déplacer vers le bas</v-tooltip
          >
        </v-btn>
      </v-card>
      <v-btn
        border
        color="white"
        prepend-icon="mdi-trash-can-outline"
        class="text-none text-red"
        elevation="0"
        @click="onClickDeltBloc"
      >
        Supprimer bloc
      </v-btn>
    </v-card>
  </v-row>
</template>
<style lang="scss"></style>
