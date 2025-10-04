const { useState, useEffect } = React;

// Lucide React icons as inline SVGs
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const SparklesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

function F1CareerTracker() {
  // Load data from localStorage on initial render
  const [races, setRaces] = useState(() => {
    const saved = localStorage.getItem('williams-f1-races');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentRace, setCurrentRace] = useState({
    track: '',
    qualiPosition: '',
    racePosition: '',
    aiLevel: 93,
    teammateQuali: '',
    teammateRace: '',
    notes: ''
  });

  const [targetRange, setTargetRange] = useState(() => {
    const saved = localStorage.getItem('williams-f1-target');
    return saved ? JSON.parse(saved) : { min: 8, max: 12 };
  });

  // Save races to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('williams-f1-races', JSON.stringify(races));
  }, [races]);

  // Save target range to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('williams-f1-target', JSON.stringify(targetRange));
  }, [targetRange]);

  const addRace = () => {
    if (currentRace.track && currentRace.racePosition) {
      setRaces([...races, { ...currentRace, id: Date.now() }]);
      setCurrentRace({
        track: '',
        qualiPosition: '',
        racePosition: '',
        aiLevel: currentRace.aiLevel,
        teammateQuali: '',
        teammateRace: '',
        notes: ''
      });
    }
  };

  const deleteRace = (id) => {
    setRaces(races.filter(race => race.id !== id));
  };

  const getStats = () => {
    if (races.length === 0) return null;
    
    const positions = races.map(r => parseInt(r.racePosition)).filter(p => !isNaN(p));
    const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length;
    const inTarget = positions.filter(p => p >= targetRange.min && p <= targetRange.max).length;
    const targetPercentage = (inTarget / positions.length) * 100;
    
    const qualiPositions = races.map(r => parseInt(r.qualiPosition)).filter(p => !isNaN(p));
    const avgQuali = qualiPositions.length > 0 
      ? qualiPositions.reduce((a, b) => a + b, 0) / qualiPositions.length 
      : 0;

    const teammateRaces = races.map(r => parseInt(r.teammateRace)).filter(p => !isNaN(p));
    const beatsTeammate = races.filter((r, i) => 
      !isNaN(parseInt(r.racePosition)) && 
      !isNaN(parseInt(r.teammateRace)) && 
      parseInt(r.racePosition) < parseInt(r.teammateRace)
    ).length;
    const teammateWinRate = teammateRaces.length > 0 
      ? (beatsTeammate / teammateRaces.length) * 100 
      : 0;

    const podiums = positions.filter(p => p <= 3).length;

    return { avgPosition, targetPercentage, avgQuali, teammateWinRate, podiums };
  };

  const getRecommendation = () => {
    const stats = getStats();
    if (!stats || races.length < 3) return null;

    if (stats.avgPosition < targetRange.min - 2) {
      return { type: 'increase', message: 'Consider increasing AI by 2-3 points', color: 'text-red-600' };
    } else if (stats.avgPosition < targetRange.min) {
      return { type: 'increase', message: 'Consider increasing AI by 1-2 points', color: 'text-orange-600' };
    } else if (stats.avgPosition > targetRange.max + 2) {
      return { type: 'decrease', message: 'Consider decreasing AI by 2-3 points', color: 'text-red-600' };
    } else if (stats.avgPosition > targetRange.max) {
      return { type: 'decrease', message: 'Consider decreasing AI by 1 point', color: 'text-orange-600' };
    } else {
      return { type: 'perfect', message: 'AI level looks good! Sparkles approves! ✨🦄', color: 'text-green-600' };
    }
  };

  const stats = getStats();
  const recommendation = getRecommendation();

  const exportData = () => {
    const headers = ['Track', 'Quali Pos', 'Race Pos', 'AI Level', 'Teammate Quali', 'Teammate Race', 'Notes'];
    const rows = races.map(r => [
      r.track, r.qualiPosition, r.racePosition, r.aiLevel, 
      r.teammateQuali, r.teammateRace, r.notes
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'williams-f1-25-career-data.csv';
    a.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const importedRaces = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(',');
        if (values.length >= 3) {
          importedRaces.push({
            id: Date.now() + i,
            track: values[0] || '',
            qualiPosition: values[1] || '',
            racePosition: values[2] || '',
            aiLevel: parseInt(values[3]) || 93,
            teammateQuali: values[4] || '',
            teammateRace: values[5] || '',
            notes: values[6] || ''
          });
        }
      }

      if (importedRaces.length > 0) {
        setRaces(importedRaces);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all race data? This cannot be undone!')) {
      setRaces([]);
      localStorage.removeItem('williams-f1-races');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #00A0DE 0%, #0046AD 100%)' }}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-2xl p-6 mb-6 border-t-4" style={{ borderTopColor: '#00A0DE' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0046AD' }}>
                Williams Racing Career Tracker
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">2025 Season</span>
                <span className="text-2xl">🦄</span>
                <span className="text-sm text-gray-500 italic">Powered by Sparkles • Auto-saves locally</span>
              </div>
            </div>
            <div style={{ color: '#00A0DE' }}>
              <SparklesIcon />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Position Range
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={targetRange.min}
                  onChange={(e) => setTargetRange({ ...targetRange, min: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#00A0DE' }}
                />
                <span>to</span>
                <input
                  type="number"
                  value={targetRange.max}
                  onChange={(e) => setTargetRange({ ...targetRange, max: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#00A0DE' }}
                />
              </div>
            </div>
          </div>

          {stats && races.length >= 3 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="p-4 rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #00A0DE 0%, #0046AD 100%)' }}>
                <div className="text-sm opacity-90">Avg Race Position</div>
                <div className="text-2xl font-bold">P{stats.avgPosition.toFixed(1)}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="text-sm text-gray-600">In Target Range</div>
                <div className="text-2xl font-bold text-green-600">{stats.targetPercentage.toFixed(0)}%</div>
              </div>
              <div className="p-4 rounded-lg border-2" style={{ borderColor: '#00A0DE', backgroundColor: '#E6F5FB' }}>
                <div className="text-sm text-gray-600">Avg Quali</div>
                <div className="text-2xl font-bold" style={{ color: '#0046AD' }}>P{stats.avgQuali.toFixed(1)}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="text-sm text-gray-600">Beat Teammate</div>
                <div className="text-2xl font-bold text-orange-600">{stats.teammateWinRate.toFixed(0)}%</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <div className="text-sm text-gray-600">Podiums 🏆</div>
                <div className="text-2xl font-bold text-yellow-700">{stats.podiums}</div>
              </div>
            </div>
          )}

          {recommendation && races.length >= 3 && (
            <div className={`p-4 rounded-lg mb-6 border-2 ${
              recommendation.type === 'perfect' ? 'bg-green-50 border-green-300' : 'bg-orange-50 border-orange-300'
            }`}>
              <div className="flex items-center gap-2">
                {recommendation.type === 'increase' && <TrendingUpIcon />}
                {recommendation.type === 'decrease' && <TrendingDownIcon />}
                {recommendation.type === 'perfect' && <span className="text-2xl">🦄</span>}
                <span className={`font-semibold ${recommendation.color}`}>
                  {recommendation.message}
                </span>
              </div>
              {races.length < 5 && (
                <div className="text-sm text-gray-600 mt-2">
                  Note: Run {5 - races.length} more race{5 - races.length !== 1 ? 's' : ''} for more reliable calibration
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#0046AD' }}>Add New Race</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
              <input
                type="text"
                placeholder="e.g., Baku 🦄"
                value={currentRace.track}
                onChange={(e) => setCurrentRace({ ...currentRace, track: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quali Position</label>
              <input
                type="number"
                placeholder="e.g., 10"
                value={currentRace.qualiPosition}
                onChange={(e) => setCurrentRace({ ...currentRace, qualiPosition: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Race Position*</label>
              <input
                type="number"
                placeholder="e.g., 9"
                value={currentRace.racePosition}
                onChange={(e) => setCurrentRace({ ...currentRace, racePosition: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">AI Difficulty</label>
              <input
                type="number"
                placeholder="93"
                value={currentRace.aiLevel}
                onChange={(e) => setCurrentRace({ ...currentRace, aiLevel: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teammate Quali</label>
              <input
                type="number"
                placeholder="e.g., 12"
                value={currentRace.teammateQuali}
                onChange={(e) => setCurrentRace({ ...currentRace, teammateQuali: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teammate Race</label>
              <input
                type="number"
                placeholder="e.g., 11"
                value={currentRace.teammateRace}
                onChange={(e) => setCurrentRace({ ...currentRace, teammateRace: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#00A0DE' }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input
              type="text"
              placeholder="e.g., Sparkles brought the magic today! P3! 🦄✨"
              value={currentRace.notes}
              onChange={(e) => setCurrentRace({ ...currentRace, notes: e.target.value })}
              className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#00A0DE' }}
            />
          </div>
          
          <button
            onClick={addRace}
            disabled={!currentRace.track || !currentRace.racePosition}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-opacity"
            style={{ backgroundColor: '#0046AD' }}
          >
            <PlusIcon />
            Add Race
          </button>
        </div>

        {races.length > 0 && (
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#0046AD' }}>Race History</h2>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 px-3 py-2 text-white rounded-md hover:opacity-90 text-sm transition-opacity cursor-pointer"
                  style={{ backgroundColor: '#00A0DE' }}>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={importData}
                    className="hidden"
                  />
                  <span>📥 Import CSV</span>
                </label>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-3 py-2 text-white rounded-md hover:opacity-90 text-sm transition-opacity"
                  style={{ backgroundColor: '#00A0DE' }}
                >
                  <DownloadIcon />
                  Export CSV
                </button>
                <button
                  onClick={clearAllData}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: '#0046AD' }}>
                    <th className="text-left py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>Track</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>Quali</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>Race</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>AI</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>TM Quali</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>TM Race</th>
                    <th className="text-left py-2 px-3 text-sm font-semibold" style={{ color: '#0046AD' }}>Notes</th>
                    <th className="py-2 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {races.map((race, index) => {
                    const racePos = parseInt(race.racePosition);
                    const inTarget = racePos >= targetRange.min && racePos <= targetRange.max;
                    const isPodium = racePos <= 3;
                    
                    return (
                      <tr key={race.id} className="border-b border-gray-100 hover:bg-blue-50">
                        <td className="py-3 px-3 font-medium">{race.track}</td>
                        <td className="text-center py-3 px-3">P{race.qualiPosition || '-'}</td>
                        <td className={`text-center py-3 px-3 font-bold ${
                          isPodium ? 'text-yellow-600' :
                          inTarget ? 'text-green-600' : 
                          racePos < targetRange.min ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {isPodium && '🏆 '}P{race.racePosition}
                        </td>
                        <td className="text-center py-3 px-3 text-gray-600">{race.aiLevel}</td>
                        <td className="text-center py-3 px-3 text-gray-500">P{race.teammateQuali || '-'}</td>
                        <td className="text-center py-3 px-3 text-gray-500">P{race.teammateRace || '-'}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{race.notes}</td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => deleteRace(race.id)}
                            className="text-red-600 hover:text-red-800 font-bold"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-white text-sm opacity-75">
          <p>🦄 In honor of Sparkles the Unicorn - Carlos Sainz's lucky charm in Baku 2025 🦄</p>
          <p className="mt-1">First Williams podium in 4 years, powered by unicorn magic ✨</p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<F1CareerTracker />);