export default {
  state: {
    selectedPage: null,
    selectBloc: false,
    portfolios: {
      idCandidat: "65f67e1e555d2e3355947742",
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
            selectStyle: "Titer 4", //en px
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
            {
              id: 0,
              type: "CardText",
              content: "Welcome to the homepage!",
              settings: {},
            },
            {
              id: 1,
              type: "TTBI",
              content: "Welcome to the homepage!",
              settings: {
                fontSize: "16px",
                color: "blue",
              },
            },
          ],
        },
        {
          id: 1,
          name: "Page 2",
          bloc: [
            {
              id: 0,
              type: "CardText",
              content: "About us content here...",
              settings: {
                fontSize: "14px",
                color: "black",
              },
            },
            // {
            //   id: 2,
            //   type: "video",
            //   content: "http://example.com/video.mp4",
            //   settings: {
            //     autoplay: true,
            //     controls: true,
            //   },
            // },
          ],
        },
      ],
    },
  },
  mutations: {
    addPage(state) {
      state.portfolios.pages.push({
        id: state.portfolios.pages.length,
        name: "Page " + (state.portfolios.pages.length + 1),
        bloc: [],
      });
      console.log(state.portfolios.pages);
    },
    movePage(state) {
      let index = 0;
      for (let i = 0; i < state.portfolios.pages.length; i++) {
        state.portfolios.pages[i].id = index++;
      }
      console.log("moved", state.portfolios.pages);
    },
  },
  getters: {},
  actions: {
    ////add bloc apres navbar
    addBlocNav({ state }, { pageIndex, blocIndex, type }) {
      // Insérer un nouveau bloc après l'index actuel du bloc
      const newBlock = {
        id: 0,
        type: type,
        content: "newContent",
        settings: {},
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex, 0, newBlock);

      // Mettre à jour les identifiants des blocs suivants
      for (
        let i = blocIndex + 1;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
      console.log("addBloc", state.portfolios.pages);
    },

    addBloc({ state }, { pageIndex, blocIndex, type }) {
      // Insérer un nouveau bloc après l'index actuel du bloc
      const newBlock = {
        id: state.portfolios.pages[pageIndex].bloc[blocIndex].id + 1,
        type: type,
        content: "newContent",
        settings: {},
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex + 1, 0, newBlock);

      // Mettre à jour les identifiants des blocs suivants
      for (
        let i = blocIndex + 2;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
      // console.log("addBloc", state.portfolios.pages);
    },

    delBloc({ state }, { pageIndex, blocIndex }) {
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex, 1);

      // Mettre à jour les identifiants des blocs suivants
      for (
        let i = blocIndex;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id--;
      }
      console.log("delBloc", state.portfolios.pages);
    },

    duplBloc({ state }, { pageIndex, blocIndex, type, settings }) {
      const newBlock = {
        id: state.portfolios.pages[pageIndex].bloc[blocIndex].id + 1,
        type: type,
        settings: settings,
      };
      state.portfolios.pages[pageIndex].bloc.splice(blocIndex + 1, 0, newBlock);

      // Mettre à jour les identifiants des blocs suivants
      for (
        let i = blocIndex + 2;
        i < state.portfolios.pages[pageIndex].bloc.length;
        i++
      ) {
        state.portfolios.pages[pageIndex].bloc[i].id++;
      }
      console.log("duplBloc", state.portfolios.pages);
    },

    saveSettings(state, { pageIndex, blocIndex, settings }) {
      state.portfolios.pages[pageIndex].bloc[blocIndex].settings = settings;
      console.log("Saved settings:", state.portfolios.pages);
    },
  },
};
