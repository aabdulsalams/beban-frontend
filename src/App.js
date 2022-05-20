import DashboardPage from "./pages/dashboard";
import LocationsPage from "./pages/locations";
import RatingsPage from "./pages/rating";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ShowLocationPage from "./pages/show-location";
import CreateLocationPage from "./pages/create-location";
import UpdateLocationPage from "./pages/update-location";
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
        <Route path='/locations' element={<RequireAuth><LocationsPage /></RequireAuth>} />
        <Route path='/rating' element={<RequireAuth><RatingsPage /></RequireAuth>} />
        <Route path='/locations/create' element={<RequireAuth><CreateLocationPage /></RequireAuth>} />
        <Route path='/locations/:id' element={<RequireAuth><ShowLocationPage /></RequireAuth>} />
        <Route path='/locations/edit/:id' element={<RequireAuth><UpdateLocationPage /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
