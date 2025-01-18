import { cn } from '@/lib/utils'
import { PropsWithChildren, ElementType } from 'react'

type Props = PropsWithChildren & {
  as?: ElementType
  className?: string
}

const Center = ({ children, as: As = 'div', className }: Props) => {
  return (
    <As className={cn('flex justify-center items-center', className)}>
      {children}
    </As>
  )
}

export default Center
