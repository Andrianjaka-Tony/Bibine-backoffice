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
import BrandRow, { Brand } from "../components/brand/row/BrandRow";
import url from "../helper/api";
import { AnimatePresence } from "framer-motion";
import BrandPostForm from "../components/brand/post-form/BrandPostForm";
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
  data: Brand[];
  status: {
    status: string;
    details: string;
  };
}

const Brands: FunctionComponent = () => {
  const limit = 10;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Brand[]>([]);
  const [page, setPage] = useState<string>("list");
  const [arrayPages, setArrayPages] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [sellPerBrand, setSellPerBrand] = useState<any>([]);
  const [bestSellPerBrand, setBestSellPerBrand] = useState<any>([]);
  const [graphLoaded, setGraphLoaded] = useState<boolean>(false);

  const switchPage = (index: number) => {
    setActivePage(index);
  };

  useEffect(() => {
    fetch(`${url}/bibine/actu/brands/pagination?limit=${limit}`)
      .then((response) => response.json())
      .then((response) => {
        const array = [];
        for (let i = 1; i <= response.data; i++) {
          array.push("");
        }
        setArrayPages(array);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${url}/bibine/actu/pagination/brands?offset=${
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
    const fetchSellPerBrand = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/brand/sell`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setSellPerBrand({
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

    const fetchBestSellPerBrand = async () => {
      var response = await fetch(
        `${url}/bibine/statistique/brand/sell`,
        statFetchOptions
      );
      response = await response.json();
      const responseData = response as any;
      const { data } = responseData;
      setBestSellPerBrand({
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
      await fetchSellPerBrand();
      await fetchBestSellPerBrand();
      setGraphLoaded(true);
    };

    fetchDatas();
  }, []);

  return (
    <>
      <Transition />
      <div className="page">
        <h1 className="title">Liste des marques</h1>
        {loaded && (
          <table>
            <thead>
              <tr>
                <td width="100px">Id</td>
                <td width="250px">Nom</td>
                <td width="250px">Etat</td>
              </tr>
            </thead>
            <tbody>
              {data.map((brand) => (
                <BrandRow {...brand} key={brand.id} />
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
            <div className="title">Vente par marque</div>
            {graphLoaded && <Bar data={sellPerBrand} />}
          </div>
          <div className="graph-container sell-per-item">
            <div className="title">Meilleures ventes par marque</div>
            {graphLoaded && <Bar data={bestSellPerBrand} />}
          </div>
        </div>
        <AnimatePresence>
          {page === "add-form" && (
            <BrandPostForm
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

export default Brands;
