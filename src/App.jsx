import { useState } from 'react';
import './App.css';
import OSIRISEntrainment from './OSIRISEntrainment';
import OSIRISInterface from './OSIRISInterface';

function App() {
  const [activeTab, setActiveTab] = useState('hud');

  return (
    <div className="app-container">
      <h1 className="title">OSIRIS SYSTEM HUD</h1>

      {/* TAB BAR */}
      <div className="tab-bar">
        <button
          className={activeTab === 'hud' ? 'active' : ''}
          onClick={() => setActiveTab('hud')}
        >
          HUD
        </button>

        <button
          className={activeTab === 'entrainment' ? 'active' : ''}
          onClick={() => setActiveTab('entrainment')}
        >
          Entrainment
        </button>

        <button
          className={activeTab === 'interface' ? 'active' : ''}
          onClick={() => setActiveTab('interface')}
        >
          Interface
        </button>
      </div>

      {/* CONTENT SWITCH */}
      <div className="tab-content">
        {activeTab === 'hud' && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#00ff88', fontSize: '1.6rem' }}>
            HUD VIEW v2 – OSIRIS ONLINE
          </div>
        )}

        {activeTab === 'entrainment' && <OSIRISEntrainment />}

        {activeTab === 'interface' && <OSIRISInterface />}
      </div>
    </div>
  );
}

export default App;
