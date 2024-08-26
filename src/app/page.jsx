import Link from "next/link";

export default function PrincipalPage() {
  return (
    <>
      <div className="grid grid-cols-3 mt-10 h-full">
        <div className="">{/* mantener este div */}</div>
        <div className="mx-auto self-center">
          <h1 className="text-gray-800 text-5xl text-center font-bold leading-normal">
            Genera albaranes digitales fácilmente con AlbaranPro
          </h1>
        </div>
        <div className="flex justify-end items-center m-10">
          <ul className="flex space-x-5">
            <li className="button bg-blue-600 hover:bg-blue-700">
              <Link href="/register" className="text-white">
                Sign Up
              </Link>
            </li>
            <li className="button bg-orange-500 hover:bg-orange-600">
              <Link href="/login" className="text-white">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
