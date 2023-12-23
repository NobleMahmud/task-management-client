import { Link } from "react-router-dom"

const NavBar3 = () => {
    const navOptions = <>
        <li className="font-medium text-black p-0 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><Link>Home</Link></li>
        <li className="font-medium text-black p-0 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><Link>Home</Link></li>
        <li className="font-medium text-black p-0 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"><Link>Home</Link></li>
        
    </>
    return (
        <div>
            <div className="navbar bg-gray-800">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navOptions}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                            <a className="font-medium text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-current="page">
                                Landing
                            </a>
                            <a
                                className="font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Account
                            </a>
                            <a
                                className="font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Work
                            </a>
                            <a
                                className="font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Blog
                            </a>
                        </div>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default NavBar3;