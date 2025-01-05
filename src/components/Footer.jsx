import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const by = "<by:RafaelAzevedo />";

  return (
    <footer className="bg-brand-primary flex justify-around items-center p-4 h-full">
      <p className=" text-white font-normal "> {by} </p>
      <button onClick={() => { navigate('/login')}} className=" text-white text-center text-xs">
        Painel
      </button>
    </footer>
  );
}

export default Footer;