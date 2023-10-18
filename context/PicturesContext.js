import React, { createContext, useState } from 'react';

const PicturesContext = createContext();

const PicturesProvider = ({ children }) => {

  const [payouts, setPayouts] = useState([]);

  const handleAddPayout = (payout) => {
    setPayouts([...payouts, payout])
  }

  
  return (
    <PicturesContext.Provider value={{ payouts, handleAddPayout }}>
      {children}
    </PicturesContext.Provider>
  );
};

export { PicturesProvider, PicturesContext };
