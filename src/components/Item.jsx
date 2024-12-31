
import PropTypes from 'prop-types';

function Item({ item }) {
    return (
        <div className="flex flex-row justify-around items-center border-b-2 p-3 w-full">
            <div className=' w-[90px] sm:w-[50px] h-[24px]'>
                <h2 className="text-black font-regular text-[16px]">{item.name}</h2>
            </div>
            <div>
                <img src={item.url_img} alt={item.name} className="w-32 h-24 object-cover rounded-lg " />
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url_img: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default Item;