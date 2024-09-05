import React from 'react';
import './DrinkCard.css';

const DrinkCard = ({ drink, onSelect }) => {
    return (
        <div className="drink-card" onClick={() => onSelect(drink)}>
            <img src={drink.image} alt={drink.name} className="drink-image" />
            <p className="drink-name">{drink.name}</p>
            <b><p className="drink-price">от {drink.prices[200]}₽</p></b>
        </div>
    );
};

export default DrinkCard;
