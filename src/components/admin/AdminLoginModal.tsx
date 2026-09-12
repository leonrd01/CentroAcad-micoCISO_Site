import React, { useState } from 'react';
import { X, Lock, Mail, Shield, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { UserAdmin } from '../../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAdmin) => void;
  availableUsers: UserAdmin[];
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  availableUsers,
}) => {
  const [email, setEmail] = useState('admin@caciso.ufba.br');
  const [senha, setSenha] = useState('caciso2026');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const matchedUser = availableUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matchedUser) {
      if (matchedUser.status === 'Inativo') {
        setErrorMsg('Este usuário está com o acesso inativo. Procure a Coordenação Geral.');
        return;
      }
      onLoginSuccess(matchedUser);
      onClose();
    } else {
      // Allow demo login with any credentials if user typed something new, default to principal admin
      const fallbackUser: UserAdmin = {
        id: 'user-custom',
        nome: email.split('@')[0] || 'Membro da Gestão',
        email: email,
        papel: 'Administrador Principal',
        cargoGestao: 'Gestão CACISO',
        status: 'Ativo',
        ultimoAcesso: 'Agora mesmo',
      };
      onLoginSuccess(fallbackUser);
      onClose();
    }
  };

  const handleQuickLogin = (user: UserAdmin) => {
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Painel da Gestão CACISO
          </h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto">
            Acesso exclusivo para membros da coordenação do Centro Acadêmico e administradores de conteúdo.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 block">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@caciso.ufba.br"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 block">
                Senha de Acesso
              </label>
              <span className="text-[11px] text-neutral-500">Mínimo 6 dígitos</span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 mt-2"
          >
            <span>Entrar no Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Accounts Selection */}
        <div className="pt-4 border-t border-neutral-800 space-y-2.5">
          <p className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider text-center">
            Acesso Rápido de Demonstração (1 Clique):
          </p>
          <div className="grid grid-cols-1 gap-2">
            {availableUsers.slice(0, 2).map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickLogin(user)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors group"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                    {user.nome}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {user.papel} • {user.email}
                  </p>
                </div>
                <UserCheck className="w-4 h-4 text-neutral-500 group-hover:text-red-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
