import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import TypeRow, { Type } from "../components/type/row/TypeRow";
import { AnimatePresence } from "framer-motion";
import TypePostForm from "../components/type/post-form/TypePostForm";

interface Response {
  data: Type[];
  status: {
    status: string;
    details: string;
  };
}

const Typez: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Type[]>([]);
  const [page, setPage] = useState<string>("list");

  useEffect(() => {
    fetch(url + "/types")
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="title">List des types</h1>
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
  );
};

export default Typez;
