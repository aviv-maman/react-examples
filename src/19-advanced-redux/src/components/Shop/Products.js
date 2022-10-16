import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'My New Book lorem lorem',
    description: 'The First book I have ever read',
    price: 6,
  },
  {
    id: 'p2',
    title: 'My Second Book',
    description: 'The First book I have ever read',
    price: 5,
  },
  {
    id: 'p3',
    title: 'My Book lorem lorem',
    description: 'The First book I have ever read',
    price: 2,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
