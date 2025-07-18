import React from 'react';

const Sidebar = ({ screens, onSelect }) => (
  <div style={{
    width: '200px', height: '100vh', background: '#f4f4f4', padding: '1rem',
    borderRight: '1px solid #ccc'
  }}>
    <h3>Screens</h3>
    <ul>
      {screens.map((s, i) => (
        <li key={i}>
          <button onClick={() => onSelect(s.url)}>{s.name}</button>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
