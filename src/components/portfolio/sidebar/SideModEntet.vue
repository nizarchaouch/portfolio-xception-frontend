<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["portfolio", "fonts", "portfolioss"]),
    navbartitre: {
      get() {
        return this.removeHtmlTags(
          this.portfolioss.selectedPage.bloc[0].settings.card.nom.nom
        );
      },
      set(value) {
        this.portfolioss.selectedPage.bloc[0].settings.card.nom.nom = value;
      },
    },
  },
  data: () => ({
    panel: 1,
    colorPick: false,
    colorPickLogo: false,
    colorPickLinks: false,
    colorPickTitreNav: false,
    colorPickBackTitreNav: false,
    linkNav: [],
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
    ...mapMutations(["changeSidebarM", "addPage", "movePage"]),
    ...mapActions(["fetchFonts"]),
    loadFont() {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = `https://fonts.googleapis.com/css?family=${this.portfolio.navbar.selectPolice.replace(
        / /g,
        "+"
      )}&display=swap`;
      document.head.appendChild(fontLink);
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
        if (this.portfolio.navbar.titre.includes(`<b>${selectedText}</b>`)) {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.portfolio.navbar.titre.includes(`<i>${selectedText}</i>`)) {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.portfolio.navbar.titre.includes(`<u>${selectedText}</u>`)) {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.portfolio.navbar.titre = this.portfolio.navbar.titre.replace(
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
  async created() {
    // await this.userAuth();
    this.linkNav = this.portfolioss.portfolios.pages;
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
          @click="changeSidebarM"
        ></v-btn>
      </v-toolbar>
      <!--  -->
      <v-expansion-panels v-model="panel" multiple>
        <!-- desgin  -->
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
                    @click="colorPick = !colorPick"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorPick"
                v-model="portfolio.navbar.colorNav"
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
                    @click="colorPick = !colorPick"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorPick"
                v-model="portfolio.navbar.colorNav"
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
        <v-expansion-panel>
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
                    v-model="portfolio.navbar.backgroundImage"
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
                    v-model="portfolio.logo.logo"
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
                    @click="colorPick = !colorPick"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorPick"
                v-model="portfolio.navbar.colorNav"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-col cols="12" class="mb-2">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur line</h4>
                  <v-btn
                    variant="tonal"
                    class="my-1 ms-auto"
                    @click="colorPick = !colorPick"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-color-picker
                v-if="colorPick"
                v-model="portfolio.navbar.colorNav"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <!-- taile line -->
              <v-col cols="12">
                <h4 class="mt-4">Taille de la police</h4>
                <v-slider
                  v-model="portfolio.navbar.sizeTitle"
                  :max="100"
                  :min="10"
                  :step="10"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="portfolio.navbar.sizeTitle"
                      :max="100"
                      :min="10"
                      style="width: 100px"
                      suffix="%"
                      density="compact"
                      type="number"
                      variant="outlined"
                      hide-details
                      single-line
                    ></v-text-field>
                  </template>
                </v-slider>
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
                        <v-btn @click="formatTextToI" size="small">
                          <v-icon icon="mdi-format-italic"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToBold" size="small">
                          <v-icon icon="mdi-format-bold"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToU" size="small">
                          <v-icon icon="mdi-format-underline"></v-icon>
                        </v-btn>

                        <v-btn
                          @click="colorPickTitreNav = !colorPickTitreNav"
                          size="small"
                        >
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
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
                          @click="
                            colorPickBackTitreNav = !colorPickBackTitreNav
                          "
                          size="small"
                        >
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
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
                        <v-btn @click="formatTextToI" size="small">
                          <v-icon icon="mdi-format-italic"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToBold" size="small">
                          <v-icon icon="mdi-format-bold"></v-icon>
                        </v-btn>

                        <v-btn @click="formatTextToU" size="small">
                          <v-icon icon="mdi-format-underline"></v-icon>
                        </v-btn>

                        <v-btn
                          @click="colorPickTitreNav = !colorPickTitreNav"
                          size="small"
                        >
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
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
                          @click="
                            colorPickBackTitreNav = !colorPickBackTitreNav
                          "
                          size="small"
                        >
                          <div
                            class="d-flex align-center flex-column justify-center"
                          >
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
