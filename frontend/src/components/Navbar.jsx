import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const[isSideMenu , setSideMenu ] =useState(false);
  console.log(isSideMenu);
  return (
    <>
      <nav className="flex justify-between px-8">
        <section className="flex items-center gap-4">
          <MdMenu className="text-3xl lg:hidden" onClick={()=> {setSideMenu(pre => !pre)}}/>
          {/* Logo */}
          <Link href={"/"} className="text-3xl">
            Logo
          </Link>
          <Link className="hidden lg:block  text-2xl text-center" href ={"#"}>Item-1</Link>
        <Link className=" hidden lg:block font-bold text-3xl text-center" href ={"#"}>Item-2</Link>
        <Link className="hidden lg:block font-bold text-3xl text-center" href ={"#"}>Item-3</Link>
        <Link className="hidden lg:block font-bold text-3xl text-center" href ={"#"}>Item-4</Link>
        <Link className="hidden lg:block font-bold text-3xl text-center" href ={"#"}>Item-5</Link>

        </section>
      {/* Side-bar mobile menu */}
      {
        isSideMenu && <>
      <div className= {`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0  transition duration-300 ease-in-out ${isSideMenu} ? 'translate-x-0' : '-translate-x-full' `}>
        <section className="text-black bg-white flex flex-col  absolute left-0 top-0 p-8 h-screen gap-8 z-50 w-60 ">
        <AiOutlineClose className="text-5xl mt-0 mb-8 cursor-pointer" onClick={()=> {setSideMenu(pre => !pre)}}/>
        <Link className="font-bold text-3xl text-center" href ={"#"}>Item-1</Link>
        <Link className="font-bold text-3xl text-center" href ={"#"}>Item-2</Link>
        <Link className="font-bold text-3xl text-center" href ={"#"}>Item-3</Link>
        <Link className="font-bold text-3xl text-center" href ={"#"}>Item-4</Link>
        <Link className="font-bold text-3xl text-center" href ={"#"}>Item-5</Link>
        </section>
      </div>
      </>
      }






        {/* Last-section */}
        <section className="flex items-center justify-center gap-6">
          <FaShoppingCart className="text-3xl"/>
          <img src = "https://i.pravatar.cc/150?img=3" alt = "avatar" className="w-12 h-12 rounded-full"/>
        </section>


      </nav>
    </>
  );
};

export default Navbar;
