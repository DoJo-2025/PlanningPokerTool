import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { EstimationPage } from './pages/EstimationPage'
import { SettingsPage } from './pages/SettingsPage'
import { ThemeToggle } from './components/ui/ThemeToggle'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg">
              🃏 Planning Poker
            </NavLink>
            <div className="flex items-center gap-4">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`
                }
              >
                Settings
              </NavLink>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<EstimationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
