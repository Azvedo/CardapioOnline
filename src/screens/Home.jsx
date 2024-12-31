import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Carnes = [
    {
        "id": "Carnes",
        "name": "Picanha",
        "url_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J8KuaOJHP-949D97eRfL7stA-4yW9AdlVQ&s"
    },
    {
        "id": "Carnes",
        "name": "Carne de Sol",
        "url_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J8KuaOJHP-949D97eRfL7stA-4yW9AdlVQ&s"
    },
    {
        "id": "Carnes",
        "name": "Picanha",
        "url_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J8KuaOJHP-949D97eRfL7stA-4yW9AdlVQ&s"
    },
    {
        "id": "Carnes",
        "name": "Picanha",
        "url_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J8KuaOJHP-949D97eRfL7stA-4yW9AdlVQ&s"
    },
    {
        "id": "Carnes",
        "name": "Picanha",
        "url_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J8KuaOJHP-949D97eRfL7stA-4yW9AdlVQ&s"
    },
    
];

const Acompanhamentos = [
    {
        "id": "Acompanhamentos",
        "name": "Arroz refogado",
        "url_img": "https://www.cigala.pt/wp-content/uploads/2021/08/Arroz_Refugado.png"
    },
    {
        "id": "Carnes",
        "name": "Feijão Mulatinho",
        "url_img": "https://alegrafoods.com.br/wp-content/uploads/2021/07/pasted-image-0.png"
    },  
];

function Home() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/pedido');
    }

  return (
    <div className="font-Poppins overflow-x-hidden">
        <Header/>
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
                Bebidas 
            </h2>
        </div>
        <div className="relative">
            <button className=" absolute top-[26rem] right-4 flex justify-center px-4 py-3 bg-lime-500 rounded-xl font-medium hover:bg-lime-800" onClick={handleClick}>
                Monte o seu 
            </button>
        </div>
        <div className="flex flex-col justify-around h-[500px] sm:h-full overflow-y-auto ">
            <div>
                <h2 className="text-[#424242] font-medium px-8 pt-4 text-[18px]" id="carnes">Carnes</h2>
            </div>
            {Carnes.map((item, index) => (
                <div className="flex flex-row justify-around items-center border-b-2 p-3 w-full" key={index}>
                    <h2 className="text-black font-regular text-[16px]">{item.name}</h2>
                    <img src={item.url_img} alt={item.name} className="w-38 h-24 object-cover rounded-lg "/>
                </div>
            ))}
            <div>
                <h2 className="text-[#424242] font-medium px-8 pt-4 text-[18px]" id="acompanhamento">Acompanhamento</h2>
            </div>
            {Acompanhamentos.map((item, index) => (
                <div className="flex flex-row justify-around items-center border-b-2 p-3 w-full" key={index}>
                    <h2 className="text-black font-regular text-[16px]">{item.name}</h2>
                    <img src={item.url_img} alt={item.name} className="w-32 h-24 object-cover rounded-lg "/>
                </div>
            ))}
        </div>
        <Footer/>
    </div>
  );
}

export default Home;