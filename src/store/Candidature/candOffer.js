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
        console.log("store", response.data.message);
        ctx.state.alert = true;
        const message = response.data.message;
        const color = "blue-darken-2";
        ctx.commit("setMes", { message, color });

        const dataNotif = { idUser: data.idUser, contenu: data.contenu };
        await axios.post(
          "http://localhost:8000/api/notification/add",
          JSON.stringify(dataNotif),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log("error", error.response.data.error);
        ctx.state.alert = true;
        const message = error.response.data.error;
        const color = "red";
        ctx.commit("setMes", { message, color });
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
      } catch (error) {
        console.error("Erreur lors de l'affichage des candidateurs :", error);
      }
    },
    async getDataCand(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/candidature/showOfferApp/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data.infoCands);

        // Assuming `candOffers` and `infoCands` are arrays and you want to combine them by matching ids
        const combinedData = response.data.candOffers.map((offer) => {
          const candidateInfo = response.data.infoCands.find(
            (info) => info._id === offer.idCandidat // Adjust this line to match the correct field names
          );
          return {
            ...offer,
            ...(candidateInfo || {}),
          };
        });

        ctx.commit("setCandData", combinedData);
        console.log("Combined Data:", combinedData);
      } catch (error) {
        console.error("Erreur lors de l'affichage des candidatures :", error);
      }
    },
    async deleteCandOffer(ctx, id) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/candidature/deleteCandOffer/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("supprime");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async ChangeEtatCandOffer(ctx, data) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/candidature/changeEtat`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          ctx.state.alert = true;
          const message = response.data.message;
          const color = "blue-darken-2";
          ctx.commit("setMes", { message, color });
          const dataNotif = { idUser: data.idCandidat, contenu: data.contenu };
          await axios.post(
            "http://localhost:8000/api/notification/add",
            JSON.stringify(dataNotif),
            {
              headers: { "Content-type": "application/json" },
              withCredentials: true,
            }
          );
        } else {
          ctx.state.alert = true;
          const message = response.data.message;
          const color = "red";
          ctx.commit("setMes", { message, color });
        }
      } catch (error) {
        console.log(error.message);
        ctx.state.alert = true;
        const message = error.response.data.error;
        const color = "red";
        ctx.commit("setMes", { message, color });
      }
    },
  },
};
