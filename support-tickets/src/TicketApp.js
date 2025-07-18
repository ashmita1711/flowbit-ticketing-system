import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketApp = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchTickets() {
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    }
    fetchTickets();
  }, []);

  const handleCreate = async () => {
    const res = await axios.post(
      'http://localhost:5000/api/tickets',
      { title, description: desc },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTickets([...tickets, res.data]);
    setTitle('');
    setDesc('');
  };

  return (
    <div>
      <h2>Support Tickets</h2>
      <input
        placeholder="Title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="Description" value={desc}
        onChange={(e) => setDesc(e.target.value)} />
      <button onClick={handleCreate}>Create Ticket</button>
      <hr />
      {tickets.map((t) => (
        <div key={t._id}>
          <strong>{t.title}</strong> – {t.description} [{t.status}]
        </div>
      ))}
    </div>
  );
};

export default TicketApp;
