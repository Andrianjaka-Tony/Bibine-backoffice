import { FunctionComponent } from "react";

export interface Engine {
  id: string;
  nom: string;
  state: number;
}

const EngineRow: FunctionComponent<Engine> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px">{id}</td>
      <td width="250px">{nom}</td>
    </tr>
  );
};

export default EngineRow;
