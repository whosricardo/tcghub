import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";


interface SearchFilterProps {
    filter: string;
    className?: string;
}

export default function SeachFilter ({filter , className}: SearchFilterProps){
    return (
        <Select>
            <SelectTrigger className={`w-fit border-none shadow-none rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent bg-transparent${className} cursor-pointer`}>
                <SelectValue placeholder={filter} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="magic">Magic: The Gathering</SelectItem>
                    <SelectItem value="pokemon">Pokémon TCG</SelectItem>
                    <SelectItem value="yugioh">Yu-Gi-Oh!</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}