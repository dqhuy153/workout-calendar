import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { WorkoutDetail } from '../../queries'

export type WorkoutMap = Record<string, WorkoutDetail[]>

type WorkoutContextProps = {
  workouts: WorkoutMap
  setWorkouts: Dispatch<React.SetStateAction<WorkoutMap>>
}

const WorkoutContext = createContext<WorkoutContextProps>({
  workouts: {},
  setWorkouts: () => {},
})

const useWorkoutContext = () => useContext(WorkoutContext)

const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
  const [workouts, setWorkouts] = useState<WorkoutMap>({})

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export { useWorkoutContext, WorkoutContextProvider }
