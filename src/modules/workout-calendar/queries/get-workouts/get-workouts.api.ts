import { httpService } from '@/services'
import { GetWorkoutParams } from './get-workouts.types'

export const getWorkoutsApi = (params: GetWorkoutParams) => {
  return httpService.get('/workouts', {
    params,
  })
}
