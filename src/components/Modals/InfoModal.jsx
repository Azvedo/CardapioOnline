/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { createOrder } from '../../services/firestore';

function InfoModal({ isOpen, onClose, order, total }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [change, setChange] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');


  useEffect(() => {
    if (
      order.length === 0 || !name || !phone || !street || !number || !neighborhood || !paymentMethod || (paymentMethod === 'dinheiro' && !change)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [order, name, phone, street, number, neighborhood, paymentMethod, change]);

  const handleSendOrder = async() => {
    const orderSummary = order.map(item => `${item.name} - ${item.count}`).join('\n');
    const message = `*Pedido*\n${orderSummary}\n\n*Entrega*\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Logradouro:* ${street}\n*Número:* ${number}\n*Bairro:* ${neighborhood}\n \n*Total:* ${total}\n*Forma de Pagamento:* ${paymentMethod}${paymentMethod === 'dinheiro' ? `\n*Troco para:* ${change}` : ''}\n`;
    const orderDetails = {
      order: order.map(item => ({ name: item.name, count: item.count })),
      delivery: {
        name,
        phone,
        street,
        number,
        neighborhood,
      },
      payment: {
        method: paymentMethod,
        change: paymentMethod === 'dinheiro' ? change : null,
      },
      total,
      data: new Date().toISOString(),
    };

    try {
      await createOrder(orderDetails);
      console.log('Order created successfully');
    } catch (error) {
      console.error('Error creating order:', error);
    }
    //8199202-7735 numero do restaurante
    const whatsappLink = `https://wa.me/5581999105140?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setPaymentMethod('');
    setChange('');
    setName('');
    setPhone('');
    setStreet('');
    setNumber('');
    setNeighborhood('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 overflow-y-auto h-[700px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resumo do Pedido</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <div>
          <h3 className="font-bold">Itens do Pedido:</h3>
          <ul className='text-2xs h-24 flex flex-col flex-wrap'>
            {order.map((item, index) => (
              <li key={index}>
                {item.name} ---- {item.count}
              </li>
            ))}
          </ul>
          <h3>
            Total: {total}
          </h3>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Informações de Entrega:</h3>
          <form>
            <div className="mb-2">
              <label className="block">Nome:</label>
              <input type="text" className="w-full border p-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="block">Telefone:</label>
              <input type="tel" className="w-full border p-2" minLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="block">Rua:</label>
              <input type="text" className="w-full border p-2" value={street} onChange={(e) => setStreet(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="block">Número:</label>
              <input type="text" className="w-full border p-2" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="block">Bairro:</label>
              <input type="text" className="w-full border p-2" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="block">Forma de Pagamento:</label>
              <select
                className="w-full border p-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>
            {paymentMethod === 'dinheiro' && (
              <div className="mb-2">
                <label className="block">Troco para:</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  value={change}
                  onChange={(e) => setChange(e.target.value)}
                  required
                />
              </div>
            )}
            {paymentMethod === 'pix' && (
              <div className="mb-2">
                <label className="block">Chave Pix:</label>
                <input type="text" value={12131231231} readOnly className="w-full border p-2" />
              </div>
            )}
          </form>
        </div>
        <div className="mt-4 text-right">
          <button onClick={handleSendOrder} disabled={disabled} className="px-4 py-2 bg-lime-500 rounded-xl font-medium hover:bg-lime-800">
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;