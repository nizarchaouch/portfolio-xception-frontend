<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import BtnMod from "../../BtnBloc/BtnMod.vue";
import BtnAjou from "../../BtnBloc/BtnAjou.vue";

export default {
  props: { id: Number },
  components: { BtnMod, BtnAjou },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
    settingss() {
      if (this.id !== undefined) {
        // Si id est défini, enregistrez les paramètres dans le store Vuex
        this.portfolioss.selectedPage.bloc[this.id].settings = this.settings;
      }

      // Retournez les paramètres du bloc spécifié, soit depuis le store Vuex, soit localement
      return this.id !== undefined
        ? this.portfolioss.selectedPage.bloc[this.id].settings
        : this.settings;
    },
  },
  data: () => ({
    tab: null,
    showButton: false,
    settings: {
      background: {
        bloc1: { color: "#e6dace", img: "" },
        bloc2: { color: "#FFFFFF", img: "" },
      },
      card: {
        afficheLinksRes: true,
        img: "",
        imgarrond: "rounded-circle",
        backgroundColor: "#F4ECE6",
        lineColor: "#2196F3",
        lineSize: 3,
        nom: {
          affiche: true,
          color: "white",
          colorBack: "#0B242400",
          nom: "nizar",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Potta One",
        },
        poste: {
          affiche: true,
          color: "white",
          colorBack: "#0B242400",
          poste: "chaouch nizar",
          selectStyle: "Titer 4",
          size: 25,
          selectPolice: "Potta One",
        },
      },
      titre: {
        affiche: true,
        color: "white",
        colorBack: "#0B242400",
        poste: "chaouch nizar",
        selectStyle: "Titer 4",
        size: 25,
        selectPolice: "Potta One",
      },
      sousTitre: {
        affiche: true,
        color: "white",
        colorBack: "#0B242400",
        poste: "chaouch nizar",
        selectStyle: "Titer 4",
        size: 25,
        selectPolice: "Potta One",
      },
    },
  }),
  methods: {
    ...mapActions([]),
    ...mapMutations(["saveSettings", "changeSidebarM"]),
  },
  // watch: {
  //   // Observer les changements dans this.portfolioss.selectedPage.bloc[this.id].settings
  //   settingss: {
  //     handler(newSettings) {
  //       // Mettre à jour this.settings avec les nouvelles valeurs
  //       this.settings = newSettings;
  //       // console.log("hh", this.settings);
  //     },
  //     deep: true, // Surveiller les changements profonds dans l'objet
  //   },
  // },
};
</script>

<template>
  <v-row
    no-gutters
    @mouseover="showButton = true"
    @mouseleave="showButton = false"
  >
    <BtnMod :showButton="showButton" :id="id" />
    <v-row no-gutters class="bloc">
      <v-col cols="12" md="6" lg="5" style="background-color: #e6dace">
        <v-sheet
          color="#F4ECE6"
          class="sheet my-16 pt-3 mx-auto"
          max-width="370"
          elevation="5"
        >
          <v-img
            :width="180"
            class="rounded-circle mx-auto mt-8"
            src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/330180889_1348125799366307_3179994644660910263_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Wc13879tFrwQ7kNvgEebAql&_nc_ht=scontent.ftun9-1.fna&oh=00_AYDTTWmtOWqPwlDCnp2yphxoftHdIwW7rsBI8nO4aoDqEw&oe=6683B090"
          ></v-img>
          <p class="text-center mt-4 text-h5 name">
            <!-- Nizar <br />
            Chaouch -->
            {{ settingss.card.nom.nom }}
          </p>
          <v-col cols="3" class="mx-auto mt-3">
            <v-progress-linear
              model-value="100"
              color="blue"
              :height="3"
              rounded
            ></v-progress-linear>
          </v-col>
          <p
            class="text-center text-uppercase mt-4 text-medium-emphasis title"
            style="font-family: sans-serif 'Courier New', Courier, monospace"
          >
            Etudiant génie logiciel
          </p>
          <v-col cols="12" class="py-2 mt-16 bg-white d-flex justify-center">
            <v-btn class="ma-1" variant="text" icon="mdi-facebook"></v-btn>
            <v-btn class="ma-1" variant="text" icon="mdi-linkedin"></v-btn>
            <v-btn class="ma-1" variant="text" icon="mdi-twitter"></v-btn>
            <v-btn class="ma-1" variant="text" icon="mdi-instagram"></v-btn>
          </v-col>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="7"
        class="pt-16 ps-lg-16"
        style="background-color: white; background-image: url('')"
      >
        <v-row
          class="ps-md-16 mt-2 text-sm-center text-md-justify d-flex flex-column"
        >
          <v-col
            cols="11"
            style="
              font-size: 100px;
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                sans-serif;
            "
          >
            Hello
          </v-col>
          <v-col cols="11">
            <p class="title" style="font-size: 25px">
              Qui je suis et ce que je fais
            </p>
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
      <BtnAjou :showButton="showButton" :id="id" :settings="settings" />
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
  .name {
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
  }
}
</style>
