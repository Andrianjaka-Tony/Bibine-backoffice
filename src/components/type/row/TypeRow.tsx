import { FunctionComponent } from "react";

export interface Type {
  id: string;
  nom: string;
  state: number;
}

const TypeRow: FunctionComponent<Type> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px">{id}</td>
      <td width="250px">{nom}</td>
    </tr>
  );
};

export default TypeRow;
