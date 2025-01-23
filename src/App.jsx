import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import Authorization from "./page/Authorization/Authorization";
import { lazy, Suspense } from "react";
import { MutatingDots } from "react-loader-spinner";
import NotFound from "./page/NotFound/NotFound";

const Home = lazy(() => import("./page/Home/Home"));

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Suspense
        fallback={
          <div className={css.fallback}>
            <MutatingDots
              color="#e8ff17"
              secondaryColor="#60bfff"
              height="250"
              width="250"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
