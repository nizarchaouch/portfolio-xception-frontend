export default {
  state: {
    selectedPage: null,
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
            //   content: "Welcome to the homepage!",
            //   setting: {
            //     titre: {
            //       affiche: true,
            //       color: "black",
            //       selectStyle: "Titer 4",
            //       size: 100,
            //       selectPolice: "Frank Ruhl Libre",
            //       nom: "Noter Projet",
            //     },
            //     parg: {
            //       affiche: true,
            //       color: "#6F6F6F",
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
        {
          id: 1,
          name: "Page 2",
          bloc: [],
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
      console.log("addBloc", state.portfolios.pages[pageIndex].bloc);
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
  },
};
