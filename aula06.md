---
marp: false
theme: 'dracula'
paginate: true
class: 'invert'

---

<style>
  @import url('./theme/dracula/dracula.css');
</style>

# Aula 06 — Rotas no React

## React Router & Navegação entre páginas

### Prof. Me. José Olinda

---

## SPA - Single Page Application

Um aplicação **SPA (Single Page Application)** é uma aplicação web que carrega uma única página HTML e atualiza dinamicamente o conteúdo sem recarregar a página inteira.

---

## O que é um roteador (Router)?

Um **roteador** gerencia a navegação entre diferentes páginas/componentes sem recarregar a página.

---

**Sem React Router:**
- Cada link recarrega a página inteira
- Você perde o estado da aplicação
- Experiência mais lenta

--

**Com React Router:**
- Navegação rápida e fluida
- Estado da aplicação preservado
- URLs amigáveis e bookmarkáveis

---

## Instalando React Router

### 01 - Crie um novo projeto React

```bash
npm create vite@latest meu-app --template react
cd meu-app
npm install
```

### 02 - Instale o React Router

```bash
npm i react-router
```

---

## Configurando BrowserRouter

No arquivo `main.jsx`, configure o `<BrowserRouter>` envolvendo sua aplicação para permitir usar o roteador.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## Criando rotas básicas

No arquivo `App.jsx`, configure suas rotas:

```javascript
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/contato" element={<Contact />} />
    </Routes>
  );
}
```

---


- `<Routes>` — container para todas as rotas
- `<Route>` — define uma rota com `path` e `element`

---

## Estrutura de pastas recomendada

```
src/
├── App.jsx
├── main.jsx
├── App.css
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── components/
│   └── Header.jsx
└── assets/
```

---

## Página Home.jsx

```javascript
export default function Home() {
  return (
    <div className="page">
      <h1>Bem-vindo ao Home</h1>
      <p>Esta é a página inicial da aplicação.</p>
    </div>
  );
}
```

---

## Página About.jsx

```javascript
export default function About() {
  return (
    <div className="page">
      <h1>Sobre</h1>
      <p>Saiba mais sobre nossa aplicação.</p>
    </div>
  );
}
```

---

## Página Contact.jsx

```javascript
export default function Contact() {
  return (
    <div className="page">
      <h1>Contato</h1>
      <p>Entre em contato conosco.</p>
    </div>
  );
}
```

---

## Navegando com Link

Use `<Link>` para navegação sem estilos ativos. É equivalente a `<a>` mas sem recarregar a página.

```javascript
import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </nav>
    </header>
  );
}
```

---

## Navegando com NavLink

Use `<NavLink>` quando você precisa de **estilos ativos**:

<small>

```javascript
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/sobre" className={({ isActive }) => isActive ? "active" : ""}>
          Sobre
        </NavLink>
        <NavLink to="/contato" className={({ isActive }) => isActive ? "active" : ""}>
          Contato
        </NavLink>
      </nav>
    </header>
  );
}
```
</small>

---

## CSS para NavLink ativo

```css
nav {
  display: flex; gap: 20px; padding: 15px; background-color: #44475a;
}

nav a {
  color: #f8f8f2; text-decoration: none;
  padding: 8px 16px; border-radius: 4px; transition: 0.3s;
}

nav a:hover {
  background-color: #6272a4;
}

nav a.active {
  background-color: #bd93f9; color: #282a36; font-weight: bold;
}
```

---

## Parâmetros dinâmicos (Dynamic Segments)

Crie rotas com parâmetros usando `:`:

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/produtos/:id" element={<Produto />} />
</Routes>
```

A rota `/produtos/123` passará `id: "123"` como parâmetro.

---

## Acessando parâmetros com useParams

`useParams()` retorna um objeto com todos os parâmetros da rota.

```javascript
import { useParams } from "react-router";

export default function Produto() {
  const { id } = useParams();

  return (
    <div className="page">
      <h1>Produto #{id}</h1>
      <p>Detalhes do produto com ID: {id}</p>
    </div>
  );
}
```

---

## Navegando com useNavigate

Use `useNavigate()` para navegar **programaticamente** (sem clique):

```javascript
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simula login
    console.log("Usuário logado!");
    // Navega após sucesso
    navigate("/dashboard");
  };

  return (
    <button onClick={handleLogin}>Entrar</button>
  );
}
```
---

Use `useNavigate` para:
- Redirecionamento após formulário
- Logout automático
- Navegação temporizada

---

## Rotas aninhadas (Nested Routes)

Crie rotas dentro de rotas para compartilhar layouts, podendo renderizar uma página dentro da outra:

```javascript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="sobre" element={<About />} />
    <Route path="contato" element={<Contact />} />
  </Route>
</Routes>
```

---

## Layout com Outlet

No componente `Layout`, use `<Outlet>` para renderizar a página filha:

```javascript
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="container">
      <Header />
      {/* Aqui a página filha será renderizada */}
      <Outlet />
      <Footer />
    </div>
  );
}
```

`<Outlet />` é o espaço onde as rotas filhas serão renderizadas.

---

## Rota 404 - Página não encontrada

O `path="*"` funciona como "catchall" para rotas não encontradas.

```javascript
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

---

## Página NotFound.jsx

```javascript
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="page">
      <h1>404 — Página não encontrada</h1>
      <p>Desculpe, a página que você procura não existe.</p>
      <Link to="/">Voltar ao Home</Link>
    </div>
  );
}
```

---

## Atividade: criar um blog 

Vamos criar um **blog simples** com React Router

**Funcionalidades:**
- Página Home com lista de posts
- Página individual de cada post
- Navegação entre posts
- Menu com NavLink

---

## Estrutura do Blog

```
src/
├── App.jsx
├── main.jsx
├── App.css
├── pages/
│   ├── Home.jsx
│   ├── Post.jsx
│   └── NotFound.jsx
├── components/
│   └── Header.jsx
└── data/
    └── posts.js
```

---

## data/posts.js — Dados dos posts

```javascript
export const posts = [
  {
    id: 1,
    title: "Introdução ao React",
    excerpt: "Aprenda os fundamentos do React...",
    content: "React é uma biblioteca JavaScript para criar interfaces..."
  },
  {
    id: 2,
    title: "Hooks no React",
    excerpt: "Entenda useState, useEffect e mais...",
    content: "Hooks são funções que permitem usar estado em componentes funcionais..."
  },
  {
    id: 3,
    title: "React Router",
    excerpt: "Navegação em aplicações React...",
    content: "React Router é a solução padrão para roteamento em React..."
  }
];
```

---

## pages/Home.jsx — Lista de posts

```javascript
import { Link } from "react-router";
import { posts } from "../data/posts";

export default function Home() {
  return (
    <div className="page">
      <h1>Blog</h1>
      <div className="posts-list">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link to={`/posts/${post.id}`} className="read-more">
              Ler mais →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
```

---

## pages/Post.jsx — Detalhes do post

```javascript
import { useParams, Link } from "react-router";
import { posts } from "../data/posts";

export default function Post() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="page">
        <h1>Post não encontrado</h1>
        <Link to="/">Voltar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">← Voltar</Link>
      <article className="post-detail">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </div>
  );
}
```

---

## App.jsx — Rotas do Blog

```javascript
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
```

---

## components/Header.jsx

```javascript
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">📝 Meu Blog</h1>
        <nav>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
            end
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
```

---

## App.css — Estilos do Blog

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1e1e2e;
  color: #f8f8f2;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #44475a;
  border-bottom: 2px solid #bd93f9;
  padding: 20px 0;
  position: sticky;
  top: 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8em;
  color: #bd93f9;
}
```

---

## App.css — Posts (continuação)

```css
.page {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.post-card {
  background-color: #44475a;
  border: 1px solid #6272a4;
  border-radius: 8px;
  padding: 20px;
  transition: 0.3s;
}

.post-card:hover {
  border-color: #bd93f9;
  box-shadow: 0 0 15px rgba(189, 147, 249, 0.2);
}

.post-card h2 {
  color: #8be9fd;
  margin-bottom: 10px;
}

.post-card p {
  color: #d0d0d0;
  margin-bottom: 15px;
  line-height: 1.5;
}

.read-more {
  color: #bd93f9;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.read-more:hover {
  color: #8be9fd;
}
```

---

## App.css — Detalhes do Post

```css
.back-link {
  color: #bd93f9;
  text-decoration: none;
  font-size: 1.1em;
  margin-bottom: 30px;
  display: inline-block;
  transition: 0.3s;
}

.back-link:hover {
  color: #8be9fd;
}

.post-detail {
  background-color: #44475a;
  border: 1px solid #6272a4;
  border-radius: 8px;
  padding: 30px;
}

.post-detail h1 {
  color: #bd93f9;
  margin-bottom: 20px;
  font-size: 2.2em;
}

.post-detail p {
  color: #d0d0d0;
  line-height: 1.8;
  font-size: 1.05em;
}
```

---

## Hooks úteis do React Router

| Hook | Uso |
|------|-----|
| `useParams()` | Acessar parâmetros da rota |
| `useNavigate()` | Navegar programaticamente |
| `useLocation()` | Acessar informações da URL atual |
| `useSearchParams()` | Manipular query strings |

Todos são importados de `"react-router"` e usados em componentes.

---

## Referências

📚 **React Router Documentation:**
- Instalação: https://reactrouter.com/start/declarative/installation
- Routing: https://reactrouter.com/start/declarative/routing
- Navegação: https://reactrouter.com/start/declarative/navigating

