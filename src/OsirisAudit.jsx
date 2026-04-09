import React, { useEffect, useState } from 'react';

const STATUS_COLOR = {
  active: '#22c55e',
  degraded: '#f97316',
  offline: '#ef4444',
};

const CHECK_COLOR = {
  pass: '#22c55e',
  fail: '#ef4444',
  warn: '#f97316',
};

export default function OsirisAudit() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAudit = () => {
    setLoading(true);
    setError(null);
    fetch('/api/osiris/audit')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  };

  useEffect(() => {
    fetchAudit();
    const interval = setInterval(fetchAudit, 30000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    fontFamily: 'monospace',
  };

  const cardStyle = {
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: '8px',
    padding: '1.5rem',
    background: 'rgba(255,255,255,0.03)',
  };

  const labelStyle = {
    color: '#9ca3af',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  };

  const valueStyle = {
    color: '#f1f5f9',
    fontSize: '1rem',
    marginBottom: '1.25rem',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ color: '#9ca3af', textAlign: 'center', padding: '3rem 0' }}>
          Querying OSIRIS...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ color: '#ef4444', textAlign: 'center', padding: '3rem 0' }}>
          ⚠ Audit fetch failed: {error}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={fetchAudit} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLOR[data.status] || '#9ca3af';

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Live Audit
        </div>
        <div style={{ fontSize: '1.4rem', letterSpacing: '0.2em', color: '#f1f5f9' }}>
          {data.node}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={labelStyle}>Status</div>
        <div style={{ ...valueStyle, color: statusColor, fontSize: '1.1rem', fontWeight: 'bold' }}>
          ● {data.status.toUpperCase()}
        </div>

        <div style={labelStyle}>Timestamp</div>
        <div style={valueStyle}>{data.timestamp}</div>

        <div style={labelStyle}>Checks</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {data.checks.map((check) => (
            <div
              key={check.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.9rem',
                border: '1px solid rgba(148,163,184,0.15)',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{check.name}</span>
              <span
                style={{
                  color: CHECK_COLOR[check.result] || '#9ca3af',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                {check.result}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button
            onClick={fetchAudit}
            style={{
              padding: '0.4rem 1rem',
              background: 'transparent',
              border: '1px solid rgba(148,163,184,0.3)',
              color: '#9ca3af',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
