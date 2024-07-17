<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    userData() {
      return this.user.userData;
    },
  },
  data: () => ({
    itemsRec: [
      { text: "Aperçu", icon: "mdi-view-dashboard", to: "dashboard" },
      { text: "Mon Profil", icon: "mdi-account-circle", to: "/MonProfil" },
    ],
  }),
};
</script>
<template>
  <v-layout>
    <v-navigation-drawer elevation="2" width="300" style="margin-top: 65px">
      <v-list-item class="py-3">
        <v-row>
          <v-col cols="auto">
            <v-avatar
              :image="'http://localhost:8000' + userData.imagePath"
              size="50"
              rounded
            >
            </v-avatar>
          </v-col>
          <v-col cols="auto">
            <v-row no-gutters> <h3>Chaouch Nizar</h3></v-row>
            <v-row no-gutters><p>Admin</p></v-row>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
      <v-list lines="one" class="mx-5">
        <v-list-item
          v-for="(item, i) in itemsRec"
          :key="i"
          :value="item"
          class="my-2 rounded-lg"
          color="#435ebe"
          variant="elevated"
          elevation="0"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="27"></v-icon>
          </template>

          <v-list-item-title
            v-text="item.text"
            class="mt-1"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<style lang="scss" scoped></style>
