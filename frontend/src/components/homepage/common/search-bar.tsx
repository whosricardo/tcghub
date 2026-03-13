import SearchButton from "./search-button";
import SeachFilter from "./search-filters";

export default function SearchBar() {
    return (
        <section className="flex items-center w-full max-w-2xl border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">   
            <section className="hidden md:block shrink-0 border-r border-gray-300 h-full">
                <SeachFilter filter={'All'} className="border-none overflow-hidden bg-transparent shadow-none" />
            </section>

            <input 
                placeholder='Tente pesquisar pela "carta do Zoro"' 
                className="flex-1 w-full px-3 py-2 text-gray-700 outline-none bg-transparent" 
            />

            <section className="shrink-0 border-l border-gray-300 h-full p-2">
                <SearchButton />
            </section>

        </section>
    );
}