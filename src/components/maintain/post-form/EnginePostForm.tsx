import {
  Dispatch,
  FormEvent,
  FunctionComponent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import url from "../../../helper/api";
import storage from "../../../helper/storage";

interface Props {
  onClose: MouseEventHandler;
  setPage: Dispatch<SetStateAction<string>>;
}

const MaintainPostForm: FunctionComponent<Props> = ({ onClose, setPage }) => {
  const [nom, setNom] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch(`${url}/bibine/maintains`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem(storage.token),
      },
      body: JSON.stringify({ nom }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPage("list");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-form"
    >
      <form onSubmit={handleSubmit} className="form maintain-post-form">
        <h1 className="title">Ajouter un entretien</h1>
        <div style={{ marginTop: "10px" }} className="input">
          <label htmlFor="name-input">Nom</label>
          <input
            type="text"
            id="name-input"
            name="name"
            value={nom}
            onChange={(event) => {
              setNom(event.currentTarget.value);
            }}
            autoComplete="off"
          />
        </div>
        <input
          style={{ marginTop: "10px" }}
          type="submit"
          value="Valider"
          className="btn btn-add"
        />
        <AiOutlineClose onClick={onClose} className="close-icon" />
      </form>
    </motion.div>
  );
};

export default MaintainPostForm;
