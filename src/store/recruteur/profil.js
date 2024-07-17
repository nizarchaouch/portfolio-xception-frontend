import axios from "axios";
export default {
  state: {
    alert: false,
    message: "",
    InfoRec: [],
    recruteurs: [],
    recuVerif: 0,
  },
  getters: {
    recuCount(state) {
      return state.recruteurs.length;
    },
  },
  mutations: {
    setMes(state, message) {
      state.message = message;
    },
    setInfo(state, info) {
      state.InfoRec = info;
      // console.log("inforec", info);
    },
    setRecu(state, recruteurs) {
      state.recruteurs = recruteurs;
      recruteurs.forEach((recruteur) => {
        if (recruteur.verifier) {
          state.recuVerif++;
        }
      });
    },
    RestCountRecu(state) {
      state.recuVerif = 0;
    },
  },
  actions: {
    async getRecruteurs(ctx) {
      try {
        const recruteurs = await axios.get(
          `http://localhost:8000/api/user/recruteurs`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (recruteurs.status === 200) {
          // console.log(recruteurs.data[0]);
          ctx.commit("setRecu", recruteurs.data);
        }
      } catch (error) {
        console.error("Erreur lors du get candidats :", error);
      }
    },
    async infoRec(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/recInfo/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        ctx.commit("setInfo", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de l'affichage des inforamtion de recruteur :",
          error
        );
      }
    },
    async updated(ctx, data) {
      try {
        let formData = new FormData();
        formData.append("image", data.fileForUpload);

        const uploadResponse = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        if (uploadResponse.data.imagepath != "") {
          data.imagePath = uploadResponse.data.imagepath;
        }
        console.log("data", data);

        const updateUserResponse = await axios.put(
          `http://localhost:8000/api/user/update/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );

        if (updateUserResponse.status === 201) {
          console.log("Mise à jour réussie");
          ctx.state.alert = true;
          ctx.commit("setMes", "Mise à jour réussie");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", "Erreur lors de la mise à jour");
      }
    },
    async upload(ctx, data) {
      try {
        let formData = new FormData();
        formData.append("logo", data.logoForUpload);

        const uploadResponse = await axios.post(
          "http://localhost:8000/upload/logo",
          formData
        );
        data.logoPath = uploadResponse.data.logopath;
        const updateUserResponse = await axios.put(
          `http://localhost:8000/api/user/update/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (updateUserResponse.status === 201) {
          ctx.state.alert = true;
          ctx.commit("setMes", "Changement de logo réussi");
        }
      } catch (error) {
        console.error("Erreur lors du changement de logo :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", "Erreur lors du changement de logo");
      }
    },
  },
};
