import { useEffect, useState } from 'react';
import { OrderService } from './services/api'; 
import ProductFactory from './factories/ProductFactory';
import ProductForm from './components/ProductForm'; // <-- Nuevo componente
import { useCart } from './context/CartContext'; 
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart(); 

  // 1. Cargar productos al iniciar (READ)
  useEffect(() => {
    OrderService.getAll()
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al conectar con el servidor:", err);
        setLoading(false);
      });
  }, []);

  // 2. Función para actualizar la lista local tras crear (CREATE)
  const handleProductCreated = (newProduct) => {
    // Usamos el spread operator para añadir el nuevo item al array actual
    // Esto disparará el re-renderizado automático de la Factory
    setItems((prevItems) => [...prevItems, newProduct]);
  };

  if (loading) return <div className="loading">Cargando la tienda...</div>;

  return (
    <div className="shop-container">
      <nav className="navbar">
        <span className="logo">Pattern Store 🚀</span>
        <div className="cart-status">
          🛒 Carrito: <strong>{cart.length}</strong> items
        </div>
      </nav>

      <h1 className="title">Gestión de Inventario</h1>
      
      {/* 3. Insertamos el formulario y le pasamos la función de actualización */}
      <section className="form-section">
        <ProductForm onProductCreated={handleProductCreated} />
      </section>

      <hr className="divider" />

      <h2 className="subtitle">Productos en Stock</h2>
      
      <div className="grid-layout">
        {items.length > 0 ? (
          items.map(item => (
            <ProductFactory key={item._id || item.id} type={item.type} data={item} />
          ))
        ) : (
          <p className="no-data">No hay productos disponibles en el inventario.</p>
        )}
      </div>
    </div>
  );
}

export default App;