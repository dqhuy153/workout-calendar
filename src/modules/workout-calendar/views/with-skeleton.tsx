import { Center, Loading } from '@/components'
import { Suspense } from 'react'
import { WorkoutContextProvider } from './context/workouts-context'

export const withSkeleton = (Component: () => JSX.Element, title: string) => {
  return () => (
    <section className='grid gap-6'>
      <h1 className='text-primary font-extrabold text-2xl text-center'>
        {title}
      </h1>

      {/* Can replace with dedicated skeleton here */}
      <Center>
        <Suspense fallback={<Loading />}>
          <WorkoutContextProvider>
            <Component />
          </WorkoutContextProvider>
        </Suspense>
      </Center>
    </section>
  )
}
