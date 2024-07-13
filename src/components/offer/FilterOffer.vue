<script>
import { cityName } from "../city";
export default {
  data: () => ({
    cityName,
    sheet: false,
    filter: { localite: [], typeContrat: [], langue: [], genre: [] },
    typeContrat: [
      "CDI",
      "CDD",
      "CIVP",
      "Karama",
      "Temps plein",
      "Saisonnier",
      "Freelance / Indépendant",
      "Temps partiel",
      "Stage",
    ],
    langue: ["Français", "Anglais"],
  }),
  methods: {
    // Méthode pour émettre un événement lorsqu'un filtre est modifié
    emitFilterUpdate() {
      this.$emit("filter-update", this.filter);
    },
  },
  watch: {
    // Observer les changements dans les filtres et émettre l'événement correspondant
    filter: {
      deep: true,
      handler() {
        this.emitFilterUpdate();
      },
    },
  },
};
</script>
<template>
  <div>
    <button class="btn ms-6" @click="sheet = !sheet">
      <span
        ><v-icon size="25">mdi-tune</v-icon>
        <p class="ms-2 text-h6">Filtres</p></span
      >
    </button>

    <v-layout>
      <v-navigation-drawer
        v-model="sheet"
        :width="300"
        location="start"
        elevation="10"
        class="mt-16"
        color="#e5e5f2"
      >
        <v-row class="ma-4">
          <v-icon size="25" class="mt-1">mdi-tune</v-icon>
          <p class="font-weight-bold text-h6 ms-2">Filtres</p>
          <v-btn
            variant="text"
            icon="mdi-menu-left"
            size="30"
            class="ms-auto"
            @click="sheet = !sheet"
          ></v-btn>
        </v-row>
        <v-divider></v-divider>

        <v-expansion-panels class="px-2">
          <v-expansion-panel
            class="my-2 overflow-auto"
            rounded="lg"
            style="max-height: 300px"
          >
            <template v-slot:title>
              <p class="text-body-1 font-weight-bold">Localité</p>
            </template>
            <template v-slot:text>
              <v-checkbox
                color="blue"
                v-model="filter.localite"
                v-for="item in cityName"
                :key="item"
                :label="item"
                :value="item"
              >
              </v-checkbox>
            </template>
          </v-expansion-panel>
          <v-expansion-panel
            class="my-2 overflow-auto"
            rounded="lg"
            style="max-height: 300px"
          >
            <template v-slot:title>
              <p class="text-body-1 font-weight-bold">Type de contrat</p>
            </template>
            <template v-slot:text>
              <v-checkbox
                color="blue"
                v-model="filter.typeContrat"
                v-for="item in typeContrat"
                :key="item"
                :label="item"
                :value="item"
              >
              </v-checkbox>
            </template>
          </v-expansion-panel>
          <v-expansion-panel class="my-2 overflow-auto" rounded="lg">
            <template v-slot:title>
              <p class="text-body-1 font-weight-bold">Langue</p>
            </template>
            <template v-slot:text>
              <v-checkbox
                color="blue"
                v-model="filter.langue"
                v-for="item in langue"
                :key="item"
                :label="item"
                :value="item"
              >
              </v-checkbox>
            </template>
          </v-expansion-panel>
          <v-expansion-panel class="my-2 overflow-auto" rounded="lg">
            <template v-slot:title>
              <p class="text-body-1 font-weight-bold">Genre</p>
            </template>
            <template v-slot:text>
              <v-checkbox
                color="blue"
                v-model="filter.genre"
                v-for="item in ['homme', 'femme']"
                :key="item"
                :label="item"
                :value="item"
              >
              </v-checkbox>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.label {
  font-size: medium;
  font-family: sans-serif;
}

.btn {
  background-image: linear-gradient(135deg, #008aff, #86d472);
  border-radius: 6px;
  color: #000000;
  height: 50px;
  font-size: 1.4em;
  font-weight: 600;
  padding: 2px;
  width: 7em;

  &:hover {
    color: #fff;
  }

  span {
    align-items: center;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    height: 100%;
    transition: background 0.5s ease;
    width: 100%;
  }

  &:hover span {
    background: transparent;
  }
}
</style>
