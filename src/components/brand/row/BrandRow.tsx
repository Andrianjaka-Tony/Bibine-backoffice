import { FunctionComponent } from "react";

export interface Brand {
  id: string;
  nom: string;
  state: number;
}

const BrandRow: FunctionComponent<Brand> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px" className="column">
        {id}
      </td>
      <td width="250px" className="column">
        {nom}
      </td>
    </tr>
  );
};

export default BrandRow;
