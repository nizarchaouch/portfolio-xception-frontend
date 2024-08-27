<script>
export default {
  data: () => ({
    search: "",
    games: [
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png",
        title: "Template 1",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png",
        title: "Template 2",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png",
        title: "Template 3",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png",
        title: "Template 4",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png",
        title: "Template 5",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png",
        title: "Template 6",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png",
        title: "Template 7",
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png",
        title: "Template 8",
      },
    ],
  }),
};
</script>
<template>
  <v-card>
    <v-data-iterator :items="games" :items-per-page="6" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Recherche"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="item in items" :key="item.title" cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card class="mb-6" border flat v-bind="props">
                  <div style="overflow: hidden; width: 100%; height: 250px">
                    <iframe
                      :src="`http://localhost:8080/Model.${item.raw.nom}/page%201id=${item.raw._id}`"
                      style="
                        transform: scale(0.4);
                        transform-origin: 0 0;
                        width: 256.8%;
                        height: 620px;
                      "
                    ></iframe>
                  </div>
                  <v-overlay
                    :model-value="isHovering"
                    class="align-center justify-center"
                    scrim
                    contained
                  >
                    <v-btn
                      variant="flat"
                      class="text-none d-flex align-center ma-2 mx-auto rounded-pill"
                      size="large"
                      color="#5865f2"
                    >
                      Modifier
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      class="text-none d-flex align-center ma-2 mx-auto rounded-pill"
                      size="large"
                      color="white"
                      target="_blank"
                      :to="{
                        name: 'voirModel',
                        params: {
                          nom: item.raw.nom,
                          page: 'page',
                          id: item.raw._id,
                        },
                      }"
                    >
                      Voir
                    </v-btn>
                  </v-overlay>
                </v-card>
              </v-hover>

              <v-list-item class="mb-2">
                <div>
                  <v-btn
                    color="red"
                    variant="text"
                    size=""
                    @click="confirmDeletionDialog(item.raw._id)"
                  >
                    <v-icon color="red" size="x-large" class="mb-1"
                      >mdi-delete-circle</v-icon
                    >
                  </v-btn>
                  {{ item.raw.nom }}
                </div>
              </v-list-item>
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
</template>
