const ProductCard = ({ name, price }) => (
  <div className="card normal">
    <div className="badge">Estandar</div>
    <h3>{name}</h3>
    <p className="price">${price}</p>
    <button className="btn">Agregar al carrito</button>
  </div>
);
export default ProductCard;
