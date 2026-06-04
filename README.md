# 🎭 playwright-mark

Projeto de automação de testes end-to-end (E2E) para a aplicação **Mark L** — um gerenciador de tarefas web. Os testes são construídos com [Playwright](https://playwright.dev/) e cobrem os fluxos de cadastro, atualização e exclusão de tarefas, validando a integração completa entre frontend e API.

[![Playwright Tests](https://github.com/nxbrv/playwright-mark/actions/workflows/playwright.yml/badge.svg)](https://github.com/nxbrv/playwright-mark/actions/workflows/playwright.yml)

---

## 📐 Arquitetura do Projeto

```
playwright-mark/
├── apps/
│   ├── api/          # API REST (Node.js + Express + TypeORM + SQLite)
│   └── web/          # Frontend estático servido via http-server
├── tests/
│   ├── fixtures/     # Dados de teste (JSON) e modelos TypeScript
│   ├── support/
│   │   ├── helpers.ts        # Funções utilitárias para chamadas à API
│   │   └── pages/tasks/      # Page Objects (padrão POM)
│   ├── home.spec.ts          # Teste de sanidade da aplicação web
│   └── tasks.spec.ts         # Testes de CRUD de tarefas
├── .github/workflows/
│   └── playwright.yml        # Pipeline de CI/CD (GitHub Actions)
├── playwright.config.ts      # Configuração do Playwright
└── .env                      # Variáveis de ambiente locais
```

---

## 🧪 Casos de Teste

| Suite | Cenário |
|---|---|
| **Sanidade** | Aplicação web está online e acessível |
| **Cadastro** | Criar nova tarefa com sucesso |
| **Cadastro** | Bloquear tarefa duplicada |
| **Cadastro** | Validar campo obrigatório |
| **Atualização** | Concluir (toggle) uma tarefa |
| **Exclusão** | Excluir uma tarefa da lista |

---

## 🛠️ Pré-requisitos

- [Node.js](https://nodejs.org/) **v20.x** (LTS)
- [Yarn](https://yarnpkg.com/) instalado globalmente

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/nxbrv/playwright-mark.git
cd playwright-mark
```

### 2. Instale as dependências do Playwright

```bash
yarn install
```

### 3. Instale as dependências das aplicações

```bash
# API
cd apps/api && yarn install && cd ../..

# Web
cd apps/web && yarn install && cd ../..
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL="http://localhost:8080"
BASE_API="http://localhost:3333"
```

### 5. Inicialize o banco de dados

```bash
cd apps/api
yarn db:init
cd ../..
```

### 6. Instale os browsers do Playwright

```bash
npx playwright install --with-deps
```

---

## ▶️ Executando os Testes

### Inicie os servidores locais

Abra dois terminais e execute:

```bash
# Terminal 1 — API (porta 3333)
cd apps/api && yarn dev

# Terminal 2 — Web (porta 8080)
cd apps/web && yarn dev
```

### Rode os testes

```bash
# Todos os testes
npx playwright test

# Com interface gráfica (UI Mode)
npx playwright test --ui

# Testes de um arquivo específico
npx playwright test tests/tasks.spec.ts

# Em um browser específico
npx playwright test --project=chromium
```

### Visualize o relatório HTML

```bash
npx playwright show-report
```

---

## 🌐 Browsers Suportados

| Browser | Dispositivo |
|---|---|
| Chromium | Desktop |
| Firefox | Desktop |
| WebKit | Desktop (Safari) |
| Mobile Chrome | Pixel 5 |
| Mobile Safari | iPhone 12 |

---

## 🔄 CI/CD com GitHub Actions

O pipeline é acionado automaticamente em **push** ou **pull request** para as branches `main` e `master`.

**Etapas do pipeline:**

1. Checkout do código
2. Setup do Node.js 20 (LTS)
3. Instalação das dependências (Playwright, API, Web)
4. Execução das migrations do banco de dados
5. Inicialização dos servidores em background
6. Aguarda os servidores ficarem prontos (`wait-on`)
7. Instalação dos browsers Playwright
8. Execução dos testes E2E
9. Upload do relatório HTML como artefato (retido por 30 dias)

> O relatório HTML fica disponível na aba **Actions > Artifacts** após cada execução do pipeline.

---

## 📦 Tecnologias

| Camada | Tecnologia |
|---|---|
| Testes E2E | [Playwright](https://playwright.dev/) 1.x |
| Linguagem | TypeScript |
| API (SUT) | Node.js + Express + TypeORM + SQLite (`better-sqlite3`) |
| Web (SUT) | HTML/CSS/JS estático via `http-server` |
| CI/CD | GitHub Actions |
| Gerenciador de pacotes | Yarn |

---

## 📁 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `BASE_URL` | URL base da aplicação web | `http://localhost:8080` |
| `BASE_API` | URL base da API REST | `http://localhost:3333` |
