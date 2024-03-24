import { Routes, Route } from "react-router-dom";
import "../App.css";
import BookingPage from "./BookingPage";
import NotFoundPage from "./NotFoundPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BookingPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}
export default AuthenticatedApp;
