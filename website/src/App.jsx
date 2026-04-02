import { useState } from 'react';

const categories = [
  'Action', 'Adventure', 'Anime', 'Horror', 'Multiplayer', 'Open World', 'Racing', 'Shooting', 'Simulation', 'Sports', 'Strategy', 'RPG'
];

const subscriptions = [
  {
    name: 'Free Trial',
    price: '$0.00',
    period: '/month',
    duration: '1 Month Trial Only',
    features: ['✓ Access 3 games', '✓ 1 month free trial', '✓ Basic support', '✓ Standard downloads'],
    tier: 'free-tier'
  },
  {
    name: 'Premium',
    price: '$6.99',
    period: '/month',
    freeGames: '6 Free Games',
    features: ['✓ Access 6 free games', '✓ Premium support', '✓ Fast downloads', '✓ No ads'],
    tier: 'premium-tier',
    popular: true
  },
  {
    name: 'Pro',
    price: '$12.99',
    period: '/month',
    freeGames: 'Unlimited Games',
    features: ['✓ Unlimited access', '✓ Priority support', '✓ Exclusive content', '✓ Beta access'],
    tier: 'pro-tier'
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-midnight text-white">
      {/* Header */}
      <header className="modern-header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <a href="#home" className="brand-link">
                <span className="brand-icon">🎮</span>
                <span className="brand-text">SteamPadlock Gaming Hub</span>
              </a>
            </div>
            <div className="nav-menu">
              <ul className="nav-list">
                <li className="nav-item">
                  <a href="#home" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                  <a href="#games" className="nav-link">Games</a>
                </li>
                <li className="nav-item dropdown">
                  <a href="#categories" className="nav-link dropdown-toggle">
                    Categories
                    <span className="dropdown-arrow">▼</span>
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map(cat => (
                      <li key={cat}>
                        <a href="#" className="dropdown-item" data-category={cat.toLowerCase()} onClick={() => setSelectedCategory(cat.toLowerCase())}>
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to SteamPadlock Gaming Hub</h1>
          <p className="hero-subtitle">Discover, Download & Play Amazing Games</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start Exploring</button>
            <a href="#games" className="btn btn-secondary">Browse Games</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-horizontal-grid">
        <div className="stat-glass-card">
          <span className="stat-number">1,247+</span>
          <span className="stat-label">Total Games</span>
        </div>
        <div className="stat-glass-card">
          <span className="stat-number">45.2K</span>
          <span className="stat-label">Downloads Today</span>
        </div>
        <div className="stat-glass-card">
          <span className="stat-number">892</span>
          <span className="stat-label">Active Users</span>
        </div>
        <div className="stat-glass-card">
          <span className="stat-number">4.8</span>
          <span className="stat-label">Rating</span>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="subscription-section">
        <h2 className="section-title">Choose Your Plan</h2>
        <div className="subscription-grid">
          {subscriptions.map(sub => (
            <div key={sub.name} className={`subscription-card ${sub.tier}`}>
              {sub.popular && <div className="featured-badge">Most Popular</div>}
              <h3>{sub.name}</h3>
              <div className="price">{sub.price}<span className="period">{sub.period}</span></div>
              {sub.duration && <div className="trial-duration">{sub.duration}</div>}
              {sub.freeGames && <div className="free-games">{sub.freeGames}</div>}
              <ul className="features">
                {sub.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
              <button className="btn btn-select" onClick={() => alert(`Selected ${sub.name}`)}>
                {sub.name === 'Free Trial' ? 'Get Free Trial' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for Games */}
      <section id="games">
        <h2>Games Section</h2>
        <p>Selected category: {selectedCategory}</p>
        {/* Add game cards here */}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-section">
                <h5>SteamPadlock Gaming Hub</h5>
                <p>Your premium gaming destination with instant downloads and secure payments.</p>
                <div className="social-links">
                  <a href="https://twitter.com/steampadlock" target="_blank" className="social-link" title="Follow us on Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://discord.gg/steampadlock" target="_blank" className="social-link" title="Join our Discord">
                    <i className="fab fa-discord"></i>
                  </a>
                  <a href="https://steamcommunity.com/groups/steampadlock" target="_blank" className="social-link" title="Join our Steam Group">
                    <i className="fab fa-steam"></i>
                  </a>
                  <a href="https://youtube.com/@steampadlock" target="_blank" className="social-link" title="Subscribe on YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="https://facebook.com/steampadlock" target="_blank" className="social-link" title="Like us on Facebook">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://instagram.com/steampadlock" target="_blank" className="social-link" title="Follow on Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://tiktok.com/@steampadlock" target="_blank" className="social-link" title="Follow on TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a href="https://reddit.com/r/steampadlock" target="_blank" className="social-link" title="Join our Reddit">
                    <i className="fab fa-reddit"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-section">
                <h5>Quick Links</h5>
                <ul className="footer-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#games">Games</a></li>
                  <li><a href="#categories">Categories</a></li>
                  <li><a href="#" onClick={() => alert('Support')}>Support</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-section">
                <h5>Legal</h5>
                <ul className="footer-links">
                  <li><a href="#" onClick={() => alert('Terms of Service')}>Terms of Service</a></li>
                  <li><a href="#" onClick={() => alert('Privacy Policy')}>Privacy Policy</a></li>
                  <li><a href="#" onClick={() => alert('Refund Policy')}>Refund Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <p>&copy; 2026 SteamPadlock Gaming Hub. All rights reserved.</p>
            <p>Made with <i className="fas fa-heart text-danger"></i> for gamers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
