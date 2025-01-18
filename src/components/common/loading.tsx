import { COLORS } from '@constants'
import { memo } from 'react'
import styled from 'styled-components'

type StyledLoadingProps = {
  size?: string
  color?: string
  $bgcolor?: string
}

const StyledLoading = styled.div<StyledLoadingProps>`
  --size: ${({ size }) => size};
  --bgcolor: ${({ $bgcolor }) => $bgcolor};
  --color: ${({ color }) => color};

  width: var(--size);
  height: var(--size);
  background: var(--bgcolor);
  box-sizing: border-box;
  border-radius: 50%;
  display: block;
  margin-left: 24px;
  margin-right: 24px;
  box-shadow: -24px 0 var(--bgcolor), 24px 0 var(--bgcolor);
  animation: shadowPulse 1s linear infinite;

  @keyframes shadowPulse {
    33% {
      background: var(--bgcolor);
      box-shadow: -24px 0 var(--color), 24px 0 var(--bgcolor);
    }
    66% {
      background: var(--color);
      box-shadow: -24px 0 var(--bgcolor), 24px 0 var(--bgcolor);
    }
    100% {
      background: var(--bgcolor);
      box-shadow: -24px 0 var(--bgcolor), 24px 0 var(--color);
    }
  }
`

type LoadingProps = {
  size?: string
  color?: string
  bgcolor?: string
}

const Loading = ({
  size = '14px',
  bgcolor = COLORS.background,
  color = COLORS.primary,
}: LoadingProps) => {
  return <StyledLoading size={size} $bgcolor={bgcolor} color={color} />
}

export default memo(Loading)
