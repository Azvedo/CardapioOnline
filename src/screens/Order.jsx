import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { listenToCardapio } from '../services/firestore';
import ItemWithCounter from "../components/ItemWithCounter";
import InfoModal from '../components/Modals/InfoModal';

function Order() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemTotals, setItemTotals] = useState({});
  const [menu, setMenu] = useState({ Carnes: [], Acompanhamentos: [], Bebidas: [] });
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigate = useNavigate();
  const carneRefs = useRef([]);
  const acompanhamentoRefs = useRef([]);
  const bebidaRefs = useRef([]);

  const handleTotalChange = (itemId, newTotal) => {
    setItemTotals((prevTotals) => {
      const updatedTotals = { ...prevTotals, [itemId]: newTotal };
      const totalSum = Object.values(updatedTotals).reduce((acc, value) => acc + value, 0);
      setTotal(totalSum);
      return updatedTotals;
    });
  };

  useEffect(() => {
    const unsubscribe = listenToCardapio((updatedMenu) => {
      const categorizedMenu = {
        Carnes: updatedMenu.filter((item) => item.type === "Carnes" && item.available === true),
        Acompanhamentos: updatedMenu.filter((item) => item.type === "Acompanhamentos" && item.available === true),
        Bebidas: updatedMenu.filter((item) => item.type === "Bebidas" && item.available === true),
      };

      setMenu(categorizedMenu);
      setLoading(false); // Dados carregados, desativa o estado de carregamento
    });
    // Remove o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);

  const createOrder = () => {
    const generalOrder = [
      ...carneRefs.current.map(ref => ref.getItemData()),
      ...acompanhamentoRefs.current.map(ref => ref.getItemData()),
      ...bebidaRefs.current.map(ref => ref.getItemData())
    ];

    const completedOrder = generalOrder.filter(item => item.count > 0);
    setOrder(completedOrder);

    handleModalVisibility();
  };

  const handleModalVisibility = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="font-Poppins overflow-x-hidden">
      <Header />
      <div className="flex px-5 py-2 items-center justify-between">
        <a onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faChevronLeft} className="text-2xs px-2" />
        </a>
        <h2 className="text-brand-primary font-medium">Monte o seu</h2>
        <div className="w-10" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Carregando...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-start p-2">
            <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
              Carnes
            </h2>
            <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
              Selecione a opcão desejada
            </p>
            {menu.Carnes.map((item, index) => (
              <ItemWithCounter
                item={item}
                key={index}
                ref={el => carneRefs.current[index] = el}
                onTotalChange={(newTotal) => handleTotalChange(item.id, newTotal)}
              />
            ))}
          </div>

          <div className="flex flex-col justify-start p-2">
            <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
              Acompanhamentos
            </h2>
            <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
              Escolha
            </p>
            {menu.Acompanhamentos.map((item, index) => (
              <ItemWithCounter
                item={item}
                key={index}
                ref={el => acompanhamentoRefs.current[index] = el}
                onTotalChange={(newTotal) => handleTotalChange(item.id, newTotal)}
              />
            ))}
          </div>

          <div className="flex flex-col justify-center p-2">
            <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
              Bebidas
            </h2>
            <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
              Escolha
            </p>
            {menu.Bebidas.map((item, index) => (
              <ItemWithCounter
                item={item}
                key={index}
                ref={el => bebidaRefs.current[index] = el}
                onTotalChange={(newTotal) => handleTotalChange(item.id, newTotal)}
              />
            ))}
          </div>

          <div className="flex justify-between p-4 border-t-2">
            <div className='ml-8'>
              <h2 className="text-[#424242] font-medium">Total</h2>
              <p className="text-[#888888] font-regular">{formattedTotal}</p>
            </div>
            <button onClick={createOrder} className="px-4 py-2 bg-lime-500 rounded-xl font-medium hover:bg-lime-800">
              Confirmar Pedido
            </button>
          </div>
        </>
      )}
      <Footer />

      <InfoModal isOpen={isModalOpen} onClose={handleModalVisibility} order={order} total={formattedTotal} />
    </div>
  );
}

export default Order;