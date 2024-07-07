<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: { id: Number },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
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
    tab: null,
    showButton: false,
    showTextarea: false,
    showColorTitre: false,
    style: [
      { title: "Titre 1", value: 2, px: 100 },
      { title: "Titre 2", value: 3, px: 35 },
      { title: "Titre 3", value: 4, px: 27 },
      { title: "Titre 4", value: 5, px: 25 },
      { title: "Paragraphe 1", value: 6, px: 23 },
      { title: "Paragraphe 2", value: 8, px: 20 },
    ],
    settings: {
      titre: {
        affiche: true,
        color: "white",
        selectStyle: "Titer 4",
        selectPolice: "Roboto,sans-serif",
        nom: "Nos clients",
      },
      parg: {
        affiche: true,
        color: "#6F6F6F",
        selectStyle: "Titer 4",
        selectPolice: "Average Sans",
        nom: `Non occaecat culpa aliquip duis sunt amet qui pariatur quis ut.
         Officia sit adipisicing proident aute veniam veniam. Irure officia
         esse eu quis mollit consectetur aliqua anim nisi et labore do.
         Incididunt ea consequat duis officia commodo fugiat non.
         Occaecat ea velit esse tempor veniam laborum.`,
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
    toggleTextarea() {
      this.showTextarea = !this.showTextarea;
    },
    savetitre() {
      this.showTextarea = false;
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
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
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
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
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
        } else {
          this.settings.titre.nom = this.settings.titre.nom.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
        }
      }
    },
  },
};
</script>

<template>
  <v-row
    no-gutters
    @mouseover="showButton = true"
    @mouseleave="showButton = false"
  >
    <v-row style="height: 0" v-if="!portfolio.dialogA">
      <v-btn
        v-if="showButton"
        color="white"
        prepend-icon="mdi-auto-fix"
        class="animation text-none ms-6 mt-5"
        @click="handleAddBlock"
        style="z-index: 3"
      >
        Modifier le desgin
      </v-btn>
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
          @click="handleModBlock"
        >
          Modifier le bloc
        </v-btn>
        <v-card class="pa-2 my-1 d-flex justify-space-between" flat border>
          <v-btn variant="text" size="40">
            <v-icon>mdi-content-copy</v-icon>
            <v-tooltip activator="parent" location="bottom"
              >Dupliquer</v-tooltip
            >
          </v-btn>
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
        </v-card>
        <v-btn
          border
          color="white"
          prepend-icon="mdi-trash-can-outline"
          class="text-none text-red"
          elevation="0"
          @click="onClickDeltBloc"
        >
          Supprimer bloc
        </v-btn>
      </v-card>
    </v-row>
    <v-row no-gutters class="bloc">
      <v-parallax
        src="https://as1.ftcdn.net/v2/jpg/06/49/83/90/1000_F_649839048_MYPNu95Aq3fmKI7JK8GoNucX3DYTc1KZ.jpg"
        color=""
        max-height="760"
        min-height="400"
      >
        <div class="d-flex flex-column fill-height justify-center align-center">
          <v-col
            cols="auto"
            style="position: absolute; top: 2%"
            v-if="showTextarea"
          >
            <v-card class="mx-auto" max-width="600" style="z-index: 3">
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
                      <v-sheet
                        color="purple"
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
                    <v-icon>mdi-format-align-justify</v-icon>
                    <v-menu activator="parent" max-height="300" location="end">
                      <v-btn-toggle v-model="toggle" divided>
                        <v-btn icon="mdi-format-align-left"></v-btn>
                        <v-btn icon="mdi-format-align-center"></v-btn>
                        <v-btn icon="mdi-format-align-right"></v-btn>
                        <v-btn icon="mdi-format-align-justify"></v-btn>
                      </v-btn-toggle>
                    </v-menu>
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-sheet class="pa-4 text-center">
                <v-textarea
                  @change="savetitre"
                  @keyup.esc="this.showTextarea = false"
                  v-model="titreNom"
                  rows="2"
                  variant="outlined"
                  auto-grow
                  full-width
                  hide-details
                ></v-textarea>
              </v-sheet>
              <v-color-picker
                v-if="showColorTitre"
                :modes="['hexa']"
                class="mx-auto mb-2"
              ></v-color-picker>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="5"
            class="d-flex flex-column justify-center align-center text-white"
          >
            <div
              v-html="settings.titre.nom"
              class="text-md-h2 font-weight-thin mb-4 overflow-hidden"
              style="max-width: 800px"
              @click="toggleTextarea"
            ></div>

            <!-- <textarea
              ref="myTextarea"
              v-if="showTextarea"
              full-width
              rows="2"
              hide-details
              auto-grow
              class="text-md-h2 font-weight-thin mb-4"
              v-model="settings.titre.nom"
              :style="{
                'font-family': settings.titre.selectStyle,
                color: settings.titre.color,
              }"
              @change="savetitre"
              @keyup.esc="this.showTextarea = false"
            >
            </textarea> -->
            <h4 class="subheading text-justify mb-4">
              {{ this.settings.parg.nom }}
            </h4>
            <v-btn color="success" class="text-none">En savoir plus</v-btn>
          </v-col>
        </div>
      </v-parallax>
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
        style="z-index: 3; bottom: 30px"
      >
        Ajouter un bloc
      </v-btn>
    </v-row>
  </v-row>
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
p {
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
