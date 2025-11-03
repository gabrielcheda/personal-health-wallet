# 360 Health Wallet

Uma plataforma completa de registros de saúde pessoal que centraliza todas as prescrições médicas, exames, dietas, treinos e documentos de saúde em um único espaço digital seguro.

## 🌟 Características Principais

### Páginas Principais

1. **Dashboard (/dashboard)** - Visão geral da saúde
   - Score de saúde personalizado
   - Medicamentos de hoje
   - Alertas de saúde
   - Atividades recentes
   - Conquistas e gamificação

2. **Prescrições (/prescriptions)** - Gerenciamento completo
   - Prescrições ativas e concluídas
   - Detalhes de medicamentos
   - Interações medicamentosas
   - Download e compartilhamento
   - Alternativas genéricas

3. **Exames (/exams)** - Resultados laboratoriais
   - Exames de sangue e imagens
   - Comparação com valores de referência
   - Tendências e alertas
   - Histórico completo

4. **Nutrição (/nutrition)** - Planejamento alimentar
   - Planos nutricionais personalizados
   - Macronutrientes e calorias
   - Opções de refeições
   - Progresso de peso
   - Suplementação

5. **Treinos (/fitness)** - Exercícios
   - Planos de treino semanais
   - Exercícios detalhados
   - Vídeos demonstrativos
   - Progresso e métricas

6. **Linha do Tempo (/timeline)** - Histórico de saúde
   - Cronologia completa
   - Consultas, exames, procedimentos
   - Filtros por categoria

7. **Emergência (/emergency)** - Informações críticas
   - Tipo sanguíneo
   - Alergias e condições crônicas
   - Contatos de emergência
   - Informações de seguro
   - QR Code para acesso rápido

8. **Médicos (/providers)** - Equipe de saúde
   - Lista de profissionais
   - Especialidades
   - Contatos e localização
   - Histórico de consultas
   - Favoritos

9. **Documentos (/documents)** - Cofre seguro
   - Carteirinhas de seguro
   - Cartões de vacinação
   - Relatórios médicos
   - Certificados

10. **Insights (/insights)** - Análises de saúde
    - Score de saúde detalhado
    - Alertas e recomendações
    - Metas de saúde
    - Tendências

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v3** - Estilização
- **Lucide React** - Ícones
- **Recharts** - Visualização de dados (preparado)
- **date-fns** - Manipulação de datas

## 🎨 Design

- **Tema Base**: Purple (#9333ea) como cor primária
- **Dark Mode**: Suporte completo a tema escuro
- **Responsivo**: Mobile-first design
- **PWA**: Progressive Web App configurado
- **Acessibilidade**: ARIA labels e navegação por teclado

## 📱 Features Implementadas

### Core Features
- ✅ Dashboard completo com widgets
- ✅ Sistema de prescrições
- ✅ Gerenciamento de exames
- ✅ Planos de nutrição
- ✅ Planos de treino
- ✅ Linha do tempo de saúde
- ✅ Cartão de emergência
- ✅ Gestão de médicos
- ✅ Cofre de documentos
- ✅ Insights de saúde

### UI/UX
- ✅ Sistema de componentes reutilizáveis
- ✅ Cards, Badges, Buttons
- ✅ Navegação lateral (desktop)
- ✅ Navegação inferior (mobile)
- ✅ Header com busca e notificações
- ✅ Dark mode toggle
- ✅ Design responsivo completo

### Dados
- ✅ Mock data completo em português brasileiro
- ✅ Tipos TypeScript para todos os modelos
- ✅ Dados realistas de saúde
- ✅ Nomes de medicamentos brasileiros
- ✅ Laboratórios e clínicas brasileiras

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 📂 Estrutura do Projeto

```
personal-health-wallet/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Redirect para /dashboard
│   ├── dashboard/         # Dashboard (página principal)
│   ├── prescriptions/     # Prescrições
│   ├── exams/             # Exames
│   ├── nutrition/         # Nutrição
│   ├── fitness/           # Treinos
│   ├── timeline/          # Linha do tempo
│   ├── emergency/         # Emergência
│   ├── providers/         # Médicos
│   ├── documents/         # Documentos
│   └── insights/          # Insights
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Card, Badge, Button)
│   └── layout/           # Layout components (Sidebar, Header, MobileNav)
├── data/                 # Mock data (dados fictícios em PT-BR)
├── lib/                  # Utilitários (utils.ts)
├── types/                # TypeScript types (30+ interfaces)
├── public/               # Assets estáticos
│   └── manifest.json     # PWA manifest
└── __tests__/            # Testes unitários (174 testes)

## 🌐 PWA

O app está configurado como Progressive Web App:
- ✅ Manifest configurado (`public/manifest.json`)
- ✅ Instalável em dispositivos móveis e desktop
- ✅ Atalhos rápidos para páginas principais
- ⚠️ **Ícones PWA precisam ser criados** (ver [PWA_SETUP.md](./PWA_SETUP.md))
- ⏳ Offline support (estrutura preparada)

**Nota:** Os ícones `icon-192.png` e `icon-512.png` precisam ser adicionados ao diretório `public/`. Veja instruções detalhadas em [PWA_SETUP.md](./PWA_SETUP.md).

## 🎯 Próximos Passos (Opcionais)

- [ ] Backend API com autenticação
- [ ] Banco de dados real
- [ ] Upload de arquivos
- [ ] OCR para digitalizar prescrições
- [ ] Notificações push
- [ ] Integração com wearables
- [ ] Telemedicina
- [ ] Rastreador de sintomas
- [ ] Compartilhamento seguro
- [ ] Gestão familiar

## 📄 Licença

Este projeto foi criado como demonstração. Todos os dados são fictícios.

## 👨‍💻 Desenvolvido com Claude Code

Plataforma completa desenvolvida com Next.js 14, TypeScript e Tailwind CSS.
"# personal-health-wallet" 
