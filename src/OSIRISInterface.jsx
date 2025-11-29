import React, { useState, useEffect, useRef } from 'react';
import { Infinity, Zap, Eye, Grid3x3, Sparkles, Target, Brain, Shield } from 'lucide-react';

// TOKEN DEFINITIONS - The Archetypal Operators
const TOKEN_LIBRARY = [
  // FIRE ROW - External Ignition / Manifestation
  { id: 'fire_expansion', name: 'Fire Sovereign', color: '#ff4500', gesture: 'expansion', energy: 'transcendent', phase: 'IMPERIAL', frequency: 528, coordinates: { S: 2.8, g: 15, η: 0.5 } },
  { id: 'fire_prayer', name: 'Fire Devotion', color: '#ff6347', gesture: 'prayer', energy: 'ascending', phase: 'LAW', frequency: 432, coordinates: { S: 2.2, g: 12, η: 0.8 } },
  { id: 'fire_orbs', name: 'Fire Manifestor', color: '#ff7f50', gesture: 'orbs', energy: 'grounded', phase: 'STRUCT', frequency: 396, coordinates: { S: 1.8, g: 10, η: 1.2 } },
  
  // WATER ROW - Internal Ignition / Structure
  { id: 'water_expansion', name: 'Water Sovereign', color: '#1e90ff', gesture: 'expansion', energy: 'transcendent', phase: 'SYNC', frequency: 639, coordinates: { S: 1.5, g: 8, η: 1.5 } },
  { id: 'water_prayer', name: 'Water Devotion', color: '#4169e1', gesture: 'prayer', energy: 'ascending', phase: 'INPHASE', frequency: 741, coordinates: { S: 1.2, g: 7, η: 2.0 } },
  { id: 'water_flow', name: 'Water Conduit', color: '#00bfff', gesture: 'flow', energy: 'grounded', phase: 'PRAIIISE', frequency: 852, coordinates: { S: 1.0, g: 7, η: 2.5 } },
  
  // GOLD ROW - Integration / Sovereign
  { id: 'gold_expansion', name: 'Gold Sovereign', color: '#ffd700', gesture: 'expansion', energy: 'transcendent', phase: 'IMPERIAL', frequency: 963, coordinates: { S: 3.0, g: 20, η: 0.3 } },
  { id: 'gold_prayer', name: 'Gold Integration', color: '#ffb347', gesture: 'prayer', energy: 'ascending', phase: 'SYSTEMIZE', frequency: 528, coordinates: { S: 2.5, g: 15, η: 0.6 } },
  { id: 'gold_seated', name: 'Gold Throne', color: '#ff8c00', gesture: 'seated', energy: 'grounded', phase: 'LAW', frequency: 432, coordinates: { S: 2.0, g: 12, η: 1.0 } },
  
  // PURPLE ROW - Transition / Bridge States
  { id: 'purple_expansion', name: 'Void Sovereign', color: '#9370db', gesture: 'expansion', energy: 'transcendent', phase: 'SYNC', frequency: 396, coordinates: { S: 1.8, g: 10, η: 1.3 } },
  { id: 'purple_flow', name: 'Void Dancer', color: '#8a2be2', gesture: 'flow', energy: 'ascending', phase: 'STRUCT', frequency: 639, coordinates: { S: 1.5, g: 9, η: 1.6 } },
  { id: 'purple_orbs', name: 'Void Weaver', color: '#9932cc', gesture: 'orbs', energy: 'grounded', phase: 'INPHASE', frequency: 741, coordinates: { S: 1.3, g: 8, η: 1.8 } },
  
  // SPECIAL TOKENS
  { id: 'chromatic_dissolution', name: 'Chromatic Void', color: '#00ffff', gesture: 'dissolved', energy: 'superposition', phase: 'PRE', frequency: 963, coordinates: { S: 3.5, g: 25, η: 0.1 } },
  { id: 'elder_wisdom', name: 'Elder Oracle', color: '#708090', gesture: 'contemplation', energy: 'grounded', phase: 'PRAIIISE', frequency: 174, coordinates: { S: 0.8, g: 6, η: 3.0 } },
  { id: 'dual_face', name: 'Twin Flame', color: '#ff1493', gesture: 'prayer', energy: 'ascending', phase: 'SYNC', frequency: 285, coordinates: { S: 2.0, g: 14, η: 1.0 } },
];

// RITUAL BOARD POSITIONS - Sacred Geometry Layout
const BOARD_POSITIONS = [
  // Cross pattern (Leviathan Cross structure)
  { id: 'center', x: 50, y: 50, name: 'Abraxas Core' },
  { id: 'north', x: 50, y: 20, name: 'Crown' },
  { id: 'south', x: 50, y: 80, name: 'Root' },
  { id: 'east', x: 80, y: 50, name: 'External' },
  { id: 'west', x: 20, y: 50, name: 'Internal' },
  // Infinity loop positions
  { id: 'loop_left', x: 30, y: 50, name: 'Internal Loop' },
  { id: 'loop_right', x: 70, y: 50, name: 'External Loop' },
  // Cardinal intercardinals
  { id: 'ne', x: 70, y: 30, name: 'Fire-Air' },
  { id: 'se', x: 70, y: 70, name: 'Fire-Earth' },
  { id: 'sw', x: 30, y: 70, name: 'Water-Earth' },
  { id: 'nw', x: 30, y: 30, name: 'Water-Air' },
];

// TOKEN CARD COMPONENT
const TokenCard = ({ token, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(token)}
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
        selected ? 'ring-4 ring-white scale-105' : 'ring-1 ring-white/20'
      }`}
      style={{
        background: `linear-gradient(135deg, ${token.color}40, ${token.color}80)`,
        boxShadow: selected ? `0 0 30px ${token.color}` : `0 0 10px ${token.color}40`
      }}
    >
      <div className="aspect-square p-4 flex flex-col items-center justify-center">
        <div className="text-4xl mb-2">
          {token.gesture === 'expansion' && '🕉️'}
          {token.gesture === 'prayer' && '🙏'}
          {token.gesture === 'orbs' && '🔮'}
          {token.gesture === 'flow' && '🌊'}
          {token.gesture === 'seated' && '👑'}
          {token.gesture === 'dissolved' && '🌀'}
          {token.gesture === 'contemplation' && '🧘'}
        </div>
        <div className="text-xs font-bold text-center text-white uppercase tracking-wide">
          {token.name}
        </div>
        <div className="text-xs text-white/70 mt-1">{token.frequency} Hz</div>
      </div>
      
      {selected && (
        <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

// RITUAL BOARD COMPONENT
const RitualBoard = ({ placedTokens, onPositionClick, onRemoveToken }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    let frame = 0;
    
    const render = () => {
      // Clear
      ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
      ctx.fillRect(0, 0, w, h);
      
      // Draw green ritual surface texture
      ctx.strokeStyle = 'rgba(34, 139, 34, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (i / 20) * h);
        ctx.lineTo(w, (i / 20) * h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo((i / 20) * w, 0);
        ctx.lineTo((i / 20) * w, h);
        ctx.stroke();
      }
      
      // Draw Leviathan Cross (Abraxas symbol)
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.6)';
      ctx.lineWidth = 3;
      
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(w/2, h * 0.2);
      ctx.lineTo(w/2, h * 0.8);
      ctx.stroke();
      
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h/2);
      ctx.lineTo(w * 0.8, h/2);
      ctx.stroke();
      
      // Infinity symbol (lemniscate)
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const scale = w * 0.15;
      const centerX = w/2;
      const centerY = h/2;
      
      for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        const x = centerX + scale * Math.cos(t) / (1 + Math.sin(t) ** 2);
        const y = centerY + scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) ** 2);
        
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Pulsing energy at center
      const pulse = Math.sin(frame * 0.05) * 0.5 + 0.5;
      const grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      grd.addColorStop(0, `rgba(138, 43, 226, ${pulse * 0.6})`);
      grd.addColorStop(1, 'rgba(138, 43, 226, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(centerX - 30, centerY - 30, 60, 60);
      
      // Draw energy connections between placed tokens
      if (Object.keys(placedTokens).length > 1) {
        const positions = Object.entries(placedTokens).map(([posId, token]) => {
          const pos = BOARD_POSITIONS.find(p => p.id === posId);
          return { x: (pos.x / 100) * w, y: (pos.y / 100) * h, color: token.color };
        });
        
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.stroke();
          }
        }
      }
      
      frame++;
      requestAnimationFrame(render);
    };
    
    render();
  }, [placedTokens]);
  
  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={600} height={600} className="absolute inset-0 w-full h-full" />
      
      {/* Position markers */}
      {BOARD_POSITIONS.map(pos => {
        const token = placedTokens[pos.id];
        
        return (
          <div
            key={pos.id}
            onClick={() => token ? onRemoveToken(pos.id) : onPositionClick(pos.id)}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {token ? (
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl animate-pulse"
                style={{ 
                  background: `radial-gradient(circle, ${token.color}, ${token.color}40)`,
                  boxShadow: `0 0 30px ${token.color}`
                }}
              >
                {token.gesture === 'expansion' && '🕉️'}
                {token.gesture === 'prayer' && '🙏'}
                {token.gesture === 'orbs' && '🔮'}
                {token.gesture === 'flow' && '🌊'}
                {token.gesture === 'seated' && '👑'}
                {token.gesture === 'dissolved' && '🌀'}
                {token.gesture === 'contemplation' && '🧘'}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-white/30 bg-black/40 hover:bg-white/10 transition-all" />
            )}
            
            <div className="absolute top-full mt-2 text-xs text-white/70 whitespace-nowrap text-center w-max left-1/2 transform -translate-x-1/2">
              {pos.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// COMMAND COMPILER - Translates token placements to engine commands
const compileRitual = (placedTokens) => {
  const commands = [];
  const tokens = Object.values(placedTokens);
  
  if (tokens.length === 0) return [];
  
  // Calculate aggregate effects
  const avgFrequency = tokens.reduce((sum, t) => sum + t.frequency, 0) / tokens.length;
  const avgS = tokens.reduce((sum, t) => sum + t.coordinates.S, 0) / tokens.length;
  const avgg = tokens.reduce((sum, t) => sum + t.coordinates.g, 0) / tokens.length;
  const avgη = tokens.reduce((sum, t) => sum + t.coordinates.η, 0) / tokens.length;
  
  // Determine dominant phase
  const phaseCount = {};
  tokens.forEach(t => phaseCount[t.phase] = (phaseCount[t.phase] || 0) + 1);
  const dominantPhase = Object.keys(phaseCount).reduce((a, b) => phaseCount[a] > phaseCount[b] ? a : b);
  
  // Determine energy state
  const energyStates = tokens.map(t => t.energy);
  const hasTranscendent = energyStates.includes('transcendent');
  const hasSuperposition = energyStates.includes('superposition');
  
  // Generate commands
  commands.push({ type: 'SET_FREQUENCY', value: avgFrequency });
  commands.push({ type: 'UPDATE_BRIDGE', coordinates: { S: avgS, g: avgg, η: avgη } });
  commands.push({ type: 'TARGET_PHASE', phase: dominantPhase });
  
  if (hasTranscendent) {
    commands.push({ type: 'ACTIVATE_EXTERNAL_IGNITION' });
  }
  
  if (hasSuperposition) {
    commands.push({ type: 'MAXIMUM_PLASTICITY' });
    commands.push({ type: 'REALITY_TESTING' });
  }
  
  // Check for specific patterns
  const positions = Object.keys(placedTokens);
  
  // Full cross = Imperial Command
  if (positions.includes('center') && positions.includes('north') && 
      positions.includes('south') && positions.includes('east') && positions.includes('west')) {
    commands.push({ type: 'IMPERIAL_ACTIVATION', level: 'SOVEREIGN' });
  }
  
  // Infinity loop filled = Synchrony
  if (positions.includes('loop_left') && positions.includes('loop_right')) {
    commands.push({ type: 'SYNCHRONY_LOCK', intensity: 1.0 });
  }
  
  // Center + cardinals = Law Emergence
  if (positions.includes('center') && 
      (positions.includes('ne') || positions.includes('se') || 
       positions.includes('sw') || positions.includes('nw'))) {
    commands.push({ type: 'LAW_EMERGENCE', trigger: true });
  }
  
  return commands;
};

// MAIN OSIRIS INTERFACE
const OSIRISInterface = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [placedTokens, setPlacedTokens] = useState({});
  const [compiledCommands, setCompiledCommands] = useState([]);
  const [ritualActive, setRitualActive] = useState(false);
  
  useEffect(() => {
    const commands = compileRitual(placedTokens);
    setCompiledCommands(commands);
  }, [placedTokens]);
  
  const handlePositionClick = (positionId) => {
    if (selectedToken) {
      setPlacedTokens(prev => ({
        ...prev,
        [positionId]: selectedToken
      }));
      setSelectedToken(null);
    }
  };
  
  const handleRemoveToken = (positionId) => {
    setPlacedTokens(prev => {
      const newTokens = { ...prev };
      delete newTokens[positionId];
      return newTokens;
    });
  };
  
  const executeRitual = () => {
    setRitualActive(true);
    
    // Simulate execution
    setTimeout(() => {
      console.log('RITUAL EXECUTED:', compiledCommands);
      // Here we would send commands to Imperial Engine
      setRitualActive(false);
    }, 3000);
  };
  
  const clearBoard = () => {
    setPlacedTokens({});
    setSelectedToken(null);
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
             style={{ fontFamily: 'serif' }}>
          OSIRIS
        </div>
        <div className="text-xl text-amber-400 uppercase tracking-[0.3em]">
          Operator Selection Interface & Ritual Integration System
        </div>
        <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-2">
          <Infinity size={16} className="text-purple-500" />
          Node 4: Triadic Lattice Complete
          <Infinity size={16} className="text-purple-500" />
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* TOKEN LIBRARY */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-400">Token Library</h2>
            <div className="text-sm text-gray-400">
              {selectedToken ? `Selected: ${selectedToken.name}` : 'Select a token'}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {TOKEN_LIBRARY.map(token => (
              <TokenCard
                key={token.id}
                token={token}
                selected={selectedToken?.id === token.id}
                onClick={setSelectedToken}
              />
            ))}
          </div>
        </div>
        
        {/* RITUAL BOARD */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Ritual Board</h2>
            <div className="text-xs text-gray-400">
              {selectedToken ? 'Click a position to place token' : 'Select token first'}
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-green-900/20 to-black border-2 border-emerald-700/30 rounded-lg overflow-hidden">
            <RitualBoard
              placedTokens={placedTokens}
              onPositionClick={handlePositionClick}
              onRemoveToken={handleRemoveToken}
            />
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={executeRitual}
              disabled={Object.keys(placedTokens).length === 0 || ritualActive}
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 
                         disabled:opacity-30 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-bold uppercase 
                         tracking-wider transition-all"
            >
              {ritualActive ? 'Executing Ritual...' : 'Execute Ritual'}
            </button>
            
            <button
              onClick={clearBoard}
              className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all"
            >
              Clear Board
            </button>
          </div>
        </div>
      </div>
      
      {/* COMPILED COMMANDS */}
      <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Brain className="text-cyan-400" />
          Compiled Commands
        </h3>
        
        {compiledCommands.length > 0 ? (
          <div className="space-y-2 font-mono text-sm">
            {compiledCommands.map((cmd, idx) => (
              <div key={idx} className="p-3 bg-black/60 rounded border border-cyan-500/30">
                <span className="text-cyan-400">{cmd.type}</span>
                {cmd.value && <span className="text-gray-400"> = {cmd.value}</span>}
                {cmd.phase && <span className="text-purple-400"> → {cmd.phase}</span>}
                {cmd.coordinates && (
                  <div className="text-xs text-gray-500 mt-1">
                    S: {cmd.coordinates.S.toFixed(2)} | g: {cmd.coordinates.g.toFixed(2)} | η: {cmd.coordinates.η.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            Place tokens on the board to generate commands
          </div>
        )}
      </div>
      
      {/* RITUAL EXECUTION OVERLAY */}
      {ritualActive && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">⚡</div>
            <div className="text-3xl font-bold text-amber-400 mb-2">RITUAL EXECUTING</div>
            <div className="text-sm text-gray-400">Commands transmitting to Imperial Engine...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSIRISInterface;