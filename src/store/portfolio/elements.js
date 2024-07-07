export default {
  state: {
    modAprop: false,
    dialogA: false,
    sideBarM: false,
    SideModEntet: false,
    isnavbar: false,
    blocindex: 0,
    blocmodif: 0,
    settingBloc: {},
    linkNav: [
      { model: "NTL", name: "À PROPOS DE MOI", id: 0 },
      { model: "", name: "two", id: 1 },
      { model: "", name: "three", id: 2 },
      { model: "", name: "Gerard", id: 3 },
    ],
    pages: [
      {
        id: "À PROPOS DE MOI",
        bloc: [
          {
            name: "NLT",
            pamater: {
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
        ],
      },
      { id: "two", bloc: "chaouch" },
      { id: "three", bloc: "pfe" },
    ],
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
      lineImage: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
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
  mutations: {
    changeSidebarA(state) {
      state.sideBarA = !state.sideBarA;
      state.sideBarM = false;
    },
    changeSidebarM(state) {
      state.sideBarM = !state.sideBarM;
      state.sideBarA = false;
    },
  },
};
