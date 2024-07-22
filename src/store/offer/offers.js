import axios from "axios";
export default {
  state: { offerData: [], alert: false, message: "" },
  getters: {
    offerCount(state) {
      return state.offerData.length;
    },
    latestOffers(state) {
      return state.offerData.slice(-5).reverse();
    },
  },
  mutations: {
    setOffers(state, offers) {
      state.offerData = offers;
    },
    setMes(state, message) {
      state.message = message;
    },
  },
  actions: {
    async showOffer(ctx) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/offer/show/all`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        ctx.commit("setOffers", response.data);
      } catch (error) {
        console.error("Erreur lors de l'affichage des offres :", error);
      }
    },
    async showOfferRec(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/offer/show/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        ctx.commit("setOffers", response.data);
      } catch (error) {
        console.error("Erreur lors de l'affichage des offres :", error);
      }
    },
    async addOffer(ctx, data) {
      try {
        const AddOfferResponse = await axios.post(
          "http://localhost:8000/api/offer/add",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (AddOfferResponse.status === 201) {
          console.log("Add offer successful");
          ctx.state.alert = true;
          ctx.commit("setMes", "Ajout d'une offre réussie");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'offre :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", "Erreur lors de l'ajout de l'offre :");
      }
    },
    async updatedOffer(ctx, data) {
      try {
        const updateOfferResponse = await axios.put(
          `http://localhost:8000/api/offer/update/${data.id}`,
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );

        if (updateOfferResponse.status === 200) {
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
    async delOffer(ctx, id) {
      try {
        const DelOfferResponse = await axios.delete(
          `http://localhost:8000/api/offer/delete/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (DelOfferResponse.status === 200) {
          console.log("del offer successful");
          ctx.state.alert = true;
          ctx.commit("setMes", "suppression de l'offre réussie");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'offre :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", "Erreur lors de la suppression de l'offre :");
      }
    },
  },
};
