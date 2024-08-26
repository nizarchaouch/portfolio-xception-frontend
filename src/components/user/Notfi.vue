<script>
/* eslint-disable */
import iconNotf from "@/assets/not.png";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user", "notif"]),
    userData() {
      return this.user.userData;
    },
  },
  data: () => ({
    iconNotf: iconNotf,
    menu: false,
    count: 10,
    Badge: false,
  }),
  methods: {
    ...mapActions(["getNotif", "markAll"]),
    showMessage() {
      if (this.menu) {
        console.log("Menu opened, displaying message!");
      }
    },
  },
  watch: {
    menu(val) {
      if (val) {
        this.markAll(this.user.userData._id);
      }
      if (this.notif.countNotif === 0 && val===false) {
        this.Badge = false;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.notif.countNotif > 0) {
        this.Badge = true;
      }
    }, 100);
  },
};
</script>
<template>
  <div class="me-5">
    <v-menu v-model="menu" max-width="400px" rounded location="end">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-badge
            color="error"
            :content="this.notif.countNotif"
            max="9"
            v-model="Badge"
          >
            <v-icon icon="mdi-bell" size="small"></v-icon>
          </v-badge>
          <v-tooltip
            activator="parent"
            location="bottom"
            text="Notfication"
          ></v-tooltip>
        </v-btn>
      </template>

      <v-card v-if="Badge">
        <v-banner v-for="not in notif.notifs" :key="n" :stacked="false">
          <template v-slot:text>
            <h3>{{ not.contenu }}</h3>
            <p class="text-body-2">{{ not.date.split("T")[0] }}</p>
          </template>
          <template v-slot:actions>
            <v-btn color="primary" class="text-none">Voir</v-btn>
          </template>
        </v-banner>
      </v-card>
      <v-card v-else>
        <v-img
          :width="160"
          aspect-ratio="16/9"
          class="mx-auto ma-16"
          cover
          :src="iconNotf"
        ></v-img>
        <div class="d-flex justify-center">
          <p class="text-h5">Recevoir vos notifications</p>
        </div>
        <div class="d-flex justify-center">
          <p class="text-center mx-16 my-4">
            Retrouvez toutes les notifications de réponses des recruteurs ici
          </p>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<style lang=""></style>
