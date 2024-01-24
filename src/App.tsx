import "./Reset.scss";
import "./Field.scss";

import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import Type from "./pages/Type";
import Engine from "./pages/Engine";
import Maintain from "./pages/Maintain";

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/category" element={<Category />} />
        <Route path="/type" element={<Type />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/engine" element={<Engine />} />
        <Route path="/maintain" element={<Maintain />} />
      </Routes>
    </>
  );
}

export default App;
