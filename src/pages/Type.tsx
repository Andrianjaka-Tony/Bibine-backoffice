import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import TypeRow, { Type } from "../components/type/row/TypeRow";
import { AnimatePresence } from "framer-motion";
import TypePostForm from "../components/type/post-form/TypePostForm";
import Transition from "../components/transition/Transition";

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
  }, []);

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
  }, [activePage]);

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
        <AnimatePresence>
          {page === "add-form" && (
            <TypePostForm
              onClose={() => {
                setPage("list");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Typez;
