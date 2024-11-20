import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const handlePayment = async () => {
    const amount = plan === 'yearly' ? 2 : 1; // Set amount based on plan
    try {
      const response = await axios.post('http://127.0.0.1:5000/initiate-payment', {
        amount,
        phone_number: phoneNumber,
      });

      if (response.status === 200) {
        alert('Payment prompt sent to your phone. Please check and enter your PIN.');
        navigate('/signin'); // Redirect to login after payment
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an issue with your payment. Please try again.');
    }

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
          <span className="plan-price">KSH 2</span>
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
          <span className="plan-price">KSH 1</span>
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
