import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const navigate = useNavigate();
  const by = "<by>RafaelAzevedo</by>";

  return (
    <footer className="bg-[#020202] flex justify-around items-center p-4 h-full">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-[#f48e22] font-bold">O Pilão</h1>
        <a href="https://www.instagram.com/restauranteopilao/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-xl text-gray-100" />
        </a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-[44px]">
        </div>
        <a href="https://www.linkedin.com/in/rafael-alves-701741269/" target="_blank" rel="noreferrer">
          <p className=" text-white font-normal text-xs opacity-80"> {by} </p>
        </a>
      </div>
      <button onClick={() => { navigate('/login') }} className=" text-[#f48e22] text-center text-xs">
        Painel
      </button>
    </footer>
  );
}

export default Footer;