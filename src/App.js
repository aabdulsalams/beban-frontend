import DashboardPage from "./pages/dashboard";
import DisasterLocationsPage from "./pages/disasters";
import RatingsPage from "./pages/rating";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ShowDisasterLocationPage from "./pages/show-disaster";
import CreateDisasterLocationPage from "./pages/create-disaster";
import UpdateDisasterLocationPage from "./pages/update-disaster";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "./components/RequireAuth";
import GuestPage from "./components/GuestPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<GuestPage><LoginPage /></GuestPage>} />
        <Route path='/register' element={<GuestPage><RegisterPage /></GuestPage>} />
        <Route path='/dashboard' element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path='/disasters' element={<RequireAuth><DisasterLocationsPage /></RequireAuth>} />
        <Route path='/rating' element={<RequireAuth><RatingsPage /></RequireAuth>} />
        <Route path='/disasters/create' element={<RequireAuth><CreateDisasterLocationPage /></RequireAuth>} />
        <Route path='/disasters/:id' element={<RequireAuth><ShowDisasterLocationPage /></RequireAuth>} />
        <Route path='/disasters/edit/:id' element={<RequireAuth><UpdateDisasterLocationPage /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
