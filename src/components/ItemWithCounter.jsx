/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from 'react';

const ItemWithCounter = forwardRef(({ item, onTotalChange }, ref) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      onTotalChange(newCount * item.price); // Envia o novo total diretamente
      return newCount;
    });
  };
  
  const decrement = () => {
    setCount(prevCount => {
      const newCount = prevCount > 0 ? prevCount - 1 : 0;
      onTotalChange(newCount * item.price); // Envia o novo total diretamente
      return newCount;
    });
  };
  

  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price);

  useImperativeHandle(ref, () => ({
    getItemData: () => ({ name: item.name, count})
  }));

  return (
    <div className="flex justify-between items-center border-b border-dashed border-gray-300 px-8 py-2">
      <span className="text-[#424242] font-medium">{item.name}</span>
      <div className="flex items-center">
        <span className="text-[#424242] font-medium mr-2">{formattedPrice}</span>
        {item.type === "Carnes" ? (
          <input
            type="checkbox"
            onChange={(e) => {
              const newCount = e.target.checked ? 1 : 0;
              setCount(newCount);
              onTotalChange(newCount * item.price);
            }}
            className="ml-2"
          />
        ) : (
          <>
            <button onClick={decrement} className="px-1">-</button>
            <input type="text" value={count} readOnly className="w-8 text-center" />
            <button onClick={increment} className="px-1">+</button>
          </>
        )}
      </div>
    </div>
  );
});

export default ItemWithCounter;