import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getWorkoutsApi } from './get-workouts.api'
import { responseWrapper } from '@/services'
import { GetWorkoutsResponse, WorkoutDetail } from './get-workouts.types'
import { useEffect, useMemo } from 'react'
import { useWorkoutContext } from '../../views/context/workouts-context'

const QUERY_KEY = {
  getWorkouts: '/workouts',
}

export const useGetWorkouts = ({
  options = {},
}: {
  options?: Omit<
    UseSuspenseQueryOptions<GetWorkoutsResponse, Error>,
    'queryKey'
  >
} = {}) => {
  const { data, isLoading, isError, refetch } = useSuspenseQuery<
    GetWorkoutsResponse,
    Error
  >({
    queryKey: [QUERY_KEY.getWorkouts],
    queryFn: () => responseWrapper(getWorkoutsApi),
    ...options,
  })

  const workoutsMap = useMemo(() => {
    const workoutsMap: Record<string, WorkoutDetail[]> = {}

    if (!data?.length) return workoutsMap

    data.forEach(item => {
      workoutsMap[item.date] = item.workouts
    })

    return workoutsMap
  }, [data])

  return {
    workouts: data,
    workoutsMap,
    isLoading,
    isError,
    refetch,
  }
}
