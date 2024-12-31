/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from 'react';

const ItemWithCounter = forwardRef(({ item }, ref) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  useImperativeHandle(ref, () => ({
    getItemData: () => ({ name: item.name, count })
  }));

  return (
    <div className="flex justify-between items-center border-b border-dashed border-gray-300 px-8 py-2">
      <span className="text-[#424242] font-medium">{item.name}</span>
      <div className="flex items-center">
        <button onClick={decrement} className="px-2">-</button>
        <input type="text" value={count} readOnly className="w-8 text-center"/>
        <button onClick={increment} className="px-2">+</button>
      </div>
    </div>
  );
});

export default ItemWithCounter;