import { type LightbulbIcon as LucideProps, User, Mail, Lock, ArrowRight } from "lucide-react"

export const Icons = {
  user: User,
  email: Mail,
  password: Lock,
  arrowRight: ArrowRight,
}

export type Icon = keyof typeof Icons

interface IconWrapperProps extends LucideProps {
  name: Icon
}

export const IconWrapper = ({ name, ...props }: IconWrapperProps) => {
  const IconComponent = Icons[name]
  return <IconComponent {...props} />
}

