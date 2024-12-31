import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carnes, Acompanhamentos, Bebidas } from "../utils/data";
import Item from "../components/Item";

function Home() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/pedido');
    }

    return (
        <div className="font-Poppins overflow-x-hidden">
            <Header />
            <div className="flex justify-center p-2">
                <h2 className="text-brand-primary font-medium">Cardápio</h2>
            </div>
            <div className="flex p-1 justify-around border-2 text-xs">
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
            <div className="relative">
                <button className=" absolute top-[26rem] right-4 flex justify-center px-4 py-3 bg-lime-500 rounded-xl font-medium hover:bg-lime-800" onClick={handleClick}>
                    Monte o seu
                </button>
            </div>
            <div className="flex flex-col justify-around h-[500px] sm:h-full overflow-y-auto ">
                <div>
                    <h2 className="text-[#424242] font-medium px-8 pt-4 text-[18px]" id="carnes">
                        Carnes
                    </h2>
                </div>
                {Carnes.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <div>
                    <h2 className="text-[#424242] font-medium px-8 pt-4 text-[18px]" id="acompanhamento">
                        Acompanhamento
                    </h2>
                </div>
                {Acompanhamentos.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <div>
                    <h2 className="text-[#424242] font-medium px-8 pt-4 text-[18px]" id="bebidas">
                        Bebidas
                    </h2>
                </div>
                {Bebidas.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Home;