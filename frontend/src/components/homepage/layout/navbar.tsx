import { LogoLink } from "@/components/common/logo-link";
import { NavLogoLink } from "../common/nav-logo-link";
import LoginButton from "../common/login-button";
import { cookies } from "next/headers";
import CartButton from "../common/cart-button";
import PerfilButton from "../common/perfil-button";
import SearchBar from "../common/search-bar";

export default async function Navbar (){
    
    const cookiesStorage = await cookies();
    const isAuthenticated = cookiesStorage.has('access_token')

    return (
        <nav className="fixed flex flex-wrap items-center min-w-full py-4 px-6 border-b border-b-gray-300">
            <NavLogoLink/>
            
            <section className="flex items-center gap-4 ml-auto md:order-last">
                {!isAuthenticated && (
                    <LoginButton/>
                )}
                <PerfilButton/>
                <CartButton/>
            </section>

            <section className="w-full mt-4 md:mt-0 md:flex-1 order-last md:order-0 md:mx-8 flex justify-center">
                <SearchBar/>
            </section>
        </nav>
    )
}