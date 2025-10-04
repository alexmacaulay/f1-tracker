const { useState, useEffect } = React;

// Team themes with official F1 colors
const TEAM_THEMES = {
  williams: {
    name: 'Williams Racing',
    primary: '#00A0DE',
    secondary: '#0046AD',
    gradient: 'linear-gradient(135deg, #00A0DE 0%, #0046AD 100%)',
    mascot: '🦄',
    mascotName: 'Sparkles'
  },
  ferrari: {
    name: 'Scuderia Ferrari',
    primary: '#DC0000',
    secondary: '#8B0000',
    gradient: 'linear-gradient(135deg, #DC0000 0%, #8B0000 100%)',
    mascot: '🐎',
    mascotName: 'Prancing Horse'
  },
  redbull: {
    name: 'Red Bull Racing',
    primary: '#0600EF',
    secondary: '#1E41FF',
    gradient: 'linear-gradient(135deg, #0600EF 0%, #1E41FF 100%)',
    mascot: '🐂',
    mascotName: 'Bull'
  },
  mercedes: {
    name: 'Mercedes-AMG',
    primary: '#00D2BE',
    secondary: '#000000',
    gradient: 'linear-gradient(135deg, #00D2BE 0%, #000000 100%)',
    mascot: '⭐',
    mascotName: 'Star'
  },
  mclaren: {
    name: 'McLaren Racing',
    primary: '#FF8700',
    secondary: '#47C7FC',
    gradient: 'linear-gradient(135deg, #FF8700 0%, #47C7FC 100%)',
    mascot: '🧡',
    mascotName: 'Papaya'
  },
  astonmartin: {
    name: 'Aston Martin',
    primary: '#006F62',
    secondary: '#00352F',
    gradient: 'linear-gradient(135deg, #006F62 0%, #00352F 100%)',
    mascot: '💚',
    mascotName: 'Green Machine'
  },
  alpine: {
    name: 'Alpine F1',
    primary: '#0090FF',
    secondary: '#FF1E8E',
    gradient: 'linear-gradient(135deg, #0090FF 0%, #FF1E8E 100%)',
    mascot: '🇫🇷',
    mascotName: 'Alpine'
  },
  haas: {
    name: 'MoneyGram Haas',
    primary: '#B6BABD',
    secondary: '#DC0000',
    gradient: 'linear-gradient(135deg, #B6BABD 0%, #DC0000 100%)',
    mascot: '🦅',
    mascotName: 'Eagle'
  },
  racingbulls: {
    name: 'RB F1 Team',
    primary: '#6692FF',
    secondary: '#1634CB',
    gradient: 'linear-gradient(135deg, #6692FF 0%, #1634CB 100%)',
    mascot: '🐂',
    mascotName: 'Racing Bulls'
  },
  sauber: {
    name: 'Stake F1 Team',
    primary: '#00E701',
    secondary: '#004D40',
    gradient: 'linear-gradient(135deg, #00E701 0%, #004D40 100%)',
    mascot: '🟢',
    mascotName: 'Green'
  },
  custom: {
    name: 'Custom Team',
    primary: '#3B82F6',
    secondary: '#1E40AF',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
    mascot: '🏁',
    mascotName: 'Racer'
  }
};

// Icons as inline SVGs
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

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
  </svg>
);

function F1CareerTracker() {
  const [selectedTeam, setSelectedTeam] = useState(() => {
    const saved = localStorage.getItem('f1-selected-team');
    return saved || 'williams';
  });

  const [customTheme, setCustomTheme] = useState(() => {
    const saved = localStorage.getItem('f1-custom-theme');
    return saved ? JSON.parse(saved) : TEAM_THEMES.custom;
  });

  const [showSettings, setShowSettings] = useState(false);
  const [editingRace, setEditingRace] = useState(null);

  const theme = selectedTeam === 'custom' ? customTheme : TEAM_THEMES[selectedTeam];

  const [races, setRaces] = useState(() => {
    const saved = localStorage.getItem('f1-races');
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
    const saved = localStorage.getItem('f1-target');
    return saved ? JSON.parse(saved) : { min: 8, max: 12 };
  });

  useEffect(() => {
    localStorage.setItem('f1-races', JSON.stringify(races));
  }, [races]);

  useEffect(() => {
    localStorage.setItem('f1-target', JSON.stringify(targetRange));
  }, [targetRange]);

  useEffect(() => {
    localStorage.setItem('f1-selected-team', selectedTeam);
  }, [selectedTeam]);

  useEffect(() => {
    if (selectedTeam === 'custom') {
      localStorage.setItem('f1-custom-theme', JSON.stringify(customTheme));
    }
  }, [customTheme, selectedTeam]);

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

  const startEditRace = (race) => {
    setEditingRace({ ...race });
  };

  const saveEditRace = () => {
    setRaces(races.map(r => r.id === editingRace.id ? editingRace : r));
    setEditingRace(null);
  };

  const cancelEditRace = () => {
    setEditingRace(null);
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
      return { type: 'perfect', message: `AI level looks good! ${theme.mascotName} approves! ✨${theme.mascot}`, color: 'text-green-600' };
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
    a.download = `${selectedTeam}-f1-25-career-data.csv`;
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
      localStorage.removeItem('f1-races');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: theme.gradient }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4" style={{ color: theme.secondary }}>Team & Theme Settings</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Team</label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: theme.primary }}
                >
                  {Object.keys(TEAM_THEMES).map(key => (
                    <option key={key} value={key}>
                      {TEAM_THEMES[key].mascot} {TEAM_THEMES[key].name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedTeam === 'custom' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-3">Customize Your Theme</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                      <input
                        type="text"
                        value={customTheme.name}
                        onChange={(e) => setCustomTheme({ ...customTheme, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mascot</label>
                      <input
                        type="text"
                        value={customTheme.mascot}
                        onChange={(e) => setCustomTheme({ ...customTheme, mascot: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="🏁"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mascot Name</label>
                    <input
                      type="text"
                      value={customTheme.mascotName}
                      onChange={(e) => setCustomTheme({ ...customTheme, mascotName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                      <input
                        type="color"
                        value={customTheme.primary}
                        onChange={(e) => setCustomTheme({ 
                          ...customTheme, 
                          primary: e.target.value,
                          gradient: `linear-gradient(135deg, ${e.target.value} 0%, ${customTheme.secondary} 100%)`
                        })}
                        className="w-full h-10 border rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                      <input
                        type="color"
                        value={customTheme.secondary}
                        onChange={(e) => setCustomTheme({ 
                          ...customTheme, 
                          secondary: e.target.value,
                          gradient: `linear-gradient(135deg, ${customTheme.primary} 0%, ${e.target.value} 100%)`
                        })}
                        className="w-full h-10 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowSettings(false)}
                className="w-full px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: theme.secondary }}
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-2xl p-6 mb-6 border-t-4" style={{ borderTopColor: theme.primary }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: theme.secondary }}>
                {theme.name} Career Tracker
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">2025 Season</span>
                <span className="text-2xl">{theme.mascot}</span>
                <span className="text-sm text-gray-500 italic">Powered by {theme.mascotName} • Auto-saves locally</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-md hover:bg-gray-100"
                style={{ color: theme.primary }}
                title="Settings"
              >
                <SettingsIcon />
              </button>
              <div style={{ color: theme.primary }}>
                <SparklesIcon />
              </div>
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
                  style={{ borderColor: theme.primary }}
                />
                <span>to</span>
                <input
                  type="number"
                  value={targetRange.max}
                  onChange={(e) => setTargetRange({ ...targetRange, max: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: theme.primary }}
                />
              </div>
            </div>
          </div>

          {stats && races.length >= 3 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="p-4 rounded-lg text-white" style={{ background: theme.gradient }}>
                <div className="text-sm opacity-90">Avg Race Position</div>
                <div className="text-2xl font-bold">P{stats.avgPosition.toFixed(1)}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="text-sm text-gray-600">In Target Range</div>
                <div className="text-2xl font-bold text-green-600">{stats.targetPercentage.toFixed(0)}%</div>
              </div>
              <div className="p-4 rounded-lg border-2" style={{ borderColor: theme.primary, backgroundColor: theme.primary + '20' }}>
                <div className="text-sm text-gray-600">Avg Quali</div>
                <div className="text-2xl font-bold" style={{ color: theme.secondary }}>P{stats.avgQuali.toFixed(1)}</div>
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
                {recommendation.type === 'perfect' && <span className="text-2xl">{theme.mascot}</span>}
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
          <h2 className="text-xl font-bold mb-4" style={{ color: theme.secondary }}>Add New Race</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
              <input
                type="text"
                placeholder="e.g., Bahrain"
                value={currentRace.track}
                onChange={(e) => setCurrentRace({ ...currentRace, track: e.target.value })}
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: theme.primary }}
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
                style={{ borderColor: theme.primary }}
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
                style={{ borderColor: theme.primary }}
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
                style={{ borderColor: theme.primary }}
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
                style={{ borderColor: theme.primary }}
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
                style={{ borderColor: theme.primary }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input
              type="text"
              placeholder={`e.g., ${theme.mascotName} brought the magic today! 🏆✨`}
              value={currentRace.notes}
              onChange={(e) => setCurrentRace({ ...currentRace, notes: e.target.value })}
              className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: theme.primary }}
            />
          </div>
          
          <button
            onClick={addRace}
            disabled={!currentRace.track || !currentRace.racePosition}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-opacity"
            style={{ backgroundColor: theme.secondary }}
          >
            <PlusIcon />
            Add Race
          </button>
        </div>

        {races.length > 0 && (
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: theme.secondary }}>Race History</h2>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 px-3 py-2 text-white rounded-md hover:opacity-90 text-sm transition-opacity cursor-pointer"
                  style={{ backgroundColor: theme.primary }}>
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
                  style={{ backgroundColor: theme.primary }}
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
                  <tr className="border-b-2" style={{ borderColor: theme.secondary }}>
                    <th className="text-left py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>Track</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>Quali</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>Race</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>AI</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>TM Quali</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>TM Race</th>
                    <th className="text-left py-2 px-3 text-sm font-semibold" style={{ color: theme.secondary }}>Notes</th>
                    <th className="py-2 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {races.map((race) => {
                    const racePos = parseInt(race.racePosition);
                    const inTarget = racePos >= targetRange.min && racePos <= targetRange.max;
                    const isPodium = racePos <= 3;
                    const isEditing = editingRace && editingRace.id === race.id;
                    
                    if (isEditing) {
                      return (
                        <tr key={race.id} className="border-b border-gray-100 bg-blue-50">
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={editingRace.track}
                              onChange={(e) => setEditingRace({ ...editingRace, track: e.target.value })}
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={editingRace.qualiPosition}
                              onChange={(e) => setEditingRace({ ...editingRace, qualiPosition: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-center"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={editingRace.racePosition}
                              onChange={(e) => setEditingRace({ ...editingRace, racePosition: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-center"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={editingRace.aiLevel}
                              onChange={(e) => setEditingRace({ ...editingRace, aiLevel: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-center"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={editingRace.teammateQuali}
                              onChange={(e) => setEditingRace({ ...editingRace, teammateQuali: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-center"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              value={editingRace.teammateRace}
                              onChange={(e) => setEditingRace({ ...editingRace, teammateRace: e.target.value })}
                              className="w-full px-2 py-1 border rounded text-center"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={editingRace.notes}
                              onChange={(e) => setEditingRace({ ...editingRace, notes: e.target.value })}
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-1">
                              <button
                                onClick={saveEditRace}
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Save"
                              >
                                <SaveIcon />
                              </button>
                              <button
                                onClick={cancelEditRace}
                                className="text-red-600 hover:text-red-800 font-bold p-1"
                                title="Cancel"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    
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
                          <div className="flex gap-1">
                            <button
                              onClick={() => startEditRace(race)}
                              className="hover:bg-gray-200 p-1 rounded"
                              style={{ color: theme.primary }}
                              title="Edit"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => deleteRace(race.id)}
                              className="text-red-600 hover:text-red-800 font-bold p-1"
                              title="Delete"
                            >
                              ✕
                            </button>
                          </div>
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
          <p>{theme.mascot} Powered by {theme.mascotName} - {theme.name} {theme.mascot}</p>
          <p className="mt-1">Track your journey to glory in F1 25! ✨</p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<F1CareerTracker />);
