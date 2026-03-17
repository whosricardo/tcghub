import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchFilterProps {
    filter: string;
    className?: string;
    params?: string[];
}

export default function SelectInput ({filter , className , params}: SearchFilterProps){
    return (
        <Select>
            <SelectTrigger className={`w-fit focus-visible:ring-0 focus-visible:ring-offset-0 ${className} cursor-pointer`}>
                <SelectValue placeholder={filter} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {params?.map((item , index) => (
                        <SelectItem value={item} key={index}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}