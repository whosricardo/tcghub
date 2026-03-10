import { Search } from "lucide-react"

export default function SearchButton (){
    return (
        <button className="w-full h-full flex justify-center items-center cursor-pointer hover:bg-gray-100 md:2 transition-all delay-100 ease-in-out">
            <Search size={20}/>
        </button>
    )
}