---
marp: true
theme: 'dracula'
paginate: true
class: 'invert'

---

<style>
  @import url('./theme/dracula/dracula.css');
</style>

# Aula 02 — Gerenciamento de Estados
## `useState`

### Prof. Me. José Olinda


---

## Estado em React

- O estado (state) é um objeto que armazena dados ou informações sobre o componente.
- O estado pode mudar ao longo do tempo, geralmente em resposta a ações do usuário ou eventos do sistema.
- Quando o estado de um componente muda, o componente é re-renderizado para refletir essas mudanças na interface do usuário.
- Diferente das props, que são passadas para o componente de fora, o estado é gerenciado internamente pelo próprio componente e pode ser alterado por ele.

---

## Hook `useState`

- Um hook (do inglês "gancho") é uma função especial que permite "ligar" recursos do React a componentes funcionais.
- O hook `useState` é usado para adicionar estado a componentes funcionais. Ele retorna **SEMPRE** um par: o estado atual e uma função que permite atualizá-lo.
- A sintaxe básica do `useState` é:

```javascript
const [state, setState] = useState(initialState);
const [count, setCount] = useState(0);
const [name, setName] = useState('José Olinda');
const [isVisible, setIsVisible] = useState(true);   
```

---

## Exemplo Prático

- Vamos criar um aplicativo social simples onde os usuários podem curtir, comentar e compartilhar vídeos.
- Usaremos o hook `useState` para gerenciar o estado dos vídeos, incluindo o número de curtidas, comentários e compartilhamentos.

---

## Video Like App

### 01 - Comece criando o projeto Vite

```bash
npm create vite@latest video-like -- --template react
cd video-like
npm install
npm run dev 
```

- Se o Vite solicitar, escolha a opção `react`, `javascript` e deixe o restante padrão.

---

## Video Like App

### 02 - Estrutura inicial do App.jsx

- Mantenha apenas os arquivos `main.js`, `App.jsx` e `style.css` no diretório `src`.
- Apague todo o conteúdo de `App.jsx` e `style.css`.
- Em `style.css` insira o código disponível em https://raw.githubusercontent.com/joseolinda/aulas-react-2025/refs/heads/main/projetos/02-video/src/style.css

---

## Video Like App

### 03 - Mockando os dados dos vídeos

- Crie um arquivo chamado `listVideos.js` na pasta `src` com o seguinte conteúdo (adicione mais vídeos, se desejar):
<small>
```javascript
const listVideos = [
  {
    id: 1,
    title: "Colheita no sítio",
    caption: "@agrovida",
    description: "Milho e feijão no tempo certo.",
    liked: false,
    likes: 12,
    comments: 3,
    shares: 1,
  },
];
export default listVideos;
```
</small>

---

## Video Like App

### 04 - Implementando o App.jsx (parte 1)

- Apague todo o conteúdo de `App.jsx`;
- Insira o seguinte código inicial em `App.jsx`:

--- 

```javascript
import { useState } from "react";
import listVideos from "./listVideos";
import "./style.css";

function App() {
  const [videos, setVideos] = useState(listVideos);

  return (
    <div className="app">
      <h2 className="title">Videos Likes</h2>

      {videos.map((v) => (
        <div className="card" key={v.id}>
          <div className="video">{v.title}</div>

          <div className="caption">{v.caption}</div>
          <div className="description">{v.description}</div>

          <div className="actions">
            <button onClick={() => toggleLike(v.id)}>
              {v.liked ? "🩶 Descurtir" : "❤️ Curtir"} <span className="count">{v.likes}</span>
            </button>

            <button onClick={() => inc(v.id, "comments")}>
              💬 Comentar <span className="count">{v.comments}</span>
            </button>

            <button onClick={() => inc(v.id, "shares")}>
              🔁 Compartilhar <span className="count">{v.shares}</span>
            </button>
          </div>
        </div>
      ))}
    </div>

  );
}
export default App;
```

---

## Video Like App

### 05 - Implementando o App.jsx (parte 2)

- Adicione as funções `toggleLike` e `inc` dentro do componente `App`, antes do `return`:

---


```javascript
  function toggleLike(id) {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, liked: !v.liked, likes: v.likes + (v.liked ? -1 : 1) }
          : v
      )
    );
  }

  function inc(id, field) {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, [field]: v[field] + 1 } : v
      )
    );
  }
```

---

## Video Like App

### 06 - Teste o aplicativo

---

## Lista de exercícios

- Crie um repositório no GitHub com o as respostas dos exercícios propostos.

1. Crie uma aplicação React que gerencie uma lista de tarefas (to-do list) usando o hook `useState`. A aplicação deve permitir adicionar, remover e marcar tarefas como concluídas.
2. Implemente uma aplicação que, dada o código do funcionario, lance sua presença diária em um sistema de ponto eletrônico. Utilize o hook `useState` para gerenciar o estado das marcações de ponto.