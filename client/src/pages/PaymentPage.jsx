import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [plan, setPlan] = useState('yearly');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePayment = () => {
    // Here, you can implement the payment logic or API integration
    console.log(`Plan: ${plan}, Phone Number: ${phoneNumber}`);
    alert(`Proceeding with ${plan === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'} for phone: ${phoneNumber}`);
    
    // Navigate to /ELandingPage after payment logic
    navigate('/Signin');
  };

  return (
    <div className="payment-page">
      <h2>Choose Your Plan</h2>
      <div className="plan-options">
        <label className="plan-option">
          <input
            type="radio"
            name="plan"
            value="yearly"
            checked={plan === 'yearly'}
            onChange={handlePlanChange}
          />
          <span>Yearly</span>
          <span className="plan-price">ksh 10,000</span>
        </label>
        <label className="plan-option">
          <input
            type="radio"
            name="plan"
            value="monthly"
            checked={plan === 'monthly'}
            onChange={handlePlanChange}
          />
          <span>Monthly</span>
          <span className="plan-price">ksh 1,000</span>
        </label>
      </div>
      <input
        type="text"
        className="phone-input"
        placeholder="Enter phone number..."
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <button className="pay-button" onClick={handlePayment}>
        PAY
      </button>
    </div>
  );
};

export default PaymentPage;
