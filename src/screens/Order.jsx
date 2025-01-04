import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Carnes, Acompanhamentos, Bebidas } from "../utils/data";
import ItemWithCounter from "../components/ItemWithCounter";
import InfoModal from '../components/Modals/InfoModal';

function Order() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const carneRefs = useRef([]);
  const acompanhamentoRefs = useRef([]);
  const bebidaRefs = useRef([]);


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

      <div className="flex flex-col justify-start p-2">
        <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
          Carnes
        </h2>
        <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
          Escolha até 2 opções
        </p>
        {Carnes.map((item, index) => (
          <ItemWithCounter
            item={item}
            key={index}
            ref={el => carneRefs.current[index] = el}
          />
        ))}
      </div>

      <div className="flex flex-col justify-start p-2">
        <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
          Acompanhamentos
        </h2>
        <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
          Escolha até 6 opções
        </p>
        {Acompanhamentos.map((item, index) => (
          <ItemWithCounter
            item={item}
            key={index}
            ref={el => acompanhamentoRefs.current[index] = el}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center p-2">
        <h2 className="text-[#424242] font-medium px-8 pt-4 text-[16px]">
          Bebidas
        </h2>
        <p className="text-[#888888] font-regular px-8 pt-1 pb-3 text-[12px]">
          Escolha até 1 opção
        </p>
        {Bebidas.map((item, index) =>(
          <ItemWithCounter 
          item={item} 
          key={index}
          ref={el => bebidaRefs.current[index] = el}
          />
        ))}
      </div>

      <div className="flex justify-center p-4">
        <button onClick={createOrder} className="px-4 py-2 bg-lime-500 rounded-xl font-medium hover:bg-lime-800">
          Confirmar Pedido
        </button>
      </div>
      <Footer />

      <InfoModal isOpen={isModalOpen} onClose={handleModalVisibility} order={order} />
    </div>
  );
}

export default Order;