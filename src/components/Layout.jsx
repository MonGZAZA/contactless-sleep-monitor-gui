import { NavLink } from 'react-router-dom';
import { SlidersHorizontal, BarChart3, Shield, BookOpen, Wifi, BatteryFull } from 'lucide-react';

const navItems = [
  { to: '/', icon: SlidersHorizontal, label: 'Simulator' },
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/emergency', icon: Shield, label: 'Emergency' },
  { to: '/guide', icon: BookOpen, label: 'Guide' },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="DreamGuard" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              DreamGuard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Connected</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <BatteryFull className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">100%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-violet-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`relative ${isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">{label}</span>
                  {isActive && (
                    <div className="absolute -bottom-0.5 w-8 h-0.5 rounded-full bg-violet-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
