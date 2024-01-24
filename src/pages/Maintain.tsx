import { FunctionComponent, useEffect, useState } from "react";
import url from "../helper/api";
import MaintainRow, { Maintain } from "../components/maintain/row/MaintainRow";
import { AnimatePresence } from "framer-motion";
import MaintainPostForm from "../components/maintain/post-form/EnginePostForm";

interface Response {
  data: Maintain[];
  status: {
    status: string;
    details: string;
  };
}

const Maintains: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Maintain[]>([]);
  const [page, setPage] = useState<string>("list");

  useEffect(() => {
    fetch(url + "/maintains")
      .then((response) => response.json())
      .then((response) => {
        response = response as Response;
        setData(response.data);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="page">
      <h1 className="title">List des entretiens</h1>
      {loaded && (
        <table>
          <thead>
            <tr>
              <td width="100px">Id</td>
              <td width="350px">Nom</td>
            </tr>
          </thead>
          <tbody>
            {data.map((maintain) => (
              <MaintainRow {...maintain} key={maintain.id} />
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
          <MaintainPostForm
            onClose={() => {
              setPage("list");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Maintains;
