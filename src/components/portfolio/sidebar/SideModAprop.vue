<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapMutations, mapActions } from "vuex";
import ModTitre from "../compMod/ModTitre.vue";
import ModParg from "../compMod/ModParg.vue";
export default {
  components: { ModTitre,ModParg },
  computed: {
    ...mapState(["user", "portfolio", "fonts", "portfolioss"]),
    // settings() {
    //   const index = this.portfolio.blocmodif;
    //   return this.portfolioss.selectedPage.bloc[index].settings;
    // },
    // iscard() {
    //   const index = this.portfolio.blocmodif;
    //   return this.portfolioss.selectedPage.bloc[index].type;
    // },
    // nomCard: {
    //   get() {
    //     const index = this.portfolio.blocmodif;
    //     return this.removeHtmlTags(
    //       this.portfolioss.selectedPage.bloc[index].settings.card.nom.nom
    //     );
    //   },
    //   set(value) {
    //     const index = this.portfolio.blocmodif;
    //     this.portfolioss.selectedPage.bloc[index].settings.card.nom.nom = value;
    //   },
    // },
    // posteCard: {
    //   get() {
    //     const index = this.portfolio.blocmodif;
    //     return this.removeHtmlTags(
    //       this.portfolioss.selectedPage.bloc[index].settings.card.poste.nom
    //     );
    //   },
    //   set(value) {
    //     const index = this.portfolio.blocmodif;
    //     this.portfolioss.selectedPage.bloc[index].settings.card.poste.nom =
    //       value;
    //   },
    // },
    // titre: {
    //   get() {
    //     const index = this.portfolio.blocmodif;
    //     return this.removeHtmlTags(
    //       this.portfolioss.selectedPage.bloc[index].settings.titre.nom
    //     );
    //   },
    //   set(value) {
    //     const index = this.portfolio.blocmodif;
    //     this.portfolioss.selectedPage.bloc[index].settings.titre.nom = value;
    //   },
    // },
    // sousTitre: {
    //   get() {
    //     const index = this.portfolio.blocmodif;
    //     return this.removeHtmlTags(
    //       this.portfolioss.selectedPage.bloc[index].settings.sousTitre.nom
    //     );
    //   },
    //   set(value) {
    //     const index = this.portfolio.blocmodif;
    //     this.portfolioss.selectedPage.bloc[index].settings.sousTitre.nom =
    //       value;
    //   },
    // },
  },
    // data: () => ({
    //   panel: 3,
    //   colorBackBloc1: false,
    //   colorBackBloc2: false,
    //   backgroundColor: false,
    //   lineColor: false,
    //   colorName: false,
    //   colorPoste: false,
    //   colorTitre: false,
    //   colorSousTitre: false,
    //   style: [
    //     { title: "Titre 1", value: 2, px: 100 },
    //     { title: "Titre 2", value: 3, px: 35 },
    //     { title: "Titre 3", value: 4, px: 27 },
    //     { title: "Titre 4", value: 5, px: 25 },
    //     { title: "Titre 5", value: 6, px: 23 },
    //     { title: "Titre 6", value: 8, px: 20 },
    //   ],
    // }),
    // methods: {
    //   ...mapMutations(["addPage", "movePage"]),
    //   ...mapActions(["fetchFonts"]),
    //   loadFont() {
    //     const fonts = [
    //       this.settings.card.nom.selectPolice,
    //       this.settings.card.poste.selectPolice,
    //       this.settings.titre.selectPolice,
    //       this.settings.sousTitre.selectPolice,
    //     ];

    //     fonts.forEach((font) => {
    //       const fontLink = document.createElement("link");
    //       fontLink.rel = "stylesheet";
    //       fontLink.href = `https://fonts.googleapis.com/css?family=${font.replace(
    //         / /g,
    //         "+"
    //       )}&display=swap`;
    //       document.head.appendChild(fontLink);
    //     });
    //   },

    //   removeHtmlTags(html) {
    //     // Utilisation d'un élément temporaire pour supprimer les balises HTML
    //     const tempElement = document.createElement("div");
    //     tempElement.innerHTML = html;
    //     return tempElement.textContent || tempElement.innerText || "";
    //   },
    //   formatTextToBold() {
    //     const selectedText = window.getSelection().toString();
    //     if (selectedText) {
    //       if (this.settings.card.nom.nom.includes(`<b>${selectedText}</b>`)) {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           `<b>${selectedText}</b>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           selectedText,
    //           `<b>${selectedText}</b>`
    //         );
    //       }
    //       /////
    //       if (this.settings.card.poste.nom.includes(`<b>${selectedText}</b>`)) {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           `<b>${selectedText}</b>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           selectedText,
    //           `<b>${selectedText}</b>`
    //         );
    //       }
    //       ///////
    //       if (this.settings.titre.nom.includes(`<b>${selectedText}</b>`)) {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           `<b>${selectedText}</b>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           selectedText,
    //           `<b>${selectedText}</b>`
    //         );
    //       }
    //       ///////
    //       if (this.settings.sousTitre.nom.includes(`<b>${selectedText}</b>`)) {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           `<b>${selectedText}</b>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           selectedText,
    //           `<b>${selectedText}</b>`
    //         );
    //       }
    //     }
    //   },
    //   formatTextToI() {
    //     const selectedText = window.getSelection().toString();
    //     if (selectedText) {
    //       if (this.settings.card.nom.nom.includes(`<i>${selectedText}</i>`)) {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           `<i>${selectedText}</i>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           selectedText,
    //           `<i>${selectedText}</i>`
    //         );
    //       }
    //       ////////
    //       if (this.settings.card.poste.nom.includes(`<i>${selectedText}</i>`)) {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           `<i>${selectedText}</i>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           selectedText,
    //           `<i>${selectedText}</i>`
    //         );
    //       }
    //       //////
    //       if (this.settings.titre.nom.includes(`<i>${selectedText}</i>`)) {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           `<i>${selectedText}</i>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           selectedText,
    //           `<i>${selectedText}</i>`
    //         );
    //       }
    //       //////
    //       if (this.settings.sousTitre.nom.includes(`<i>${selectedText}</i>`)) {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           `<i>${selectedText}</i>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           selectedText,
    //           `<i>${selectedText}</i>`
    //         );
    //       }
    //     }
    //   },
    //   formatTextToU() {
    //     const selectedText = window.getSelection().toString();
    //     if (selectedText) {
    //       if (this.settings.card.nom.nom.includes(`<u>${selectedText}</u>`)) {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           `<u>${selectedText}</u>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
    //           selectedText,
    //           `<u>${selectedText}</u>`
    //         );
    //       }
    //       /////////
    //       if (this.settings.card.poste.nom.includes(`<u>${selectedText}</u>`)) {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           `<u>${selectedText}</u>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
    //           selectedText,
    //           `<u>${selectedText}</u>`
    //         );
    //       }
    //       //////
    //       if (this.settings.titre.nom.includes(`<u>${selectedText}</u>`)) {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           `<u>${selectedText}</u>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.titre.nom = this.settings.titre.nom.replace(
    //           selectedText,
    //           `<u>${selectedText}</u>`
    //         );
    //       }
    //       //////
    //       if (this.settings.sousTitre.nom.includes(`<u>${selectedText}</u>`)) {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           `<u>${selectedText}</u>`,
    //           selectedText
    //         );
    //       } else {
    //         this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
    //           selectedText,
    //           `<u>${selectedText}</u>`
    //         );
    //       }
    //     }
    //   },
    // },
    // mounted() {
    //   this.fetchFonts();
    //   this.loadFont();
    // },
};
</script>

<template>
  <v-layout>
    <v-navigation-drawer
      temporary
      location="right"
      elevation="10"
      permanent
      width="380"
      v-model="portfolio.modAprop"
    >
      <v-toolbar color="indigo" class="px-1 mt-14">
        <v-toolbar-title class="font-weight-bold">
          Modifier Bloc
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          class="text-none ms-auto"
          icon="mdi-window-close"
          @click="portfolio.modAprop = false"
        ></v-btn>
      </v-toolbar>
      <!--  -->
      <ModTitre :id="this.portfolio.blocmodif" />
      <ModParg :id="this.portfolio.blocmodif" />
      <!-- <v-text-field
        v-model="this.portfolioss.selectedPage.bloc[this.id].settings.titre"
      ></v-text-field> -->
    </v-navigation-drawer>
  </v-layout>
</template>

<style lang="scss" scoped></style>
