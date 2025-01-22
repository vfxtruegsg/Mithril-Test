import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import Authorization from "./page/Authorization/Authorization";
import { lazy, Suspense } from "react";
import { MutatingDots } from "react-loader-spinner";

const Home = lazy(() => import("./page/Home/Home"));

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Suspense
        fallback={
          <div className={css.fallback}>
            <MutatingDots color="#e8ff17" secondaryColor="#60bfff" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
