<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    obj: Object,
  },
  computed: { ...mapState(["user"]) },
  data() {
    return {
      dialog: false,
      loading: false,
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
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="950"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="text-none mt-2"
        variant="text"
        append-icon="mdi-chevron-right"
        color="light-blue-darken-4"
      >
        <p class="text-subtitle-1 font-weight-bold">Voir les détails</p>
      </v-btn>
    </template>

    <v-card class="mt-5">
      <v-btn icon="mdi-close" variant="text" @click="dialog = false"></v-btn>

      <v-avatar size="100" class="ava position-fixed mx-auto">
        <v-img
          min_height="auto"
          circle
          :src="'http://localhost:8000' + obj.logo"
        ></v-img>
      </v-avatar>

      <v-list>
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="text-h5 text-center" style="font-family: Georgia">
                {{ obj.titre }}
              </p>
              <div class="d-flex justify-center">
                <router-link
                  target="_blank"
                  :to="{
                    name: 'profilRec',
                    params: { name: obj.nomEntreprise, id: obj.idRec },
                  }"
                  style="font-weight: 600"
                >
                  {{ obj.nomEntreprise }}
                </router-link>
                <span class="text-medium-emphasis">
                  <v-icon>mdi-minus</v-icon>{{ obj.position }}</span
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-container>
          <v-row>
            <v-col cols="12" sm="4" order-sm="last">
              <v-sheet
                :height="auto"
                :max-width="480"
                border
                rounded
                class="ma-2 pa-2 mx-auto"
              >
                <div class="mb-3 mx-6" v-if="obj.date_expiration">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Date d'expiration
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.date_expiration.split("T")[0] }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.niveauCand">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Éducation
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.niveauCand }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.experience">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Expérience :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.experience }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.langue">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Langue :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.langue }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.salaire">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Salaire personnalisé :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.salaire }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.vacants">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Postes vacants :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.vacants }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.typeOffer">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Type d'emploi désiré :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.typeOffer }}
                  </p>
                </div>
                <!--  -->
                <div class="mb-3 mx-6" v-if="obj.genre">
                  <p
                    class="text-subtitle-2 text-grey-darken-1 font-weight-bold"
                  >
                    Genre :
                  </p>
                  <p class="font-weight-bold">
                    {{ obj.genre }}
                  </p>
                </div>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="8" order-sm="first">
              <v-row no-gutters>
                <v-col cols="12" class="mb-2">
                  <p class="text-h6 font-weight-bold">
                    Description de l'emploi
                  </p>
                  <p
                    class="text-justify"
                    style="font-family: Verdana, Geneva, Tahoma, sans-serif"
                  >
                    {{ obj.description }}
                  </p>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <p class="text-h6 font-weight-bold">Exigences de l'emploi</p>
                  <p class="text-justify">{{ obj.description }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<style scoped lang="scss">
.ava {
  z-index: 3;
  margin-top: -40px;
  left: 0;
  right: 0;
}
</style>
