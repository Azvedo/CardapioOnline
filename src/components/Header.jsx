import logo from '../assets/logo2.png';

function Header() {
  return (
    <header className='bg-[#020202] flex p-5 items-center justify-center '>
        <img src={logo} className='w-24 rounded-xl '/>
    </header>
  );
}

export default Header;