// src/factories/ProductFactory.jsx
import ProductCard from '../components/ProductCard';
import SaleProductCard from '../components/SaleProductCard';

const ProductFactory = ({ type, data }) => {
  // La fábrica decide qué componente "construir"
  const components = {
    NORMAL: ProductCard,
    SALE: SaleProductCard,
  };

  const Component = components[type] || ProductCard;

  return <Component {...data} />;
};

export default ProductFactory;