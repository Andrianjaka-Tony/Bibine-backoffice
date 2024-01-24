import { FunctionComponent, useEffect, useState } from "react";
import BrandRow, { Brand } from "../components/brand/row/BrandRow";
import url from "../helper/api";
import { AnimatePresence } from "framer-motion";
import BrandPostForm from "../components/brand/post-form/BrandPostForm";

interface Response {
  data: Brand[];
  status: {
    status: string;
    details: string;
  };
}

const Brands: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Brand[]>([]);
  const [page, setPage] = useState<string>("list");

  useEffect(() => {
    fetch(url + "/brands")
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="title">List des marques</h1>
      {loaded && (
        <table>
          <thead>
            <tr>
              <td width="100px">Id</td>
              <td width="250px">Nom</td>
            </tr>
          </thead>
          <tbody>
            {data.map((brand) => (
              <BrandRow {...brand} key={brand.id} />
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => {
          setPage("add-form");
        }}
        style={{ marginTop: "10px" }}
        className="btn btn-add"
      >
        Ajouter
      </button>
      <AnimatePresence>
        {page === "add-form" && (
          <BrandPostForm
            onClose={() => {
              setPage("list");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brands;
