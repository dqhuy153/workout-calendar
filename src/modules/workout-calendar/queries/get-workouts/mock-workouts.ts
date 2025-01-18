import { GetWorkoutsResponse } from './get-workouts.types'

export const mockWorkoutsResponse: GetWorkoutsResponse = [
  {
    date: '01-16-2025',
    workouts: [
      {
        id: 'workout-uuid-1',
        name: 'Chest Day - with Arm exercises',
        exercises: [
          {
            id: 'exercise-uuid-1',
            name: 'Bench Press Medium Grip',
            setDescription: '50 lb x 5, 60 lb x 5, 70 lb x 5',
            setCount: 3,
          },
          {
            id: 'exercise-uuid-2',
            name: 'Exercise B',
            setDescription: '40lb x 10',
            setCount: 1,
          },
        ],
      },
    ],
  },
  {
    date: '01-17-2025',
    workouts: [
      {
        id: 'workout-uuid-2',
        name: 'Leg Day',
        exercises: [
          {
            id: 'exercise-uuid-3',
            name: 'Exercise C',
            setDescription: '30lb x 6',
            setCount: 1,
          },
          {
            id: 'exercise-uuid-4',
            name: 'Exercise D',
            setDescription: '40lb x 5',
            setCount: 1,
          },
          {
            id: 'exercise-uuid-5',
            name: 'Exercise E',
            setDescription: '50lb x 5',
            setCount: 1,
          },
        ],
      },
      {
        id: 'workout-uuid-3',
        name: 'Arm Day',
        exercises: [
          {
            id: 'exercise-uuid-6',
            name: 'Exercise F',
            setDescription: '60lb x 6',
            setCount: 1,
          },
        ],
      },
    ],
  },
]
