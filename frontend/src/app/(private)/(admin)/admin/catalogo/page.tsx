import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Catalogo (){
    return (
        <section className="flex justify-between">
            <p>Visualizar catalogo</p>
            <Button>
                <Link href={'catalogo/add-product'}>Adicionar produto</Link>
            </Button>
        </section>
    )
}