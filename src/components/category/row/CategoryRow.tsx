import { FunctionComponent } from "react";

export interface Category {
  id: string;
  nom: string;
  state: number;
}

const CategoryRow: FunctionComponent<Category> = ({ id, nom, state }) => {
  return (
    <tr>
      <td width="100px">{id}</td>
      <td width="250px">{nom}</td>
    </tr>
  );
};

export default CategoryRow;
