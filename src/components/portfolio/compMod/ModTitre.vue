<script>
import { mapState, mapActions } from "vuex";
export default {
  props: { id: Number },
  computed: {
    ...mapState(["portfolio", "fonts", "portfolioss"]),
    titre() {
      return this.portfolioss.selectedPage.bloc[this.id].settings.titre;
    },
    titreNom: {
      get() {
        return this.removeHtmlTags(this.titre.nom);
      },
      set(value) {
        this.titre.nom = value;
      },
    },
  },
  data: () => ({
    panel: 1,
    colorTitre: false,
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
    ...mapActions(["fetchFonts"]),
    loadFont() {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = `https://fonts.googleapis.com/css?family=${this.titre.selectPolice.replace(
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
        if (this.titre.nom.includes(`<b>${selectedText}</b>`)) {
          this.titre.nom = this.titre.nom.replace(
            `<b>${selectedText}</b>`,
            selectedText
          );
        } else {
          this.titre.nom = this.titre.nom.replace(
            selectedText,
            `<b>${selectedText}</b>`
          );
        }
      }
    },
    formatTextToI() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.titre.nom.includes(`<i>${selectedText}</i>`)) {
          this.titre.nom = this.titre.nom.replace(
            `<i>${selectedText}</i>`,
            selectedText
          );
        } else {
          this.titre.nom = this.titre.nom.replace(
            selectedText,
            `<i>${selectedText}</i>`
          );
        }
      }
    },
    formatTextToU() {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        if (this.titre.nom.includes(`<u>${selectedText}</u>`)) {
          this.titre.nom = this.titre.nom.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
        } else {
          this.titre.nom = this.titre.nom.replace(
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
  <v-expansion-panels v-model="panel" multiple>
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
                v-model="this.titre.affiche"
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
                v-model="this.titre.selectStyle"
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
                    @click="this.titre.size = item.raw.px"
                  >
                    <template v-slot:title>
                      <div class="d-flex">
                        <div class="mt-5">
                          <v-icon size="large" class="ms-1">mdi-circle</v-icon>
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
                v-model="this.titre.selectPolice"
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
              v-model="this.titre.size"
              :max="170"
              :min="10"
              :step="1"
              color="blue"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="this.titre.size"
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

              <v-btn @click="colorTitre = !colorTitre">
                <div class="d-flex align-center flex-column justify-center">
                  <v-icon icon="mdi-format-color-text"></v-icon>

                  <v-sheet
                    :color="this.titre.color"
                    height="4"
                    width="26"
                    tile
                  ></v-sheet>
                </div>
              </v-btn>
            </v-btn-toggle>

            <v-sheet class="pa-4 text-center">
              <v-textarea
                v-model="titreNom"
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
            v-model="this.titre.color"
            :modes="['hexa']"
            class="mx-auto"
          ></v-color-picker>
        </v-row>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped></style>
