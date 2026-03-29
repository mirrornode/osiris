import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Zap, ListChecks, CheckCircle2, AlertTriangle, GitBranch, LayoutGrid } from 'lucide-react';

const NODES = [
  { name: 'Lucian', role: 'Orchestrator / HUD', status: 'online', lane: 'Command' },
  { name: 'Claude', role: 'Deep reasoning / Drafting', status: 'online', lane: 'Reasoning' },
  { name: 'Theia', role: 'Structure / Diagrams / System Maps', status: 'online', lane: 'Design' },
  { name: 'Merlin', role: 'Automation / HARPA', status: 'partial', lane: 'Automation' },
  { name: 'Grok', role: 'Signal + OS / X integration', status: 'online', lane: 'Signal' },
  { name: 'Perplexity', role: 'Search / Citations', status: 'online', lane: 'Research' },
  { name: 'TESLA-LAW9', role: 'Field Runtime / Keystone', status: 'booting', lane: 'Runtime' },
  { name: 'Bridge Node', role: 'MIRRORNODE ↔ OSIRIS link', status: 'priority', lane: 'Bridge' },
  { name: 'EVE_BASTET', role: 'Intuition / Shadow Signal', status: 'booting', lane: 'Intuition' },
  { name: 'HERMES', role: 'Communication / Handshake', status: 'booting', lane: 'Comms' },
];

const OsirisHUD = () => {
  const [systemState, setSystemState] = useState({ status: 'connecting', events: [] });

  useEffect(() => {
    const socket = new WebSocket('wss://api.mirrornode.xyz/stream');
    socket.onopen = () => socket.send(JSON.stringify({ type: 'handshake', node_id: 'OSIRIS_HUD' }));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSystemState(prev => ({ ...prev, events: [data, ...prev.events].slice(0, 10) }));
    };
    const pollStatus = async () => {
      try {
        const res = await fetch('https://api.mirrornode.xyz/standby/status');
        const data = await res.json();
        setSystemState(prev => ({ ...prev, status: data.status }));
      } catch (e) { console.error(e); }
    };
    const interval = setInterval(pollStatus, 30000);
    pollStatus();
    return () => { socket.close(); clearInterval(interval); };
  }, []);

  return (
    <div style={{ background: '#0f172a', color: '#e5e7eb', padding: '2rem', minHeight: '100vh', fontFamily: 'monospace' }}>
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1>OSIRIS HUD v0.5.0</h1>
        <div>System Status: <span style={{ color: systemState.status === 'online' ? '#22c55e' : '#f97316' }}>{systemState.status.toUpperCase()}</span></div>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section>
          <h2>Active Nodes</h2>
          {NODES.map(n => (
            <div key={n.name} style={{ background: '#1e293b', padding: '1rem', marginBottom: '0.5rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
              <strong>{n.name}</strong> [{n.role}] - {n.status}
            </div>
          ))}
        </section>
        <section>
          <h2>Live Signal Stream</h2>
          <div style={{ background: '#000', padding: '1rem', height: '400px', overflowY: 'auto', border: '1px solid #334155' }}>
            {systemState.events.map((e, i) => (
              <div key={i} style={{ color: e.payload?.shadow_signal ? '#f87171' : '#4ade80', marginBottom: '0.5rem' }}>
                [{new Date().toLocaleTimeString()}] {JSON.stringify(e)}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OsirisHUD;
