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
import { Bar, Line } from "react-chartjs-2";
import url from "../helper/api";
import { statFetchOptions } from "../helper/fetch";
import Transition from "../components/transition/Transition";

Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement
);

const Dashboard = () => {
  const [sellPerMonth, setSellPerMonth] = useState<any>([]);
  const [buyRequestPerMonth, setBuyRequestPerMonth] = useState<any>([]);
  const [sellPerModel, setSellPerModel] = useState<any>([]);
  const [bestSellPerModel, setBestSellPerModel] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${url}/bibine/statistique/type/sell`, statFetchOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });

    const fetchSellPerMonth = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/transactions/sent`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setSellPerMonth({
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
    };

    const fetchBuyRequestPerMonth = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/purchases/sent`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setBuyRequestPerMonth({
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
    };

    const fetchSellPerModel = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/model/sell`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
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
    };

    const fetchBestSellPerModel = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/model/sell`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setBestSellPerModel({
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
    };

    const fetchDatas = async () => {
      await fetchSellPerMonth();
      await fetchBuyRequestPerMonth();
      await fetchSellPerModel();
      await fetchBestSellPerModel();
      setLoaded(true);
    };

    fetchDatas();
  }, []);

  return (
    <>
      <Transition />
      <div className="page">
        <div className="graph">
          <div className="graph-container month-sell">
            <div className="title">Vente par mois</div>
            {loaded && <Line data={sellPerMonth} />}
          </div>
          <div className="graph-container buy-request">
            <div className="title">Demandes d'achats par mois</div>
            {loaded && <Line data={buyRequestPerMonth} />}
          </div>
          <div className="graph-container">
            <div className="title">Vente par modele</div>
            {loaded && <Bar data={sellPerModel} />}
          </div>
          <div className="graph-container sell-per-item">
            <div className="title">Meilleures ventes par modele</div>
            {loaded && <Bar data={bestSellPerModel} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
