import router from "@/router";
import axios from "axios";

export default {
  state: { alert: false, message: "", userData: "", adminData: "" },
  getters: {},
  mutations: {
    setMes(state, message) {
      state.message = message;
    },
    setUserData(state, data) {
      state.userData = data;
    },
  },
  actions: {
    async loginUser(ctx, data) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/login",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(data);
        if (response.status === 200) {
          console.log("Login successful");

          await router.push("/profil");
        }
      } catch (error) {
        console.log("Error during login:", error.message);
        ctx.state.alert = true;
        if (error.response.status === 401) {
          ctx.state.alert = true;
          ctx.commit("setMes", "Vérifier votre mail");
        } else if (error.response.status === 400) {
          ctx.state.alert = true;
          ctx.commit("setMes", "E-mail ou Mot de passe incorrect");
        } else {
          ctx.state.alert = true;
          ctx.commit("setMes", "utilisateur non trouvé");
        }
      }
    },

    async loginAdmin(ctx, data) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/login",
          JSON.stringify(data),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(data);
        if (response.status === 200) {
          console.log("Login successful");

          await router.push("/admin/dashboard");
        }
      } catch (error) {
        console.log("Error during login:", error.message);
        if (error.response.status === 400) {
          ctx.state.alert = true;
          ctx.commit("setMes", "E-mail ou Mot de passe incorrect");
        } else {
          ctx.state.alert = true;
          ctx.commit("setMes", "admin non trouvé");
        }
      }
    },

    async Logout() {
      try {
        await axios.post("http://localhost:8000/api/user/logout", null, {
          withCredentials: true,
        });
        location.reload();
        console.log("Déconnexion réussie");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
