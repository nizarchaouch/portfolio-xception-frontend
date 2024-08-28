import axios from "axios";

export default {
  state: {
    notifs: [],
    countNotif: 0,
    alert: false,
    message: "",
    color: "",
  },
  getters: {},
  mutations: {
    setNotif(state, notif) {
      state.notifs = notif;
    },
    setCountNot(state, notif) {
      state.countNotif = notif;
    },
    setMes(state, { message, color }) {
      state.message = message;
      state.color = color;
    },
  },
  actions: {
    async getNotif(ctx, id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/notification/getNotif/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Filter notifications where etat is true
          const filteredNotifs = response.data.notif.filter(
            (notif) => notif.etat === true
          );
          ctx.commit("setNotif", filteredNotifs);
          ctx.commit("setCountNot", filteredNotifs.length);
        }
      } catch (error) {
        console.error("Erreur lors de l'affichage des notif :", error);
      }
    },
    async markAll(ctx, id) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/notification/markAllAsRead/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data.message);
        ctx.commit("setCountNot", 0);
      } catch (error) {
        console.error("Erreur lors de l'affichage des notif :", error);
      }
    },
  },
};
