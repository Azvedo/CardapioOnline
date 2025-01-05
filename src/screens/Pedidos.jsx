import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { listenToOrders } from "../services/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faPrint, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";

function Pedidos() {
    const navigate = useNavigate();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Pedido selecionado para exibir no modal
    const [showModal, setShowModal] = useState(false); // Controle de exibição do modal

    const contentRef = useRef(null); // Referência para o elemento a ser impresso

    const handlePrint = useReactToPrint({ contentRef });

    useEffect(() => {
        const unsubscribe = listenToOrders((updatedOrders) => {
            setOrders(updatedOrders);
        });
        return () => unsubscribe();
    }, []);

    const handleBack = () => {
        if (location.state.from === "admin/dashboard") {
            navigate("/admin", { state: { from: "admin/pedidos" } });
        } else {
            navigate("/", { replace: true });
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    return (
        <>
            {location.state && location.state.from === "admin/dashboard" ? (
                <div>
                    <Header />
                    <div className="bg-slate-900 p-4 flex justify-between items-center">
                        <button onClick={handleBack} className="text-[#F9CF49] hover:text-yellow-300">
                            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        </button>
                        <h1 className="text-[#F9CF49] text-2xl text-center w-full font-medium">Pedidos</h1>
                    </div>
                    <div className="p-4">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-[#F9CF49]">
                                    <th className="py-2 px-4 border-b-2 border-x-2">Nome</th>
                                    <th className="py-2 px-4 border-b-2 border-x-2">WhatsApp</th>
                                    <th className="py-2 px-4 border-b-2 border-x-2">Data/Hora</th>
                                    <th className="py-2 px-4 border-b-2 border-x-2">Forma de Pagamento</th>
                                    <th className="border-b-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="py-2 px-4 border-b text-center border-x-2">{order.delivery.name}</td>
                                        <td className="py-2 px-4 border-b text-center border-x-2">{order.delivery.phone}</td>
                                        <td className="py-2 px-4 border-b text-center border-x-2">
                                            {new Date(order.data).toLocaleString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center border-x-2">{order.payment.method}</td>
                                        <td className="py-2 px-4 border-b text-center border-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPrint} className="text-neutral-950 text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white text-black w-[320px] font-mono text-sm relative">
                                <div className="bg-white text-black p-4 w-full font-mono" ref={contentRef}>
                                    <div className="text-center mb-4">
                                        <h2 className="text-lg font-bold">Pedido</h2>
                                        <p>{new Date(selectedOrder.data).toLocaleString("pt-BR")}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p><strong>Cliente:</strong> {selectedOrder.delivery.name}</p>
                                        <p><strong>Endereço:</strong> {`${selectedOrder.delivery.street}, ${selectedOrder.delivery.number}`}</p>
                                        <p><strong>Bairro:</strong> {selectedOrder.delivery.neighborhood}</p>
                                        <p><strong>Telefone:</strong> {selectedOrder.delivery.phone}</p>
                                    </div>
                                    <div className="border-t border-black mt-2 mb-2"></div>
                                    <div className="mb-2">
                                        <h3 className="font-bold text-center">Itens do Pedido</h3>
                                        <ul>
                                            {selectedOrder.order.map((item, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{item.count}x {item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border-t border-black mt-2 mb-2"></div>
                                    <div className="text-center">
                                        <p><strong>Forma de Pagamento:</strong> {selectedOrder.payment.method}</p>
                                        {selectedOrder.payment.change && (
                                            <p><strong>Troco:</strong> {(Number(selectedOrder.payment.change) - Number(selectedOrder.total.replace(/[^0-9,-]+/g,"").replace(",","."))).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                                        )}
                                        <p><strong>Total:</strong> {selectedOrder.total}</p>
                                    </div>
                                    <div className="border-t border-black mt-2 mb-2"></div>
                                    <div className="text-center">
                                        <p>Obrigado pela preferência!</p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleModalClose}
                                        className="bg-red-500 text-white px-4 py-2 m-4 rounded hover:bg-red-600"
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="bg-gray-800 text-white px-4 py-2 m-4 rounded hover:bg-gray-900"
                                    >
                                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                                        Imprimir
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen p-4 bg-slate-900">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-4" />
                    <h2 className="text-red-500 text-xl">Você não tem permissão para acessar essa página.</h2>
                </div>
            )}
        </>
    );
}

export default Pedidos;
