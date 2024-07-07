<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: { id: Number },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
    settings() {
      return this.portfolioss.selectedPage.bloc[this.id].settings;
    },
  },
  data: () => ({
    tab: null,
    showButton: false,
    // setting: {
    //   titre: {
    //     affiche: true,
    //     color: "black",
    //     selectStyle: "Titer 4",
    //     size: 100,
    //     selectPolice: "Frank Ruhl Libre",
    //     nom: "Noter Projet",
    //   },
    //   parg: {
    //     affiche: true,
    //     color: "#6F6F6F",
    //     selectStyle: "Titer 4",
    //     size: 20,
    //     selectPolice: "Average Sans",
    //     nom: `Non occaecat culpa aliquip duis sunt amet qui pariatur quis ut.
    //      Officia sit adipisicing proident aute veniam veniam. Irure officia
    //      esse eu quis mollit consectetur aliqua anim nisi et labore do.
    //      Incididunt ea consequat duis officia commodo fugiat non.
    //      Occaecat ea velit esse tempor veniam laborum.`,
    //   },
    // },
  }),
  methods: {
    ...mapMutations(["changeSidebarA", "changeSidebarM"]),
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
  },
  // created() {
  //   this.portfolioss.selectedPage.bloc[this.id].settings = this.settings;
  // },
};
</script>

<template>
  <v-row
    no-gutters
    @mouseover="showButton = true"
    @mouseleave="showButton = false"
  >
    <v-row style="height: 0" v-if="!portfolio.dialogA">
      <v-btn
        v-if="showButton"
        color="white"
        prepend-icon="mdi-auto-fix"
        class="animation text-none ms-6 mt-5"
        @click="handleAddBlock"
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
          @click="
            (this.portfolio.modAprop = true),
              (this.portfolio.blocmodif = this.id)
          "
        >
          Modifier le bloc
        </v-btn>
        <v-card class="pa-2 my-1 d-flex justify-space-between" flat border>
          <v-btn variant="text" size="40">
            <v-icon>mdi-content-copy</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Dupliquer</v-tooltip
            >
          </v-btn>
          <v-btn variant="text" size="40">
            <v-icon>mdi-arrow-up</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Déplacer vers le haut</v-tooltip
            >
          </v-btn>
          <v-btn variant="text" size="40">
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
    <v-row
      no-gutters
      class="bloc"
      style="background-color: white; width: 98.7%"
    >
      <v-col cols="12" md="6" order="">
        <v-img
          class="h-100"
          min-height="400"
          cover
          src="https://picsum.photos/500/300?image=232"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column fill-height justify-center align-center">
          <v-col
            cols="12"
            md="10"
            class="d-flex flex-column justify-center align-center text-black"
          >
            <div
              v-html="settings.titre.nom"
              v-if="settings.titre.affiche"
              class="mb-4"
              :style="{
                color: settings.titre.color,
                'font-size': settings.titre.size + 'px',
                fontFamily: settings.titre.selectPolice,
              }"
            ></div>
            <div
              v-html="settings.parg.nom"
              v-if="settings.parg.affiche"
              class="text-justify mb-4"
              :style="{
                color: settings.parg.color,
                'font-size': settings.parg.size + 'px',
                fontFamily: settings.parg.selectPolice,
              }"
            ></div>
            <v-btn color="success" class="text-none">En savoir plus</v-btn>
          </v-col>
        </div>
      </v-col>
    </v-row>
    <v-row style="height: 0" justify="center" v-if="!portfolio.dialogA">
      <v-btn
        v-if="showButton"
        color="white"
        prepend-icon="mdi-plus"
        class="animation text-none bg-blue rounded-pill"
        @click="
          (portfolio.dialogA = !portfolio.dialogA) && (portfolio.blocindex = id)
        "
        style="z-index: 3; bottom: 30px"
      >
        Ajouter un bloc
      </v-btn>
    </v-row>
  </v-row>
</template>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.addBloc {
  border: 2px dashed gray;
}
.bloc {
  &:hover {
    border: 2px solid blue;
  }
}
.animation {
  animation: fadeIn 0.6s;
}

@media screen and (max-width: 600px) {
  .btn {
    z-index: 3;
    bottom: 20px;
    left: 7%;
  }
}
</style>
