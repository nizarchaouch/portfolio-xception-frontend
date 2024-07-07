<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import TTBI from "./bloc/apropos/TTBI.vue";
import ITTB from "./bloc/apropos/ITTB.vue";
import CardText from "./bloc/entete/CardText.vue";
import ImageTTBI from "@/assets/bloc/TTBI.png";
import ImageITTBI from "@/assets/bloc/ITTB.png";
export default {
  // props: { defaultSettings: Object },
  components: {
    TTBI,
    ITTB,
    CardText,
  },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
    modifiedPropos() {
      return this.propos.map((img) => this.extractFileName(img));
    },
  },
  data: () => ({
    tab: 1,
    entete: ["CardText"],
    apropos: ["ITTB"],
    propos: [ImageTTBI, ImageITTBI],
    TTBISetting: {
      titre: {
        affiche: true,
        color: "black",
        selectStyle: "Titer 4",
        size: 100,
        selectPolice: "Frank Ruhl Libre",
        nom: "Noter Projet",
      },
      parg: {
        affiche: true,
        color: "#6F6F6F",
        selectStyle: "Titer 4",
        size: 20,
        selectPolice: "Average Sans",
        nom: `Non occaecat culpa aliquip duis sunt amet qui pariatur quis ut.
         Officia sit adipisicing proident aute veniam veniam. Irure officia
         esse eu quis mollit consectetur aliqua anim nisi et labore do.
         Incididunt ea consequat duis officia commodo fugiat non.
         Occaecat ea velit esse tempor veniam laborum.`,
      },
    },
    defaultSettings: {
      background: {
        bloc1: { color: "#e6dace", img: "" },
        bloc2: { color: "#FFFFFF", img: "" },
      },
      card: {
        afficheLinksRes: true,
        afficheImg: true,
        img: "",
        imgarrond: "rounded-circle",
        backgroundColor: "#F4ECE6",
        lineColor: "#2196F3",
        lineSize: 3,
        nom: {
          affiche: true,
          color: "black",
          colorBack: "#0B242400",
          nom: "nizar",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Courier Prime",
        },
        poste: {
          affiche: true,
          color: "#625E5C",
          colorBack: "#0B242400",
          nom: "Etudiant génie logiciel",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Courier Prime",
        },
      },
      titre: {
        affiche: true,
        color: "black",
        colorBack: "#0B242400",
        nom: "Hello",
        selectStyle: "Titer 4",
        size: 100,
        selectPolice: "Frank Ruhl Libre",
      },
      sousTitre: {
        affiche: true,
        color: "black",
        colorBack: "#0B242400",
        nom: "Qui je suis et ce que je fais",
        selectStyle: "Titer 4",
        size: 25,
        selectPolice: "Luckiest Guy",
      },
    },
  }),
  methods: {
    ...mapActions(["addBloc", "addBlocNav"]),
    extractFileName(filePath) {
      const fileNameWithExtension = filePath.split("/").pop();
      const fileName = fileNameWithExtension.split(".").shift();
      return fileName;
    },
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
    handleAddBloc(type, settings) {
      if (this.portfolio.isnavbar) {
        this.addBlocNav({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: 0,
          type: type,
          settings: settings,
        });
        console.log("set", settings);
        this.portfolio.isnavbar = false;
        this.portfolio.dialogA = false;
      } else {
        this.addBloc({
          pageIndex: this.portfolioss.selectedPage.id,
          blocIndex: this.portfolio.blocindex,
          type: type,
          settings: settings,
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
            <v-tab
              class="text-none font-weight-bold"
              text="liste"
              :value="3"
            ></v-tab>
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
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <!-- <v-img
                @click="handleAddBloc(extractFileName(comp))"
                v-for="comp in propos"
                :key="index"
                class="my-6 ms-6 cursor-pointer"
                width="auto"
                :src="comp"
              ></v-img> -->
              <v-img
                @click="handleAddBloc(extractFileName(propos[0]), TTBISetting)"
                class="my-6 ms-6 cursor-pointer"
                width="auto"
                :src="propos[0]"
              ></v-img>
            </v-window-item>
          </v-window>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
