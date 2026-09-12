import React from 'react';
import {
  MapPin,
  Mail,
  Instagram,
  Send,
  ExternalLink,
  Flame,
  Shield,
  BookOpen
} from 'lucide-react';
import { PublicViewType } from '../../types';

interface PublicFooterProps {
  onNavigate: (view: PublicViewType) => void;
  onOpenAdminLogin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate, onOpenAdminLogin }) => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      {/* Upper Call to Action for Student Organizing */}
      <div className="border-b border-neutral-800/80 bg-gradient-to-r from-red-950/40 via-neutral-900/40 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Organização de Base & Combate Estudantil</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                O CACISO é construído pela voz de cada estudante
              </h3>
              <p className="text-neutral-400 text-sm max-w-xl">
                Participe das reuniões abertas de gestão, traga as demandas da sua turma e fortaleça a luta pela universidade popular.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('assembleias')}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-md shadow-red-950/40"
              >
                Conferir Assembleias
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pautas')}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm transition-all border border-neutral-700"
              >
                Acompanhar Pautas
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: About CACISO */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-display font-black text-lg shadow-sm">
                CS
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base leading-tight">CACISO UFBA</h4>
                <p className="text-xs text-neutral-400">Centro Acadêmico de Ciências Sociais</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Entidade representativa dos estudantes de Bacharelado e Licenciatura em Ciências Sociais da Universidade Federal da Bahia. Fundado na defesa da soberania popular, permanência estudantil e pensamento crítico.
            </p>
            <div className="flex items-start gap-2 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                Estrada de São Lázaro, 197 — Federação, Salvador - BA. Campus de São Lázaro, FFCH - Térreo.
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-neutral-200">
              Navegação do Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inicio')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('noticias')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Notícias e Informes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('eventos')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Agenda de Eventos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('assembleias')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Assembleias Gerais & Atas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pautas')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Quadro de Pautas e Lutas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('categorias')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Filtro Global por Categorias
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-neutral-200">
              Links Úteis UFBA
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://siac.ufba.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <span>SIAC — Sistema Acadêmico</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://proae.ufba.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <span>PROAE — Assistência Estudantil</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ffch.ufba.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <span>FFCH — Faculdade de Filosofia e Ciências Humanas</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://biblioteca.ufba.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <span>Sistema de Bibliotecas SIBI/UFBA</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-neutral-400">
                  <BookOpen className="w-3.5 h-3.5 text-red-400" />
                  <span>DCE UFBA — Diretório Central dos Estudantes</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-neutral-200">
              Comunicação & Redes
            </h4>
            <p className="text-xs text-neutral-400">
              Acompanhe as convocações urgentes nos canais diretos da gestão:
            </p>
            <div className="space-y-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs border border-neutral-800/80"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@cacisoufba (Instagram Oficial)</span>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs border border-neutral-800/80"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Canal de Informes (Telegram)</span>
              </a>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900 text-neutral-300 text-xs border border-neutral-800/80">
                <Mail className="w-4 h-4 text-red-400" />
                <span>caciso@ufba.br</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 underline transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Acesso restrito à Coordenação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} CACISO UFBA. Todos os direitos reservados à classe estudantil trabalhadora.</p>
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-semibold tracking-wide">
              "A luta muda o que a teoria aponta"
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
