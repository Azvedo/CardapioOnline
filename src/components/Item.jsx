import { useState } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";


function Item({ item, AdminPage }) {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price);

    const handleEdit = () => {
        setEditModalVisible(!editModalVisible);
    };

    const handleDelete = () => {
        setDeleteModalVisible(!deleteModalVisible);
    }

    return (
        <div className="flex flex-row justify-between px-8 items-center border-y-2 py-4 w-full h-16 sm:mt-2">
            <div className='flex flex-row gap-4'>
                <h2 className="text-black font-regular text-[16px]">{item.name.toUpperCase()}</h2>
            </div>
            <div className="justify-center items-center">
                {AdminPage ? (
                    <div className="flex flex-row gap-4 p-4 justify-center items-center">
                        <button onClick={handleEdit} className="bg-gray-500 hover:bg-gray-800 text-white w-9 h-9 px-2 py-1 rounded text-2xs">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-800 text-white w-9 h-9 px-2 py-1 rounded text-2xs">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row gap-4 p-4 justify-center items-center">
                        <p>{formattedPrice}</p>
                    </div>
                )}
            </div>
            <EditModal isOpen={editModalVisible} item={item} close={handleEdit} />
            <DeleteModal isOpen={deleteModalVisible} itemId={item.id} close={handleDelete} />
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string,
        available: PropTypes.bool,
        price: PropTypes.number,
    }).isRequired,
    AdminPage: PropTypes.bool,
};

export default Item;