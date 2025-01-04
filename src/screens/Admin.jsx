import { useEffect, useState } from "react";
import { listenToCardapio } from "../services/firestore";
import Item from "../components/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateModal from "../components/Modals/CreateModal";

function Admin() {

    const [menu, setMenu] = useState({ Carnes: [], Acompanhamentos: [], Bebidas: [] });
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const toggleCreateModal = () => {
        setCreateModalVisible(!createModalVisible);
    }

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
        <div className="font-Poppins overflow-x-hidden ">
            <div className="flex justify-between items-center py-2 px-5">
                <h2 className="text-brand-primary font-medium text-xl">Cardápio</h2>
                <button onClick={toggleCreateModal}>
                    <FontAwesomeIcon icon={faPlus} className="text-brand-primary hover:text-amber-900 text-xl" />
                </button>
            </div>
            <div className="flex p-1 justify-around border-2 text-xs ">
                <h2 className="text-[#888888] font-regular ">
                    <a href="#carnes">Carnes</a>
                </h2>
                <h2 className="text-[#888888] font-regular">
                    <a href="#acompanhamento">Acompanhamentos</a>
                </h2>
                <h2 className="text-[#888888] font-regular">
                    <a href="#bebidas">Bebidas</a>
                </h2>
            </div>
            <div className="flex flex-col justify-around h-[500px] sm:h-full overflow-y-auto ">
                <div>
                    <h2
                        className="text-[#424242] font-medium px-8 pt-4 text-[18px]"
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
                        className="text-[#424242] font-medium px-8 pt-1 text-[18px]"
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
                        className="text-[#424242] font-medium px-8 pt-4 text-[18px]"
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
    );
}


export default Admin