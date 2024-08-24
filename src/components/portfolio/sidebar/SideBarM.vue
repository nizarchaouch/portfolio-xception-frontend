<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  computed: {
    ...mapState(["portfolio", "fonts", "portfolioss"]),
    navbar() {
      return this.portfolioss.portfolios.navbar.settings;
    },
    navbartitre: {
      get() {
        return this.removeHtmlTags(this.navbar.navbar.titre);
      },
      set(value) {
        this.navbar.navbar.titre = value;
      },
    },
  },
  data: () => ({
    snackConf: false,
    deleteId: null,
    panel: 0,
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
    ...mapMutations([
      "changeSidebarM",
      "addPage",
      "movePage",
      "deletePage",
      "duplicatePage",
    ]),
    ...mapActions(["fetchFonts", "uploadLogo"]),
    handleFileChange(event) {
      const file = event.target.files[0];
      this.uploadLogo(file);
    },
    loadFont() {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = `https://fonts.googleapis.com/css?family=${this.navbar.navbar.selectPolice.replace(
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
        if (this.navbar.navbar.titre.includes(`<b>${selectedText}</b>`)) {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.navbar.navbar.titre.includes(`<i>${selectedText}</i>`)) {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.navbar.navbar.titre.includes(`<u>${selectedText}</u>`)) {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.navbar.navbar.titre = this.navbar.navbar.titre.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
      }
    },
    confirmDeletionDialog(id) {
      this.deleteId = id;
      this.snackConf = true;
    },
    deltPage() {
      this.deletePage(this.deleteId);
      this.snackConf = false;
    },
  },
  mounted() {
    this.fetchFonts();
    this.loadFont();
  },
  async created() {
    // await this.userAuth();
    setTimeout(() => {
      this.linkNav = this.portfolioss.portfolios.pages;
    }, 100);
    console.log("lll", this.linkNav);
  },
};
</script>

<template>
  <v-snackbar
    v-model="snackConf"
    vertical
    location="center"
    color="light-blue-lighten-4"
    :timeout="-1"
  >
    <div class="text-subtitle-1 font-weight-bold pa-2">
      Voulez-vous vraiment supprimer cette page ?
    </div>

    <p class="text-medium-emphasis">
      <v-icon>mdi-alert-octagon-outline</v-icon> cette action ne peut pas ètre
      annulée
    </p>

    <template v-slot:actions>
      <v-btn variant="text" @click="snackConf = false"> Non </v-btn>
      <v-btn
        color="white"
        variant="tonal"
        class="mx-3 bg-red"
        @click="deltPage"
      >
        Oui
      </v-btn>
    </template>
  </v-snackbar>
  <v-layout>
    <v-navigation-drawer
      temporary
      location="right"
      elevation="10"
      permanent
      width="380"
      v-model="portfolioss.sideBarM"
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
        <!-- navBar -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-n-circle</v-icon
            >
            <h3 class="mt-1">Modifier barre de navigation</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Ajouter une image d'arrière-plan</h4>
                  <v-switch
                    v-model="navbar.navbar.backgroundImage"
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
                  <h4 class="mt-4">Barre de navigation inversée</h4>
                  <v-switch
                    @change="toggleNavBarValue"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Couleur d'arrière-plan</h4>
                  <v-btn
                    variant="tonal"
                    class="mt-2 ms-auto"
                    @click="colorPick = !colorPick"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" v-if="navbar.navbar.backgroundImage">
                <div class="d-flex">
                  <h4 class="mt-4">Lien d'image</h4>
                  <v-text-field
                    v-model="navbar.navbar.lineImage"
                    variant="outlined"
                    density="compact"
                    hide-details
                    single-line
                    color="blue"
                    class="mt-2 ms-2"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row>
              <v-color-picker
                v-if="colorPick"
                v-model="navbar.navbar.colorNav"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
          </template>
        </v-expansion-panel>
        <!-- logo -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" color="indigo" size="large"
              >mdi-alpha-l-circle</v-icon
            >
            <h3 class="mt-1">Modifier Logo</h3>
          </template>
          <template v-slot:text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Logo</h4>
                  <v-switch
                    v-model="navbar.logo.logo"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
                <div class="d-flex">
                  <h4 class="mt-4">Logo Arrondi</h4>
                  <v-switch
                    v-model="navbar.logo.logoArr"
                    value="1"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="d-flex">
                  <h4 class="mt-4">Affichage Image</h4>
                  <v-switch
                    v-model="navbar.logo.image"
                    :value="true"
                    color="blue"
                    class="ms-auto"
                    inset
                  >
                  </v-switch>
                </div>

                <div class="d-flex">
                  <h4 class="mt-4">Fond couleur</h4>
                  <v-btn
                    variant="tonal"
                    class="mt-2 ms-auto"
                    @click="colorPickLogo = !colorPickLogo"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row no-gutters>
              <v-col cols="12">
                <h4 class="mt-4">Taille</h4>
                <v-slider
                  v-model="navbar.logo.sizeLogo"
                  :max="170"
                  :min="10"
                  :step="1"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="navbar.logo.sizeLogo"
                      :max="170"
                      :min="10"
                      style="width: 100px"
                      suffix="px"
                      density="compact"
                      variant="outlined"
                      type="number"
                      hide-details
                      single-line
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12" v-if="navbar.logo.image">
                <div class="d-flex">
                  <h4 class="mt-4">Logo</h4>
                  <v-btn
                    class="text-none rounded ma-2"
                    color="blue"
                    variant="tonal"
                  >
                    <label for="file" class="m-0" style="cursor: pointer">
                      choisir un fichier
                    </label>
                  </v-btn>
                  <input
                    type="file"
                    id="file"
                    class="d-none"
                    @change="handleFileChange"
                  />
                </div>
              </v-col>
            </v-row>
            <!--  -->
            <v-row>
              <v-color-picker
                v-if="colorPickLogo"
                v-model="navbar.logo.colorChoix"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
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
                    v-model="navbar.navbar.afficheTitre"
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
                    v-model="navbar.navbar.selectStyle"
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
                        @click="navbar.navbar.sizeTitle = item.raw.px"
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
                    v-model="navbar.navbar.selectPolice"
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
                  v-model="navbar.navbar.sizeTitle"
                  :max="170"
                  :min="10"
                  :step="1"
                  color="blue"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="navbar.navbar.sizeTitle"
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
                        :color="navbar.navbar.colorTitre"
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
                        :color="navbar.navbar.colorBackTitre"
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
                v-model="navbar.navbar.colorTitre"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
              <v-color-picker
                v-if="colorPickBackTitreNav"
                v-model="navbar.navbar.colorBackTitre"
                :modes="['hexa']"
                class="mx-auto"
              ></v-color-picker>
            </v-row>
          </template>
        </v-expansion-panel>
        <!-- Pages -->
        <v-expansion-panel>
          <template v-slot:title>
            <v-icon class="me-1" size="large" color="indigo"
              >mdi-alpha-p-circle</v-icon
            >
            <h3 class="mt-1">Modifier Pages</h3>
          </template>
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="d-flex">
                  <h4 class="mt-4">Masquer le curseur</h4>
                  <v-switch
                    v-model="navbar.links.hideSlider"
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
                  <h4 class="mt-4">Couleur lien active</h4>
                  <v-btn
                    variant="tonal"
                    class="mt-2 ms-auto"
                    @click="colorPickLinks = !colorPickLinks"
                  >
                    <v-icon>mdi-format-color-fill</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex mt-5">
                  <h4 class="mt-4">Police</h4>
                  <v-autocomplete
                    v-model="navbar.links.selectPolice"
                    :items="fonts.font"
                    class="ms-16 mt-1"
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
              <v-col cols="12" class="mt-2">
                <v-color-picker
                  v-if="colorPickLinks"
                  v-model="navbar.links.colorLink"
                  :modes="['hexa']"
                  class="mx-auto"
                ></v-color-picker>
              </v-col>
            </v-row>
            <!-- menu site -->
            <v-row no-gutters>
              <v-col cols="12">
                <v-divider class="border-opacity-100 my-5"></v-divider>
                <h3 class="mt-4 mb-2 d-inline">Menu du site</h3>
                <v-btn
                  color="blue"
                  class="text-none float-right"
                  variant="text"
                  @click="addPage()"
                >
                  <v-icon>mdi-plus</v-icon> Ajouter
                </v-btn>
                <draggable :list="linkNav" @change="movePage">
                  <v-card
                    color="blue-lighten-4"
                    height="55"
                    class="my-2 cursor-move"
                    v-for="element in linkNav"
                    :key="element"
                  >
                    <template v-slot:prepend>
                      <v-icon size="large">mdi-cursor-move</v-icon>
                    </template>
                    <template v-slot:append>
                      <v-btn variant="plain" class="pb-1">
                        <v-icon size="30">mdi-dots-vertical</v-icon>
                        <v-menu activator="parent">
                          <v-list>
                            <v-list-item
                              link
                              title="Dupliquer"
                              prepend-icon="mdi-file-multiple"
                              @click="duplicatePage(element.id)"
                            ></v-list-item>
                            <v-list-item
                              link
                              title="Supprimer"
                              prepend-icon="mdi-delete-empty"
                              @click="confirmDeletionDialog(element.id)"
                            ></v-list-item>
                          </v-list>
                        </v-menu>
                      </v-btn>
                    </template>
                    <template v-slot:title>
                      <v-text-field
                        variant="text"
                        hide-details
                        density="compact"
                        v-model="element.name"
                      ></v-text-field>
                    </template>
                  </v-card>
                </draggable>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-layout>
</template>

<style lang="scss" scoped></style>
