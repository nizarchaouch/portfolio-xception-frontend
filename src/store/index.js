import { createStore } from "vuex";
import user from "./auth/userAuth";
import login from "./auth/login";
import signup from "./auth/signup";
import forgot from "./auth/forgot.js";
import candidat from "./candidat/profil";
import profilAdmin from "./admin/profil";
import offer from "./offer/offers";
import portfolioss from "./portfolio/portfolio";
import portfolio from "./portfolio/elements";
import fonts from "./portfolio/fonts";
import candOffer from "./Candidature/candOffer";
import chartRec from "./recruteur/chart";
import chartAdmin from "./admin/chart";
import profilRec from "./recruteur/profil";
import notif from "./notification/notif";
// import usersUpdate from "./users/profil";

export default createStore({
  state: { apiUrl: "http://localhost:8000/api/" },
  mutations: {},
  actions: {},
  modules: {
    user,
    login,
    signup,
    forgot,
    candidat,
    offer,
    portfolioss,
    portfolio,
    fonts,
    candOffer,
    chartRec,
    chartAdmin,
    profilRec,
    profilAdmin,
    notif,
    // usersUpdate,
  },
});
