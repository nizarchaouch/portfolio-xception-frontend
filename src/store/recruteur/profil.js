import axios from "axios";
export default {
  state: {
    alert: false,
    message: "",
    color: "",
    InfoRec: [],
    recruteurs: [],
    recuVerif: 0,
  },
  getters: {
    recuCount(state) {
      return state.recruteurs.length;
    },
    getrecu(state) {
      // console.log(state.recruteurs[0]);
      return state.recruteurs;
    },
  },
  mutations: {
    setMes(state, payload) {
      state.message = payload.message;
      state.color = payload.color;
    },
    setInfo(state, info) {
      state.InfoRec = info;
      // console.log("inforec", info);
    },
    setRecu(state, recruteurs) {
      state.recruteurs = recruteurs;
      state.recuVerif = 0;
      recruteurs.forEach((recruteur) => {
        if (recruteur.verifier) {
          state.recuVerif++;
        }
      });
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
        let formDataLogo = new FormData();
        formDataLogo.append("logo", data.logoForUpload);

        const uploadLogoResponse = await axios.post(
          "http://localhost:8000/upload/logo",
          formDataLogo
        );
        // if (uploadLogoResponse.data.logopath != "") {
          data.logoPath = uploadLogoResponse.data.logopath;
        // }

        console.log("data", data);

        const updateUserResponse = await axios.put(
          `http://localhost:8000/api/user/update/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );

        if (updateUserResponse.status === 200) {
          console.log("Mise à jour réussie");
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: "Mise à jour réussie",
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: "Erreur lors de la mise à jour",
          color: "red",
        });
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
    async addRecu(ctx, data) {
      try {
        let formData = new FormData();
        formData.append("image", data.fileForUpload);

        const uploadResponse = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        data.imagePath = uploadResponse.data.imagepath;

        let formDataLogo = new FormData();
        formDataLogo.append("logo", data.logoForUpload);

        const uploadLogoResponse = await axios.post(
          "http://localhost:8000/upload/logo",
          formDataLogo
        );
        data.logoPath = uploadLogoResponse.data.logopath;
        // console.log("data", data);
        const response = await axios.post(
          "http://localhost:8000/api/user/add_recruteur",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(updateUserResponse);
        // console.log("data", data);
        if (response.status === 201) {
          console.log("Add recu successful");
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: "Ajouté avec succès",
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'inscription :",
          error.response.data.error
        );
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: error.response.data.error,
          color: "red",
        });
      }
    },
    async deltRecu(ctx, id) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/user/delete_recruteur/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) {
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: response.data.message,
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: error.response.data.error,
          color: "red",
        });
      }
    },
    async updateVerif(ctx, data) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/user/update_verifier/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200) {
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: response.data.message,
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: error.response.data.error,
          color: "red",
        });
      }
    },
  },
};
