<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import BtnMod from "../../BtnBloc/BtnMod.vue";
import BtnAjou from "../../BtnBloc/BtnAjou.vue";

export default {
  props: { id: Number, ok: Boolean, voir: Boolean },
  components: { BtnMod, BtnAjou },
  computed: {
    ...mapState(["user", "portfolio", "portfolioss"]),
    settings() {
      if (!this.ok) {
        return this.defaultSettings;
      } else if (
        this.ok &&
        this.portfolioss.selectedPage.bloc[this.id]?.settings
      ) {
        return (this.portfolioss.selectedPage.bloc[this.id].settings =
          this.defaultSettings);
      } else {
        return this.portfolioss.selectedPage.bloc[this.id].settings;
      }
    },
  },
  data: () => ({
    tab: null,
    showButton: false,
    defaultSettings: {
      background: {
        bloc1: { color: "#e6dace", img: "" },
        bloc2: { color: "#FFFFFF", img: "" },
      },
      card: {
        afficheLinksRes: true,
        afficheImg: true,
        img: "",
        imgarrond: "rounded-circle",
        backgroundColor: "#F4ECE6",
        lineColor: "#2196F3",
        lineSize: 3,
        nom: {
          affiche: true,
          color: "black",
          colorBack: "#0B242400",
          nom: "nizar",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Courier Prime",
        },
        poste: {
          affiche: true,
          color: "#625E5C",
          colorBack: "#0B242400",
          nom: "Etudiant génie logiciel",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Courier Prime",
        },
      },
      titre: {
        affiche: true,
        color: "black",
        colorBack: "#0B242400",
        nom: "Hello",
        selectStyle: "Titer 4",
        size: 100,
        selectPolice: "Frank Ruhl Libre",
      },
      sousTitre: {
        affiche: true,
        color: "black",
        colorBack: "#0B242400",
        nom: "Qui je suis et ce que je fais",
        selectStyle: "Titer 4",
        size: 25,
        selectPolice: "Luckiest Guy",
      },
    },
  }),
  methods: {
    ...mapActions([
      "findBlocById",
      "delBloc",
      "modBloc",
      "moveBlocUp",
      "moveBlocDown",
    ]),
    ...mapMutations(["changeSidebarM"]),
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
  },
};
</script>

<template>
  <v-row
    no-gutters
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
    <v-row no-gutters :class="voir ? '' : 'bloc'">
      <v-col
        cols="12"
        md="6"
        lg="5"
        :style="
          'background-color:' + (settings.background.bloc1?.color || '#FFFFFF')
        "
      >
        <v-sheet
          :color="settings.card.backgroundColor"
          class="sheet my-16 pt-3 mx-auto"
          max-width="370"
          elevation="5"
        >
          <v-img
            v-if="settings.card.afficheImg"
            :width="180"
            class="mx-auto mt-8"
            :class="settings.card.imgarrond"
            src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/330180889_1348125799366307_3179994644660910263_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=wRJTVMs5i9gQ7kNvgEUnY1F&_nc_ht=scontent.ftun9-1.fna&oh=00_AYBM1fmWh86NPYzuWT2LFmobgzISi5RdHOPxuzcpLL9GGQ&oe=66D81090"
          ></v-img>
          <div
            v-html="settings.card.nom.nom"
            v-if="settings.card.nom.affiche"
            class="text-center mt-4"
            :style="{
              'font-size': settings.card.nom.size + 'px',
              'font-family': settings.card.nom.selectPolice,
              color: settings.card.nom.color,
            }"
          ></div>
          <v-col cols="3" class="mx-auto mt-3">
            <v-progress-linear
              model-value="100"
              :color="settings.card.lineColor"
              :height="3"
              rounded
            ></v-progress-linear>
          </v-col>
          <div
            v-html="settings.card.poste.nom"
            v-if="settings.card.poste.affiche"
            class="text-center text-uppercase mt-4 pb-4"
            :style="{
              'font-family': settings.card.poste.selectPolice,
              'font-size': settings.card.poste.size + 'px',
              color: settings.card.poste.color,
            }"
          ></div>
          <v-col cols="12" class="py-1 mt-16 bg-white d-flex justify-center">
            <a
              :href="'https://' + link.url"
              target="_blank"
              class="text-black"
              v-for="link in this.user.userData.socialLinks"
              :key="index"
            >
              <v-btn class="ma-1" variant="text" :icon="'mdi-' + link.platform">
              </v-btn>
            </a>
          </v-col>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="7"
        class="pt-16 ps-lg-16"
        :style="
          'background-color:' + (settings.background.bloc2?.color || '#FFFFFF')
        "
      >
        <v-row
          class="ps-md-16 mt-2 text-sm-center text-md-justify d-flex flex-column"
        >
          <v-col cols="11" v-if="settings.titre.affiche">
            <div
              v-html="settings.titre.nom"
              :style="{
                'font-size': settings.titre.size + 'px',
                'font-family': settings.titre.selectPolice,
                color: settings.titre.color,
              }"
            ></div>
          </v-col>
          <v-col cols="11">
            <div
              v-html="settings.sousTitre.nom"
              v-if="settings.sousTitre.affiche"
              :style="{
                'font-size': settings.sousTitre.size + 'px',
                'font-family': settings.sousTitre.selectPolice,
                color: settings.sousTitre.color,
              }"
            ></div>
          </v-col>
          <v-col cols="11" class="mb-3">
            <v-btn
              rounded="pill"
              variant="elevated"
              color="indigo"
              size="large"
              class="me-8"
              >CV</v-btn
            >
            <v-btn rounded="pill" variant="outlined" size="large"
              >Projets</v-btn
            >
          </v-col>
          <v-col cols="12" md="11" lg="10" xl="8" class="mb-6">
            <p
              class="para overflow-hidden"
              style="font-size: 19px; max-height: 175px"
            >
              officia ullamco do culpa sit do. Laboris nostrud cillum voluptate
              esse exercitation ullamco est. Ipsum consequat anim commodo
              occaecat sint veniam cupidatat sint adipisicing amet qui
              cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint. officia ullamco do culpa sit do. Laboris nostrud
              cillum voluptate esse exercitation ullamco est. Ipsum consequat
              anim commodo occaecat sint veniam cupidatat sint adipisicing amet
              qui cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint. *officia ullamco do culpa sit do. Laboris nostrud
              cillum voluptate esse exercitation ullamco est. Ipsum consequat
              anim commodo occaecat sint veniam cupidatat sint adipisicing amet
              qui cupidatat. Aliqua adipisicing in deserunt deserunt laborum
              proident et enim. Amet id tempor eiusmod incididunt consequat
              dolor sint.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-row style="height: 0" justify="center" v-if="!portfolio.dialogA">
        <v-btn
          v-if="showButton"
          color="white"
          prepend-icon="mdi-plus"
          class="animation text-none bg-blue rounded-pill"
          @click="
            (portfolio.dialogA = !portfolio.dialogA) &&
              (portfolio.blocindex = id)
          "
          style="z-index: 3; bottom: 0px"
        >
          Ajouter un bloc
        </v-btn>
      </v-row>
    </v-row>
  </v-row>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
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
  /*  .name {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
  }
  .title {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: large;
  }
  .para {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: small;
  }
  .sheet {
    transition: left 0.3s ease, width 0.3s ease, height 0.3s ease;
  } */
}
</style>
