import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { getToken } from '../utils/auth';

const HomePage = ({ token }) => {
  const [screens, setScreens] = useState([]);
  const [RemoteApp, setRemoteApp] = useState(null);

  useEffect(() => {
    async function fetchScreens() {
      const res = await axios.get('http://localhost:5000/api/tickets/me/screens', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScreens(res.data);
    }
    fetchScreens();
  }, [token]);

  const loadScreen = async (url) => {
    await __webpack_init_sharing__('default');
    const container = await window.SupportTicketsApp.init(__webpack_share_scopes__.default);
    const factory = await window.SupportTicketsApp.get('./TicketApp');
    const Module = factory();
    setRemoteApp(() => Module.default);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar screens={screens} onSelect={loadScreen} />
      <div style={{ marginLeft: '200px', padding: '1rem' }}>
        <Suspense fallback={<div>Loading app...</div>}>
          {RemoteApp && <RemoteApp />}
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
