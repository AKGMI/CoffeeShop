import React, { useState } from 'react';
import DrinkSelection from './components/DrinkSelection';
import Payment from './components/Payment';

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
      <div>
        {!selected ? (
            <DrinkSelection onSelectDrink={setSelected} />
        ) : (
            <Payment selected={selected} cancel={setSelected} />
        )}
      </div>
  );
};

export default App;
