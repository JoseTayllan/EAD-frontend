import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Settings } from '@/pages/Settings';

import { NoMatch } from '@/pages/NoMatch';

export function AppRoutesUser() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
