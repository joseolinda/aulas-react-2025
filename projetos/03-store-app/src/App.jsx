import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataType, setDataType] = useState("products");

  async function loadProducts() {
    setDataType("products");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    setDataType("users");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/users");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>FakeStore</h1>

      <div className="buttons">
        <button
          className={dataType === "products" ? "active" : ""}
          onClick={() => loadProducts()}
        >
          Produtos
        </button>
        <button
          className={dataType === "users" ? "active" : ""}
          onClick={() => loadUsers()}
        >
          Usuários
        </button>
      </div>

      {loading && <p className="loading">Carregando...</p>}
      {error && <div className="error">❌ {error}</div>}

      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            {dataType === "products" ? (
              <>
                <h3>{item.title}</h3>
                <p><strong>Preço:</strong> ${item.price.toFixed(2)}</p>
                <p><strong>Categoria:</strong> {item.category}</p>
                <p>{item.description.substring(0, 100)}...</p>
              </>
            ) : (
              <>
                <h3>{item.username}</h3>
                <p><strong>Username:</strong> {item.username}</p>
                <p><strong>Email:</strong> {item.email}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;