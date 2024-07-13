<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: { id: Number },
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
    showColorTitre: false,
    showColorBack: false,

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
      titre: {
        color: "black",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        justify: "center",
        nom: `Paragraphe. Cliquez ici pour ajouter votre propre texte. Cliquez sur « Modifier Texte » 
            ou double-cliquez ici pour ajouter votre contenu et personnaliser les polices.
            Déplacez-moi où vous le souhaitez sur votre page. Présentez votre activité à vos visiteurs.`,
      },
    },
  }),
  methods: {
    ...mapActions(["delBloc", "modBloc"]),
    ...mapMutations(["changeSidebarA", "changeSidebarM"]),
    onClickDeltBloc() {
      this.delBloc({
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
      this.showColorCarre = false;
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
        if (this.settings.titre.nom.includes(`<b>${selectedText}</b>`)) {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
          this.saveForm();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
          this.saveForm();
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
          this.saveForm();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
          this.saveForm();
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
          this.saveForm();
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
          this.saveForm();
        }
      }
    },
  },
};
</script>
<template>
  <v-container
    fluid
    class="bloc"
    style="height: 100px"
    :style="{ 'background-color': settings.back.color }"
    @mouseover="showButton = true"
    @mouseleave="showButton = false"
  >
    <v-row style="height: 0" v-if="!portfolio.dialogA">
      <v-card
        v-if="showButton"
        class="animation ms-sm-auto me-6 mt-1 pa-2 ms-6"
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
    <v-row style="height: 0" justify="start" v-if="!portfolio.dialogA">
      <!-- modifer -->
      <v-col cols="auto" v-if="showTextareaTitre">
        <v-card max-width="600" style="z-index: 3">
          <v-row no-gutters>
            <v-col cols="auto">
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
            <v-divider vertical height="2"></v-divider>
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
    </v-row>
    <v-row>
      <v-col cols="7" :class="'mx-auto my-3 text-' + settings.titre.justify">
        <div
          v-html="settings.titre.nom"
          class="d-inline overflow-hidden text-body-1"
          :class="!portfolio.dialogA ? 'blocHover' : ''"
          style="max-width: 800px"
          :style="{ color: this.settings.titre.color }"
          @click="toggleTextareaTitre"
        ></div>
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
        style="z-index: 3; bottom: 20px"
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
