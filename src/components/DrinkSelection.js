import React, { useState } from 'react';
import CategoryButton from './CategoryButton';
import DrinkCard from './DrinkCard';
import './DrinkSelection.css';
import DrinkModal from './DrinkModal';

const DrinkSelection = ({ onSelectDrink }) => {
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Кофе');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { id: 'Кофе', label: 'Кофе', icon: '/images/category-coffee.png' },
        { id: 'Чай', label: 'Чай', icon: '/images/category-tea.png' },
        { id: 'Молочный коктейль', label: 'Молочный коктейль', icon: '/images/category-milkshake.png' },
        { id: 'Морсы и газ. напитки', label: 'Морсы и газ. напитки', icon: '/images/category-other.png' },
    ];

    const drinks = [
        {
            id: 1,
            name: 'Эспрессо',
            image: '/images/drinks/espresso.png',
            prices: { 200: 79, 300: 99, 400: 119 },
        },
        {
            id: 2,
            name: 'Эспрессо 2x',
            image: '/images/drinks/espresso2x.png',
            prices: { 200: 109, 300: 129, 400: 149 },
        },
        {
            id: 3,
            name: 'Американо',
            image: '/images/drinks/americano.png',
            prices: { 200: 89, 300: 109, 400: 129 },
        },
        {
            id: 4,
            name: 'Латте',
            image: '/images/drinks/latte.png',
            prices: { 200: 129, 300: 149, 400: 169 },
        },
        {
            id: 5,
            name: 'Капучино',
            image: '/images/drinks/cappuccino.png',
            prices: { 200: 129, 300: 149, 400: 169 },
        },
        {
            id: 6,
            name: 'Макиато',
            image: '/images/drinks/macchiato.png',
            prices: { 200: 129, 300: 149, 400: 169 },
        },
    ];

    const handleDrinkSelect = (drink) => {
        setSelectedDrink(drink);
        setIsModalOpen(true);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDrink(null);
    };

    const handlePayByCard = (size, price) => {
        console.log(`Оплата картой за размер ${size} мл, цена: ${price}₽`);
        setIsModalOpen(false);
        onSelectDrink({ drink: {...selectedDrink, price: price}, payment: 'card' });
    };

    const handlePayByCash = (size, price) => {
        console.log(`Оплата наличными за размер ${size} мл, цена: ${price}₽`);
        setIsModalOpen(false);
        onSelectDrink({ drink: {...selectedDrink, price: price}, payment: 'cash' });
    };

    return (
        <div className="drink-selection">
            <header className="drink-selection-header">
                <h1 className="main-title">Выбор напитка</h1>
                <div className="decorative-element">
                    <svg width="451" height="610" viewBox="0 0 451 610" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M218.508 -330C248.903 -299.605 450.19 143.082 450.19 143.082L149.764 609.904H0L185.795 151.761L72.0636 -330H218.508Z"
                            fill="#FFE7DB"/>
                    </svg>
                </div>
                <button className="login-button">
                    <img src="/images/phone-icon.png" alt="phone icon" className="phone-icon"/>
                    Вход / регистрация
                </button>
            </header>
            <div className="categories">
                {categories.map(category => (
                    <CategoryButton
                        key={category.id}
                        icon={category.icon}
                        label={category.label}
                        selected={selectedCategory === category.id}
                        onClick={() => handleCategorySelect(category.id)}
                    />
                ))}
            </div>
            <div className="drink-container">
                <h2 className="category-title">{selectedCategory}</h2>
                <div className="drink-grid">
                    {drinks.map(drink => (
                        <DrinkCard
                            key={drink.id}
                            drink={drink}
                            onSelect={handleDrinkSelect}
                        />
                    ))}
                </div>
            </div>

            {selectedDrink && (
                <DrinkModal
                    drink={selectedDrink}
                    onClose={handleCloseModal}
                    onPayByCard={handlePayByCard}
                    onPayByCash={handlePayByCash}
                />
            )}
        </div>
    );
};

export default DrinkSelection;
