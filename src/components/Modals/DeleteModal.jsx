import PropTypes from 'prop-types';
import { deleteItem } from "../../services/firestore"

function DeleteModal({ isOpen, close, itemId }) {

    if (!isOpen) {
        return null;
    }

    const delItem = async () => {
        try {
            await deleteItem(itemId);
            close();
        } catch (error) {
            console.error("Erro ao excluir o item:", error);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-8 rounded-lg w-[400px] m-4">
                <div className='flex justify-center items-center mb-4'>
                    <h1 className='font-bold'>Tem certeza que deseja exluir este item do Cardápio?</h1>
                </div>
                <div className='flex justify-around items-center'>
                    <button className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-medium" onClick={delItem}>Sim</button>
                    <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-xl font-medium" onClick={close}>Não</button>
                </div>
            </div>
        </div>
    )
}

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired
};

export default DeleteModal;