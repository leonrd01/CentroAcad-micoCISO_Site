import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Flame,
  Users,
  Shield,
  ExternalLink,
  LogOut,
  Menu,
  X,
  UserCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdminViewType, UserAdmin } from '../../types';

interface AdminLayoutProps {
  currentTab: AdminViewType;
  onNavigateTab: (tab: AdminViewType) => void;
  onViewPublicSite: () => void;
  currentUser: UserAdmin | null;
  onLogout: () => void;
  children: React.ReactNode;
  noticiasCount: number;
  eventosCount: number;
  assembleiasCount: number;
  pautasCount: number;
  usersCount: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onNavigateTab,
  onViewPublicSite,
  currentUser,
  onLogout,
  children,
  noticiasCount,
  eventosCount,
  assembleiasCount,
  pautasCount,
  usersCount,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: {
    id: AdminViewType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'noticias', label: 'Notícias & Informes', icon: FileText, count: noticiasCount },
    { id: 'eventos', label: 'Eventos da Agenda', icon: Calendar, count: eventosCount },
    { id: 'assembleias', label: 'Assembleias & Atas', icon: Flame, count: assembleiasCount },
    { id: 'pautas', label: 'Pautas & Lutas', icon: Users, count: pautasCount },
    { id: 'usuarios', label: 'Gestão de Usuários', icon: Shield, count: usersCount },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-sm">
            CS
          </div>
          <div>
            <span className="font-display font-bold text-sm text-white">CACISO Admin</span>
            <span className="block text-[10px] text-neutral-400">UFBA São Lázaro</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-neutral-800 text-neutral-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-neutral-900/95 border-r border-neutral-800 flex flex-col justify-between p-4 transition-transform duration-200 backdrop-blur-md ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Header */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-black text-lg shadow-md border border-red-500/40">
              CS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-base text-white tracking-wider">
                  CACISO
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-red-400 border border-neutral-700 font-bold uppercase">
                  Painel
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium truncate">
                Gestão Discente UFBA
              </p>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-2">
              Módulos Administrativos
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigateTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-950/50 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-red-800 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Direct Return to Public Site Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onViewPublicSite}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-red-400 transition-colors" />
                <span>Ver Site Público</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Card in Sidebar Bottom */}
        <div className="pt-4 border-t border-neutral-800 space-y-3">
          {currentUser && (
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-neutral-400">
                  Operador Conectado
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                    currentUser.papel === 'Administrador Principal'
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {currentUser.papel === 'Administrador Principal' ? 'Admin Geral' : 'Conteúdo'}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">{currentUser.nome}</p>
              <p className="text-[11px] text-neutral-400 truncate">{currentUser.email}</p>
            </div>
          )}

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-950/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Desconectar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-neutral-900/80 border-b border-neutral-800 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Módulo Ativo:
            </span>
            <span className="font-display font-bold text-lg text-white">
              {menuItems.find((m) => m.id === currentTab)?.label}
            </span>
          </div>

          {/* Topbar User Identification & Badges */}
          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-red-950 border border-red-700/80 text-red-300 font-bold text-xs flex items-center justify-center">
                  {currentUser.nome.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white leading-tight">
                      {currentUser.nome}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        currentUser.papel === 'Administrador Principal'
                          ? 'bg-red-900/60 text-red-300 border border-red-700'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      {currentUser.papel}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    {currentUser.cargoGestao}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Encerrar Sessão"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
