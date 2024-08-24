<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: { id: Number, voir: Boolean },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
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
    toggle: "justify",
    showButton: false,
    showTextareaTitre: false,
    showTextareaBtn: false,
    showColorTitre: false,
    showColorBtn: false,
    showColorBack: false,
    choixBtn: ["Fichier", "folder-multiple-image"],
    menu: false,
    menuChoix: false,

    style: [
      { title: "Titre 1", value: 2, px: 100 },
      { title: "Titre 2", value: 3, px: 35 },
      { title: "Titre 3", value: 4, px: 27 },
      { title: "Titre 4", value: 5, px: 25 },
      { title: "Paragraphe 1", value: 6, px: 23 },
      { title: "Paragraphe 2", value: 8, px: 20 },
    ],
    btnStyle: ["elevated", "flat", "tonal", "outlined", "text", "plain"],
    btnRounded: ["0", "xs", "lg", "xl"],
    setting: {
      back: {
        color: "white",
        justify: "left",
      },
      titre: {
        color: "black",
        selectPolice: "Roboto,sans-serif",
        justify: "center",
        nom: "<b>Expérience</b>",
      },
      btn: {
        color: "blue",
        nom: "TÉLÉCHARGER CV",
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
      ,
      "moveBlocUp",
      "moveBlocDown",
      "uploadCv",
    ]),
    ...mapMutations(["changeSidebarA", "changeSidebarM"]),
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
  },
};
</script>
<template>
  <v-container
    fluid
    :class="voir ? '' : 'bloc'"
    style="height: 100px"
    :style="{ 'background-color': settings.back.color }"
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
    <v-row style="height: 0" justify="start" v-if="!portfolio.dialogA">
      <!-- modifer titer -->
      <v-col cols="auto" v-if="showTextareaTitre && !voir">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Police
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Potta One</v-list-item-title>
                      <v-list-item-title>Potta One</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
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
                  <v-sheet
                    :color="settings.titre.color"
                    height="4"
                    width="26"
                    tile
                  ></v-sheet>
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
                    @click="saveform()"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn
                      icon="mdi-format-align-center"
                      value="center"
                    ></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                    <v-btn
                      icon="mdi-format-align-justify"
                      value="justify"
                    ></v-btn>
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
      </v-col>
      <v-col cols="auto">
        <v-color-picker
          v-if="showColorTitre"
          @click="saveform"
          v-model="this.settings.titre.color"
          :modes="['hexa']"
          class="mx-auto mb-2"
        ></v-color-picker>
      </v-col>
    </v-row>
    <!-- mod btn -->
    <v-row style="height: 0" justify="end" v-if="!portfolio.dialogA && !voir">
      <!-- modifer btn -->
      <v-col cols="auto" v-if="showTextareaBtn">
        <v-card max-width="600" style="z-index: 5">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Desgin
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in btnStyle"
                        :key="item"
                        @click="save"
                      >
                        <v-btn
                          @click="settings.btn.variant = item"
                          :color="settings.btn.color"
                          :variant="item"
                          >{{ settings.btn.nom }}</v-btn
                        >
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                :ripple="false"
                class="mt-2 text-none"
                variant="plain"
                append-icon="mdi-menu-down"
                >Arrondie
                <v-menu activator="parent" max-height="300">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="pa-2 cursor-pointer"
                        v-for="item in btnRounded"
                        :key="item"
                        @click="save"
                      >
                        <v-btn
                          @click="[(settings.btn.rounded = item), saveform]"
                          :color="settings.btn.color"
                          :variant="settings.btn.variant"
                          :rounded="item"
                          >{{ settings.btn.nom }}</v-btn
                        >
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn
                variant="text"
                class="rounded-0"
                icon
                @click="showColorBtn = !showColorBtn"
              >
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>
                  <v-sheet
                    :color="settings.btn.color"
                    height="4"
                    width="26"
                    tile
                  ></v-sheet>
                </div>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-format-align-{{ settings.titre.justify }}</v-icon>
                <v-menu activator="parent" max-height="300" location="end">
                  <v-btn-toggle
                    v-model="settings.btn.justify"
                    divided
                    @click="save"
                  >
                    <v-btn icon="mdi-format-align-left" value="left"></v-btn>
                    <v-btn icon="mdi-format-align-right" value="right"></v-btn>
                  </v-btn-toggle>
                </v-menu>
              </v-btn>
            </v-col>
            <v-divider vertical height="2"></v-divider>
            <v-col cols="auto">
              <v-btn :ripple="false" class="rounded-0" icon variant="text">
                <v-icon>mdi-link</v-icon>
                <v-menu
                  activator="parent"
                  max-height="300"
                  width="300"
                  v-model="menuChoix"
                  :close-on-content-click="false"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="pa-2 cursor-pointer">
                        <v-btn
                          :ripple="false"
                          variant="text"
                          append-icon="mdi-menu-down"
                          :prepend-icon="'mdi-' + choixBtn[1]"
                        >
                          {{ choixBtn[0] }}
                          <v-menu
                            activator="parent"
                            max-height="300"
                            v-model="menu"
                            :close-on-content-click="false"
                          >
                            <v-list>
                              <v-list-item>
                                <v-list-item-title class="cursor-pointer">
                                  <v-btn
                                    :ripple="false"
                                    variant="text"
                                    prepend-icon="mdi-web"
                                    @click="choixBtn = ['URL', 'web']"
                                  >
                                    URL</v-btn
                                  >
                                </v-list-item-title>
                                <v-list-item-title class="cursor-pointer">
                                  <v-btn
                                    :ripple="false"
                                    variant="text"
                                    prepend-icon="mdi-folder-multiple-image"
                                    @click="
                                      choixBtn = [
                                        'Fichier',
                                        'folder-multiple-image',
                                      ]
                                    "
                                  >
                                    Fichier</v-btn
                                  >
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-btn>
                      </v-list-item-title>
                      <v-divider height="2" class="my-2"></v-divider>
                      <v-list-item-title>
                        <v-text-field
                          v-if="choixBtn[0] === 'URL'"
                          @change="saveform(), (settings.btn.doc = '')"
                          density="compact"
                          variant="underlined"
                          color="blue"
                          placeholder="Saisir un lien"
                          v-model="settings.btn.url"
                        ></v-text-field>
                      </v-list-item-title>
                      <v-list-item-title>
                        <v-card
                          v-if="
                            settings.btn.doc  && choixBtn[0] === 'Fichier'
                          "
                          :title="
                            settings.btn.doc
                              ? settings.btn.doc.slice(14)
                              : 'CV non disponible'
                          "
                          prepend-icon="mdi-file-document"
                          append-icon="mdi-eye"
                          :href="'http://localhost:8000/' + settings.btn.doc"
                          target="_blank"
                          variant="tonal"
                          color="#428ee6"
                        >
                          <v-tooltip activator="parent" location="top"
                            >Voir CV</v-tooltip
                          >
                        </v-card>
                        <v-btn
                          v-if="choixBtn[0] === 'Fichier'"
                          class="text-none rounded-pill ma-2"
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
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-sheet class="pa-4 text-center">
            <v-textarea
              @change="save"
              @keyup.esc="this.showTextareaBtn = false"
              v-model="settings.btn.nom"
              rows="2"
              variant="outlined"
              auto-grow
              full-width
              hide-details
            ></v-textarea>
          </v-sheet>
        </v-card>
        <v-color-picker
          v-if="showColorBtn"
          v-model="this.settings.btn.color"
          @click="save"
          :modes="['hexa']"
          class="mx-auto my-2"
        ></v-color-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" :class="'mt-3 mx-auto text-' + settings.titre.justify">
        <div
          v-html="settings.titre.nom"
          class="text-h5 d-inline overflow-hidden"
          :class="{
            blocHover: !portfolio.dialogA && !voir,
          }"
          style="max-width: 800px"
          :style="{ color: this.settings.titre.color }"
          @click="toggleTextareaTitre"
        ></div>
      </v-col>
      <v-col cols="4" class="mt-3 mx-auto">
        <v-btn
          :class="'mb-6 text-none  float-' + settings.btn.justify"
          :rounded="settings.btn.rounded"
          :variant="settings.btn.variant"
          :color="settings.btn.color"
          @click="showTextareaBtn = !showTextareaBtn"
        >
          <a
            :href="
              voir
                ? settings.btn.url === ''
                  ? 'http://localhost:8000/' + settings.btn.doc
                  : settings.btn.url
                : null
            "
            target="_blank"
            download="CV"
            class="text-decoration-none text-white"
          >
            {{ settings.btn.nom }}
          </a>
        </v-btn>
        <v-color-picker
          v-if="showColorCarre"
          v-model="this.settings.btn.color"
          :modes="['hexa']"
          class="me-auto mb-2"
          style="position: absolute; right: 25%; z-index: 5"
          @change="save"
        ></v-color-picker>
      </v-col>
    </v-row>
    <!-- btn ajouter -->
    <v-row
      style="height: 0"
      justify="center"
      v-if="!portfolio.dialogA && !voir"
    >
      <v-btn
        v-if="showButton"
        color="white"
        prepend-icon="mdi-plus"
        class="animation text-none bg-blue rounded-pill"
        @click="
          (portfolio.dialogA = !portfolio.dialogA) && (portfolio.blocindex = id)
        "
        style="z-index: 3; bottom: 25px"
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
