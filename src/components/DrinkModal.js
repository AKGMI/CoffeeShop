import React, { useState } from 'react';
import './DrinkModal.css';

const DrinkModal = ({ drink, onClose, onPayByCard, onPayByCash }) => {
    const [selectedSize, setSelectedSize] = useState(400);

    const sizes = [200, 300, 400];

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const currentPrice = drink.prices[selectedSize];

    const sizeIcons = {
        200: '/images/icons/cup-small.png',
        300: '/images/icons/cup-medium.png',
        400: '/images/icons/cup-large.png',
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✕</button>
                <div className="modal-drink-card">
                    <img src={drink.image} alt={drink.name} className="modal-drink-image" />
                    <h2 className="modal-drink-title">{drink.name}</h2>
                </div>
                <div className="sizes">
                    {sizes.map(sizeOption => (
                        <button
                            key={sizeOption}
                            className={`size-button ${selectedSize === sizeOption ? 'selected' : ''}`}
                            onClick={() => handleSizeSelect(sizeOption)}
                        >
                            <img
                                src={sizeIcons[sizeOption]}
                                alt={`${sizeOption} мл`}
                                className="size-icon"
                            />
                            {sizeOption} мл.
                        </button>
                    ))}
                </div>
                <div className="modal-buttons-wrap">
                    <button
                        className="pay-button"
                        onClick={() => onPayByCard(selectedSize, currentPrice)}
                    >
                        <span>Оплатить картой</span>
                        <span className="price">{currentPrice}₽</span>
                    </button>
                    <button
                        className="pay-button"
                        onClick={() => onPayByCash(selectedSize, currentPrice)}
                    >
                        <span>Оплатить наличными</span>
                        <span className="price">{currentPrice}₽</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DrinkModal;
