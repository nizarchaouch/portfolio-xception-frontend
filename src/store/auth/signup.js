import axios from "axios";

export default {
  state: { step: 1, alert: false, message: "" },
  getters: {},
  mutations: {
    incrStep(state) {
      state.step++;
    },
    decrStep(state) {
      state.step--;
    },
    setMes(state, message) {
      state.message = message;
    },
  },
  actions: {
    async SignupCandidat(ctx, data) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/signup",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("data", data);
        if (response.status == 201) {
          console.log("inscription réussie");
          ctx.commit("incrStep");
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        if (error.message === "Request failed with status code 400") {
          ctx.state.alert = true;
          ctx.commit("setMes", "candidat existe déjà!");
        } else {
          ctx.state.alert = true;
          ctx.commit("setMes", "Erreur lors de l'inscription");
        }
      }
    },
    // signup recruteur
    async SignupRecruteur(ctx, data) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/signup/recruteur",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("data", data);
        if (response.status == 201) {
          console.log("inscription réussie");
          ctx.commit("incrStep");
          const dataNotif = {
            idUser: "admin",
            contenu:
              "Un nouveau recruteur vient de s'inscrire. Veuillez vérifier et approuver son compte",
          };
          await axios.post(
            "http://localhost:8000/api/notification/add",
            JSON.stringify(dataNotif),
            {
              headers: { "Content-type": "application/json" },
              withCredentials: true,
            }
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        if (error.response.status === 400) {
          ctx.state.alert = true;
          ctx.commit("setMes", "recruteur existe déjà!");
        } else {
          ctx.state.alert = true;
          ctx.commit("setMes", "Erreur lors de l'inscription");
        }
      }
    },
  },
};
