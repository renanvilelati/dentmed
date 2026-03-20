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

O projeto segue uma arquitetura modular baseada no App Router do Next.js, com separação clara de responsabilidades:

```
src/
│
├── app/
│   ├── (public)/
│   ├── (protected)/
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── _components/
│   │       ├── _actions/
│   │       └── _data-access/
│
├── components/     # Componentes globais
├── hooks/          # Hooks reutilizáveis
├── utils/          # Funções utilitárias
├── constants/      # Constantes globais
├── layout/         # Layouts compartilhados
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

- Login com email e senha
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

## 🧪 Qualidade e Padronização

Este projeto utiliza:

- **Husky** para hooks de commit
- **lint-staged** para validação de arquivos modificados
- **Conventional Commits** para padronização de commits

Antes de cada commit:

- ESLint é executado
- Prettier formata o código automaticamente

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

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes End-to-End (E2E)
- [ ] Melhorias de performance
- [ ] Integração com Stripe (Pagamentos)
- [ ] Notificações (email/SMS)

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
