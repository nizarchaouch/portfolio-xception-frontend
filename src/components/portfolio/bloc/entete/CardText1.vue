<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import defaultprofil from "@/assets/defaultprofil.png";
import BtnAjou from "../../BtnBloc/BtnAjou.vue";

export default {
  props: { id: Number, voir: Boolean },
  computed: {
    ...mapState(["user", "portfolio", "portfolioss", "fonts"]),
    settings() {
      const bloc = this.portfolioss.selectedPage.bloc[this.id];
      if (bloc && Object.keys(bloc.settings).length > 0) {
        return this.portfolioss.selectedPage.bloc[this.id].settings;
      } else {
        return this.setting;
      }
    },
    titreNom: {
      get() {
        return this.removeHtmlTags(this.settings.titre.nom);
      },
      set(value) {
        this.settings.titre.nom = value;
      },
    },
  },
  data: () => ({
    defaultprofil,
    toggle: "justify",
    showButton: false,
    showTextareaTitre: false,
    showTextareaBtn: false,
    showColorTitre: false,
    showColorBtn: false,
    showColorBack: false,
    btnStyle: ["elevated", "flat", "tonal", "outlined", "text", "plain"],
    btnRounded: ["0", "xs", "lg", "xl"],
    setting: {
      back: {
        bloc1: { color: "#e6dace", img: "" },
        bloc2: { color: "#FFFFFF", img: "" },
      },
      card: {
        img: "",
        back: "#F4ECE6",
        lineColor: "#2196F3",
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
        color: "black",
        selectPolice: "Roboto,sans-serif",
        justify: "left",
        nom: "<b>Hello</b>",
        selectPolice: "Frank Ruhl Libre",
      },
      sousTitre: {
        color: "black",
        nom: "Qui je suis et ce que je fais",
        justify: "left",
        selectPolice: "Luckiest Guy",
      },
      btn: {
        color: "blue",
        nom: "CV",
        variant: "elevated",
        rounded: "xl",
        url: "",
        doc: "",
      },
      btnSec: {
        color: "red",
        nom: "CV",
        variant: "elevated",
        rounded: "xl",
        url: "",
        doc: "",
      },
    },
  }),
  methods: {
    ...mapActions([
      "delBloc",
      "modBloc",
      "moveBlocUp",
      "moveBlocDown",
      "uploadCv",
      "fetchFonts",
    ]),
    loadFont() {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = `https://fonts.googleapis.com/css?family=${this.settings.titre.selectPolice.replace(
        / /g,
        "+"
      )}&display=swap`;
      document.head.appendChild(fontLink);
    },
    onClickDeltBloc() {
      this.delBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
      });
    },
    onClickMoveUpBloc() {
      this.moveBlocUp({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
      });
    },
    onClickMoveDownBloc() {
      this.moveBlocDown({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
      });
    },
    toggleTextareaTitre() {
      this.showTextareaTitre = !this.showTextareaTitre;
    },
    save() {
      this.showTextareaTitre = false;
      console.log("ok");
      this.modBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
        settings: this.settings,
      });
    },
    saveform() {
      console.log("ok");
      this.modBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
        settings: this.settings,
      });
    },
    handleFileChange(event) {
      this.settings.btn.url = "";
      const file = event.target.files[0];
      // this.settings.btn.doc = file;
      const cvData = {
        file: file,
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
      };
      this.uploadCv(cvData);
      console.log(file);
      this.saveform();
    },

    removeHtmlTags(html) {
      // Utilisation d'un élément temporaire pour supprimer les balises HTML
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      return tempElement.textContent || tempElement.innerText || "";
    },
    formatTextToBold() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.settings.titre.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
          this.saveform();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
          this.saveform();
        }
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.settings.titre.nom.includes(`<i>${selectedText}</i>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
          this.saveform();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
          this.saveform();
        }
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.settings.titre.nom.includes(`<u>${selectedText}</u>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
          this.saveform();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
          this.saveform();
        }
      }
    },
  },
  mounted() {
    if (this.settings.btn.url === "") {
      this.choixBtn = ["Fichier", "folder-multiple-image"];
    } else {
      this.choixBtn = ["URL", "web"];
    }
    setTimeout(() => {
      this.fetchFonts();
      this.loadFont();
    }, 200);
  },
};
</script>

<template>
  <v-row
    no-gutters
    @mouseover="showButton = true"
    @mouseleave="showButton = false"
  >
    <v-row style="height: 0" v-if="!portfolio.dialogA && !voir">
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
          @click="showColorBack = !showColorBack"
        >
          Modifier le bloc
        </v-btn>
        <v-card class="pa-2 my-1 d-flex justify-space-between" flat border>
          <v-btn
            variant="text"
            size="40"
            @click="onClickMoveUpBloc"
            :disabled="this.id === 0"
          >
            <v-icon>mdi-arrow-up</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Déplacer vers le haut</v-tooltip
            >
          </v-btn>
          <v-btn
            variant="text"
            size="40"
            @click="onClickMoveDownBloc"
            :disabled="
              this.id === this.portfolioss.selectedPage.bloc.length - 1
            "
          >
            <v-icon>mdi-arrow-down</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Déplacer vers le bas</v-tooltip
            >
          </v-btn>
          <v-btn variant="text" size="40" color="red" @click="onClickDeltBloc">
            <v-icon>mdi-trash-can-outline</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Supprimer bloc</v-tooltip
            >
          </v-btn>
        </v-card>
        <v-color-picker
          v-if="showColorBack"
          v-model="settings.back.color"
          @click="saveform"
          :modes="['hexa']"
          class="mx-auto mb-2"
        ></v-color-picker>
      </v-card>
    </v-row>
    <v-row no-gutters class="bloc">
      <v-col cols="12" md="6" lg="5" style="background-color: #ffffff">
        <v-sheet
          :color="settings.card.backgroundColor"
          class="sheet my-16 pt-3 mx-auto"
          max-width="450"
          elevation="5"
        >
          <v-img
            :width="180"
            class="mx-auto mt-8 rounded-pill"
            :src="defaultprofil"
          ></v-img>
          <div
            v-html="settings.card.nom.nom"
            v-if="settings.card.nom.affiche"
            class="text-center mt-4"
            :style="{
              'font-size': settings.card.nom.size + 'px',
              'font-family': settings.card.nom.selectPolice,
              color: settings.card.nom.color,
            }"
          ></div>
          <v-col cols="3" class="mx-auto mt-3">
            <v-progress-linear
              model-value="100"
              :color="settings.card.lineColor"
              :height="3"
              rounded
            ></v-progress-linear>
          </v-col>
          <div
            v-html="settings.card.poste.nom"
            class="text-center text-uppercase mt-4 pb-4"
            :style="{
              'font-family': settings.card.poste.selectPolice,
              'font-size': settings.card.poste.size + 'px',
              color: settings.card.poste.color,
            }"
          ></div>
          <v-col cols="12" class="py-1 mt-16 bg-white d-flex justify-center">
            <a
              :href="'https://' + link.url"
              target="_blank"
              class="text-black"
              v-for="link in this.user.userData.socialLinks"
              :key="index"
            >
              <v-btn class="ma-1" variant="text" :icon="'mdi-' + link.platform">
              </v-btn>
            </a>
          </v-col>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="7"
        class="pt-16 ps-lg-16"
        style="background-color: #ffffff"
      >
        <v-row
          class="ps-md-16 mt-2 text-sm-center text-md-justify d-flex flex-column"
        >
          <v-col cols="11">
            <div
              v-html="settings.titre.nom"
              class="text-h1 d-inline overflow-hidden"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
              }"
              style="max-width: 800px"
              :style="{
                color: this.settings.titre.color,
                fontFamily: this.settings.titre.selectPolice,
              }"
              @click="toggleTextareaTitre"
            ></div>
          </v-col>
          <v-col cols="11">
            <div
              v-html="settings.sousTitre.nom"
              v-if="settings.sousTitre.affiche"
              :style="{
                'font-size': settings.sousTitre.size + 'px',
                'font-family': settings.sousTitre.selectPolice,
                color: settings.sousTitre.color,
              }"
            ></div>
          </v-col>
          <v-col cols="11" class="mb-3">
            <v-btn
              rounded="pill"
              variant="elevated"
              color="indigo"
              size="large"
              class="me-8"
              >CV</v-btn
            >
            <v-btn rounded="pill" variant="outlined" size="large"
              >Projets</v-btn
            >
          </v-col>
          <v-col cols="12" md="11" lg="10" xl="8" class="mb-6">
            <p
              class="para overflow-hidden"
              style="font-size: 19px; max-height: 175px"
            >
              officia ullamco do culpa sit do. Laboris nostrud cillum voluptate
              esse exercitation ullamco est. Ipsum consequat anim commodo
              occaecat sint veniam cupidatat sint adipisicing amet qui
              cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint. officia ullamco do culpa sit do. Laboris nostrud
              cillum voluptate esse exercitation ullamco est. Ipsum consequat
              anim commodo occaecat sint veniam cupidatat sint adipisicing amet
              qui cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint. *officia ullamco do culpa sit do. Laboris nostrud
              cillum voluptate esse exercitation ullamco est. Ipsum consequat
              anim commodo occaecat sint veniam cupidatat sint adipisicing amet
              qui cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <BtnAjou
        :showButton="showButton"
        :id="id"
        :defaultSettings="defaultSettings"
      />
    </v-row>
  </v-row>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animation {
  animation: fadeIn 0.6s;
}
.bloc {
  &:hover {
    border: 2px solid blue;
  }
  /*  .name {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
  }
  .title {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: large;
  }
  .para {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: small;
  }
  .sheet {
    transition: left 0.3s ease, width 0.3s ease, height 0.3s ease;
  } */
}
</style>
