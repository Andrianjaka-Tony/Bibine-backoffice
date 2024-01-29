import { FunctionComponent } from "react";
import "./AnnounceCard.scss";
import PriceParser from "../../helper/PriceHelper";

interface Props {
  announce: any;
}

const AnnounceCard: FunctionComponent<Props> = ({ announce }) => {
  return (
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
    </div>
  );
};

export default AnnounceCard;
