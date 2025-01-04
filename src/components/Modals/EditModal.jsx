import { useState } from "react";
import PropTypes from 'prop-types';
import { updateItem } from '../../services/firestore';


function EditModal({ isOpen, item, close }) {

    const [available, setAvailable] = useState(item.available);
    const [price, setPrice] = useState(item.price);

    const updtItem = async () => {
        try {
            await updateItem(item.id, available === "true", parseFloat(price));
            console.log("Item atualizado com sucesso!");
            close();
        } catch (error) {
            console.error("Erro ao atualizar o item:", error);
        }
    }

    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-8 rounded-lg" >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-black font-regular text-[16px] font-bold">{item.name}</h2>
                    <button onClick={close} className="text-xl">&times;</button>
                </div>
                <div>
                    <label className="px-4 font-semibold">Preço:</label>
                    <input type="number" value={parseFloat(price)} onChange={(e) => setPrice(e.target.value)} className="border rounded-xl p-2" />
                </div>
                <div className="mt-4">
                    <label className="px-4 font-semibold">Disponibilidade:</label>
                    <select value={available} onChange={(e) => setAvailable(e.target.value)} className="border rounded-xl p-2">
                        <option className="p-2" value="true">Disponível</option>
                        <option className="p-2" value="false">Indisponível</option>
                    </select>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-medium w-full" onClick={updtItem}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        available: PropTypes.bool,
        price: PropTypes.number,
    }).isRequired,
    close: PropTypes.func.isRequired,
};

export default EditModal;