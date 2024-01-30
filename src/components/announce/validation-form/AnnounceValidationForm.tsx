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
  setUpdate: Dispatch<SetStateAction<number>>;
  announceId: string;
}

const AnnounceValidationForm: FunctionComponent<Props> = ({
  onClose,
  setPage,
  announceId,
  setUpdate,
}) => {
  const [commission, setCommission] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch(
      `${url}/bibine/annonces/${announceId}/validate?commission=${commission}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem(storage.token),
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setUpdate((previous) => previous + 1);
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
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Valider</h1>
        <div style={{ marginTop: "10px" }} className="input">
          <label htmlFor="commission-input">Commission</label>
          <input
            type="text"
            id="commission-input"
            name="commission"
            value={commission}
            onChange={(event) => {
              setCommission(event.currentTarget.value);
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

export default AnnounceValidationForm;
