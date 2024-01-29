import { useEffect, useState } from "react";
import { statFetchOptions } from "../helper/fetch";
import Transition from "../components/transition/Transition";
import url from "../helper/api";
import AnnounceCard from "../components/announce/AnnounceCard";
import "./Announce.scss";

const Announce = () => {
  const [invalidAnnounces, setInvalidAnnounces] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchInvalidAnnounces = async () => {
      let response = await fetch(
        `${url}/bibine/actu/pagination/annonces_non_valid`,
        statFetchOptions()
      );
      response = await response.json();
      const responseData = response as any;
      setInvalidAnnounces(responseData.data);
    };

    const fetchDatas = async () => {
      await fetchInvalidAnnounces();
      setLoaded(true);
    };

    fetchDatas();
  }, []);

  return (
    <>
      <Transition />
      <div className="page">
        <div className="title">Liste des annonces en attente de validation</div>
        {loaded && (
          <div className="announce-container">
            {invalidAnnounces.map((item: any) => (
              <AnnounceCard announce={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Announce;
