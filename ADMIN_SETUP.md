# 🎮 SteamPadlock Admin Dashboard - Setup Guide

## ✅ What Was Added

A fully functional **Admin Dashboard** that allows you to:
- ✨ **Upload Games** - Add new games with title, category, price, description, and cover images
- 🎨 **Change Color Schemes** - Switch between 4 pre-designed themes (Midnight Cyan, Electric Purple, Neon Green, Deep Blue)
- 📸 **Upload Custom Background** - Set portrait-style background images for the website
- ⚙️ **View Settings** - Monitor total games, current theme, and background status

## 🚀 How to Access

1. Visit: **https://ericmosha678-ui.github.io/STEAMPADLOCK/**
2. Click the **⚙️ Admin** button in the top-right navigation bar
3. The Admin Dashboard modal will open

## 📋 Admin Dashboard Tabs

### 🎮 Games Tab
- **Add Games**: Fill in game title, category, price, description, and upload an image
- **View Games**: See all uploaded games in a scrollable list
- **Game Counter**: View total number of games uploaded

**Supported Categories:**
- Action
- Adventure
- RPG
- Strategy
- Sports
- Simulation

### 🎨 Appearance Tab
#### Color Schemes
Choose from 4 beautiful themes:
- **Midnight Cyan** (Default) - Cool cyan and lime accents
- **Electric Purple** - Bold purple and cyan vibes
- **Neon Green** - Bright green with magenta accents
- **Deep Blue** - Professional blue with golden highlights

#### Background Images
- Click the upload area or drag & drop a portrait-style image
- Preview shows in real-time
- Changes persist across sessions

### ⚙️ Settings Tab
- View dashboard statistics
- See current color scheme
- Check background configuration
- About section with version info

## 💾 Data Persistence

All changes are automatically saved to your browser's local storage:
- `steampadlock_games` - Uploaded games list
- `steampadlock_scheme` - Selected color scheme
- `steampadlock_bg` - Custom background image

**Note:** Data persists only in the same browser. To sync across devices, we recommend connecting a backend database.

## 🔧 Technical Stack

- **Framework:** React 18.3
- **Styling:** Tailwind CSS 3.4
- **State Management:** React hooks + localStorage
- **Build Tool:** Vite 5.4
- **Charts:** Recharts 2.9
- **Animations:** (Framer Motion ready)

## 📁 Project Structure

```
website/
├── src/
│   ├── App.jsx              # Main app component with dashboard integration
│   ├── AdminDashboard.jsx   # Admin dashboard component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup Instructions

```bash
# Navigate to website directory
cd website

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 📤 Deploying Updates

After making changes locally:

```bash
# Build the project
cd website
npm run build

# Copy dist files to root
cp dist/assets/* ../assets/
cp dist/index.html ../index.html

# Commit and push to GitHub
cd ..
git add index.html assets/
git commit -m "Update website with new changes"
git push origin main
```

**GitHub Pages will automatically deploy within minutes!**

## 🎨 Customizing Color Schemes

Edit `website/src/AdminDashboard.jsx`:

```javascript
const colorSchemes = [
  {
    name: 'Your Theme',
    primary: '#YOUR_COLOR',
    secondary: '#SECONDARY_COLOR',
    accent: '#ACCENT_COLOR',
    id: 'your-theme-id'
  }
];
```

## 🐛 Troubleshooting

### Admin button not showing
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

### Games not saving
- Check if localStorage is enabled in your browser
- Check browser console for errors (F12)

### Colors not applying
- Some themes require page refresh
- Clear localStorage if colors seem stuck

### Background not uploading
- Ensure image is in JPEG, PNG, or WebP format
- Recommended size: 1080x1920px (portrait orientation)

## 📞 Support

For issues or questions:
1. Check the browser console (F12)
2. Review this documentation
3. Check the GitHub repository issues

## 🎯 Future Enhancements

Recommended features to add:
- [ ] Backend API for persistent data storage
- [ ] User authentication for admin access
- [ ] Game ratings and reviews
- [ ] Payment integration
- [ ] Download statistics
- [ ] Email notifications
- [ ] Two-factor authentication

## 📄 License

SteamPadlock © 2026. All rights reserved.

---

**Happy gaming! 🎮**
