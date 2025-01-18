export type GetWorkoutParams = {
  from: Date
  to: Date
}

export type Exercise = {
  id: string
  name: string
  setDescription: string
  setCount: number
}

export type WorkoutDetail = {
  id: string
  name: string
  exercises: Exercise[]
}

export type WorkoutDay = {
  date: string
  workouts: WorkoutDetail[]
}

export type GetWorkoutsResponse = WorkoutDay[]
