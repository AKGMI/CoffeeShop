import React from 'react';
import './CategoryButton.css';

const CategoryButton = ({ icon, label, selected, onClick }) => {
    return (
        <div className="category-container">
            <button className={`category-button ${selected ? 'selected' : ''}`} onClick={onClick}>
                <div className="icon-wrapper">
                    <img src={icon} alt={label} className={`category-icon ${selected ? 'colored' : 'grayscale'}`} />
                </div>
                <span className="category-label">{label}</span>
            </button>
            <div className="divider"></div>
        </div>
    );
};

export default CategoryButton;
