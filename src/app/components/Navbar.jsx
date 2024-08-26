import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="wrapper mt-10">
      <div className="figura -rotate-90">
        <div className="octogono absolute -z-8  p-4 -rotate-45 "></div>
        <div className="octogono absolute -z-8  p-4 rotate-45"></div>
        <div className="octogono absolute -z-8  p-4 rotate-90"></div>
        <div className="octogono absolute -z-8  p-4"></div>
      </div>
      <div className="navbar relative">
        <ul className="md:text-left">
          <li className="hover:text-5xl ">
            <Link className="p-10" href="/user">
              Clientes
            </Link>
          </li>
          <li className="hover:text-5xl  ">
            <Link className="p-10" href="/user/projects">
              Proyectos
            </Link>
          </li>
          <li className="hover:text-5xl  ">
            <Link className="p-10" href="/user/deliverynotes">
              Albaranes
            </Link>
          </li>
          <li className="hover:text-white hover:bg-black ">
            <Link className="p-10" href="/">
              Sing out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
