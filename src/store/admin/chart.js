// import axios from "axios";
// eslint-disable-next-line
/* eslint-disable */
import Chart from "chart.js/auto";
import { secteurName } from "@/components/secteur";
export default {
  state: {
    chartAdmin: null,
    chartAdmin2: null,
  },
  mutations: {
    setChartInstance(state, instance) {
      state.chartAdmin = instance;
    },
    setChartInstance2(state, instance) {
      state.chartAdmin2 = instance;
    },
  },
  actions: {
    initializeChartAdmin({ commit }, { offresParSecteur, typeParOffre }) {
      const admin = document.getElementById("ChartAdmin");
      const admin2 = document.getElementById("ChartAdmin2");
      const chartAdmin = new Chart(admin, {
        type: "bar",
        data: {
          labels: Object.keys(offresParSecteur),
          datasets: [
            {
              type: "bar",
              label: "",
              data: Object.values(offresParSecteur),
              backgroundColor: "rgb(67, 94, 190)",
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
      const chartAdmin2 = new Chart(admin2, {
        type: "pie",
        data: {
          labels: Object.keys(typeParOffre),
          datasets: [
            {
              label: " ",
              data: Object.values(typeParOffre),
              // backgroundColor: ["#435ebe", "#55c6e8"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      commit("setChartInstance", chartAdmin);
      commit("setChartInstance2", chartAdmin2);
    },
  },
};
