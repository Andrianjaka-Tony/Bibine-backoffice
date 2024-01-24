import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import EngineRow, { Engine } from "../components/engine/row/EngineRow";
import { AnimatePresence } from "framer-motion";
import EnginePostForm from "../components/engine/post-form/EnginePostForm";

interface Response {
  data: Engine[];
  status: {
    status: string;
    details: string;
  };
}

const Engines: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Engine[]>([]);
  const [page, setPage] = useState<string>("list");

  useEffect(() => {
    fetch(url + "/motors")
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="title">List des moteurs</h1>
      {loaded && (
        <table>
          <thead>
            <tr>
              <td width="100px">Id</td>
              <td width="250px">Nom</td>
            </tr>
          </thead>
          <tbody>
            {data.map((engine) => (
              <EngineRow {...engine} key={engine.id} />
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
          <EnginePostForm
            onClose={() => {
              setPage("list");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Engines;
