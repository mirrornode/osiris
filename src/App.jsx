import React, { useState } from 'react';
import hudState from './data/mirrornode_state.json';

const nodes = state.nodes;
const assets = state.assets;
const checklist = state.checklist;

import OSIRISInterface from './OSIRISInterface.jsx';
import OSIRISEntrainment from './OSIRISEntrainment.jsx';
import OsirisHUD from './OsirisHUD.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('hud');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'black', color: 'white' }}>
      {/* Top header + tabs */}
      <header style={{ padding: '1.75rem 1.5rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            fontSize: '2rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          OSIRIS SYSTEM HUD
        </div>
        <div
          style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            marginTop: '0.4rem',
          }}
        >
          Operator console for MIRRORNODE · HUD · Entrainment · Interface
        </div>

        <div
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {['hud', 'entrainment', 'interface'].map((tab) => {
            const label =
              tab === 'hud'
                ? 'HUD'
                : tab === 'entrainment'
                ? 'Entrainment'
                : 'Interface';
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1.3rem',
                  borderRadius: '999px',
                  border: isActive
                    ? '1px solid rgba(250,250,250,0.9)'
                    : '1px solid rgba(148,163,184,0.7)',
                  background: isActive
                    ? 'linear-gradient(135deg, #f97316, #a855f7)'
                    : 'transparent',
                  color: isActive ? 'white' : '#e5e7eb',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '0 1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'hud' && <OsirisHUD />}
        {activeTab === 'entrainment' && <OSIRISEntrainment />}
        {activeTab === 'interface' && <OSIRISInterface />}
      </main>
    </div>
  );
}

export default App;
