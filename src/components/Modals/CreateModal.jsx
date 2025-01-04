import { useState } from 'react';
import PropTypes from 'prop-types';
import { createItem } from '../../services/firestore';

function CreateModal({isOpen, close}) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(true);
    const [type, setType] = useState("");

    const saveItem = async () => {
        try {
            if (!name || !type || price <= 0) {
                console.error("Todos os campos devem ser preenchidos corretamente.");
                return;
            }
            await createItem({ name, price, available, type });
            console.log("Item criado com sucesso!");
            setName("");
            setPrice(0);
            setAvailable(true);
            setType("");
            close();
        } catch (error) {
            console.error("Erro ao criar o item:", error);
        }
    }


    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-8 rounded-lg" >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-black font-regular text-[16px] font-bold">Adicionar novo item</h2>
                    <button onClick={close} className="text-xl">&times;</button>
                </div>
                <div>
                    <label className="px-4 font-semibold">Nome:</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border rounded-xl p-2" />
                </div>
                <div className="mt-4">
                    <label className="px-4 font-semibold">Tipo:</label>
                    <select value={type} onChange={(e) => {setType(e.target.value) }} className="border rounded-xl p-2" >
                        <option className="p-2" value="">Selecione o tipo</option>
                        <option className="p-2" value="Carnes">Carne</option>
                        <option className="p-2" value="Acompanhamentos">Acompanhamento</option>
                        <option className="p-2" value="Bebidas">Bebida</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="px-4 font-semibold">Preço:</label>
                    <input type="number" value={parseFloat(price)} onChange={(e) => { setPrice(e.target.value) }} className="border rounded-xl p-2" />
                </div>
                <div className="mt-4">
                    <label className="px-4 font-semibold">Disponibilidade:</label>
                    <select value={available} onChange={(e) => { setAvailable(e.target.value) }} className="border rounded-xl p-2">
                        <option className="p-2" value="true">Disponível</option>
                        <option className="p-2" value="false">Indisponível</option>
                    </select>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-medium w-full" onClick={saveItem}>Salvar</button>
                </div>
            </div>
        </div>
    );
}


CreateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default CreateModal;

