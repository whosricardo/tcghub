import { User } from "lucide-react";
import Link from "next/link";

export default function PerfilButton (){
    return (
        <Link href={'/admin'}>
            <User size={25} color="black" fill="black"/>
        </Link>
    )
}