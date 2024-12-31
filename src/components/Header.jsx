import logo from '../assets/logo.png';

function Header() {
  return (
    <header className='bg-brand-primary flex p-5 items-center justify-between h-24'>
        <img src={logo} className='w-10'/>
        <h1 className='text-center text-2xl font-medium text-white flex-grow'>Restaurante</h1>
        <div className='w-10'></div>
    </header>
  );
}

export default Header;