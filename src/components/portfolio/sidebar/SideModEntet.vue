<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["user", "portfolio", "fonts", "portfolioss"]),
    settings() {
      const index = this.portfolio.blocmodif;
      return this.portfolioss.selectedPage.bloc[index].settings;
    },
    iscard() {
      const index = this.portfolio.blocmodif;
      return this.portfolioss.selectedPage.bloc[index].type;
    },
    nomCard: {
      get() {
        const index = this.portfolio.blocmodif;
        return this.removeHtmlTags(
          this.portfolioss.selectedPage.bloc[index].settings.card.nom.nom
        );
      },
      set(value) {
        const index = this.portfolio.blocmodif;
        this.portfolioss.selectedPage.bloc[index].settings.card.nom.nom = value;
      },
    },
    posteCard: {
      get() {
        const index = this.portfolio.blocmodif;
        return this.removeHtmlTags(
          this.portfolioss.selectedPage.bloc[index].settings.card.poste.nom
        );
      },
      set(value) {
        const index = this.portfolio.blocmodif;
        this.portfolioss.selectedPage.bloc[index].settings.card.poste.nom =
          value;
      },
    },
    titre: {
      get() {
        const index = this.portfolio.blocmodif;
        return this.removeHtmlTags(
          this.portfolioss.selectedPage.bloc[index].settings.titre.nom
        );
      },
      set(value) {
        const index = this.portfolio.blocmodif;
        this.portfolioss.selectedPage.bloc[index].settings.titre.nom = value;
      },
    },
    sousTitre: {
      get() {
        const index = this.portfolio.blocmodif;
        return this.removeHtmlTags(
          this.portfolioss.selectedPage.bloc[index].settings.sousTitre.nom
        );
      },
      set(value) {
        const index = this.portfolio.blocmodif;
        this.portfolioss.selectedPage.bloc[index].settings.sousTitre.nom =
          value;
      },
    },
  },
  data: () => ({
    panel: 3,
    colorBackBloc1: false,
    colorBackBloc2: false,
    backgroundColor: false,
    lineColor: false,
    colorName: false,
    colorPoste: false,
    colorTitre: false,
    colorSousTitre: false,
    style: [
      { title: "Titre 1", value: 2, px: 100 },
      { title: "Titre 2", value: 3, px: 35 },
      { title: "Titre 3", value: 4, px: 27 },
      { title: "Titre 4", value: 5, px: 25 },
      { title: "Titre 5", value: 6, px: 23 },
      { title: "Titre 6", value: 8, px: 20 },
    ],
  }),
  methods: {
    ...mapMutations(["addPage", "movePage"]),
    ...mapActions(["fetchFonts"]),
    loadFont() {
      const fonts = [
        this.settings.card.nom.selectPolice,
        this.settings.card.poste.selectPolice,
        this.settings.titre.selectPolice,
        this.settings.sousTitre.selectPolice
      ];

      fonts.forEach(font => {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, "+")}&display=swap`;
        document.head.appendChild(fontLink);
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
        if (this.settings.card.nom.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
        /////
        if (this.settings.card.poste.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
        ///////
        if (this.settings.titre.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
         ///////
         if (this.settings.sousTitre.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.settings.card.nom.nom.includes(`<i>${selectedText}</i>`)) {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
        ////////
        if (this.settings.card.poste.nom.includes(`<i>${selectedText}</i>`)) {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
        //////
        if (this.settings.titre.nom.includes(`<i>${selectedText}</i>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
         //////
         if (this.settings.sousTitre.nom.includes(`<i>${selectedText}</i>`)) {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.settings.card.nom.nom.includes(`<u>${selectedText}</u>`)) {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.settings.card.nom.nom = this.settings.card.nom.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
        /////////
        if (this.settings.card.poste.nom.includes(`<u>${selectedText}</u>`)) {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.settings.card.poste.nom = this.settings.card.poste.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
        //////
        if (this.settings.titre.nom.includes(`<u>${selectedText}</u>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
         //////
         if (this.settings.sousTitre.nom.includes(`<u>${selectedText}</u>`)) {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.settings.sousTitre.nom = this.settings.sousTitre.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
      }
    },
  },
  mounted() {
    this.fetchFonts();
    this.loadFont();
  },
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
      v-model="portfolio.SideModEntet"
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
          @click="this.portfolio.SideModEntet = false"
        ></v-btn>
      </v-toolbar>
      <!--  -->
      <v-expansion-panels v-model="panel" multiple>
        <!-- arriere bloc -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-a-circle</v-icon
            >
            <h3 class="mt-1">Modifier Arrière-plan</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <h3 class="d-inline">Arrière-plan premier bloc</h3>
              <v-divider class="border-opacity-50"></v-divider>
              <v-col cols="12" class="my-2">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur d'arrière-plan</h4>
                  <v-btn
                    variant="tonal"
                    class="my-1 ms-auto"
                    @click="colorBackBloc1 = !colorBackBloc1"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorBackBloc1"
                v-model="settings.background.bloc1.color"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Ajouter une image d'arrière-plan</h4>
                  <v-switch
                    v-model="portfolio.navbar.backgroundImage"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12" v-if="portfolio.navbar.backgroundImage">
                <div class="d-flex">
                  <h4 class="mt-2">Lien d'image</h4>
                  <v-text-field
                    v-model="portfolio.navbar.lineImage"
                    variant="outlined"
                    density="compact"
                    hide-details
                    single-line
                    color="blue"
                    class="mb-4 ms-2"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <!-- bloc 2 -->
            <v-row no-gutters>
              <h3 class="d-inline">Arrière-plan deuxième bloc</h3>
              <v-divider class="border-opacity-50"></v-divider>
              <v-col cols="12" class="my-2">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur d'arrière-plan</h4>
                  <v-btn
                    variant="tonal"
                    class="my-1 ms-auto"
                    @click="colorBackBloc2 = !colorBackBloc2"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorBackBloc2"
                v-model="settings.background.bloc2.color"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Ajouter une image d'arrière-plan</h4>
                  <v-switch
                    v-model="portfolio.navbar.backgroundImage"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12" v-if="portfolio.navbar.backgroundImage">
                <div class="d-flex">
                  <h4 class="mt-2">Lien d'image</h4>
                  <v-text-field
                    v-model="portfolio.navbar.lineImage"
                    variant="outlined"
                    density="compact"
                    hide-details
                    single-line
                    color="blue"
                    class="mb-4 ms-2"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel>
        <!-- card -->
        <v-expansion-panel v-if="iscard === 'CardText'">
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-c-circle</v-icon
            >
            <h3 class="mt-1">Modifier Card</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Afficher les liens réseau</h4>
                  <v-switch
                    v-model="settings.card.afficheLinksRes"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Image</h4>
                  <v-switch
                    v-model="settings.card.afficheImg"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Image arrondie</h4>
                  <v-select
                    v-model="settings.card.imgarrond"
                    density="compact"
                    class="mt-2 ms-7"
                    color="blue"
                    :items="[
                      'rounded-sm',
                      'rounded',
                      'rounded-md',
                      'rounded-lg',
                      'rounded-xl',
                      'rounded-circle',
                    ]"
                    variant="outlined"
                  ></v-select>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12" class="mb-2">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur d'arrière-plan</h4>
                  <v-btn
                    variant="tonal"
                    class="my-1 ms-auto"
                    @click="backgroundColor = !backgroundColor"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="backgroundColor"
                v-model="settings.card.backgroundColor"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-col cols="12" class="mb-2">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur line</h4>
                  <v-btn
                    variant="tonal"
                    class="my-1 ms-auto"
                    @click="lineColor = !lineColor"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="lineColor"
                v-model="settings.card.lineColor"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
            <v-expansion-panels>
              <v-expansion-panel>
                <template v-slot:title>
                  <h3 class="mt-1">Modifier Nom</h3>
                </template>
                <template v-slot:text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="d-flex">
                        <h4 class="mt-4">Affichage Nom</h4>
                        <v-switch
                          v-model="settings.card.nom.affiche"
                          :value="true"
                          color="blue"
                          class="ms-auto"
                          inset
                        >
                        </v-switch>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex">
                        <h4 class="mt-4">Style</h4>
                        <v-select
                          v-model="settings.card.nom.selectStyle"
                          :items="style"
                          class="ms-16 mt-3"
                          density="compact"
                          variant="outlined"
                          color="blue"
                          item-title="title"
                          item-value="title"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              class="d-flex"
                              @click="settings.card.nom.size = item.raw.px"
                            >
                              <template v-slot:title>
                                <div class="d-flex">
                                  <div class="mt-5">
                                    <v-icon size="large" class="ms-1"
                                      >mdi-circle</v-icon
                                    >
                                    <p>{{ item.raw.px }}px</p>
                                  </div>
                                  <p
                                    :class="
                                      'd-flex flex-column justify-center font-weight-bold text-h' +
                                      item.raw.value
                                    "
                                  >
                                    {{ item.raw.title }}
                                  </p>
                                </div>
                              </template>
                            </v-list-item>
                          </template>
                        </v-select>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex mt-5">
                        <h4 class="mt-4">Police</h4>
                        <v-autocomplete
                          v-model="settings.card.nom.selectPolice"
                          :items="fonts.font"
                          class="ms-14 mt-1"
                          density="compact"
                          variant="outlined"
                          color="blue"
                          item-title="family"
                          item-value="family"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              @click="loadFont"
                              :title="item.raw.family"
                              :style="{ fontFamily: item.raw.family }"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                      </div>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h4 class="mt-4">Taille de la police</h4>
                      <v-slider
                        v-model="settings.card.nom.size"
                        :max="170"
                        :min="10"
                        :step="1"
                        color="blue"
                        hide-details
                      >
                        <template v-slot:append>
                          <v-text-field
                            v-model="settings.card.nom.size"
                            :max="170"
                            :min="10"
                            style="width: 100px"
                            suffix="px"
                            density="compact"
                            type="number"
                            variant="outlined"
                            hide-details
                            single-line
                          ></v-text-field>
                        </template>
                      </v-slider>
                    </v-col>
                    <v-col cols="12">
                      <v-btn-toggle
                        class="mt-2 ms-9"
                        variant="outlined"
                        color="blue"
                        divided
                        multiple
                      >
                        <v-btn @click="formatTextToI" size="small">
                          <v-icon icon="mdi-format-italic"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToBold" size="small">
                          <v-icon icon="mdi-format-bold"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToU" size="small">
                          <v-icon icon="mdi-format-underline"></v-icon>
                        </v-btn>

                        <v-btn @click="colorName = !colorName" size="small">
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
                            <v-icon icon="mdi-format-color-text"></v-icon>

                            <v-sheet
                              :color="settings.card.nom.color"
                              height="4"
                              width="26"
                              tile
                            ></v-sheet>
                          </div>
                        </v-btn>
                      </v-btn-toggle>

                      <v-sheet class="pa-4 text-center">
                        <v-textarea
                          v-model="nomCard"
                          rows="2"
                          variant="outlined"
                          auto-grow
                          full-width
                          hide-details
                        ></v-textarea>
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-color-picker
                      v-if="colorName"
                      v-model="settings.card.nom.color"
                      :modes="['hexa']"
                      class="mx-auto"
                    ></v-color-picker>
                  </v-row>
                </template>
              </v-expansion-panel>
              <!-- poste actuel  -->
              <v-expansion-panel>
                <template v-slot:title>
                  <h3 class="mt-1">Modifier Poste Actuel</h3>
                </template>
                <template v-slot:text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="d-flex">
                        <h4 class="mt-4">Affichage Nom</h4>
                        <v-switch
                          v-model="settings.card.poste.affiche"
                          :value="true"
                          color="blue"
                          class="ms-auto"
                          inset
                        >
                        </v-switch>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex">
                        <h4 class="mt-4">Style</h4>
                        <v-select
                          v-model="settings.card.poste.selectStyle"
                          :items="style"
                          class="ms-16 mt-3"
                          density="compact"
                          variant="outlined"
                          color="blue"
                          item-title="title"
                          item-value="title"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              class="d-flex"
                              @click="settings.card.poste.size = item.raw.px"
                            >
                              <template v-slot:title>
                                <div class="d-flex">
                                  <div class="mt-5">
                                    <v-icon size="large" class="ms-1"
                                      >mdi-circle</v-icon
                                    >
                                    <p>{{ item.raw.px }}px</p>
                                  </div>
                                  <p
                                    :class="
                                      'd-flex flex-column justify-center font-weight-bold text-h' +
                                      item.raw.value
                                    "
                                  >
                                    {{ item.raw.title }}
                                  </p>
                                </div>
                              </template>
                            </v-list-item>
                          </template>
                        </v-select>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex mt-5">
                        <h4 class="mt-4">Police</h4>
                        <v-autocomplete
                          v-model="settings.card.poste.selectPolice"
                          :items="fonts.font"
                          class="ms-14 mt-1"
                          density="compact"
                          variant="outlined"
                          color="blue"
                          item-title="family"
                          item-value="family"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              @click="loadFont"
                              :title="item.raw.family"
                              :style="{ fontFamily: item.raw.family }"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                      </div>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h4 class="mt-4">Taille de la police</h4>
                      <v-slider
                        v-model="settings.card.poste.size"
                        :max="170"
                        :min="10"
                        :step="1"
                        color="blue"
                        hide-details
                      >
                        <template v-slot:append>
                          <v-text-field
                            v-model="settings.card.poste.size"
                            :max="170"
                            :min="10"
                            style="width: 100px"
                            suffix="px"
                            density="compact"
                            type="number"
                            variant="outlined"
                            hide-details
                            single-line
                          ></v-text-field>
                        </template>
                      </v-slider>
                    </v-col>
                    <v-col cols="12">
                      <v-btn-toggle
                        class="mt-2"
                        variant="outlined"
                        color="blue"
                        divided
                        multiple
                      >
                        <v-btn @click="formatTextToI" size="small">
                          <v-icon icon="mdi-format-italic"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToBold" size="small">
                          <v-icon icon="mdi-format-bold"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToU" size="small">
                          <v-icon icon="mdi-format-underline"></v-icon>
                        </v-btn>

                        <v-btn @click="colorPoste = !colorPoste" size="small">
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
                            <v-icon icon="mdi-format-color-text"></v-icon>

                            <v-sheet
                              :color="settings.card.poste.color"
                              height="4"
                              width="26"
                              tile
                            ></v-sheet>
                          </div>
                        </v-btn>
                      </v-btn-toggle>

                      <v-sheet class="pa-4 text-center">
                        <v-textarea
                          v-model="posteCard"
                          rows="2"
                          variant="outlined"
                          auto-grow
                          full-width
                          hide-details
                        ></v-textarea>
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-color-picker
                      v-if="colorPoste"
                      v-model="settings.card.poste.color"
                      :modes="['hexa']"
                      class="mx-auto"
                    ></v-color-picker>
                  </v-row>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-expansion-panel>
        <!-- title -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-t-circle</v-icon
            >
            <h3 class="mt-1">Modifier Titre</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Titre</h4>
                  <v-switch
                    v-model="settings.titre.affiche"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Style</h4>
                  <v-select
                    v-model="settings.titre.selectStyle"
                    :items="style"
                    class="ms-16 mt-3"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="title"
                    item-value="title"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        class="d-flex"
                        @click="settings.titre.size = item.raw.px"
                      >
                        <template v-slot:title>
                          <div class="d-flex">
                            <div class="mt-5">
                              <v-icon size="large" class="ms-1"
                                >mdi-circle</v-icon
                              >
                              <p>{{ item.raw.px }}px</p>
                            </div>
                            <p
                              :class="
                                'd-flex flex-column justify-center font-weight-bold text-h' +
                                item.raw.value
                              "
                            >
                              {{ item.raw.title }}
                            </p>
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex mt-5">
                  <h4 class="mt-4">Police</h4>
                  <v-autocomplete
                    v-model="settings.titre.selectPolice"
                    :items="fonts.font"
                    class="ms-14 mt-1"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="family"
                    item-value="family"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        @click="loadFont"
                        :title="item.raw.family"
                        :style="{ fontFamily: item.raw.family }"
                      ></v-list-item>
                    </template>
                  </v-autocomplete>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12">
                <h4 class="mt-4">Taille de la police</h4>
                <v-slider
                  v-model="settings.titre.size"
                  :max="170"
                  :min="10"
                  :step="1"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="settings.titre.size"
                      :max="170"
                      :min="10"
                      style="width: 100px"
                      suffix="px"
                      density="compact"
                      type="number"
                      variant="outlined"
                      hide-details
                      single-line
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle
                  class="mt-2 ms-6"
                  variant="outlined"
                  color="blue"
                  divided
                  multiple
                >
                  <v-btn @click="formatTextToI">
                    <v-icon icon="mdi-format-italic"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToBold">
                    <v-icon icon="mdi-format-bold"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToU">
                    <v-icon icon="mdi-format-underline"></v-icon>
                  </v-btn>

                  <v-btn @click="colorTitre = !colorTitre">
                    <div class="d-flex align-center flex-column justify-center">
                      <v-icon icon="mdi-format-color-text"></v-icon>

                      <v-sheet
                        :color="settings.titre.color"
                        height="4"
                        width="26"
                        tile
                      ></v-sheet>
                    </div>
                  </v-btn>
                </v-btn-toggle>

                <v-sheet class="pa-4 text-center">
                  <v-textarea
                    v-model="titre"
                    rows="2"
                    variant="outlined"
                    auto-grow
                    full-width
                    hide-details
                  ></v-textarea>
                </v-sheet>
              </v-col>
            </v-row>
            <!--  -->
            <v-row>
              <v-color-picker
                v-if="colorTitre"
                v-model="settings.titre.color"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
          </template>
        </v-expansion-panel>
        <!-- Sous-titre -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-s-circle</v-icon
            >
            <h3 class="mt-1">Modifier Sous-titre</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Sous-titre</h4>
                  <v-switch
                    v-model="settings.sousTitre.affiche"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Style</h4>
                  <v-select
                    v-model="settings.sousTitre.selectStyle"
                    :items="style"
                    class="ms-16 mt-3"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="title"
                    item-value="title"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        class="d-flex"
                        @click="settings.sousTitre.size = item.raw.px"
                      >
                        <template v-slot:title>
                          <div class="d-flex">
                            <div class="mt-5">
                              <v-icon size="large" class="ms-1"
                                >mdi-circle</v-icon
                              >
                              <p>{{ item.raw.px }}px</p>
                            </div>
                            <p
                              :class="
                                'd-flex flex-column justify-center font-weight-bold text-h' +
                                item.raw.value
                              "
                            >
                              {{ item.raw.title }}
                            </p>
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex mt-5">
                  <h4 class="mt-4">Police</h4>
                  <v-autocomplete
                    v-model="settings.sousTitre.selectPolice"
                    :items="fonts.font"
                    class="ms-14 mt-1"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="family"
                    item-value="family"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        @click="loadFont"
                        :title="item.raw.family"
                        :style="{ fontFamily: item.raw.family }"
                      ></v-list-item>
                    </template>
                  </v-autocomplete>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12">
                <h4 class="mt-4">Taille de la police</h4>
                <v-slider
                  v-model="settings.sousTitre.size"
                  :max="170"
                  :min="10"
                  :step="1"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="settings.sousTitre.size"
                      :max="170"
                      :min="10"
                      style="width: 100px"
                      suffix="px"
                      density="compact"
                      type="number"
                      variant="outlined"
                      hide-details
                      single-line
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle
                  class="mt-2 ms-6"
                  variant="outlined"
                  color="blue"
                  divided
                  multiple
                >
                  <v-btn @click="formatTextToI">
                    <v-icon icon="mdi-format-italic"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToBold">
                    <v-icon icon="mdi-format-bold"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToU">
                    <v-icon icon="mdi-format-underline"></v-icon>
                  </v-btn>

                  <v-btn @click="colorSousTitre = !colorSousTitre">
                    <div class="d-flex align-center flex-column justify-center">
                      <v-icon icon="mdi-format-color-text"></v-icon>

                      <v-sheet
                        :color="settings.sousTitre.color"
                        height="4"
                        width="26"
                        tile
                      ></v-sheet>
                    </div>
                  </v-btn>
                </v-btn-toggle>

                <v-sheet class="pa-4 text-center">
                  <v-textarea
                    v-model="sousTitre"
                    rows="2"
                    variant="outlined"
                    auto-grow
                    full-width
                    hide-details
                  ></v-textarea>
                </v-sheet>
              </v-col>
            </v-row>
            <!--  -->
            <v-row>
              <v-color-picker
                v-if="colorSousTitre"
                v-model="settings.sousTitre.color"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
          </template>
        </v-expansion-panel>
        <!-- para -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-p-circle</v-icon
            >
            <h3 class="mt-1">Modifier Paragraphe</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Paragraphe</h4>
                  <v-switch
                    v-model="portfolio.navbar.afficheTitre"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Style</h4>
                  <v-select
                    v-model="portfolio.navbar.selectStyle"
                    :items="style"
                    class="ms-16 mt-3"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="title"
                    item-value="title"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        class="d-flex"
                        @click="portfolio.navbar.sizeTitle = item.raw.px"
                      >
                        <template v-slot:title>
                          <div class="d-flex">
                            <div class="mt-5">
                              <v-icon size="large" class="ms-1"
                                >mdi-circle</v-icon
                              >
                              <p>{{ item.raw.px }}px</p>
                            </div>
                            <p
                              :class="
                                'd-flex flex-column justify-center font-weight-bold text-h' +
                                item.raw.value
                              "
                            >
                              {{ item.raw.title }}
                            </p>
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex mt-5">
                  <h4 class="mt-4">Police</h4>
                  <v-autocomplete
                    v-model="portfolio.navbar.selectPolice"
                    :items="fonts.font"
                    class="ms-14 mt-1"
                    density="compact"
                    variant="outlined"
                    color="blue"
                    item-title="family"
                    item-value="family"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        @click="loadFont"
                        :title="item.raw.family"
                        :style="{ fontFamily: item.raw.family }"
                      ></v-list-item>
                    </template>
                  </v-autocomplete>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12">
                <h4 class="mt-4">Taille de la police</h4>
                <v-slider
                  v-model="portfolio.navbar.sizeTitle"
                  :max="170"
                  :min="10"
                  :step="1"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="portfolio.navbar.sizeTitle"
                      :max="170"
                      :min="10"
                      style="width: 100px"
                      suffix="px"
                      density="compact"
                      type="number"
                      variant="outlined"
                      hide-details
                      single-line
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle
                  class="mt-2"
                  variant="outlined"
                  color="blue"
                  divided
                  multiple
                >
                  <v-btn @click="formatTextToI">
                    <v-icon icon="mdi-format-italic"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToBold">
                    <v-icon icon="mdi-format-bold"></v-icon>
                  </v-btn>

                  <v-btn @click="formatTextToU">
                    <v-icon icon="mdi-format-underline"></v-icon>
                  </v-btn>

                  <v-btn @click="colorPickTitreNav = !colorPickTitreNav">
                    <div class="d-flex align-center flex-column justify-center">
                      <v-icon icon="mdi-format-color-text"></v-icon>

                      <v-sheet
                        :color="portfolio.navbar.colorTitre"
                        height="4"
                        width="26"
                        tile
                      ></v-sheet>
                    </div>
                  </v-btn>
                  <v-btn
                    @click="colorPickBackTitreNav = !colorPickBackTitreNav"
                  >
                    <div class="d-flex align-center flex-column justify-center">
                      <v-icon icon="mdi-format-color-fill"></v-icon>

                      <v-sheet
                        :color="portfolio.navbar.colorBackTitre"
                        height="4"
                        width="26"
                        tile
                      ></v-sheet>
                    </div>
                  </v-btn>
                </v-btn-toggle>

                <v-sheet class="pa-4 text-center">
                  <v-textarea
                    v-model="navbartitre"
                    rows="2"
                    variant="outlined"
                    auto-grow
                    full-width
                    hide-details
                  ></v-textarea>
                </v-sheet>
              </v-col>
            </v-row>
            <!--  -->
            <v-row>
              <v-color-picker
                v-if="colorPickTitreNav"
                v-model="portfolio.navbar.colorTitre"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-color-picker
                v-if="colorPickBackTitreNav"
                v-model="portfolio.navbar.colorBackTitre"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-layout>
</template>

<style lang="scss" scoped></style>
