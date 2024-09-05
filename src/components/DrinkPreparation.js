import React, { useState, useEffect } from 'react';
import './DrinkPreparation.css';

const DrinkPreparation = () => {
    const preparationTime = 30;
    const [timeLeft, setTimeLeft] = useState(preparationTime);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsReady(true);
        }
    }, [timeLeft]);

    return (
        <div className={`preparation-container ${isReady ? 'ready' : ''}`}>
            {!isReady ? (
                <div className="circle-timer">
                    <svg width="200" height="200">
                        <circle cx="100" cy="100" r="90" stroke="#EAEAEA" strokeWidth="4" fill="none"/>
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="#F5D009"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="565.48"
                            strokeDashoffset={-(timeLeft / preparationTime) * 565.48}
                            style={{transition: 'stroke-dashoffset 1s linear'}}
                            transform="rotate(-90 100 100)"
                        />
                        <circle
                            cx="100"
                            cy="10"
                            r="6"
                            fill="#F5D009"
                            transform={`rotate(${(360 * (timeLeft / preparationTime))} 100 100)`}
                            style={{transition: 'transform 1s linear'}}
                            />
                    </svg>
                    <div className="timer-text">
                        <h1>{`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}</h1>
                        <p>Приготовление напитка</p>
                    </div>
                </div>
            ) : (
                <div className="preparation-ready">
                <img src={`${process.env.PUBLIC_URL}/images/coffee-ready.png`} alt="Coffee Ready" className="coffee-ready-icon" />
                    <h2>Напиток готов!</h2>
                    <p>вы можете забрать его</p>
                </div>
            )}
        </div>
    );
};

export default DrinkPreparation;
