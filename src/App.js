import DashboardPage from "./pages/dashboard";
import DisasterLocationsPage from "./pages/disasters";
import RatingsPage from "./pages/rating";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ShowDisasterLocationPage from "./pages/show-disaster";
import CreateDisasterLocationPage from "./pages/create-disaster";
import UpdateDisasterLocationPage from "./pages/update-disaster";
import DisasterTypesPage from "./pages/disaster-types";
import CreateDisasterTypePage from "./pages/create-disaster-type";
import UpdateDisasterTypePage from "./pages/update-disaster-type";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";
import GuestPage from "./components/GuestPage";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path='/' element={<GuestPage><LoginPage /></GuestPage>} />
      <Route path='/register' element={<GuestPage><RegisterPage /></GuestPage>} />
      <Route path='/dashboard' element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path='/disasters' element={<RequireAuth><DisasterLocationsPage /></RequireAuth>} />
      <Route path='/rating' element={<RequireAuth><RatingsPage /></RequireAuth>} />
      <Route path='/disasters/create' element={<RequireAuth><CreateDisasterLocationPage /></RequireAuth>} />
      <Route path='/disasters/:id' element={<RequireAuth><ShowDisasterLocationPage /></RequireAuth>} />
      <Route path='/disasters/edit/:id' element={<RequireAuth><UpdateDisasterLocationPage /></RequireAuth>} />
      <Route path="/disaster-types" element={<RequireAdminAuth><DisasterTypesPage /></RequireAdminAuth>} />
      <Route path="/disaster-types/create" element={<RequireAdminAuth><CreateDisasterTypePage /></RequireAdminAuth>} />
      <Route path="/disaster-types/edit/:id" element={<RequireAdminAuth><UpdateDisasterTypePage /></RequireAdminAuth>} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
