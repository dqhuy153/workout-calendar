import { PropsWithChildren, ElementType } from 'react'
import { cn } from '@/lib/utils'

type Props = PropsWithChildren & {
  as?: ElementType
  centerChild?: boolean
  className?: string
}

const LayoutRoot = ({
  children,
  as: As = 'div',
  centerChild,
  className,
}: Props) => {
  return (
    <As
      className={cn(
        'min-w-[100vw]',
        'min-h-[100vh]',
        { 'flex justify-center items-center': centerChild },
        className
      )}
    >
      {children}
    </As>
  )
}

export default LayoutRoot
