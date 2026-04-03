import { useState } from 'react';

const colorSchemes = [
  {
    name: 'Midnight Cyan',
    primary: '#01f5f5',
    secondary: '#0b1125',
    accent: '#8fff3b',
    id: 'midnight-cyan'
  },
  {
    name: 'Electric Purple',
    primary: '#bf00ff',
    secondary: '#1a0033',
    accent: '#00ffff',
    id: 'electric-purple'
  },
  {
    name: 'Neon Green',
    primary: '#00ff41',
    secondary: '#0a1f0a',
    accent: '#ff006e',
    id: 'neon-green'
  },
  {
    name: 'Deep Blue',
    primary: '#0074e4',
    secondary: '#00051f',
    accent: '#ffd60a',
    id: 'deep-blue'
  },
];

function AdminDashboard({ isOpen, onClose, onGameAdd, onColorSchemeChange, onBackgroundChange, games, currentColorScheme, currentBackground }) {
  const [activeTab, setActiveTab] = useState('games');
  const [gameForm, setGameForm] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });
  const [gameImage, setGameImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGameFormChange = (e) => {
    const { name, value } = e.target;
    setGameForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGameImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setGameImage(reader.result);
      setGameForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    if (!gameForm.title || !gameForm.category || !gameForm.price || !gameForm.description) {
      alert('Please fill all fields');
      return;
    }
    onGameAdd({
      id: Date.now(),
      ...gameForm,
      image: gameForm.image || '🎮'
    });
    setGameForm({ title: '', category: '', price: '', description: '', image: '' });
    setGameImage(null);
    setSuccessMessage('Game added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onBackgroundChange(reader.result);
      setSuccessMessage('Background updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy/95 border border-cyan/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-midnight/80 border-b border-cyan/20 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-cyan">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="text-2xl text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-lime/20 border border-lime/50 text-lime text-sm">
            ✓ {successMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-cyan/20 sticky top-20 bg-midnight/80">
          {['games', 'appearance', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 text-sm font-semibold uppercase transition ${
                activeTab === tab
                  ? 'border-b-2 border-cyan text-cyan'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab === 'games' && '🎮 Games'}
              {tab === 'appearance' && '🎨 Appearance'}
              {tab === 'settings' && '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Upload New Game</h3>
                <form onSubmit={handleAddGame} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-cyan/80 mb-2">Game Title</label>
                      <input
                        type="text"
                        name="title"
                        value={gameForm.title}
                        onChange={handleGameFormChange}
                        placeholder="e.g., Cyber Rush"
                        className="w-full rounded-lg border border-cyan/40 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-cyan/80 mb-2">Category</label>
                      <select
                        name="category"
                        value={gameForm.category}
                        onChange={handleGameFormChange}
                        className="w-full rounded-lg border border-cyan/40 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan"
                      >
                        <option value="">Select Category</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Sports">Sports</option>
                        <option value="Simulation">Simulation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-cyan/80 mb-2">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={gameForm.price}
                        onChange={handleGameFormChange}
                        placeholder="$9.99"
                        step="0.01"
                        className="w-full rounded-lg border border-cyan/40 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-cyan/80 mb-2">Game Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGameImageUpload}
                        className="block text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan/20 file:text-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-cyan/80 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={gameForm.description}
                      onChange={handleGameFormChange}
                      placeholder="Describe the game..."
                      rows="4"
                      className="w-full rounded-lg border border-cyan/40 bg-black/30 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-cyan/20 border border-cyan text-cyan font-bold hover:bg-cyan/30 transition uppercase text-sm"
                  >
                    Add Game
                  </button>
                </form>
              </div>

              {/* Games List */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Uploaded Games ({games.length})</h3>
                {games.length === 0 ? (
                  <p className="text-white/60">No games uploaded yet.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {games.map(game => (
                      <div key={game.id} className="border border-cyan/20 rounded-lg p-4 bg-black/30 hover:bg-black/50 transition">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-cyan font-bold">{game.title}</h4>
                            <p className="text-xs text-white/60">{game.category} • ${game.price}</p>
                            <p className="text-sm text-white/70 mt-2">{game.description}</p>
                          </div>
                          <div className="ml-4 text-right text-xl">{typeof game.image === 'string' && game.image.startsWith('data') ? '📦' : game.image}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              {/* Color Schemes */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Color Schemes</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {colorSchemes.map(scheme => (
                    <button
                      key={scheme.id}
                      onClick={() => onColorSchemeChange(scheme)}
                      className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                        currentColorScheme?.id === scheme.id
                          ? 'border-cyan bg-cyan/10'
                          : 'border-white/20 hover:border-cyan/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="space-y-1">
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-white/30"
                            style={{ backgroundColor: scheme.primary }}
                          />
                          <div className="flex gap-1">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: scheme.secondary }}
                            />
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: scheme.accent }}
                            />
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-bold">{scheme.name}</p>
                          <p className="text-xs text-white/60">Primary: {scheme.primary}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Upload */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Background Image</h3>
                <div className="border-2 border-dashed border-cyan/50 rounded-lg p-8 text-center hover:border-cyan transition">
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="hidden"
                    />
                    <div className="text-cyan text-3xl mb-2">📸</div>
                    <p className="font-semibold text-white mb-1">Upload Background Image</p>
                    <p className="text-sm text-white/60">Click to select a portrait-style image</p>
                  </label>
                </div>
                {currentBackground && (
                  <div className="mt-4">
                    <p className="text-sm text-cyan mb-2">Current Background:</p>
                    <div
                      className="w-full h-48 rounded-lg border border-cyan/30 bg-cover bg-center"
                      style={{ backgroundImage: `url(${currentBackground})` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border border-cyan/20 rounded-lg p-6 bg-black/30">
                <h3 className="text-lg font-bold text-white mb-4">Admin Settings</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 border border-white/10 rounded-lg">
                    <span className="text-white/80">Total Games Uploaded</span>
                    <span className="text-cyan font-bold text-lg">{games.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-white/10 rounded-lg">
                    <span className="text-white/80">Current Color Scheme</span>
                    <span className="text-lime font-bold">{currentColorScheme?.name || 'Default'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-white/10 rounded-lg">
                    <span className="text-white/80">Background Status</span>
                    <span className={currentBackground ? 'text-lime font-bold' : 'text-orange-400 font-bold'}>
                      {currentBackground ? 'Custom' : 'Default'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-yellow-600/30 rounded-lg p-6 bg-yellow-950/20">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">About</h3>
                <p className="text-sm text-white/70">
                  Admin Dashboard v1.0 - Manage your SteamPadlock gaming hub with ease.
                </p>
                <p className="text-xs text-white/50 mt-3">© 2026 SteamPadlock. All rights reserved.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
