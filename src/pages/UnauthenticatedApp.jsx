import { Routes, Route } from "react-router-dom";
import "../App.css";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
export default UnauthenticatedApp;
