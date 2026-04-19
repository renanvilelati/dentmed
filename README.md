# 🏥 Clinic SaaS — Plataforma de Gestão e Agendamento

![Hero Image](https://ik.imagekit.io/dzojbyqyz/tela.png)

Uma plataforma SaaS moderna para gestão de clínicas, permitindo que profissionais de saúde organizem seus atendimentos e que pacientes realizem agendamentos de forma simples e eficiente.

---

## ✨ Visão Geral

Este projeto foi desenvolvido com foco em **escalabilidade, performance e experiência do usuário**, utilizando práticas modernas do ecossistema React/Next.js.

A aplicação permite:

- Cadastro de clínicas e profissionais
- Gerenciamento de horários disponíveis
- Agendamento de consultas por pacientes
- Realizar pagamento através do Stripe
- Autenticação segura (email/senha + login social)
- Interface responsiva (mobile-first)

---

## 🚀 Tecnologias Utilizadas

### Front-end

- Next.js (App Router)
- React
- Tailwind CSS
- Shadcn/UI
- React Hook Form
- Zod

### Back-end

- Node.js
- Prisma ORM

### Autenticação

- Auth.js (email/senha + Google OAuth)

### Qualidade de Código

- ESLint
- Prettier
- Husky + lint-staged
- Conventional Commits

---

## 🧠 Arquitetura e Padrões

O projeto segue uma arquitetura modular e orientada a features (feature-based architecture), utilizando o App Router do Next.js como base de composição.

A estrutura foi pensada para alta coesão, baixo acoplamento e escalabilidade, separando claramente responsabilidades por domínio de negócio.

```
src/
│
├── app/                 # Rotas, layouts e composição via Next.js App Router
│   ├── (public)/
│   ├── (protected)/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── features/            # Domínios de negócio (feature-first)
│   ├── clinic/
│   │   ├── actions/     # Server Actions (mutações)
│   │   ├── components/  # Componentes da feature
│   │   ├── data-access/ # Acesso a dados (queries)
│   │   ├── hooks/       # Hooks específicos
│   │   ├── schemas/     # Validação (Zod)
│   │   ├── types/       # Tipagens
│   │   └── utils/       # Helpers da feature
│   │
│   ├── profile/
│   └── ...
│
├── shared/              # Código reutilizável entre features
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── styles/
│   ├── types/
│   └── utils/
│
```

### Convenções adotadas

- Pastas com `_` (underscore) indicam **código interno da feature**
- Separação entre:
  - `data-access`: leitura de dados
  - `actions`: mutações (create/update/delete)

- Uso de:
  - **Server Components**
  - **Client Components**
  - **Server Actions**

- Estrutura pensada para **escalabilidade e manutenção**

---

## 🔐 Autenticação

Implementada com **Auth.js**, suportando:

- Login social (Google)
- Sessões seguras
- Integração com Prisma Adapter

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias, como:

- Database URL
- Auth secrets
- Google OAuth credentials

---

### 4. Configure o banco de dados

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5. Rode o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Qualidade, Testes e CI

Este projeto adota boas práticas de qualidade de código e validação contínua, garantindo mais segurança na evolução das funcionalidades.

### Qualidade de código

- **Husky** para hooks de commit
- **lint-staged** para validação de arquivos modificados
- **Conventional Commits** para padronização de commits
- **ESLint** para análise estática
- **Prettier** para formatação automática

Antes de cada commit:

- O ESLint é executado
- O Prettier formata automaticamente os arquivos necessários

### Testes automatizados

Os testes automatizados foram implementados com **Vitest**, permitindo validar regras de negócio e reduzir regressões durante o desenvolvimento.

Scripts disponíveis:

```bash
pnpm test
pnpm test:coverage
```

- `pnpm test`: executa os testes automatizados
- `pnpm test:coverage`: executa os testes com relatório de cobertura

### Integração Contínua (CI)

O projeto possui uma pipeline de **CI com GitHub Actions**, executada automaticamente em `push` para `main` e `develop`, além de `pull requests`.

A pipeline é composta por dois jobs principais:

- **Lint**: executa `pnpm lint`
- **Test**: executa `pnpm test:coverage`

Com isso, toda alteração enviada ao repositório passa por verificações automáticas de qualidade e testes antes de seguir no fluxo de desenvolvimento.

---

## 📱 Responsividade

A interface foi desenvolvida seguindo o princípio de:

> **Mobile-first design**

Garantindo uma experiência consistente em:

- Smartphones
- Tablets
- Desktops

---

## 🔮 Roadmap (Próximas melhorias)

- [x] Login com email e senha
- [x] Login social com Google
- [x] Testes automatizados com Vitest
- [x] Cobertura de testes
- [x] CI com GitHub Actions
- [ ] Testes de integração
- [ ] Testes End-to-End (E2E)
- [ ] Integração com Stripe (Pagamentos)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por **Renan**
Focado em front-end moderno, performance e boas práticas de arquitetura.

---

## 💡 Considerações Finais

Este projeto demonstra:

- Domínio de **Next.js moderno (App Router)**
- Estrutura escalável de aplicações SaaS
- Integração completa com autenticação e banco de dados
- Integração com sistema de pagamento
- Preocupação com qualidade de código e experiência do usuário

---
