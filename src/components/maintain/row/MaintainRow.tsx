import { FunctionComponent } from "react";

export interface Maintain {
  id: string;
  nom: string;
  state: number;
}

const MaintainRow: FunctionComponent<Maintain> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px">{id}</td>
      <td width="350px">{nom}</td>
    </tr>
  );
};

export default MaintainRow;
