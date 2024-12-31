import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
        "url_img": "data:image/jpeg;base64,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"
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
    <div className="font-Poppins">
        <Header/>
        <div className="flex justify-center p-2">
            <h2 className="text-brand-primary font-medium">Cardápio</h2>
        </div>
        <div className="flex p-1 justify-around border-2 text-xs">
            <h2 className="text-[#888888] font-regular ">
                Carnes
            </h2>
            <h2 className="text-[#888888] font-regular">
                Acompanhamentos
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
        <div className="flex flex-col justify-around h-[500px] sm:h-full overflow-y-auto">
            <div>
                <h2 className="text-[#424242] font-medium px-12 pt-4 text-[18px]">Carnes</h2>
            </div>
            {Carnes.map((item, index) => (
                <div className="flex flex-row justify-around items-center border-b-2 p-3 w-[400px]" key={index}>
                    <h2 className="text-black font-regular text-[16px]">{item.name}</h2>
                    <img src={item.url_img} alt={item.name} className="w-38 h-24 object-cover rounded-lg "/>
                </div>
            ))}
            <div>
                <h2 className="text-[#424242] font-medium px-12 pt-4 text-[18px]">Acompanhamento</h2>
            </div>
            {Acompanhamentos.map((item, index) => (
                <div className="flex flex-row justify-around items-center border-b-2 p-3 w-[400px]" key={index}>
                    <h2 className="text-black font-regular text-[16px]">{item.name}</h2>
                    <img src={item.url_img} alt={item.name} className="w-32 h-24 object-cover rounded-lg "/>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Home;