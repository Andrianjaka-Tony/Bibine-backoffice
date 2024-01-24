import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import CategoryRow, { Category } from "../components/category/row/CategoryRow";
import CategoryPostForm from "../components/category/post-form/CategoryPostForm";
import { AnimatePresence } from "framer-motion";

interface Response {
  data: Category[];
  status: {
    status: string;
    details: string;
  };
}

const Categories: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Category[]>([]);
  const [page, setPage] = useState<string>("list");

  useEffect(() => {
    fetch(url + "/categories")
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="title">List des categories</h1>
      {loaded && (
        <table>
          <thead>
            <tr>
              <td width="100px">Id</td>
              <td width="250px">Nom</td>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <CategoryRow {...category} key={category.id} />
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
          <CategoryPostForm
            onClose={() => {
              setPage("list");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
