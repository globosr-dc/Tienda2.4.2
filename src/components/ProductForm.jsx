import { useState } from 'react';
import { OrderService } from '../services/api';

const ProductForm = ({ onProductCreated }) => {
  // Estados para capturar la información del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('NORMAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProduct = {
      name,
      price: Number(price),
      type
    };

    try {
      // Enviamos el producto al backend usando nuestro Service
      const savedProduct = await OrderService.create(newProduct);
      
      // Notificamos al componente padre (App.jsx) para que actualice la lista
      onProductCreated(savedProduct);

      // Limpiamos el formulario
      setName('');
      setPrice('');
      setType('NORMAL');
      alert("✅ Producto añadido al inventario");
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("❌ No se pudo guardar el producto. Revisa la conexión con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card form-card">
      <h3>🆕 Registrar Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Producto</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ej: Teclado Mecánico"
            required 
          />
        </div>

        <div className="form-group">
          <label>Precio ($)</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="0.00"
            required 
          />
        </div>

        <div className="form-group">
          <label>Tipo de Visualización (Patrón Factory)</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="NORMAL">Diseño Estándar</option>
            <option value="SALE">Diseño de Oferta</option>
          </select>
        </div>

        <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Añadir al Inventario'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;