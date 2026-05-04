const SaleProductCard = ({ name, price }) => (
  <div className="card sale">
    <div className="badge sale-badge">¡OFERTA!</div>
    <h3>{name}</h3>
    <p className="price">
      <span className="old-price">${(price * 1.2).toFixed(2)}</span> ${price}
    </p>
    <button className="btn btn-sale">Aprovechar Gangazo</button>
  </div>
);

export default SaleProductCard;