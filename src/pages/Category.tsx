import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import CategoryRow, { Category } from "../components/category/row/CategoryRow";
import CategoryPostForm from "../components/category/post-form/CategoryPostForm";
import { AnimatePresence } from "framer-motion";
import Transition from "../components/transition/Transition";

interface Response {
  data: Category[];
  status: {
    status: string;
    details: string;
  };
}

const Categories: FunctionComponent = () => {
  const limit = 10;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Category[]>([]);
  const [page, setPage] = useState<string>("list");
  const [arrayPages, setArrayPages] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  const switchPage = (index: number) => {
    setActivePage(index);
  };

  useEffect(() => {
    fetch(`${url}/bibine/actu/categories/pagination?limit=${limit}`)
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
      `${url}/bibine/actu/pagination/categories?offset=${
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

  return (
    <>
      <Transition />
      <div className="page">
        <h1 className="title">Liste des categories</h1>
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
        <AnimatePresence>
          {page === "add-form" && (
            <CategoryPostForm
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

export default Categories;
