<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: { id: Number, voir: Boolean },
  computed: {
    ...mapState(["portfolio", "portfolioss", "fonts"]),
    settings() {
      const bloc = this.portfolioss.selectedPage.bloc[this.id];
      if (bloc && Object.keys(bloc.settings).length > 0) {
        return this.portfolioss.selectedPage.bloc[this.id].settings;
      } else {
        return this.setting;
      }
    },
    anneeNom: {
      get() {
        return this.removeHtmlTags(this.settings.annee.nom);
      },
      set(value) {
        this.settings.annee.nom = value;
      },
    },
    titreNom: {
      get() {
        return this.removeHtmlTags(this.settings.titre.nom);
      },
      set(value) {
        this.settings.titre.nom = value;
      },
    },
    sousNom: {
      get() {
        return this.removeHtmlTags(this.settings.sousTitre.nom);
      },
      set(value) {
        this.settings.sousTitre.nom = value;
      },
    },
    villeNom: {
      get() {
        return this.removeHtmlTags(this.settings.ville.nom);
      },
      set(value) {
        this.settings.ville.nom = value;
      },
    },
    pargNom: {
      get() {
        return this.removeHtmlTags(this.settings.parg.nom);
      },
      set(value) {
        this.settings.parg.nom = value;
      },
    },
  },
  data: () => ({
    toggle: "justify",
    showButton: false,
    showTextareaAnnee: false,
    showColorAnnee: false,
    showTextareaTitre: false,
    showColorTitre: false,
    showTextareaSous: false,
    showColorSous: false,
    showTextareaVille: false,
    showColorVille: false,
    showTextareaParg: false,
    showColorParg: false,

    showColorSheet: false,
    showColorBack: false,
    btnshowColorSheet: false,

    style: [
      { title: "Titre 1", value: 2, px: 100 },
      { title: "Titre 2", value: 3, px: 35 },
      { title: "Titre 3", value: 4, px: 27 },
      { title: "Titre 4", value: 5, px: 25 },
      { title: "Paragraphe 1", value: 6, px: 23 },
      { title: "Paragraphe 2", value: 8, px: 20 },
    ],
    setting: {
      back: {
        color: "white",
      },
      backSheet: {
        color: "white",
      },
      annee: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "left",
        nom: "2024-2024",
      },
      titre: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "left",
        nom: "POST OCCUPÉ", //Titre
      },
      sousTitre: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "left",
        nom: "Non de l'entreprise", //sous-titre
      },
      ville: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "left",
        nom: "Ville-pays",
      },
      parg: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "center",
        nom: `Paragraphe. Cliquez ici pour ajouter votre propre texte.
              Cliquez sur « Modifier Texte » ou double-cliquez ici pour
              ajouter votre contenu et personnaliser les polices.`,
      },
    },
  }),
  methods: {
    ...mapActions([
      "delBloc",
      "modBloc",
      "moveBlocUp",
      "moveBlocDown",
      "fetchFonts",
    ]),
    ...mapMutations(["changeSidebarA", "changeSidebarM"]),
    loadFont(fontType) {
      let fontFamily;

      if (fontType === "titre") {
        fontFamily = this.settings.titre.selectPolice;
      } else if (fontType === "annee") {
        fontFamily = this.settings.annee.selectPolice;
      } else if (fontType === "sousTitre") {
        fontFamily = this.settings.sousTitre.selectPolice;
      } else if (fontType === "ville") {
        fontFamily = this.settings.ville.selectPolice;
      } else if (fontType === "parg") {
        fontFamily = this.settings.parg.selectPolice;
      }

      if (fontFamily) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = `https://fonts.googleapis.com/css?family=${fontFamily.replace(
          / /g,
          "+"
        )}&display=swap`;
        document.head.appendChild(fontLink);
      }
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
      this.modBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
        settings: this.settings,
      });
    },
    saveForm() {
      console.log("ok");

      this.modBloc({
        pageIndex: this.portfolioss.selectedPage.id,
        blocIndex: this.id,
        settings: this.settings,
      });
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
        this.toggleBold(this.settings.annee, selectedText);
        this.toggleBold(this.settings.titre, selectedText);
        this.toggleBold(this.settings.sousTitre, selectedText);
        this.toggleBold(this.settings.ville, selectedText);
        this.toggleBold(this.settings.parg, selectedText);
        this.saveForm();
      }
    },
    toggleBold(field, selectedText) {
      const boldText = `<b>${selectedText}</b>`;
      if (field.nom.includes(boldText)) {
        field.nom = field.nom.replace(boldText, selectedText);
      } else {
        field.nom = field.nom.replace(selectedText, boldText);
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        this.toggleI(this.settings.annee, selectedText);
        this.toggleI(this.settings.titre, selectedText);
        this.toggleI(this.settings.sousTitre, selectedText);
        this.toggleI(this.settings.ville, selectedText);
        this.toggleI(this.settings.parg, selectedText);

        this.saveForm();
      }
    },
    toggleI(field, selectedText) {
      const boldText = `<i>${selectedText}</i>`;
      if (field.nom.includes(boldText)) {
        field.nom = field.nom.replace(boldText, selectedText);
      } else {
        field.nom = field.nom.replace(selectedText, boldText);
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        this.toggleU(this.settings.annee, selectedText);
        this.toggleU(this.settings.titre, selectedText);
        this.toggleU(this.settings.sousTitre, selectedText);
        this.toggleU(this.settings.ville, selectedText);
        this.toggleU(this.settings.parg, selectedText);

        this.saveForm();
      }
    },
    toggleU(field, selectedText) {
      const boldText = `<u>${selectedText}</u>`;
      if (field.nom.includes(boldText)) {
        field.nom = field.nom.replace(boldText, selectedText);
      } else {
        field.nom = field.nom.replace(selectedText, boldText);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.fetchFonts();
      this.loadFont();
    }, 200);
  },
};
</script>
<template>
  <v-container
    fluid
    :class="voir ? '' : 'bloc'"
    style="min-height: 350px"
    :style="{ 'background-color': settings.back.color }"
    @mouseover="voir ? (showButton = false) : (showButton = true)"
    @mouseleave="showButton = false"
  >
    <v-row style="height: 0" v-if="!portfolio.dialogA">
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
          @click="saveForm()"
          v-model="settings.back.color"
          :modes="['hexa']"
          class="mx-auto mb-2"
        ></v-color-picker>
      </v-card>
    </v-row>
    <v-row style="height: 0" justify="start" v-if="!portfolio.dialogA && !voir">
      <!-- modifer anne -->
      <v-col cols="auto" v-if="showTextareaAnnee">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <!-- <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Titre 1
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in style"
                        :key="item"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider> -->
            <v-col cols="auto">
              <v-autocomplete
                style="width: 150px"
                v-model="this.settings.annee.selectPolice"
                :items="fonts.font"
                class="mt-3 ms-1"
                density="compact"
                variant=""
                hide-details
                color="blue"
                item-title="family"
                item-value="family"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    @click="loadFont, saveForm('annee')"
                    :title="item.raw.family"
                    :style="{ fontFamily: item.raw.family }"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-bold"
                @click="formatTextToBold"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-underline"
                @click="formatTextToU"
              >
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorAnnee = !showColorAnnee"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet color="purple" height="4" width="26" tile></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-format-align-{{ settings.annee.justify }}</v-icon>
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.annee.justify"
                    divided
                    @click="saveForm()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaAnnee = false"
              v-model="anneeNom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorAnnee"
          @click="saveForm()"
          v-model="this.settings.annee.color"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
      <!-- modifer titre -->
      <v-col cols="auto" v-if="showTextareaTitre">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <!-- <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Titre 1
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in style"
                        :key="item"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider> -->
            <v-col cols="auto">
              <v-autocomplete
                style="width: 150px"
                v-model="this.settings.titre.selectPolice"
                :items="fonts.font"
                class="mt-3 ms-1"
                density="compact"
                variant=""
                hide-details
                color="blue"
                item-title="family"
                item-value="family"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    @click="loadFont, saveForm('titre')"
                    :title="item.raw.family"
                    :style="{ fontFamily: item.raw.family }"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-italic"
                @click="formatTextToI"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-bold"
                @click="formatTextToBold"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-underline"
                @click="formatTextToU"
              >
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorTitre = !showColorTitre"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet color="purple" height="4" width="26" tile></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-format-align-{{ settings.titre.justify }}</v-icon>
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.titre.justify"
                    divided
                    @click="saveForm()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaTitre = false"
              v-model="titreNom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorTitre"
          @click="saveForm()"
          v-model="this.settings.titre.color"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
      <!-- modifer soustitre -->
      <v-col cols="auto" v-if="showTextareaSous">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <!-- <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Titre 1
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in style"
                        :key="item"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider> -->
            <v-col cols="auto">
              <v-autocomplete
                style="width: 150px"
                v-model="this.settings.sousTitre.selectPolice"
                :items="fonts.font"
                class="mt-3 ms-1"
                density="compact"
                variant=""
                hide-details
                color="blue"
                item-title="family"
                item-value="family"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    @click="loadFont, saveForm('sousTitre')"
                    :title="item.raw.family"
                    :style="{ fontFamily: item.raw.family }"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-italic"
                @click="formatTextToI"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-bold"
                @click="formatTextToBold"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-underline"
                @click="formatTextToU"
              >
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorSous = !showColorSous"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet color="purple" height="4" width="26" tile></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon
                  >mdi-format-align-{{ settings.sousTitre.justify }}</v-icon
                >
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.sousTitre.justify"
                    divided
                    @click="saveForm()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaSous = false"
              v-model="sousNom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorSous"
          @click="saveForm()"
          v-model="this.settings.sousTitre.color"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
      <!-- modifer ville -->
      <v-col cols="auto" v-if="showTextareaVille">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <!-- <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Titre 1
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in style"
                        :key="item"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider> -->
            <v-col cols="auto">
              <v-autocomplete
                style="width: 150px"
                v-model="this.settings.ville.selectPolice"
                :items="fonts.font"
                class="mt-3 ms-1"
                density="compact"
                variant=""
                hide-details
                color="blue"
                item-title="family"
                item-value="family"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    @click="loadFont, saveForm('ville')"
                    :title="item.raw.family"
                    :style="{ fontFamily: item.raw.family }"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-italic"
                @click="formatTextToI"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-bold"
                @click="formatTextToBold"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-underline"
                @click="formatTextToU"
              >
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorVille = !showColorVille"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet color="purple" height="4" width="26" tile></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-format-align-{{ settings.ville.justify }}</v-icon>
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.ville.justify"
                    divided
                    @click="saveForm()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaVille = false"
              v-model="villeNom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorVille"
          @click="saveForm()"
          v-model="this.settings.ville.color"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
      <!-- modifer parg -->
      <v-col cols="auto" v-if="showTextareaParg">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <!-- <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Titre 1
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in style"
                        :key="item"
                        >{{ item.title }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider> -->
            <v-col cols="auto">
              <v-autocomplete
                style="width: 150px"
                v-model="this.settings.parg.selectPolice"
                :items="fonts.font"
                class="mt-3 ms-1"
                density="compact"
                variant=""
                hide-details
                color="blue"
                item-title="family"
                item-value="family"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    @click="loadFont, saveForm('parg')"
                    :title="item.raw.family"
                    :style="{ fontFamily: item.raw.family }"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-italic"
                @click="formatTextToI"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-bold"
                @click="formatTextToBold"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon="mdi-format-underline"
                @click="formatTextToU"
              >
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorParg = !showColorParg"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet color="purple" height="4" width="26" tile></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-format-align-{{ settings.parg.justify }}</v-icon>
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.parg.justify"
                    divided
                    @click="saveForm()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaParg = false"
              v-model="pargNom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorParg"
          @click="saveForm()"
          v-model="this.settings.parg.color"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-color-picker
        v-if="showColorSheet"
        @click="saveForm()"
        v-model="this.settings.backSheet.color"
        :modes="['hexa']"
        class="mx-2"
      ></v-color-picker>
      <v-sheet
        :min-height="300"
        :width="600"
        :color="settings.backSheet.color"
        :class="{
          blocHover: !portfolio.dialogA && !voir,
        }"
        @mouseover="btnshowColorSheet = true"
        @mouseleave="btnshowColorSheet = false"
        rounded
        elevation="9"
        class="my-3 overflow-hidden"
      >
        <v-btn
          v-if="btnshowColorSheet && !portfolio.dialogA && !voir"
          icon="mdi-palette"
          style="position: absolute"
          variant="text"
          @click="showColorSheet = !showColorSheet"
        ></v-btn>
        <v-row class="my-9 mx-5">
          <v-col cols="5">
            <div
              class="my-1 text-h6"
              v-html="settings.annee.nom"
              :style="{
                color: this.settings.annee.color,
                fontFamily: this.settings.annee.selectPolice,
              }"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
                ['text-' + settings.annee.justify]: true,
              }"
              @click="showTextareaAnnee = !showTextareaAnnee"
            ></div>

            <div
              class="my-1"
              v-html="settings.titre.nom"
              :style="{
                color: this.settings.titre.color,
                fontFamily: this.settings.titre.selectPolice,
              }"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
                ['text-' + settings.titre.justify]: true,
              }"
              @click="showTextareaTitre = !showTextareaTitre"
            ></div>
            <div
              class="my-1 text-subtitle-2"
              v-html="settings.sousTitre.nom"
              :style="{
                color: this.settings.sousTitre.color,
                fontFamily: this.settings.sousTitre.selectPolice,
              }"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
                ['text-' + settings.sousTitre.justify]: true,
              }"
              @click="showTextareaSous = !showTextareaSous"
            ></div>
            <div
              class="mt-6 text-subtitle-2"
              v-html="settings.ville.nom"
              :style="{
                color: this.settings.ville.color,
                fontFamily: this.settings.ville.selectPolice,
              }"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
                ['text-' + settings.ville.justify]: true,
              }"
              @click="showTextareaVille = !showTextareaVille"
            ></div>
          </v-col>
          <v-col cols="7">
            <div
              v-html="settings.parg.nom"
              :style="{
                color: this.settings.parg.color,
                fontFamily: this.settings.parg.selectPolice,
              }"
              :class="{
                blocHover: !portfolio.dialogA && !voir,
                ['text-' + settings.parg.justify]: true,
              }"
              @click="showTextareaParg = !showTextareaParg"
            ></div>
          </v-col>
        </v-row>
      </v-sheet>
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
        style="z-index: 3; bottom: 0px"
      >
        Ajouter un bloc
      </v-btn>
    </v-row>
  </v-container>
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
.animation {
  animation: fadeIn 0.6s;
}
.bloc {
  &:hover {
    border: 2px solid blue;
  }
}
.blocHover {
  &:hover {
    border: 2px solid blue;
  }
}
textarea {
  width: auto;
  resize: none;
  box-sizing: border-box;
  &:focus {
    outline: none !important;
    border-color: transparent;
  }
}
</style>
