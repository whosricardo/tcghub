import { User } from "lucide-react";
import Link from "next/link";

export default function PerfilButton (){
    return (
        <Link href={'/config'}>
            <User size={25} color="black" fill="black"/>
        </Link>
    )
}