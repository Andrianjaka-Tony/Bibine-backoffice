import { useEffect, useState } from "react";
import {
  LinearScale,
  CategoryScale,
  LineElement,
  Chart,
  PointElement,
  BarElement,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import url from "../helper/api";
import storage from "../helper/storage";

Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement
);

// const chartData = {
//   labels: ["January", "February", "March", "April", "May"],
//   datasets: [
//     {
//       label: "Sales Data",
//       backgroundColor: [
//         "rgba(75, 192, 192, 0.2)",
//         "#f49090a1",
//         "#2e99a099",
//         "#018a00d9",
//         "#e97123a1",
//       ],
//       borderColor: "rgba(75, 192, 192, 1)",
//       borderWidth: 1,
//       data: [60, 59, 60, 55, 56],
//     },
//   ],
// };

const Dashboard = () => {
  const [sellPerModel, setSellPerModel] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${url}/bibine/statistique/model/sell`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem(storage.token),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;
        setSellPerModel({
          labels: data.map((d: any) => d.label),
          datasets: [
            {
              label: "Sales Data",
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "#f49090a1",
                "#2e99a099",
                "#018a00d9",
                "#e97123a1",
              ],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: data.map((d: any) => d.count),
            },
          ],
        });
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <div className="title">Vente par modele</div>
      {loaded && <Bar data={sellPerModel} />}
    </div>
  );
};

export default Dashboard;
