// import axios from "axios";
import Chart from "chart.js/auto";
export default {
  state: {
    chartInstance: null,
    chartInstance2: null,
  },
  mutations: {
    setChartInstance(state, instance) {
      state.chartInstance = instance;
    },
    setChartInstance2(state, instance) {
      state.chartInstance2 = instance;
    },
  },
  actions: {
    initializeChart({ commit }, { offer, applique }) {
      const ctx = document.getElementById("myChart");
      const ctx2 = document.getElementById("myChart2");
      // console.log("applique:", applique);
      // console.log("offer:", offer);

      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          datasets: [
            {
              order: 1,
              type: "line",
              label: "Offres",
              backgroundColor:'#74b9ff',
              borderColor:'#74b9ff',
              data: offer,
            },
            // {
            //   type: "bar",
            //   label: "Bar Dataset",
            //   data: [0,0,0,0,0,0,0.5,2,0],
            //   order: 2,
            // },
            {
              type: "bar",
              label: "Candidats",
              backgroundColor:'#fad390',
              data: applique,
              order: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
      const chartInstance2 = new Chart(ctx2, {
        type: "pie",
        data: {
          labels: ["CDD", "CVIP", "Temps plein"],
          datasets: [
            {
              label: " ",
              data: [2, 2, 1],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(201, 203, 207)",
                "rgb(54, 162, 235)",
              ],
            },
          ],
        },
        options: {},
      });

      commit("setChartInstance", chartInstance);
      commit("setChartInstance2", chartInstance2);
    },
  },
};
