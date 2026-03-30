import { Avatar, AvatarFallback, AvatarImage , AvatarBadge} from "@/components/ui/avatar"

export function AvatarAdmin() {
  return (
    <Avatar>
      <AvatarImage
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>TM</AvatarFallback>
    </Avatar>
  )
}
