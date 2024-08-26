// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/auth/LoginView.vue";
import LoginAddmin from "@/views/admin/auth/LoginView.vue";
import Signup from "@/views/auth/SignupView";
import ForgotPwd from "@/views/auth/ForgotView.vue";
import ForgotPwdAdmin from "@/views/admin/auth/ForgotView.vue";
import ResetPwd from "@/views/auth/RestView.vue";
import ResetPwdAdmin from "@/views/admin/auth/RestView.vue";
import ProfilView from "@/views/candidat/profil/ProfilView.vue";
import TemplateView from "@/views/TemplateView.vue";
import OfferView from "@/views/OfferView.vue";
import PortfolioView from "@/views/candidat/portfolio/PortfolioView.vue";
import CandidatureView from "@/views/candidat/CandidatureView.vue";
import DashView from "@/views/recruteur/DashView.vue";
import DashAdmin from "@/views/admin/DashView.vue";
import PosterEmploi from "@/views/recruteur/PosterEmploiView.vue";
import MonProfil from "@/views/recruteur/ProfilView.vue";
import MesEmplois from "@/views/recruteur/EmploisView.vue";
import RecView from "@/views/admin/RecView.vue";
import CandView from "@/views/admin/CandView.vue";
import EmpView from "@/views/admin/EmpView.vue";
import TrouveCandidat from "@/views/recruteur/TrouveCandidatView.vue";
import ParametreRec from "@/views/recruteur/ParametreView.vue";
import ProfilCand from "@/components/user/admin/candidat/ProfilCand.vue";
import ProfilAdmin from "@/views/admin/ProfilAdmin.vue";
import ModelPortf from "@/views/admin/modeleProtfolio/ModelPortf.vue";
import AddPortf from "@/views/admin/modeleProtfolio/AddPortf.vue";
import VoirCandidateur from "@/components/user/recruteur/candidateur/VoirCandidateur.vue";
import VoirPortfolio from "@/views/candidat/portfolio/VoirPortfolio.vue";
import ParametreView from "@/views/admin/ParametreView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/user/forgot_password",
    name: "forgotpwd",
    component: ForgotPwd,
  },
  {
    path: "/template",
    name: "template",
    component: TemplateView,
  },
  {
    path: "/offer",
    name: "offer",
    component: OfferView,
  },
  // admin
  {
    path: "/admin/dashboard",
    name: "dashboardAdmin",
    component: DashAdmin,
  },
  {
    path: "/admin/Login",
    name: "loginAddmin",
    component: LoginAddmin,
  },
  {
    path: "/admin/forgot_password",
    name: "forgotpwdAdmin",
    component: ForgotPwdAdmin,
  },
  {
    path: "/reset_password/:token",
    name: "resetpwd",
    component: ResetPwd,
  },
  {
    path: "/admin/reset_password/:token",
    name: "resetpwd",
    component: ResetPwdAdmin,
  },
  {
    path: "/admin/profil",
    name: "ProfilAdmin",
    component: ProfilAdmin,
  },
  {
    path: "/admin/modele",
    name: "modelePortfolio",
    component: ModelPortf,
  },
  {
    path: "/admin/candidat/:id",
    name: "ProfilCand",
    component: ProfilCand,
    props: true,
  },
  {
    path: "/admin/recruteur",
    name: "RecView",
    component: RecView,
  },
  {
    path: "/admin/candidat",
    name: "CandView",
    component: CandView,
  },
  {
    path: "/admin/emploi",
    name: "EmpView",
    component: EmpView,
  },
  {
    path: "/admin/parametre",
    name: "ParametreView",
    component: ParametreView,
  },
  // candidat
  {
    path: "/profil",
    name: "profil",
    component: ProfilView,
  },

  {
    path: "/portfolio/:page",
    name: "portfolio",
    component: PortfolioView,
  },
  {
    path: "/portfolio_:nom/:page",
    name: "addModel",
    component: AddPortf,
  },
  {
    path: "/candidature",
    name: "candidature",
    component: CandidatureView,
  },
  {
    path: "/PortfolioXception.:nom-:prenom/:page",
    name: "voir",
    component: VoirPortfolio,
    props: (route) => ({
      nom: route.params.nom,
      prenom: route.params.prenom,
      id: route.query.id,
    }),
  },
  // recruteur
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashView,
  },
  {
    path: "/PosterEmploi",
    name: "posteremploi",
    component: PosterEmploi,
  },
  {
    path: "/MonProfil",
    name: "monprofil",
    component: MonProfil,
  },
  {
    path: "/profil_:name=:id",
    name: "profilRec",
    component: MonProfil,
    props: true,
  },
  {
    path: "/MesEmplois",
    name: "MesEmplois",
    component: MesEmplois,
  },
  {
    path: "/candidateur/:nom-:prenom",
    name: "VoirCandidateur",
    component: VoirCandidateur,
    props: true,
  },
  {
    path: "/TrouveCandidat",
    name: "TrouveCandidat",
    component: TrouveCandidat,
  },
  {
    path: "/ParametreRec",
    name: "ParametreRec",
    component: ParametreRec,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
