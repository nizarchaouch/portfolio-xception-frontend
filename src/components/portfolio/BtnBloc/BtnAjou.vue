<script>
// eslint-disable-next-line
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import DialogAjouter from "@/components/portfolio/DialogAjouter.vue";
export default {
  props: { showButton: Boolean, id: Number, defaultSettings: Object },
  components: { DialogAjouter },
  computed: {
    ...mapState(["portfolio", "portfolioss"]),
  },
  data: () => ({}),
  methods: {
    ...mapActions([]),
  },
};
</script>
<template>
  <v-row style="height: 0" justify="center" v-if="!portfolio.dialogA">
    <v-btn
      v-if="showButton"
      color="white"
      prepend-icon="mdi-plus"
      class="animation text-none bg-blue rounded-pill"
      @click="
        (portfolio.dialogA = !portfolio.dialogA) && (portfolio.blocindex = id)
      "
      style="z-index: 3; bottom: 5px"
    >
      Ajouter un bloc
    </v-btn>
    <!-- <DialogAjouter
      :id="id"
      :isnavbar="true"
      :showButton="showButton"
      :defaultSettings="defaultSettings"
    /> -->
  </v-row>
</template>
<style lang="scss"></style>
