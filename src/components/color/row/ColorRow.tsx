import { FunctionComponent } from "react";

export interface Color {
  id: string;
  nom: string;
  state: number;
}

const ColorRow: FunctionComponent<Color> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px">{id}</td>
      <td width="250px">{nom}</td>
    </tr>
  );
};

export default ColorRow;
