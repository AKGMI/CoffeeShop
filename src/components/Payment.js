import React, { useState } from 'react';
import emulator from '../emulator';
import DrinkPreparation from './DrinkPreparation';
import './Payment.css';

const Payment = ({ selected, cancel }) => {
    const paymentMethod = selected.payment;
    const [cashInserted, setCashInserted] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [isCardProcessing, setIsCardProcessing] = useState(false);

    let cashinActive = false;

    const handleCashPayment = () => {
        if (cashinActive) {
            return;
        }

        cashinActive = true;
        let sum = cashInserted;
        emulator.StartCashin((amount) => {
            setCashInserted(prev => prev + amount);
            sum += amount;
            if (sum >= selected.drink.price) {
                emulator.StopCashin();
                setPaymentSuccess(true);
            }
        });
    };

    const handleCardPayment = () => {
        setIsCardProcessing(true);
        setPaymentSuccess(null);
        emulator.BankCardPurchase(selected.drink.price, (result) => {
            setIsCardProcessing(false);
            if (result) {
                setPaymentSuccess(true);
            } else {
                setPaymentSuccess(false);
            }
        }, console.log);
    };

    const resetPayment = () => {
        cancel();
    };

    if (paymentSuccess === true) {
        return <DrinkPreparation drink={selected.drink} />;
    }

    if (paymentSuccess === false) {
        return (
            <div className="card-failure">
                <div className="failure-icon">&#x2716;</div>
                <h2>Оплата не прошла</h2>
                <button className="retry-button" onClick={handleCardPayment}>Попробовать ещё раз</button>
                <button className="cancel-button" onClick={resetPayment}>Отмена</button>
            </div>
        );
    }

    if (isCardProcessing) {
        return (
            <div className="card-processing">
                <img src="/images/card-icon.png" alt="Card Processing" className="card-icon" />
                <h2>Приложите карту к терминалу</h2>
                <button className="cancel-button" onClick={resetPayment}>Отмена</button>
            </div>
        );
    } else if (paymentMethod === 'card') {
        handleCardPayment();
    }

    return (
        <div className="payment-container">
            {paymentMethod === 'cash' && (
                <div className="payment-details">
                    <p>Внесенная сумма: {cashInserted} руб.</p>
                    <button className="payment-action-button" onClick={handleCashPayment}>Внести наличные</button>
                </div>
            )}
        </div>
    );
};

export default Payment;
