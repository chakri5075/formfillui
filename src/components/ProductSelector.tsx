// src/components/ProductSelector.tsx
import React from 'react';
import './ProductSelector.css';

type ProductId = 'insurance' | 'debit-card' | 'credit-card' | 'loan';

interface ProductSelectorProps {
  onSelect: (productId: ProductId) => void;
}

const products = [
  { id: 'pension', name: 'Pension', desc: 'Plan your retirement securely.' },
  { id: 'insurance', name: 'Insurance', desc: 'Protect what matters most.' },
  { id: 'debit-card', name: 'Debit Card', desc: 'Access your money with ease.' },
  { id: 'credit-card', name: 'Credit Card', desc: 'Flexible payments and rewards.' },
  { id: 'loan', name: 'Loan', desc: 'Affordable personal loans.' },
 
];

const ProductSelector: React.FC<ProductSelectorProps> = ({ onSelect }) => (
  <div className="product-grid">
    {products.map((product) => (
      <div key={product.id} className="product-tile" onClick={() => onSelect(product.id as ProductId)}>
        {/* <img src={product.image} alt={product.name} className="product-image" /> */}
        <h2>{product.name}</h2>
        <p>{product.desc}</p>
        <button>Apply Now</button>
      </div>
    ))}
  </div>
);

export default ProductSelector;
