import React, { useState } from 'react';
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
];

const CODE_ASSETS = [
  { name: 'OSIRIS HUD + Interface', repo: 'mirrornode/osiris', status: 'deployed', lane: 'UI' },
  { name: 'MIRRORNODE-CORE', repo: 'mirrornode/mirrornode-core', status: 'skeleton', lane: 'Core' },
  { name: 'Theia Core', repo: 'mirrornode/theia-core', status: 'linked', lane: 'Maps' },
  { name: 'Keystone / TESLA-LAW9', repo: 'keystone-spec', status: 'in-progress', lane: 'Runtime' },
];

const INITIAL_TASKS = [
  {
    id: 'bridge-01',
    label: 'Bring Bridge Node fully online (OSIRIS ↔ MIRRORNODE event loop)',
    lane: 'Bridge',
  },
  {
    id: 'hud-01',
    label: 'Define canonical list of HUD actions + commands',
    lane: 'Command',
  },
  {
    id: 'codes-01',
    label: 'Inventory all “codes” and map them to repos / files',
    lane: 'Codes',
  },
  {
    id: 'pipeline-01',
    label: 'Confirm GitHub ↔ Vercel wiring for OSIRIS (auto-deploy on push)',
    lane: 'CI/CD',
  },
  {
    id: 'docs-01',
    label: 'Create MIRRORNODE Ops doc with links to all HUD panels',
    lane: 'Docs',
  },
];

const statusColor = (status) => {
  switch (status) {
    case 'online':
      return '#22c55e';
    case 'partial':
      return '#eab308';
    case 'priority':
      return '#f97316';
    case 'booting':
      return '#38bdf8';
    default:
      return '#6b7280';
  }
};

const OsirisHUD = () => {
  const [tasks, setTasks] = useState(
    INITIAL_TASKS.map((t) => ({ ...t, done: false }))
  );

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="hud-root" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top row: System header */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(24,24,27,0.95))',
          border: '1px solid rgba(148,163,184,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '999px',
              background:
                'radial-gradient(circle at 30% 0%, #f97316, #a855f7 60%, #0ea5e9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(168,85,247,0.7)',
            }}
          >
            <Cpu size={22} color="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.1rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#e5e7eb',
              }}
            >
              OSIRIS SYSTEM HUD
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#9ca3af',
                marginTop: '0.25rem',
              }}
            >
              MIRRORNODE · Node 4 · Triadic Lattice — Operator View
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#9ca3af',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Activity size={16} color="#22c55e" />
            <span>Stack: online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Zap size={16} color="#f97316" />
            <span>Bridge: in progress</span>
          </div>
        </div>
      </div>

      {/* Main grid: Nodes / Codes / Checklist */}
      <div
        className="hud-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.4fr) minmax(0, 1.2fr)',
          gap: '1.25rem',
        }}
      >
        {/* Column 1: Nodes */}
        <section
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background:
              'radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 60%), rgba(15,23,42,0.95)',
            border: '1px solid rgba(55,65,81,0.9)',
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <LayoutGrid size={18} color="#93c5fd" />
              <span style={{ fontSize: '0.9rem', color: '#e5e7eb', fontWeight: 600 }}>
                Active Nodes
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {NODES.length} linked processes
            </span>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {NODES.map((node) => (
              <div
                key={node.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.55rem 0.7rem',
                  borderRadius: '0.55rem',
                  background: 'rgba(15,23,42,0.85)',
                  border: '1px solid rgba(75,85,99,0.8)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: '#e5e7eb',
                      fontWeight: 600,
                    }}
                  >
                    {node.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                    }}
                  >
                    {node.role}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      gap: '0.3rem',
                      background: 'rgba(17,24,39,0.9)',
                      border: `1px solid ${statusColor(node.status)}33`,
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '999px',
                        backgroundColor: statusColor(node.status),
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        color: '#e5e7eb',
                      }}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: '#6b7280',
                      marginTop: '0.2rem',
                    }}
                  >
                    Lane: {node.lane}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 2: Codes / assets */}
        <section
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background:
              'radial-gradient(circle at top right, rgba(249,115,22,0.18), transparent 60%), rgba(15,23,42,0.95)',
            border: '1px solid rgba(75,85,99,0.9)',
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <GitBranch size={18} color="#f97316" />
              <span style={{ fontSize: '0.9rem', color: '#e5e7eb', fontWeight: 600 }}>
                Code & Ritual Assets
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Side-by-side view
            </span>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1.5fr) minmax(0, 0.9fr)',
              fontSize: '0.75rem',
              color: '#9ca3af',
              borderBottom: '1px solid rgba(75,85,99,0.9)',
              paddingBottom: '0.35rem',
              marginBottom: '0.35rem',
              columnGap: '0.5rem',
            }}
          >
            <div>Asset</div>
            <div>Repo / Location</div>
            <div>Status</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {CODE_ASSETS.map((asset) => (
              <div
                key={asset.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1.5fr) minmax(0, 0.9fr)',
                  columnGap: '0.5rem',
                  alignItems: 'center',
                  padding: '0.45rem 0.55rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(55,65,81,0.9)',
                }}
              >
                <div style={{ color: '#e5e7eb', fontSize: '0.8rem' }}>{asset.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {asset.repo}
                </div>
                <div
                  style={{
                    justifySelf: 'flex-start',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    color:
                      asset.status === 'deployed'
                        ? '#22c55e'
                        : asset.status === 'in-progress'
                        ? '#eab308'
                        : '#9ca3af',
                  }}
                >
                  {asset.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 3: Checklist */}
        <section
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background:
              'radial-gradient(circle at bottom, rgba(147,51,234,0.22), transparent 60%), rgba(15,23,42,0.96)',
            border: '1px solid rgba(88,28,135,0.9)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <ListChecks size={18} color="#a855f7" />
              <span style={{ fontSize: '0.9rem', color: '#e5e7eb', fontWeight: 600 }}>
                Mission Checklist
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#c4b5fd' }}>
              {completedCount}/{tasks.length} complete
            </div>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  textAlign: 'left',
                  width: '100%',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                  padding: '0.5rem 0.55rem',
                  borderRadius: '0.55rem',
                  border: '1px solid rgba(88,28,135,0.9)',
                  background: task.done
                    ? 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(15,23,42,0.98))'
                    : 'rgba(15,23,42,0.96)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ marginTop: '0.1rem' }}>
                  {task.done ? (
                    <CheckCircle2 size={16} color="#22c55e" />
                  ) : (
                    <AlertTriangle size={16} color="#eab308" />
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: task.done ? '#bbf7d0' : '#e5e7eb',
                    }}
                  >
                    {task.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: '#a5b4fc',
                      marginTop: '0.15rem',
                    }}
                  >
                    Lane: {task.lane}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '0.8rem',
              fontSize: '0.7rem',
              color: '#9ca3af',
              borderTop: '1px dashed rgba(148,163,184,0.4)',
              paddingTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Zap size={14} color="#f97316" />
            <span>
              Click a task to toggle it. This column becomes your live ops log
              for today.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OsirisHUD;
