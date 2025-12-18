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