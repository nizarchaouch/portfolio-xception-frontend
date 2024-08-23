import axios from "axios";
export default {
  state: {
    alert: false,
    message: "",
    color: "",
    modelPort: [],
    selectedPage: null,
    portfolios: {
      idCandidat: null,
      nom: "model",
      navbar: {
        id: 0,
        type: "LTN",
        settings: {
          navbar: {
            backgroundImage: false,
            afficheTitre: true,
            fixedNav: false,
            formaTitreNav: [],
            colorTitre: "white",
            colorBackTitre: "#0B242400",
            titre: "Nizar Chaouch",
            selectStyle: "Titer 4", // en px
            sizeTitle: 25,
            selectPolice: "Potta One",
            colorNav: "#0B2424",
            lineImage:
              "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
          },
          logo: {
            logo: true,
            image: false,
            logoArr: false,
            colorChoix: "blue",
            sizeLogo: 20,
            lineImage:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPFARC1fuCzw9lIUrY4ZS69QUrSzDi11gKPczV38dtl3ezCQeqjhB6FKd1IXBGULNYzFM&usqp=CAU",
          },
          links: {
            hideSlider: false,
            colorLink: "blue",
            selectPolice: "Poppins",
          },
        },
      },
      pages: [
        {
          id: 0,
          name: "page 1",
          bloc: [
            // {
            //   id: 0,
            //   type: "CardText",
            //   content: "Welcome to the homepage!",
            //   settings: {},
            // },
            // {
            //   id: 0,
            //   type: "ITTB",
            //   settings: {
            //     titre: {
            //       affiche: true,
            //       color: "white",
            //       selectStyle: "Titer 4",
            //       size: 100,
            //       selectPolice: "Frank Ruhl Libre",
            //       nom: "Noter ",
            //     },
            //     parg: {
            //       affiche: true,
            //       color: "white",
            //       selectStyle: "Titer 4",
            //       size: 20,
            //       selectPolice: "Average Sans",
            //       nom: `Non occaecat culpa aliquip duis sunt amet qui pariatur quis ut.
            //             Officia sit adipisicing proident aute veniam veniam. Irure officia
            //             esse eu quis mollit consectetur aliqua anim nisi et labore do.
            //             Incididunt ea consequat duis officia commodo fugiat non.
            //             Occaecat ea velit esse tempor veniam laborum.`,
            //     },
            //   },
            // },
          ],
        },
      ],
    },
  },
  mutations: {
    setMes(state, payload) {
      state.message = payload.message;
      state.color = payload.color;
    },
    setModels(state, model) {
      state.modelPort = model;
    },
    setPortf(state, portfolio) {
      // Assuming the portfolio object is structured the same as state.portfolios
      state.portfolios = { ...portfolio };
    },
    addPage(state) {
      state.portfolios.pages.push({
        id: state.portfolios.pages.length,
        name: "Page " + (state.portfolios.pages.length + 1),
        bloc: [],
      });
    },
    movePage(state) {
      let index = 0;
      for (let i = 0; i < state.portfolios.pages.length; i++) {
        state.portfolios.pages[i].id = index++;
      }
    },
  },
  getters: {},
  actions: {
    addBlocNav({ state }, { pageIndex, blocIndex, type }) {
      const newBlock = {
        id: 0,
        type: type,
        settings: {},
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex, 0, newBlock);

      for (
        let i = blocIndex + 1;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
      console.log("addBloc", state.portfolios);
    },

    addBloc({ state }, { pageIndex, blocIndex, type }) {
      const newBlock = {
        id: state.portfolios.pages[pageIndex].bloc[blocIndex].id + 1,
        type: type,
        settings: {},
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex + 1, 0, newBlock);

      for (
        let i = blocIndex + 2;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
      console.log("addBloc", state.portfolios.pages[pageIndex]);
    },
    modBloc({ state }, { pageIndex, blocIndex, settings }) {
      // Check if the pageIndex and blocIndex are valid
      if (
        state.portfolios.pages[pageIndex] &&
        state.portfolios.pages[pageIndex].bloc[blocIndex]
      ) {
        // Update the settings of the existing block
        state.portfolios.pages[pageIndex].bloc[blocIndex].settings = settings;
      } else {
        console.error("Invalid pageIndex or blocIndex");
      }
    },

    delBloc({ state }, { pageIndex, blocIndex }) {
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex, 1);

      for (
        let i = blocIndex;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id--;
      }
    },

    duplBloc({ state }, { pageIndex, blocIndex, type, settings }) {
      const newBlock = {
        id: state.portfolios.pages[pageIndex].bloc[blocIndex].id + 1,
        type: type,
        settings: settings,
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex + 1, 0, newBlock);

      for (
        let i = blocIndex + 2;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
    },
    async addModel(ctx) {
      try {
        const AddModelResponse = await axios.post(
          "http://localhost:8000/api/modelPortfolio/add",
          JSON.stringify(ctx.state.portfolios),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (AddModelResponse.status === 201) {
          console.log("Add model");
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: "add model réussie",
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de model :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: "problem",
          color: "red",
        });
      }
    },
    async addPortfolio(ctx) {
      try {
        const AddModelResponse = await axios.post(
          "http://localhost:8000/api/portfolio/add",
          JSON.stringify(ctx.state.portfolios),
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        if (AddModelResponse.status === 201) {
          console.log("ok");
          ctx.state.alert = true;
          ctx.commit("setMes", {
            message: "add portfolio réussie",
            color: "blue-darken-2",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de portfolio :", error);
        ctx.state.alert = true;
        ctx.commit("setMes", {
          message: "problem",
          color: "red",
        });
      }
    },
    async getPortfolio(ctx,id) {
      try {
        const portfolioResponse = await axios.get(
          `http://localhost:8000/api/portfolio/get/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        ctx.commit("setPortf", portfolioResponse.data[0]);
        console.log("Portfolio data:", portfolioResponse.data[0]);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    },
    async checkPortfolio(ctx,id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/portfolio/checkPortfolio/${id}`,
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        return response.data
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        return false;
      }
    },
    async getAllModel(ctx) {
      try {
        const ModelResponse = await axios.get(
          "http://localhost:8000/api/modelPortfolio/getAll",
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(ModelResponse.data);
        ctx.commit("setModels", ModelResponse.data);
      } catch (error) {
        console.error("Erreur lors de l'affiche de model :", error);
      }
    },
    // async upload(ctx, data) {
    //   try {
    //     let formData = new FormData();
    //     formData.append("file", data.file);

    //     const uploadResponse = await axios.post(
    //       "http://localhost:8000/uploadCv",
    //       formData
    //     );
    //     data.cvPath = uploadResponse.data.cvpath;
    //   } catch (error) {
    //     console.error("Erreur lors du téléchargement d'un file :", error);
    //     ctx.state.alert = true;
    //     ctx.commit("setMes", "Erreur lors du téléchargement d'un file");
    //   }
    // },
  },
};
