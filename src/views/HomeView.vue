<script>
import { mapActions } from "vuex";
import NavBar from "@/components/public/NavBar.vue";
import FooterBar from "@/components/public/FooterBar.vue";
import arrwo1 from "@/assets/arrow-1.png";
import arrwo2 from "@/assets/arrow-2.png";
import findjob from "@/assets/findjob.png";

export default {
  name: "home",
  components: {
    NavBar,
    FooterBar,
  },
  data() {
    return {
      arrwo1: arrwo1,
      arrwo2: arrwo2,
      findjob: findjob,
      items: [
        {
          icon: "mdi-account-plus-outline",
          title: "Explorer les opportunités",
          desc: "Parcourez une gamme diversifiée d'offres d'emploi adaptées à vos intérêts et à votre expertise",
        },
        {
          icon: "mdi-cloud-upload-outline",
          title: "Créez votre portfolio",
          desc: "Créez un portfolio mettant en valeur vos compétences, votre expérience et vos qualifications.",
        },
        {
          icon: "mdi-magnify-plus-outline",
          title: "Postulez en toute simplicité",
          desc: "Postulez sans effort aux emplois qui correspondent à vos préférences en quelques clics",
        },
        {
          icon: "mdi-check-decagram",
          title: "Postulez en toute simplicité",
          desc: "Restez informé de vos candidatures et gérez efficacement votre parcours de recherche d'emploi",
        },
      ],
      sheetCard: [
        {
          icon: "mdi-briefcase",
          number: "5",
          titre: "Total Emploi",
        },
        {
          icon: "mdi-domain",
          number: "4",
          titre: "Entreprises",
        },
        {
          icon: "mdi-account-multiple",
          number: "4",
          titre: "Candidats",
        },
        // {
        //   icon: "mdi-sticker-check",
        //   number: "7",
        //   titre: "Candidat Accepté",
        // },
      ],
    };
  },
  methods: {
    ...mapActions(["userAuth"]),
  },
  mounted() {
    this.userAuth();
  },
};
</script>
<template>
  <NavBar />
  <div style="margin-top: 140px">
    <v-sheet
      class="mx-auto px-lg-16 px-2"
      min-height="200"
      max-width="1200"
      color="transparent"
    >
      <h1 class="text-md-h2 text-sm-h5 font-weight-black text-center">
        Créer un <span class="span">portfolio d'exception</span> et trouvez des
        opportunités
      </h1>
      <v-sheet
        class="mx-auto mt-5 text-md-h6 text-center"
        max-width="1000"
        color="#FFFFFF00"
      >
        Bienvenue sur portfolio xception, la platform ultime pour créer un
        portfolio professionnel et explorer des possibilités de carrière
        exceptionnelles, offrant une expérience utilisateur intuitive et
        conviviale. <br />
        <v-btn
          color="success"
          elevation="10"
          size="x-large"
          class="text-none ma-6 btn"
          rounded="xl"
          to="signup"
          >Créer maintenant</v-btn
        >
      </v-sheet>
      <v-sheet class="mx-auto" min-height="auto" :elevation="24" rounded>
        <v-img
          cover
          aspect-ratio="4/3"
          rounded
          src="https://zyro.com/cdn-cgi/image/w=1920,q=85,f=auto/images/portfolioWebsite/shop-template.png"
        ></v-img>
      </v-sheet>
    </v-sheet>
    <v-row class="d-flex justify-center align-center mt-8 bg-white" no-gutters>
      <v-col cols="10">
        <p class="text-center text-h4 my-8 font-weight-bold">
          Processus de travail du
          <span class="text-blue"> portfolio xception</span>
        </p>
        <v-row no-gutters justify="center" class="hidden-md-and-down">
          <v-col cols="6">
            <v-img :src="arrwo1" max-height="60" max-width="auto"></v-img>
          </v-col>
          <v-col cols="6">
            <v-img
              :src="arrwo1"
              max-height="65"
              max-width="auto"
              class="me-16"
            ></v-img>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col
            cols="12"
            sm="6"
            lg="3"
            class=""
            v-for="(item, index) in items"
            :key="index"
          >
            <v-sheet
              class="pa-6 mx-4 mb-md-4 mb-lg-0 text-center sheet"
              min-height="250"
              max-width="350"
              color="e5e5f2a3"
              rounded="lg"
            >
              <v-row>
                <v-col>
                  <v-btn
                    :ripple="false"
                    elevation="0"
                    icon
                    size="72"
                    class="my-3 cursor-default"
                  >
                    <v-icon size="40">{{ item.icon }}</v-icon>
                  </v-btn>

                  <p class="font-weight-bold my-3">{{ item.title }}</p>
                  <span class="text-caption text-medium-emphasis">
                    {{ item.desc }}
                  </span>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" class="mb-4 hidden-md-and-down">
          <v-col cols="6">
            <v-img :src="arrwo2" max-height="60"></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" class="d-flex align-center">
      <v-col cols="12" md="5" class="mb-16">
        <p
          class="mt-md-9 ms-4 ms-sm-16 ms-md-0 text-md-h4 text-h5 font-weight-bold"
        >
          Découvrez votre emploi idéal: faire correspondre vos intérêts et vos
          compétences
        </p>
        <p class="mt-3 ms-3 ms-sm-16 ms-md-0 text-md-h6 text-medium-emphasis">
          Libérez votre potentiel, embrassez votre avenir.
        </p>
        <v-row class="justify-center justify-md-start">
          <v-btn
            class="text-none mt-9 ms-4"
            variant="tonal"
            elevation="5"
            size="large"
            color="blue"
            rounded="xl"
            to="/offer"
            >Trouver Maintenant</v-btn
          >
        </v-row>
      </v-col>
      <v-col cols="12" md="5" class="px-16 py-4">
        <v-img
          :src="findjob"
          max-width="650"
          max-height="650"
          class="translate-animation"
        ></v-img>
      </v-col>
    </v-row>
    <!-- card -->
    <v-row no-gutters class="mb-16 ms-3 ms-md-16">
      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="mx-auto"
        v-for="(item, index) in sheetCard"
        :key="index"
      >
        <v-sheet
          class="pa-2 mb-4 mb-md-4 mb-lg-0 sheetCard"
          max-width="350"
          color="e5e5f2a3"
          rounded="lg"
        >
          <v-row>
            <v-col cols="auto">
              <v-btn
                :ripple="false"
                elevation="0"
                icon
                rounded
                size="72"
                class="ma-3 me-0 cursor-default"
              >
                <v-icon size="40">{{ item.icon }}</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <p class="font-weight-bold text-h5 mt-4">+ {{ item.number }}</p>
              <p class="text-medium-emphasis mt-2">
                {{ item.titre }}
              </p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- comment faire protfolio -->
    <v-row
      class="d-flex justify-center align-center mt-8 bg-white pb-6"
      no-gutters
    >
      <v-col cols="12" md="3">
        <p class="text-h3 my-8 ms-2 font-weight-bold">
          Comment faire un portfolio ?
        </p>
        <p class="px-3">
          Suivez ces quatre étapes afin de créer votre propre site de portfolio
          :
        </p>
        <v-btn
          class="text-none ms-4 mt-4"
          color="blue"
          rounded="xl"
          to="/signup"
          >Créer un portfolio</v-btn
        >
      </v-col>
      <v-col cols="11" md="3" offset="1">
        <ol class="ms-6 mt-15">
          <li class="my-4 text-body-1">
            Créez un compte sur portfolio xception
          </li>
          <li class="my-4 text-body-1">Créez votre portfolio en ligne</li>
          <li class="my-4 text-body-1">
            Personnalisez le contenu et le design sur site
          </li>
          <li class="my-4 text-body-1">
            Publiez et partagez votre nouveau portfolio
          </li>
        </ol>
      </v-col>
    </v-row>
  </div>
  <FooterBar />
</template>

<style lang="scss" scoped>
.span {
  background-image: linear-gradient(45deg, #d2001a, #7462ff, #f84e21, #23d5ab);
  color: transparent;
  background-clip: text;
  background-size: 400% 400%;
  animation: color 30s ease infinite;
}
.translate-animation {
  animation: translateXAnimation 3s ease-in-out infinite;
  @keyframes translateXAnimation {
    0% {
      transform: translatey(0);
    }
    50% {
      transform: translatey(-40px);
    }
  }
}
.btn {
  background-image: linear-gradient(15deg, #d2001a, #7462ff, #f84e21);
  background-size: 300% 300%;
  animation: color 5s ease-in-out infinite;
  @keyframes color {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
.title {
  font-size: 48px;
  line-height: 125%;
  font-family: Euclid Circular, Arial, sans-serif, Helvetica;
}
.sheet {
  .v-btn {
    background-color: #e5e5f2a3;
  }
  &:hover {
    background-color: #e5e5f2a3;
    .v-btn {
      background-color: #0a65cc;
      .v-icon {
        color: white;
      }
    }
  }
}
.sheetCard {
  .v-btn {
    background-color: #0a65cc32;
    .v-icon {
      color: #0a65cc;
    }
  }
  &:hover {
    border: 1px solid #0a65cc;
    .v-btn {
      background-color: #0a65cc;
      .v-icon {
        color: white;
      }
    }
  }
}
</style>
