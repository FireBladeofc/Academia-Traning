# 💪 FitBody — Guia de Exercícios & Treinos

> Aplicativo web PWA para gerenciamento de treinos, guia de exercícios com instruções detalhadas e acompanhamento muscular visual — adaptado aos equipamentos da academia do condomínio.

---

## 🎯 Funcionalidades

- **🏋️ Banco de Exercícios** — +60 exercícios organizados por grupo muscular, com imagens de execução, instruções passo a passo e dicas
- **📅 Plano Semanal** — Rotina de treino completa (Seg–Sáb) adaptada aos equipamentos disponíveis: Smith Machine, polias, halteres
- **⏱️ Modo Treino Ativo** — Cronômetro, checklist de séries e instruções expandíveis durante o treino
- **🫀 Mapa Muscular** — Modelo 3D do corpo humano que destaca os músculos treinados e indica fadiga
- **⭐ Favoritos** — Salva exercícios favoritos no localStorage
- **📱 PWA** — Funciona offline e pode ser instalado como app no celular

---

## 🏗️ Equipamentos da Academia (adaptados)

| Equipamento | Exercícios suportados |
|---|---|
| **Smith Machine** | Supino reto/inclinado, Agachamento, Desenvolvimento |
| **Máquina de Cabo** | Crossover, Puxada, Tríceps corda, Remada baixa, Pulldown |
| **Functional Trainer Gold Plus** | Crucifixo inverso, Elevação lateral, Woodchop |
| **Rack de Halteres** | Crucifixo, Rosca, Stiff, Afundo, Elevação lateral |

---

## 📅 Plano de Treino

| Dia | Foco |
|---|---|
| **Segunda** | 💪 Peito + Tríceps |
| **Terça** | 🦅 Costas + Bíceps |
| **Quarta** | 🦵 Pernas |
| **Quinta** | 🏋️ Ombros + Abdômen |
| **Sexta** | 🔥 Costas + Ombros (Especialização Formato V) |
| **Sábado** | 🚶 Cardio / 🧘 Mobilidade |
| **Domingo** | 😴 Descanso |

---

## 🚀 Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/FireBladeofc/AcademiaProjects.git
   ```
2. Abra `index.html` diretamente no navegador **ou** sirva com um servidor local:
   ```bash
   npx http-server . -p 8080
   ```
3. Acesse `http://localhost:8080`

> **Não precisa de build** — é 100% HTML + CSS + JavaScript vanilla.

---

## 📁 Estrutura do Projeto

```
AcademiaProjects/
├── index.html              # Ponto de entrada da SPA
├── manifest.json           # PWA manifest
├── css/
│   ├── index.css           # Design system & tokens
│   ├── components.css      # Componentes reutilizáveis
│   ├── pages.css           # Estilos específicos por página
│   └── animations.css      # Micro-animações
├── js/
│   ├── app.js              # Controlador principal (SPA Router)
│   ├── data.js             # Banco de dados de exercícios
│   ├── components/         # Navbar e componentes globais
│   ├── pages/              # Controllers de cada página
│   └── utils/              # Storage (localStorage) & busca
└── assets/
    └── images/
        └── exercises/      # Imagens de execução dos exercícios (92+ imagens)
```

---

## 🛠️ Tech Stack

- **HTML5** — SPA com roteamento manual
- **CSS3** — Design system com variáveis CSS, glassmorphism, animações
- **JavaScript ES6+** — Vanilla JS, sem frameworks
- **localStorage** — Persistência de treinos, favoritos e histórico
- **PWA** — Service Worker + Web Manifest

---

## 📸 Screenshots

> *App rodando com o plano de treino semanal completo e execução didática dos exercícios.*

---

## 📄 Licença

MIT © Rafael Rodrigues
