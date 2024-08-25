import axios from "axios";
export default {
  state: {
    alert: false,
    message: "",
    color: "",
    admins: [],
    candidats: [],
    lasteUser: [],
    candVerif: 0,
  },
  getters: {
    // candCount(state) {
    //   return state.candidats.length;
    // },
    // getcand(state) {
    //   return state.candidats;
    // },
  },
  mutations: {
    setMes(state, payload) {
      state.message = payload.message;
      state.color = payload.color;
    },
    setLastUser(state, lasteUser) {
      state.lasteUser = lasteUser;
    },
    setAdmin(state, admin) {
      state.admins = admin;
    },
    setCand(state, candidats) {
      state.candidats = candidats;
      // console.log(candidats);
      state.candVerif = 0;
      candidats.forEach((candidat) => {
        if (candidat.verifier) {
          state.candVerif++;
        }
      });
      // console.log(state.candVerif);
    },
  },
  actions: {
    async updatedAdmin(ctx, data) {
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
    async getAdmins(ctx) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/getAll",
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        ctx.commit("setAdmin", response.data);
      } catch (error) {
        console.error("Erreur lors get All :", error.response.data.error);
      }
    },
    async addAdmin(ctx, data) {
      try {
        let formData = new FormData();
        formData.append("image", data.fileForUpload);

        const uploadResponse = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        data.imagePath = uploadResponse.data.imagepath;
        console.log("data", data);
        const response = await axios.post(
          "http://localhost:8000/api/admin/add",
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
  },
};
