import { mockWorkoutsResponse } from '@/modules/workout-calendar/queries/get-workouts/mock-workouts'
import axios from 'axios'

type ApiCall = (..._args: any[]) => Promise<any>

export const httpService = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 30000, //30 seconds
  headers: { Accept: 'application/json' },
})

export async function responseWrapper<T>(
  func: ApiCall,
  [...args]: any[] = []
): Promise<T> {
  return new Promise((res, rej) => {
    ;(async () => {
      try {
        setTimeout(async () => {
          return res(mockWorkoutsResponse as any) //TODO: temporary mocking for now

          const response = (await func(...args)) || {}

          if (response.status >= 200 && response.status < 300)
            res(response.data)

          rej(response.data)
        }, 1000) //mock loading here
      } catch (err) {
        rej(err)
      }
    })()
  })
}
