<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user", "candidat"]),
  },
  data: () => ({
    loading: false,
    disabled: false,
    dialog: false,
    fileName: "",
    fileForUpload: null,
  }),
  methods: {
    ...mapActions(["upload"]),
    uplaodCv() {
      this.loading = true;
      const cvData = {
        id: this.user.userData._id,
        file: this.fileForUpload,
        cvPath: "",
      };
      setTimeout(() => {
        this.upload(cvData);
        this.loading = false;
        this.dialog = false;
      }, 1000);
    },
    checkFileSize(event) {
      const file = event.target.files[0];
      const maxSize = 2097152; // 2 MB en octets
      if (file.size > maxSize) {
        // Réinitialisez l'entrée de fichier pour supprimer le fichier sélectionné
        event.target.value = "";
        // Affichez un message d'erreur à l'utilisateur
        alert("La taille du fichier dépasse la limite maximale de 2MB.");
        // Réinitialisez le nom du fichier affiché
        // this.fileName = "";
      } else {
        // Stockez le nom du fichier sélectionné
        this.fileName = file.name;
        this.fileForUpload = file;
        this.disabled = true;
      }
    },
  },
};
</script>
<template>
  <v-snackbar
    :timeout="7000"
    color="blue-darken-2 mt-16"
    v-model="candidat.alert"
    location="top"
  >
    {{ candidat.message }}
  </v-snackbar>
  <v-list-item-title>
    Télécharger CV
    <v-dialog activator="parent" max-width="460" v-model="dialog">
      <template v-slot:default="{ isActive }">
        <v-form @submit.prevent="uplaodCv">
          <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis">
                <v-icon class="pa-5 rounded-circle bg-blue" size="27"
                  >mdi-text-box-plus</v-icon
                >
                Télécharger votre CV
              </div>

              <v-btn
                icon="mdi-close"
                variant="text"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-title>

            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              <input
                type="file"
                id="file"
                class="d-none"
                accept=".doc, .docx, .pdf, .txt"
                @change="checkFileSize($event)"
              />
              <label for="file" class="pa-9 cursor-pointer">
                <v-sheet :min-height="10" :min-width="20" class="mx-auto label">
                  <div class="text-center my-6">
                    <v-icon size="70">mdi-cloud-upload-outline</v-icon>
                    <p>Cliquez pour Télécharger le fichier</p>
                    <p class="text-caption">
                      (.doc, .docx, .pdf, .txt. Taille max. 2MB)
                    </p>
                  </div>
                </v-sheet>
              </label>
              <v-card
                v-if="fileName"
                :title="fileName"
                prepend-icon="mdi-file-document"
                variant="tonal"
                color="#428ee6"
              ></v-card>
              <v-card
                v-else-if="this.user.userData.cvPath"
                :title="
                  this.user.userData.cvPath
                    ? this.user.userData.cvPath.slice(14)
                    : 'CV non disponible'
                "
                prepend-icon="mdi-file-document"
                append-icon="mdi-eye"
                :href="'http://localhost:8000/' + this.user.userData.cvPath"
                target="_blank"
                variant="tonal"
                color="#428ee6"
              >
                <v-tooltip activator="parent" location="top">Voir CV</v-tooltip>
              </v-card>
            </v-card-text>

            <v-divider class="mt-2"></v-divider>

            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn
                class="text-none"
                rounded="xl"
                text="Annuler"
                @click="isActive.value = false"
              ></v-btn>

              <v-btn
                class="text-none"
                color="primary"
                rounded="xl"
                text="Télécharger"
                variant="flat"
                type="submit"
                :disabled="!disabled"
                :loading="loading"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </template>
    </v-dialog>
  </v-list-item-title>
</template>
<style lang="scss" scoped>
.label {
  border: 2px dashed #999;
  border-radius: 6px;
  &:hover {
    color: #428ee6;
    border: 2px dashed #428ee6;
  }
}
</style>
