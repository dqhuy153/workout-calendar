import { Loading } from '@components/common'
import { LayoutRoot } from '@components/layout'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

const WorkoutCalendar = lazy(() => import('@modules/workout-calendar/views'))

const AppRouters = () => {
  return (
    <Suspense
      fallback={
        <LayoutRoot centerChild>
          <Loading />
        </LayoutRoot>
      }
    >
      <Routes>
        <Route
          path='/'
          element={
            <LayoutRoot centerChild>
              <WorkoutCalendar />
            </LayoutRoot>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default AppRouters
