import { Avatar, AvatarFallback, AvatarImage , AvatarBadge} from "@/components/ui/avatar"
import { StaticImageData } from "next/image"

export function AvatarAdmin({image} : {image: StaticImageData | string | undefined}) {
    const imageUrl = typeof image === 'object' ? image?.src : image
  return (
    <Avatar>
      <AvatarImage
        src={imageUrl}
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
