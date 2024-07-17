import axios from "axios";
export default {
  state: {
    alert: false,
    message: "",
    candidats: [],
    lasteUser: [],
    candVerif: 0,
  },
  getters: {
    candCount(state) {
      return state.candidats.length;
    },
  },
  mutations: {
    setMes(state, message) {
      state.message = message;
    },
    setLastUser(state, lasteUser) {
      state.lasteUser = lasteUser;
    },
    setCand(state, candidats) {
      state.candidats = candidats;
      // console.log(candidats);
      candidats.forEach((candidat) => {
        if (candidat.verifier) {
          state.candVerif++;
        }
      });
      // console.log(state.candVerif);
    },
    RestCountCand(state) {
      state.candVerif = 0;
    },
  },
  actions: {
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
        // console.log("data", data);

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
        formData.append("file", data.file);

        const uploadResponse = await axios.post(
          "http://localhost:8000/uploadCv",
          formData
        );
        data.cvPath = uploadResponse.data.cvpath;
        const updateUserResponse = await axios.put(
          `http://localhost:8000/api/user/update/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (updateUserResponse.status === 201) {
          console.log("Télécharger un CV réussi");
          ctx.state.alert = true;
          ctx.commit("setMes", "Télécharger un CV réussi");
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement d'un CV :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", "Erreur lors du téléchargement d'un CV");
      }
    },

    async getCandidats(ctx) {
      try {
        const candidats = await axios.get(
          `http://localhost:8000/api/user/candidats`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (candidats.status === 200) {
          // console.log(candidats.data[0]);
          ctx.commit("setCand", candidats.data);
        }
      } catch (error) {
        console.error("Erreur lors du get candidats :", error);
      }
    },
    async getLastUser(ctx) {
      try {
        const users = await axios.get(
          `http://localhost:8000/api/user/laste_user`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (users.status === 200) {
          // console.log(users.data[0]);
          ctx.commit("setLastUser", users.data);
        }
      } catch (error) {
        console.error("Erreur lors du get users :", error);
      }
    },
  },
};
