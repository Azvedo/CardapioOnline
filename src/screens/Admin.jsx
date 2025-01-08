import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { listenToCardapio } from "../services/firestore";
import Item from "../components/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import CreateModal from "../components/Modals/CreateModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth } from "../services/firebase";


function Admin() {

    const [menu, setMenu] = useState({ Carnes: [], Acompanhamentos: [], Bebidas: [] });
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleCreateModal = () => {
        setCreateModalVisible(!createModalVisible);
    }

    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };

    useEffect(() => {
        // Configura o listener para ouvir alterações no cardápio
        const unsubscribe = listenToCardapio((updatedMenu) => {
            // Divide os itens por categoria
            const categorizedMenu = {
                Carnes: updatedMenu.filter((item) => item.type === "Carnes"),
                Acompanhamentos: updatedMenu.filter((item) => item.type === "Acompanhamentos"),
                Bebidas: updatedMenu.filter((item) => item.type === "Bebidas"),
            };
            setMenu(categorizedMenu);
        });

        // Remove o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    return (
        <>
            {location.state && (location.state.from === "login" || location.state.from === "admin/pedidos") ? (
                <div>
                    <Header />
                    <div className="absolute right-6 top-[44px] flex gap-8 items-center">
                        <button className="text-[#f48e22] hover:text-brand-primary" onClick={() => navigate("/admin/pedidos", { state: { from: "admin/dashboard" } })}>
                            <h2>
                                Acessar Pedidos
                            </h2>
                        </button>
                        <button className="text-[#f48e22] hover:text-brand-primary" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </div>
                    <div className="font-Poppins overflow-x-hidden ">
                        <div className="flex justify-between items-center py-2 px-5">
                            <h2 className="text-brand-primary font-medium text-xl">Gerenciar cardápio</h2>
                            <button onClick={toggleCreateModal}>
                                <FontAwesomeIcon icon={faPlus} className="text-brand-primary hover:text-amber-900 text-xl" />
                            </button>
                        </div>
                        <div className="flex flex-col justify-around h-[500px] sm:h-full overflow-y-auto ">
                            <div>
                                <h2
                                    className="text-[#424242] font-medium px-8 pt-4 text-[18px] my-2"
                                    id="carnes"
                                >
                                    Carnes
                                </h2>
                            </div>
                            {menu.Carnes.map((item) => (
                                <Item item={item} key={item.id} AdminPage={true} />
                            ))}
                            <div>
                                <h2
                                    className="text-[#424242] font-medium px-8 pt-1 text-[18px] my-2"
                                    id="acompanhamento"
                                >
                                    Acompanhamentos
                                </h2>
                            </div>
                            {menu.Acompanhamentos.map((item) => (
                                <Item item={item} key={item.id} AdminPage={true} />
                            ))}
                            <div>
                                <h2
                                    className="text-[#424242] font-medium px-8 pt-1 text-[18px] my-2"
                                    id="bebidas"
                                >
                                    Bebidas
                                </h2>
                            </div>
                            {menu.Bebidas.map((item) => (
                                <Item item={item} key={item.id} AdminPage={true} />
                            ))}
                        </div>
                        <CreateModal isOpen={createModalVisible} close={toggleCreateModal} />
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen p-4  bg-slate-900">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-4" />
                    <h2 className="text-red-500 text-xl">Você não tem permissão para acessar essa página.</h2>
                </div>
            )}
        </>
    );
}

export default Admin
