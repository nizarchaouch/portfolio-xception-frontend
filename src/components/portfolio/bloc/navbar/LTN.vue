<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import DialogAjouter from "@/components/portfolio/DialogAjouter.vue";

export default {
  props: { voir: Boolean, model: Boolean, update: Boolean },
  components: { DialogAjouter },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
    pages() {
      if (this.model) {
        return this.portfolioss.ModelPortf.pages;
      } else {
        return this.portfolioss.portfolios.pages;
      }
    },
    selectedPage() {
      return this.portfolioss.portfolios.selectedPage;
    },
    navbar() {
      if (this.model) {
        return this.portfolioss.ModelPortf.navbar.settings;
      } else {
        return this.portfolioss.portfolios.navbar.settings;
      }
    },
  },
  data: () => ({
    tab: null,
    drawer: false,
    showButton: false,
    selectedPage: null,
  }),
  methods: {
    ...mapActions(["fetchFonts"]),
    ...mapMutations(["changeSidebarA", "changeSidebarM", "setPortf"]),
    findPage(name) {
      this.portfolioss.selectedPage =
        this.pages.find((page) => page.name === name) || {};
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
  },
  watch: {
    tab(newValue) {
      // Met à jour l'affichage de la page quand l'onglet sélectionné change

      if (this.model && !this.update) {
        this.$router.push({ name: "voirModel", params: { page: newValue } });
      } else if (this.voir && !this.model) {
        this.$router.push({ name: "voir", params: { page: newValue } });
      } else if (this.update) {
        this.$router.push({ name: "ModfModel", params: { page: newValue } });
      } else {
        this.$router.push({ name: "portfolio", params: { page: newValue } });
      }
    },
  },
  created() {
    this.portfolioss.selectedPage = this.pages[0];
    console.log("select", this.portfolioss.selectedPage);
  },
  mounted() {
    setTimeout(() => {
      this.fetchFonts();
      this.loadFont();
      if (this.update) {
        this.setPortf(this.portfolioss.ModelPortf);
        console.log(this.pages);
      }
      this.findPage(this.pages[0].name);
      this.tab = this.pages[0].name;
    }, 200);
  },
};
</script>

<template>
  <v-row
    no-gutters
    @mouseover="voir ? (showButton = false) : (showButton = true)"
    @mouseleave="showButton = false"
  >
    <v-toolbar
      :image="navbar.navbar.backgroundImage ? navbar.navbar.lineImage : null"
      :color="navbar.navbar.colorNav"
      :class="!voir ? 'vToolbar' : ''"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-layout class="hidden-md-and-up">
        <v-navigation-drawer
          v-model="drawer"
          class="mt-15"
          location="top"
          elevation="10"
          temporary
          permanent
        >
          <div class="d-flex flex-row">
            <v-tabs v-model="tab" class="pe-3" direction="vertical">
              <v-tab
                v-for="(item, index) in pages"
                :key="index"
                :value="item.name"
                class="text-decoration-none"
                style="font-weight: 600"
                color="blue"
                @click="findPage(item)"
              >
                {{ item.name }}
              </v-tab>
            </v-tabs>
            <v-icon
              @click="drawer = !drawer"
              size="large"
              class="ma-5 ms-auto"
              color="grey"
              >mdi-close-circle</v-icon
            >
          </div>
        </v-navigation-drawer>
      </v-layout>

      <v-col cols="auto" class="d-flex">
        <v-tab
          :to="this.pages[0].name"
          @click="findPage(this.pages[0].name)"
          class="text-none"
          :style="{
            fontFamily: navbar.navbar.selectPolice,
            'font-size': navbar.navbar.sizeTitle + 'px',
          }"
        >
          <v-avatar
            v-if="navbar.logo.logo"
            class="me-4 mt-1"
            :color="navbar.logo.colorChoix"
            :rounded="!navbar.logo.logoArr"
            :size="navbar.logo.sizeLogo"
          >
            <v-img
              :src="
                navbar.logo.image
                  ? 'http://localhost:8000/' + navbar.logo.lineImage
                  : null
              "
              cover
            ></v-img>
          </v-avatar>
          <!-- <p
            v-if="portfolio.navbar.afficheTitre"
            :class="portfolio.navbar.formaTitreNav"
            class="py-1"
            :style="{
              color: portfolio.navbar.colorTitre,
              'background-color': portfolio.navbar.colorBackTitre,
            }"
          >
            {{ portfolio.navbar.titre }}
          </p> -->
          <div
            v-html="navbar.navbar.titre"
            v-if="navbar.navbar.afficheTitre"
            class="py-1"
            :style="{
              color: navbar.navbar.colorTitre,
              'background-color': navbar.navbar.colorBackTitre,
            }"
          ></div>
        </v-tab>
      </v-col>

      <v-spacer></v-spacer>
      <v-tabs v-model="tab" class="pe-3 hidden-md-and-down" height="60">
        <v-tab
          v-for="(item, index) in pages"
          :key="index"
          :value="item.name"
          :hide-slider="navbar.links.hideSlider"
          :style="{
            'font-weight': 600,
            fontFamily: navbar.links.selectPolice,
          }"
          class="text-none"
          :color="navbar.links.colorLink"
          @click="findPage(item.name)"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-btn
        v-if="showButton"
        color="grey-darken-2"
        elevation="10"
        icon
        class="animation text-none bg-white"
        @click="portfolio.sideBarM = !portfolio.sideBarM"
      >
        <v-icon>mdi-pencil</v-icon>
        <v-tooltip activator="parent" location="bottom">Modifier</v-tooltip>
      </v-btn>
    </v-toolbar>
    <v-row style="height: 0" justify="center" v-if="!voir">
      <v-btn
        v-if="showButton"
        color="white"
        class="animation bg-blue text-none rounded-pill"
        prepend-icon="mdi-plus"
        @click="
          (portfolio.dialogA = !portfolio.dialogA) &&
            (portfolio.isnavbar = true)
        "
        style="z-index: 3"
      >
        Ajouter un bloc
      </v-btn>
      <DialogAjouter />
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
.addBloc {
  border: 2px dashed gray;
}
.vToolbar {
  &:hover {
    border: 2px solid blue;
  }
  .animation {
    animation: fadeIn 0.6s;
  }
}
</style>
