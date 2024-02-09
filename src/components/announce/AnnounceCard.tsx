import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import "./AnnounceCard.scss";
import PriceParser from "../../helper/PriceHelper";
import AnnounceValidationForm from "./validation-form/AnnounceValidationForm";
import { AnimatePresence } from "framer-motion";

interface Props {
  announce: any;
  setUpdate: Dispatch<SetStateAction<number>>;
}

const AnnounceCard: FunctionComponent<Props> = ({ announce, setUpdate }) => {
  const [page, setPage] = useState<string>("hello");

  return (
    <>
      <div className="announce-card">
        <div className="announce-header">
          <div className="user">
            <img
              src={announce.vendeur.profile}
              alt={announce.vendeur.nom}
              className="photo"
            />
            <div className="name">{announce.vendeur.nom}</div>
          </div>
          <div className="price">{PriceParser(announce.prix)}</div>
        </div>
        <img
          src={announce.pictures[0]}
          alt={announce.modele.nom}
          className="announce-picture"
        />
        <div className="announce-body">
          <div className="announce-brand">{announce.brand.nom}</div>
          <div className="announce-model">
            {announce.modele.nom} - {announce.year}
          </div>
          <div className="announce-subtitle">Desciption</div>
          <p className="announce-text">{announce.description}</p>
          <div className="announce-subtitle">Fiche technique</div>
          <div className="announce-desc-container">
            <div className="announce-desc">
              <div className="label">Moteur</div>
              <div className="value">{announce.motor.nom}</div>
            </div>
            <div className="announce-desc">
              <div className="label">Couleur</div>
              <div className="value">{announce.couleur.nom}</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setPage("form");
          }}
          className="btn btn-add btn"
        >
          Valider l'annonce
        </button>
      </div>
      <AnimatePresence>
        {page === "form" && (
          <AnnounceValidationForm
            setPage={setPage}
            setUpdate={setUpdate}
            announceId={announce.id}
            onClose={() => {
              setPage("hello");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AnnounceCard;
