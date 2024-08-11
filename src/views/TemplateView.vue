<script>
import NavBar from "@/components/public/NavBar.vue";
import CardTemplate from "@/components/template/CardTemplate.vue";
import { mapActions } from "vuex";
export default {
  name: "template",
  components: {
    NavBar,
    CardTemplate,
  },
  methods: {
    ...mapActions(["userAuth"]),
  },
  mounted() {
    this.userAuth();
  },
};
</script>
<template lang="">
  <NavBar />
  <v-container class="mt-16 px-xl-16" fluid>
    <v-row>
      <v-col cols="12" sm="12" md="10" xl="8" class="ma-lg-9">
        <h1>Sélectionnez le template que vous aimez</h1>
      </v-col>
    </v-row>
    <CardTemplate />
  </v-container>
</template>
