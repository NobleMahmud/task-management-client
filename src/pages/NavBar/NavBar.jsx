import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import smart from '../../assets/Smart Time.png'
import black from '../../assets/taskNinja black.png'
import white from '../../assets/taskNinja white.png'
import ninja from '../../assets/ninja.png'

import useAuth from "../../hooks/useAuth/useAuth";



function NavListMenu() {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const navListMenuItems = [
        {
            title: user?.displayName,
            // description: "Find the perfect solution for your needs.",
            icon: UserGroupIcon
        },
        {
            title: "Dashboard",
            // description: "Meet and learn about our dedication",
            icon: SquaresPlusIcon,
        },
        {
            title: "Log Out",
            // description: "Find the perfect solution for your needs.",
            icon: Bars4Icon,
        }
    ];


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description }, key) => (
            <a key={key}>
                <MenuItem disabled={title === user?.displayName && true} onClick={() => {
                    if (title === "Log Out") {
                        // navigate('/login')
                        logOut();
                        navigate('/')
                    }
                    if (title === "Dashboard") {
                        navigate('/dashboard')

                    }

                }} className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg !bg-blue-gray p-2 ">
                        {" "}
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-blue-gray-100 text-sm font-bold"
                        // onClick={() => {
                        //     if (title === "Log Out") {
                        //         // navigate('/login')
                        //         logOut();
                        //     }
                        // }}

                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-blue-gray-500"
                        >
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </a>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
            allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium">
                        {
                            user ?
                                <ListItem
                                    className="flex text-blue-gray-100 items-center gap-2 rounded-full py-2 pr-4 p-0 font-medium"
                                    selected={isMenuOpen || isMobileMenuOpen}
                                    onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                                >
                                    {/* Resources */}
                                    <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                                    {/* <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            /> */}
                                </ListItem>
                                :
                                ""
                        }
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    const {user} = useAuth();

    return (
        <List className="mt-4 mb-6 p-0 gap-6 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            {/* <Link to="/meals">
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                >
                    <ListItem className="flex items-center text-blue-gray-100 gap-2 py-2 pr-4">Meals</ListItem>
                </Typography>
            </Link>
            <Link to="/upcoming">
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                >
                    <ListItem className="flex items-center text-blue-gray-100 gap-2 py-2 pr-4">
                        
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 cursor-pointer" viewBox="0 0 371.263 371.263">
                                <path
                                    d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                                    data-original="#000000" />
                            </svg>
                        </div>
                    </ListItem>
                </Typography>
            </Link> */}
            <Link
                to="/" className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-current="page">
                Home
            </Link>
            <Link
                to="/subscribe"
                className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
            >
                Subscribe
            </Link>
            <Link
                to="/contact"
                className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
            >
                Contact Us
            </Link>
            {
                user && 
                <Link
                to="/dashboard"
                className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
            >
                Dashboard
            </Link>
            }


        </List>
    );
}
const NavBar = () => {



    const { user } = useAuth();

    console.log(user);

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    return (
        <Navbar className="mx-auto z-50 sticky top-0  border-0 max-w-screen-2xl  bg-transparent text-white rounded-none px-4 py-4">
            <div className="flex items-center justify-between text-blue-gray-100">
                <Typography
                    as="a"
                    href="/"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    <div className="flex items-center justify-center">
                        <img className="w-16 h-[52px]" src="https://i.ibb.co/NjMBsCk/ninja.png" alt="" />
                    </div>
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">
                    {/* this is full size */}
                    {/* <Button variant="text" size="sm" color="blue-gray">
            Log In
          </Button> */}

                    {
                        user ?

                            <NavListMenu />

                            :
                            <Link to="/login"><Button className="bg-blue-gray-50 hover:bg-blue-gray-100" variant="text" size="sm" color="blue-gray">
                                Log In
                            </Button> </Link>
                    }

                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    {/* <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button> */}
                    {/* <Link to="/login"><Button className="bg-blue-gray-50 hover:bg-blue-gray-100" variant="text" size="sm" color="blue-gray">
                        Log In
                    </Button> </Link> */}
                    {
                        user ?

                            <div className="z-30">
                                <NavListMenu />
                            </div>

                            :
                            <Link to="/login"><Button className="bg-blue-gray-50 hover:bg-blue-gray-100" variant="text" size="sm" color="blue-gray">
                                Log In
                            </Button> </Link>
                    }
                    {/* this is for mobile size */}
                </div>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;