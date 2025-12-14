import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Weather from '../pages/Weather/Weather.jsx';
import FindCity from '../pages/FindCity/FindCity.jsx';
import ContactUs from '../components/ContactUs/ContactUs.jsx';
import Help from '../pages/Help/Help.jsx';
import Login from '../pages/Login/Login.jsx';
import UserInfo from '../pages/Login/UserInfo.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/findcity" element={<FindCity />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
