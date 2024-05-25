import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Acceuil | DRH Restauration',
};

export default function Home() {
  return (
    <div className="container m-auto flex flex-col text-center p:4 md:p-8 bg-light border-8 border-transparent rounded-2xl sm:p-2">
      <header>
        <div className="flex flex-col gap-1 md:flex-row justify-around items-center">
          <Image
            className="rounded border-none"
            src={"/images/rdc.png"}
            alt="République Démocratique du Congo"
            width="80"
            height="80"
          />
          <h1 className="text-white font-semibold text-4xl">Bienvenu à la Direction de Reboisement et Horticulture !</h1>
          <Image
            className="rounded border-none hidden md:block"
            src={"/logo-medd.jpg" || "/noavatar.png"}
            alt="Ministère de l'Environnement et de Dévéloppement durable"
            width="70"
            height="70"
          />
        </div>
        <p className="pt-4 text-xl">
          Explorer les zones de Restauration des paysages forestiers en DRC
        </p>
      </header>

      <section className="my-4 relative block py-5 lg:pt-15 bg-gray-900">
        <div className="container relative mx-auto mb-8">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <p className="mt-4 text-lg text-gray-300">
                C&apos;est dans ce contexte que le WWF RDC fait appel aux services d&apos;un consultant national pour fournir un soutien technique à la direction de reboisement et d&apos;horticulture à fin de constituer une base de données sur les initiatives de restauration des paysages forestiers en RDC.
              </p>
            </div>
          </div>
        </div>

        <Link className="bg-blue-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5" href="/dashboard">
          Allez sur le dashboard
        </Link>
      </section>

      <footer className="relative bg-gray-300 pt-5 pb-3">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="flex flex-col items-center w-full lg:w-6/12 px-4">
              <h4 className="text-2xl text-black font-semibold">
                Consultance financé par
              </h4>
              <div className="mt-2">
                <Image src="/images/wwf.png" width={60} height={60} alt="logo de WWF" className="shadow rounded max-w-full border-none" />
              </div>
            </div>
            {/* <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation">About Us
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://blog.creative-tim.com">Blog
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial">Github
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free">Free Products
                      </a>
                    </li>

                  </ul>
                </div>

              </div>
            </div> */}
          </div>

          <hr className="my-4 border-gray-400" />

          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}DRH by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Vick Dev
                </a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
