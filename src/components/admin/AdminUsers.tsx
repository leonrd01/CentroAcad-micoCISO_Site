import React, { useState } from 'react';
import {
  Shield,
  UserPlus,
  Mail,
  UserCheck,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { UserAdmin, UserRole } from '../../types';

interface AdminUsersProps {
  users: UserAdmin[];
  currentUser: UserAdmin | null;
  onUpdateRole: (userId: string, newRole: UserRole) => void;
  onToggleStatus: (userId: string) => void;
  onAddUser: (user: UserAdmin) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  users,
  currentUser,
  onUpdateRole,
  onToggleStatus,
  onAddUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargoGestao, setCargoGestao] = useState('');
  const [papel, setPapel] = useState<UserRole>('Administrador de Conteúdo');

  const filteredUsers = users.filter((u) => {
    return (
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cargoGestao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    const newUser: UserAdmin = {
      id: `user-${Date.now()}`,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      papel,
      cargoGestao: cargoGestao.trim() || 'Membro da Gestão',
      status: 'Ativo',
      ultimoAcesso: 'Nunca acessou',
    };

    onAddUser(newUser);
    setShowAddModal(false);
    setNome('');
    setEmail('');
    setCargoGestao('');
    setPapel('Administrador de Conteúdo');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            <span>Módulo de Gestão de Usuários & Níveis de Acesso</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Controle quem tem acesso ao painel do CACISO e alterne entre <strong>Administrador Principal</strong> e <strong>Administrador de Conteúdo</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Convidar Membro</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar membro por nome, e-mail ou cargo na gestão..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Membro & E-mail</th>
                <th className="py-3.5 px-4">Função na Gestão</th>
                <th className="py-3.5 px-4">Nível de Acesso (Seletor)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Último Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredUsers.map((u) => {
                const isCurrent = currentUser?.id === u.id;

                return (
                  <tr key={u.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-950 border border-red-800 flex items-center justify-center font-bold text-xs text-red-300">
                          {u.nome.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white flex items-center gap-1.5">
                            <span>{u.nome}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded">
                                Você
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-neutral-400">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-300 whitespace-nowrap">
                      {u.cargoGestao}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {/* Seletor exigido pelo prompt */}
                      <select
                        value={u.papel}
                        onChange={(e) => onUpdateRole(u.id, e.target.value as UserRole)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none transition-colors ${
                          u.papel === 'Administrador Principal'
                            ? 'bg-red-950/70 text-red-300 border-red-700 focus:border-red-400'
                            : 'bg-neutral-950 text-neutral-300 border-neutral-700 focus:border-neutral-400'
                        }`}
                      >
                        <option value="Administrador Principal">
                          👑 Administrador Principal
                        </option>
                        <option value="Administrador de Conteúdo">
                          ✍️ Administrador de Conteúdo
                        </option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(u.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          u.status === 'Ativo'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
                        }`}
                      >
                        {u.status === 'Ativo' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        <span>{u.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                      {u.ultimoAcesso}
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-neutral-500 italic">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5 text-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-red-500" />
                <span>Adicionar Membro ao Painel</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Beatriz Lima"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">
                  E-mail de Acesso
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="beatriz@caciso.ufba.br"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Cargo / Setor na Gestão
                </label>
                <input
                  type="text"
                  value={cargoGestao}
                  onChange={(e) => setCargoGestao(e.target.value)}
                  placeholder="Ex: Secretaria de Assuntos Estudantis"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">
                  Nível de Acesso Inicial
                </label>
                <select
                  value={papel}
                  onChange={(e) => setPapel(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                >
                  <option value="Administrador de Conteúdo">
                    Administrador de Conteúdo (Criação e edição de textos)
                  </option>
                  <option value="Administrador Principal">
                    Administrador Principal (Acesso completo e gestão de usuários)
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-semibold text-neutral-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white"
                >
                  Cadastrar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
