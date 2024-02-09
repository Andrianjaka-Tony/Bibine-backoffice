import { FunctionComponent } from "react";

export interface Category {
  id: string;
  nom: string;
  state: number;
}

const CategoryRow: FunctionComponent<Category> = ({ id, nom, state }) => {
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

export default CategoryRow;
