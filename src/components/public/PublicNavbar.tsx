import React, { useState } from 'react';
import {
  Menu,
  X,
  Shield,
  Flame,
  Calendar,
  FileText,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { PublicViewType, UserAdmin } from '../../types';

interface PublicNavbarProps {
  currentView: PublicViewType;
  onNavigate: (view: PublicViewType) => void;
  onOpenAdminLogin: () => void;
  onGoToAdminPanel: () => void;
  currentUser: UserAdmin | null;
  onLogout: () => void;
  urgentAssemblyCount: number;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAdminLogin,
  onGoToAdminPanel,
  currentUser,
  onLogout,
  urgentAssemblyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PublicViewType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'inicio', label: 'Início', icon: Sparkles },
    { id: 'noticias', label: 'Notícias & Informes', icon: FileText },
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'assembleias', label: 'Assembleias', icon: Flame, badge: urgentAssemblyCount },
    { id: 'pautas', label: 'Pautas & Lutas', icon: Users },
    { id: 'categorias', label: 'Categorias', icon: Layers },
  ];

  const handleNavClick = (view: PublicViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      {/* Revolutionary Marquee/Banner strip */}
      <div className="bg-red-700 text-white text-xs font-semibold px-4 py-1 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 tracking-wide mx-auto md:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>UFBA • FACULDADE DE FILOSOFIA E CIÊNCIAS HUMANAS • CAMPUS SÃO LÁZARO</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-red-100 font-medium text-[11px]">
          <span>Gestão Viva e Combativa • Mandato 2026/2027</span>
          <span className="opacity-40">|</span>
          <span className="underline decoration-red-300">Em defesa da Universidade Pública</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
            aria-label="Ir para a página inicial"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-md shadow-red-950/50 border border-red-500/40 group-hover:scale-105 transition-transform">
              <span className="font-display font-black text-xl tracking-tighter">CS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-neutral-100 group-hover:text-red-400 transition-colors">
                  CACISO
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  UFBA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium tracking-tight line-clamp-1">
                Centro Acadêmico de Ciências Sociais • São Lázaro
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navegação Principal">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-neutral-800/90 shadow-inner'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-neutral-500'}`} />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-bold animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Admin Access & User Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5 pr-2.5">
                <button
                  type="button"
                  onClick={onGoToAdminPanel}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white transition-colors text-xs font-semibold border border-red-500/30"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Painel ({currentUser.papel.replace('Administrador ', '')})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sair da Sessão"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-700/80 transition-all shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span>Área da Gestão (Admin)</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <button
                type="button"
                onClick={onGoToAdminPanel}
                className="p-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                title="Painel Admin"
              >
                <Shield className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-red-950/50 border border-red-800/60'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-red-400' : 'text-neutral-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
                      {link.badge} urgente
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-neutral-800">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoToAdminPanel();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span>Acessar Painel da Gestão</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Desconectar Sessão ({currentUser.nome})</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold text-sm"
              >
                <Shield className="w-4 h-4 text-red-400" />
                <span>Acessar Painel Administrativo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
