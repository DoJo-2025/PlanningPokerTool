import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { EstimationPage } from './pages/EstimationPage'
import { SettingsPage } from './pages/SettingsPage'
import { ThemeToggle } from './components/ui/ThemeToggle'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2.5 font-bold text-gray-900 dark:text-white text-lg tracking-tight">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm shadow-glow">
                🃏
              </span>
              Planning Poker
            </NavLink>
            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`
                }
              >
                Estimate
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`
                }
              >
                Settings
              </NavLink>
              <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
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
