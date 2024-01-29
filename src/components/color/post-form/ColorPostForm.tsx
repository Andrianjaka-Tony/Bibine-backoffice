import { FunctionComponent, MouseEventHandler, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

interface Props {
  onClose: MouseEventHandler;
}

const ColorPostForm: FunctionComponent<Props> = ({ onClose }) => {
  const [nom, setNom] = useState<string>("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-form"
    >
      <form className="form">
        <h1 className="title">Ajouter une couleur</h1>
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

export default ColorPostForm;
