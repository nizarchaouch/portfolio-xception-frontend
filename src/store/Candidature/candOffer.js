import axios from "axios";

export default {
  state: {
    candData: [],
    infoData: [],
    countApp: [],
    totalCandOffers: 0,
    totalCandWait: 0,
    alert: false,
    message: "",
    color: "",
    AppPerMonth: new Array(12).fill(0),
  },
  mutations: {
    setCandData(state, candata) {
      state.candData = candata;
    },
    setInfoData(state, infodata) {
      state.infoData = infodata;
    },
    setCountApp(state, { id, count, etat }) {
      state.countApp.push({ id, count });
      state.totalCandOffers += count;
      for (let index = 0; index < etat.length; index++) {
        const month = new Date(etat[index].date).getMonth();
        if (!state.AppPerMonth[month]) {
          state.AppPerMonth[month] = 0;
        }
        state.AppPerMonth[month + 1]++;

        if (etat[index].etat == "En Attend") {
          state.totalCandWait += 1;
        }
        // console.log("count etat attend", etat.length);
      }
      // console.log(state.AppPerMonth);
      // console.log(state.totalCandWait);
      // console.log("Total candOffers count:", state.totalCandOffers);
    },
    RestCountApp(state) {
      state.countApp = [];
      state.totalCandOffers = 0;
      state.totalCandWait = 0;
      state.AppPerMonth = new Array(12).fill(0);
    },
    setMes(state, { message, color }) {
      state.message = message;
      state.color = color;
    },
  },
  actions: {
    async addCandOffer(ctx, data) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/candidature/add",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("store", data);
        if (response.status === 200) {
          console.log("Postuler successful");
          ctx.state.alert = true;
          const message = "Postuler successful";
          const color = "blue-darken-2";
          ctx.commit("setMes", { message, color });
        }
      } catch (error) {
        if (error.response.status === 409) {
          ctx.state.alert = true;
          const message = "Déjà postulé à cette offre";
          const color = "red";
          ctx.commit("setMes", { message, color });
        } else {
          console.log("Erreur lors de la postule:", error.message);
          ctx.state.alert = true;
          ctx.commit("setMes", "Erreur lors de la postule");
        }
      }
    },
    async getAll(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/candidature/showCand/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log("candOffers",response.data.candOffers);
        // console.log("infOffers",response.data.infOffers);
        ctx.commit("setCandData", response.data.candOffers);
        ctx.commit("setInfoData", response.data.infOffers);
      } catch (error) {
        console.error("Erreur lors de l'affichage des candidateurs :", error);
      }
    },
    async getOfferApp(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/candidature/showOfferApp/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        const count = response.data.candOffers.length || 0;
        const etat = response.data.candOffers;
        ctx.commit("setCountApp", { id, count, etat });
        // console.log("tt", etat);
      } catch (error) {
        console.error("Erreur lors de l'affichage des candidateurs :", error);
      }
    },
  },
};
