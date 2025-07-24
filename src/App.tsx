// src/App.tsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ProductSelector from './components/ProductSelector';
import './App.css';
import CreditCardForm from './components/CreditCardForm';
import InsuranceForm from './components/InsuranceForm';
import DebitCardForm from './components/DebitCardForm';
import LoanForm from './components/LoanForm';
import PensionForm from './components/PensionForm';
import PensionDetailsPage from './components/PensionDetailsPage'; // Assuming you have this

type ProductId = 'insurance' | 'debit-card' | 'credit-card' | 'loan' | 'pension';

const ProductPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductId | null>(null);

  const handleProductSelect = (productId: ProductId) => {
    setSelectedProduct(productId);
    console.log("Selected product:", productId);
  };

  return (
    <>
      {!selectedProduct ? (
        <>
          <h2>Select a Product to Apply</h2>
          <ProductSelector onSelect={handleProductSelect} />
        </>
      ) : selectedProduct === 'insurance' ? (
        <InsuranceForm />
      ) : selectedProduct === 'debit-card' ? (
        <DebitCardForm />
      ) : selectedProduct === 'credit-card' ? (
        <CreditCardForm />
      ) : selectedProduct === 'loan' ? (
        <LoanForm />
      ) : selectedProduct === 'pension' ? (
        <PensionForm />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>You selected: {selectedProduct}</h2>
          <p>We'll load the form soon here...</p>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1>WhiteHat Banking Group</h1>
        </header>

        {/* Main Routes */}
        <main>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/pension-details" element={<PensionDetailsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>© 2025 LLOYDS BANKING GROUP. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
