import { UniqueIdentifier } from '@dnd-kit/core'
import { WorkoutMap } from './context/workouts-context'

export enum DroppableTypeEnum {
  DATE = 'DATE',
  WORKOUT = 'WORKOUT',
  EXERCISE = 'EXERCISE',
}

export const findDayByWorkoutId = (
  workouts: WorkoutMap,
  workoutId: UniqueIdentifier
) =>
  Object.keys(workouts).find(day =>
    workouts[day].some(workout => workout.id === workoutId)
  )

export const findWorkoutById = (workouts: WorkoutMap, id: UniqueIdentifier) =>
  Object.values(workouts)
    .flat()
    .find(workout => workout.id === id)

export const findIndexById = (array: any[], id: UniqueIdentifier) =>
  array.findIndex(item => item.id === id)

export const extractDndId = (id: UniqueIdentifier) => {
  const infos = id?.toString()?.split('__')

  if (!infos?.length) return {}

  return {
    type: infos[0],
    id: infos[1],
    helperInfo: infos[2],
  }
}
