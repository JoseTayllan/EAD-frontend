import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { RegisterUser } from '@/pages/RegisterUser';
import { Settings } from '@/pages/Settings';

import { NoMatch } from '@/pages/NoMatch';

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
