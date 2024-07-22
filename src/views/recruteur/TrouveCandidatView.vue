<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import DialogDetail from "@/components/offer/DialogDetail.vue";
import NavBar from "@/components/public/NavBar.vue";
import SideBar from "@/components/user/recruteur/SideBar.vue";

export default {
  name: "offer",
  components: {
    NavBar,
    DialogDetail,
    SideBar,
  },
  computed: {
    ...mapState(["offer", "user", "candidat"]),
    candShow() {
      return this.candidat.candidats;
    },
  },
  data: () => ({
    toggle: "list",
    search: "",
    tab: 1,
    screenWidth: window.innerWidth,
  }),
  methods: {
    ...mapActions(["userAuth", "getCandidats"]),
    handleResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth <= 600) {
        this.toggle = "card";
      }
    },
  },
  watch: {
    screenWidth(newWidth) {
      if (newWidth <= 600) {
        this.toggle = "card";
      } else {
        this.toggle = "list";
      }
    },
  },
  async mounted() {
    await this.userAuth();
    if (
      this.user.authenticated === false ||
      this.user.userData.role === "candidat" ||
      this.user.userData.role === "admin"
    ) {
      this.$router.push("login");
    } else {
      this.getCandidats();
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Ensure correct initial state
  },
 
};
</script>


<template>
  <NavBar hidea=" " />
  <SideBar />
  <v-row>
    <v-col cols="12" lg="10" xl="10" offset-lg="2">
      <v-card class="mt-16 bg-transparent" flat>
        <v-data-iterator
          :items="candShow"
          :items-per-page="15"
          :search="search"
        >
          <template v-slot:header>
            <v-container fluid>
              <v-row class="mt-4 justify-space-between">
                <!-- cherche -->
                <v-col cols="12" md="5" lg="3">
                  <v-text-field
                    v-model="search"
                    density="comfortable"
                    placeholder="Chercher"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo"
                    style="border: 1px solid blue"
                    class="rounded-pill"
                    rounded="xl"
                    clearable
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4" sm="2" align-self="end">
                  <v-btn-toggle
                    mandatory
                    v-model="toggle"
                    class="float-right d-none d-sm-flex"
                    color="blue"
                  >
                    <v-btn
                      icon="mdi-format-list-bulleted-square"
                      value="list"
                    ></v-btn>
                    <v-btn icon="mdi-apps" value="card"></v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:default="{ items }">
            <v-container class="pa-2" fluid v-if="toggle === 'card'">
              <v-row dense>
                <v-col
                  v-for="item in items"
                  :key="item"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card
                    class="mb-6 rounded-xl mx-auto"
                    border
                    flat
                    style="border: 1px solid blueviolet"
                    max-width="350"
                    min-height="360"
                  >
                    <v-list-item>
                      <v-banner class="text-h6" lines="one">
                        <div class="mx-auto text-center">
                          <v-avatar
                            size="100"
                            :image="
                              'http://localhost:8000' + item.raw.imagePath
                            "
                          >
                          </v-avatar>
                          <p class="mt-3">
                            {{ item.raw.nom }} {{ item.raw.prenom }}
                          </p>

                          <a
                            :href="'mailto:' + item.raw.mail"
                            class="text-body-1 text-decoration-none text-black"
                          >
                            {{ item.raw.mail }}
                          </a>
                        </div>
                      </v-banner>
                      <v-banner lines="one" v-if="item.raw.titre_emploi">
                        <p class="mx-auto text-body-1 text-capitalize">
                          <v-icon class="mb-1">mdi-account-hard-hat</v-icon>
                          {{ item.raw.titre_emploi }}
                        </p>
                      </v-banner>
                      <v-banner lines="one">
                        <p>
                          <v-icon class="me-2">mdi-calendar-range</v-icon
                          >{{
                            item.raw.dateNais && item.raw.dateNais.split("T")[0]
                          }}
                        </p>
                        <p class="ms-auto">
                          <v-icon class="pb-1">mdi-map-marker</v-icon
                          >{{ item.raw.adress }}
                        </p>
                      </v-banner>
                      <v-banner lines="one">
                        <a
                          :href="'tel:' + item.raw.tel"
                          class="text-decoration-none text-black"
                        >
                          <v-icon>mdi-phone</v-icon> +216 {{ item.raw.tel }}
                        </a>
                      </v-banner>
                      <div class="d-flex justify-space-around mt-1 py-2">
                        <p
                          v-for="(link, index) in item.raw.socialLinks"
                          :key="index"
                        >
                          <a
                            :href="'https://' + link.url"
                            target="_blank"
                            class="text-black"
                          >
                            <v-icon v-if="link.platform === 'Autre'"
                              >mdi-earth</v-icon
                            >
                            <v-icon v-else>mdi-{{ link.platform }}</v-icon>
                          </a>
                        </p>
                      </div>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else class="pa-2" value="list">
              <v-row dense>
                <v-col
                  v-for="item in items"
                  :key="item.title"
                  cols="12"
                  lg="11"
                  class="mx-auto"
                >
                  <v-card
                    class="mb-6 rounded-xl"
                    style="border: 1px solid blueviolet"
                  >
                    <v-list-item class="mb-2">
                      <v-banner class="text-h6" lines="one">
                        <v-avatar
                          size="100"
                          :image="'http://localhost:8000' + item.raw.imagePath"
                        >
                        </v-avatar>
                        <div class="ms-5">
                          <p class="text-h5">
                            {{ item.raw.nom }} {{ item.raw.prenom }}
                          </p>
                          <a
                            :href="'mailto:' + item.raw.mail"
                            class="text-body-1 text-decoration-none text-black"
                          >
                            {{ item.raw.mail }}
                          </a>
                        </div>
                        <div class="d-flex mx-auto">
                          <p
                            v-for="(link, index) in item.raw.socialLinks"
                            :key="index"
                            class="mx-6"
                          >
                            <a
                              :href="'https://' + link.url"
                              target="_blank"
                              class="text-black"
                            >
                              <!-- icon github -->
                              <v-btn
                                v-if="link.platform === 'github'"
                                size="33"
                                elevation="0"
                                class="mx-1 mt-1"
                                color="black"
                              >
                                <v-icon size="large">mdi-github</v-icon>
                              </v-btn>
                              <!-- icon facebook -->
                              <v-btn
                                v-if="link.platform === 'facebook'"
                                size="40"
                                variant="text"
                                class="mx-1"
                                color="indigo"
                              >
                                <v-avatar
                                  image="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
                                >
                                </v-avatar>
                              </v-btn>
                              <!-- btn linekdin -->
                              <v-btn
                                v-if="link.platform === 'linkedin'"
                                :href="'https://' + link.url"
                                size="40"
                                variant="text"
                                class="mx-1"
                                color="blue"
                              >
                                <v-avatar
                                  image="https://img.icons8.com/?size=100&id=13930&format=png&color=000000"
                                >
                                </v-avatar>
                              </v-btn>
                              <!-- btn twitter -->
                              <v-btn
                                v-if="link.platform === 'twitter'"
                                size="40"
                                variant="text"
                                class="mx-1"
                                color="black"
                              >
                                <v-avatar
                                  image="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000"
                                >
                                </v-avatar>
                              </v-btn>
                              <!-- btn Instagram -->
                              <v-btn
                                v-if="link.platform === 'instagram'"
                                size="40"
                                variant="text"
                                class="mx-1"
                                color="red-darken-3"
                              >
                                <v-avatar
                                  image="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
                                >
                                </v-avatar>
                              </v-btn>
                              <!-- btn autre -->
                              <v-btn
                                v-if="link.platform === 'autre'"
                                size="40"
                                variant="text"
                                class="mx-1"
                                color="black"
                              >
                                <v-avatar
                                  size="35"
                                  image="https://img.icons8.com/?size=100&id=2963&format=png&color=000000"
                                >
                                </v-avatar>
                              </v-btn>
                            </a>
                          </p>
                        </div>
                      </v-banner>
                      <v-banner
                        v-if="item.raw.titre_emploi"
                        class="text-h6 text-capitalize"
                        lines="one"
                        :text="item.raw.titre_emploi"
                      >
                      </v-banner>
                      <div class="d-flex justify-space-between mt-3 px-9 py-2">
                        <a
                          :href="'tel:' + item.raw.tel"
                          class="text-decoration-none text-black"
                        >
                          <v-icon>mdi-phone</v-icon> +216 {{ item.raw.tel }}
                        </a>
                        <p>
                          <v-icon>mdi-google-maps</v-icon>{{ item.raw.adress }}
                        </p>
                        <p>
                          <v-icon class="me-2">mdi-calendar-range</v-icon
                          >{{
                            item.raw.dateNais && item.raw.dateNais.split("T")[0]
                          }}
                        </p>
                      </div>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="mdi-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              ></v-btn>

              <div class="mx-2 text-caption">
                Page {{ page }} sur {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="mdi-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              ></v-btn>
            </div>
          </template>
        </v-data-iterator>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
