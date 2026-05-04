const API_URL = '/api'; // Gracias al proxy de Vite, esto apunta a tu Node.js

export const OrderService = {
  // Operación READ (Obtener todos los pedidos/productos)
  async getAll() {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Error al obtener datos');
    return await response.json();
  },

  // Operación CREATE (Enviar un nuevo pedido)
  async create(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Error al crear el pedido');
    return await response.json();
  },

  // Operación DELETE (Opcional)
  async delete(id) {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }
};