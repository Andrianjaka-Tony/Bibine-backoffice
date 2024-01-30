import {
  LinearScale,
  CategoryScale,
  LineElement,
  Chart,
  PointElement,
  BarElement,
  ArcElement,
} from "chart.js";
import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import TypeRow, { Type } from "../components/type/row/TypeRow";
import { AnimatePresence } from "framer-motion";
import TypePostForm from "../components/type/post-form/TypePostForm";
import Transition from "../components/transition/Transition";
import { Bar } from "react-chartjs-2";
import { statFetchOptions } from "../helper/fetch";

Chart.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement
);

interface Response {
  data: Type[];
  status: {
    status: string;
    details: string;
  };
}

const Typez: FunctionComponent = () => {
  const limit = 10;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Type[]>([]);
  const [page, setPage] = useState<string>("list");
  const [arrayPages, setArrayPages] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [sellPerType, setSellPerType] = useState<any>([]);
  const [bestSellPerType, setBestSellPerType] = useState<any>([]);
  const [graphLoaded, setGraphLoaded] = useState<boolean>(false);

  const switchPage = (index: number) => {
    setActivePage(index);
  };

  useEffect(() => {
    fetch(`${url}/bibine/actu/types/pagination?limit=${limit}`)
      .then((response) => response.json())
      .then((response) => {
        const array = [];
        for (let i = 1; i <= response.data; i++) {
          array.push("");
        }
        setArrayPages(array);
      });
  }, [page]);

  useEffect(() => {
    fetch(
      `${url}/bibine/actu/pagination/types?offset=${
        activePage - 1
      }&limit=${limit}`
    )
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, [activePage, page]);

  useEffect(() => {
    const fetchSellPerType = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/type/sell`,
        statFetchOptions()
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setSellPerType({
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

    const fetchBestSellPerType = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/type/sell`,
        statFetchOptions()
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setBestSellPerType({
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
      await fetchSellPerType();
      await fetchBestSellPerType();
      setGraphLoaded(true);
    };

    fetchDatas();
  }, []);

  return (
    <>
      <Transition />
      <div className="page">
        <h1 className="title">Liste des types</h1>
        {loaded && (
          <table>
            <thead>
              <tr>
                <td width="100px">Id</td>
                <td width="250px">Nom</td>
              </tr>
            </thead>
            <tbody>
              {data.map((type) => (
                <TypeRow {...type} key={type.id} />
              ))}
            </tbody>
          </table>
        )}
        <div className="pagination">
          {arrayPages.map((item, index) => (
            <div
              key={index}
              className={
                activePage === index + 1
                  ? "pagination-btn active-page"
                  : "pagination-btn"
              }
              onClick={() => {
                switchPage(index + 1);
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setPage("add-form");
          }}
          style={{ marginTop: "10px" }}
          className="btn btn-add"
        >
          Ajouter
        </button>
        <div className="graph">
          <div className="graph-container sell-per-item">
            <div className="title">Vente par type</div>
            {graphLoaded && <Bar data={sellPerType} />}
          </div>
          <div className="graph-container sell-per-item">
            <div className="title">Meilleures ventes</div>
            {graphLoaded && <Bar data={bestSellPerType} />}
          </div>
        </div>
        <AnimatePresence>
          {page === "add-form" && (
            <TypePostForm
              onClose={() => {
                setPage("list");
              }}
              setPage={setPage}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Typez;
