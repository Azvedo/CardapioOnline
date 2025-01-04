function Footer() {

  const by = "<by:RafaelAzevedo />";

  return (
    <footer className="bg-brand-primary flex justify-around items-center p-4 h-full">
      <p className=" text-white font-normal "> {by} </p>
      <a href="/admin" className=" text-white text-center text-xs" >Painel</a>
    </footer>
  );
}

export default Footer;