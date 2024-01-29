import "./Reset.scss";
import "./Field.scss";

import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import Type from "./pages/Type";
import Engine from "./pages/Engine";
import Maintain from "./pages/Maintain";
import Color from "./pages/Color";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Sidebar />}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/color" element={<Color />} />
          <Route path="/type" element={<Type />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/engine" element={<Engine />} />
          <Route path="/maintain" element={<Maintain />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
