import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { publicRoutesData, privateRoutesData } from "./Routes/RoutingData.jsx";
import PublicRoute from "./Routes/PublicRoutes";
import PrivateRoute from "./Routes/PrivateRoutes";
import { Suspense } from "react";
import { rootName } from "./Utilis/Constent";
import Loader from "./Components/Loader/Loader.js";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path={rootName}
              element={<PublicRoute />}
            >
              {publicRoutesData.map((ele, idx) => {
                return (
                  <Route
                    index
                    key={idx}
                    path={`${rootName}${ele.path}`}
                    element={ele.component}
                  />
                );
              })}
            </Route>
            <Route element={<PrivateRoute />}>
              {privateRoutesData.map((ele, idx) => {
                return (
                  <Route
                    index
                    key={idx}
                    path={`${rootName}${ele.path}`}
                    element={ele.component}
                  />
                );
              })}
              <Route path="/" element={<Navigate to={`${rootName}`} />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
