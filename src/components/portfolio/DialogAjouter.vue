<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import TTBI from "./bloc/apropos/TTBI.vue";
import ITTB from "./bloc/apropos/ITTB.vue";
import CardText from "./bloc/entete/CardText.vue";
import BlocTitre from "./bloc/Titre/BlocTitre.vue";
import BlocTitreBtn from "./bloc/Titre/BlocTitreBtn.vue";
import BlocParg from "./bloc/Titre/BlocParg.vue";
import CardExp from "./bloc/card/CardExp.vue";
import CardSkil from "./bloc/card/CardSkil.vue";
import CardProj from "./bloc/card/CardProj.vue";
export default {
  components: {
    TTBI,
    ITTB,
    CardText,
    BlocTitre,
    BlocTitreBtn,
    BlocParg,
    CardExp,
    CardSkil,
    CardProj,
  },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
  },
  data: () => ({
    tab: 2,
    entete: ["CardText"],
    apropos: ["ITTB"],
    titre: [
      "BlocTitre",
      "BlocTitreBtn",
      "CardExp",
      "CardSkil",
      "CardProj",
      "BlocParg",
    ],
  }),
  methods: {
    ...mapActions(["addBloc", "addBlocNav"]),
    onClickAddBloc(type) {
      console.log(this.portfolio.blocindex);
      if (this.portfolio.isnavbar) {
        this.addBlocNav({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: 0,
          type: type,
        });
        this.portfolio.isnavbar = false;
        this.portfolio.dialogA = false;
      } else {
        this.addBloc({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: this.portfolio.blocindex,
          type: type,
        });
        this.portfolio.dialogA = false;
      }
    },
    handleAddBloc(type) {
      if (this.portfolio.isnavbar) {
        this.addBlocNav({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: 0,
          type: type,
        });
        this.portfolio.isnavbar = false;
        this.portfolio.dialogA = false;
      } else {
        this.addBloc({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: this.portfolio.blocindex,
          type: type,
        });
        this.portfolio.dialogA = false;
      }
    },
  },
};
</script>
<template>
  <div>
    <v-dialog v-model="portfolio.dialogA" max-width="1600" max-height="800">
      <v-card class="mt-14 rounded-lg">
        <v-toolbar class="px-2">
          <v-toolbar-title class="font-weight-bold">
            Ajouter Bloc
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            class="text-none ms-auto"
            icon="mdi-window-close"
            @click="portfolio.dialogA = false"
          ></v-btn>
        </v-toolbar>
        <v-divider class="border-opacity-25"></v-divider>

        <div class="d-flex flex-row">
          <v-tabs
            v-model="tab"
            color="primary"
            direction="vertical"
            style="width: 200px"
          >
            <v-tab
              class="text-none font-weight-bold"
              text="En-tête"
              :value="1"
            ></v-tab>
            <v-tab
              class="text-none font-weight-bold"
              text="À propos"
              :value="2"
            ></v-tab>
            <!-- <v-tab
              class="text-none font-weight-bold"
              text="Titre"
              :value="3"
            ></v-tab> -->
          </v-tabs>
          <v-divider vertical class="border-opacity-25"></v-divider>

          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-row no-gutters>
                <v-col
                  v-for="(bloc, index) in entete"
                  :key="index"
                  cols="12"
                  @click="onClickAddBloc(bloc)"
                  class="pa-16 pt-3 cursor-pointer"
                >
                  <component :is="bloc"></component>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row no-gutters>
                <v-col
                  v-for="(bloc, index) in apropos"
                  :key="index"
                  cols="12"
                  @click="onClickAddBloc(bloc)"
                  class="pa-16 pt-3 cursor-pointer"
                >
                  <component :is="bloc"></component>
                </v-col>
                <v-col
                  v-for="(bloc, index) in titre"
                  :key="index"
                  cols="12"
                  @click="onClickAddBloc(bloc)"
                  class="pa-16 pt-3 mx-auto cursor-pointer"
                  style="max-width: 1900px"
                >
                  <component :is="bloc"></component>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
