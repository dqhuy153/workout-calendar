import { getCurrentWeek } from '@/lib/utils'
import DayColumn from './components/day-column'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  pointerWithin,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useWorkoutContext } from './context/workouts-context'
import { useEffect, useState } from 'react'
import { Exercise, useGetWorkouts, WorkoutDetail } from '../queries'
import WorkoutCard from './components/workout-card'
import {
  DroppableTypeEnum,
  extractDndId,
  findDayByWorkoutId,
  findIndexById,
  findWorkoutById,
} from './workout-calendar.helpers'
import ExerciseCard from './components/exercise-card'

const currentWeek = getCurrentWeek()

const WorkoutCalendar = () => {
  const { workouts, setWorkouts } = useWorkoutContext()
  const { workoutsMap } = useGetWorkouts()

  useEffect(() => {
    setWorkouts(workoutsMap)
  }, [workoutsMap, setWorkouts])

  const [activeWorkout, setActiveWorkout] = useState<WorkoutDetail | null>()

  const [activeExercise, setActiveExercise] = useState<Exercise | null>()

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active
    const { id: extractedId = '', type, helperInfo } = extractDndId(id)

    if (type === DroppableTypeEnum.WORKOUT) {
      const workout = findWorkoutById(workouts, extractedId)
      setActiveWorkout(workout)
      setActiveExercise(null)

      return
    }

    if (type === DroppableTypeEnum.EXERCISE) {
      const workoutId = helperInfo
      const workout = findWorkoutById(workouts, workoutId)

      if (!workout) return

      const exercise = workout.exercises.find(
        exercise => exercise.id === extractedId
      )

      setActiveWorkout(null)
      setActiveExercise(exercise)

      return
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveWorkout(null)
      setActiveExercise(null)

      return
    }

    const {
      id: extractedActiveId = '',
      type: activeType,
      helperInfo: activeHelperInfo,
    } = extractDndId(active.id)
    const {
      id: extractedOverId = '',
      type: overType,
      helperInfo: overHelperInfo,
    } = extractDndId(over.id)

    // handle move workout to other date manually
    if (
      activeType === DroppableTypeEnum.WORKOUT &&
      overType === DroppableTypeEnum.DATE
    ) {
      const activeDay = findDayByWorkoutId(workouts, extractedActiveId)!
      const overDay = extractedOverId
      const activeWorkout = findWorkoutById(workouts, extractedActiveId)!
      const filteredActiveDateWorkouts = workouts[activeDay].filter(
        workout => workout.id !== extractedActiveId
      )

      if (activeDay === overDay) {
        const updatedWorkouts = [...filteredActiveDateWorkouts, activeWorkout]

        setWorkouts(prevData => ({
          ...prevData,
          [activeDay]: updatedWorkouts,
        }))

        return
      }

      setWorkouts(prevData => ({
        ...prevData,
        [activeDay]: filteredActiveDateWorkouts,
        [overDay]: [...(prevData[overDay] || []), activeWorkout],
      }))

      return
    }

    if (
      activeType === DroppableTypeEnum.WORKOUT &&
      overType === DroppableTypeEnum.WORKOUT
    ) {
      // handle swap workouts in sortable dnd
      const activeDay = findDayByWorkoutId(workouts, extractedActiveId)!
      const overDay = findDayByWorkoutId(workouts, extractedOverId)!

      if (!activeDay || !overDay) {
        setActiveWorkout(null)
        return
      }

      if (activeDay === overDay) {
        const updatedWorkouts = arrayMove(
          workouts[activeDay],
          findIndexById(workouts[activeDay], extractedActiveId),
          findIndexById(workouts[overDay], extractedOverId)
        )

        setWorkouts(prevData => ({
          ...prevData,
          [activeDay]: updatedWorkouts,
        }))
      } else {
        const activeWorkout = findWorkoutById(workouts, extractedActiveId)

        const updatedSourceDay = workouts[activeDay].filter(
          workout => workout.id !== extractedActiveId
        )!
        const updatedTargetDay = [
          ...workouts[overDay],
          activeWorkout,
        ] as WorkoutDetail[]

        setWorkouts(prevData => ({
          ...prevData,
          [activeDay]: updatedSourceDay,
          [overDay]: updatedTargetDay,
        }))
      }

      setActiveWorkout(null)

      return
    }

    if (
      activeType === DroppableTypeEnum.EXERCISE &&
      overType === DroppableTypeEnum.WORKOUT
    ) {
      const activeWorkoutId = activeHelperInfo
      const overWorkoutId = extractedOverId

      if (!activeWorkoutId || !overWorkoutId) {
        setActiveExercise(null)
        return
      }

      const activeWorkout = findWorkoutById(workouts, activeWorkoutId)!
      const overWorkout = findWorkoutById(workouts, overWorkoutId)!
      const activeDay = findDayByWorkoutId(workouts, activeWorkoutId)!
      const overDay = findDayByWorkoutId(workouts, overWorkoutId)!
      const activeWorkoutIndex = findIndexById(
        workouts[activeDay],
        activeWorkoutId
      )
      const overWorkoutIndex = findIndexById(workouts[overDay], overWorkoutId)
      const activeExerciseIndex = findIndexById(
        activeWorkout.exercises,
        extractedActiveId
      )

      if (activeWorkoutId === overWorkoutId) {
        return
      }

      const movedExercise = activeWorkout.exercises[activeExerciseIndex]
      const updatedSourceExercises = activeWorkout.exercises.filter(
        (_, index) => index !== activeExerciseIndex
      )

      const updatedTargetExercises = [...overWorkout.exercises, movedExercise]

      const updatedActiveWorkouts = [...workouts[activeDay]]
      const updatedOverWorkouts = [...workouts[overDay]]

      updatedActiveWorkouts[activeWorkoutIndex].exercises =
        updatedSourceExercises
      updatedOverWorkouts[overWorkoutIndex].exercises = updatedTargetExercises

      setWorkouts(prevData => ({
        ...prevData,
        [activeDay]: updatedActiveWorkouts,
        [overDay]: updatedOverWorkouts,
      }))

      return
    }

    if (
      activeType === DroppableTypeEnum.EXERCISE &&
      overType === DroppableTypeEnum.EXERCISE
    ) {
      const activeWorkoutId = activeHelperInfo
      const overWorkoutId = overHelperInfo

      if (!activeWorkoutId || !overWorkoutId) {
        setActiveExercise(null)
        return
      }

      const activeWorkout = findWorkoutById(workouts, activeWorkoutId)!
      const overWorkout = findWorkoutById(workouts, overWorkoutId)!
      const activeDay = findDayByWorkoutId(workouts, activeWorkoutId)!
      const overDay = findDayByWorkoutId(workouts, overWorkoutId)!
      const activeWorkoutIndex = findIndexById(
        workouts[activeDay],
        activeWorkoutId
      )
      const overWorkoutIndex = findIndexById(workouts[overDay], overWorkoutId)
      const activeExerciseIndex = findIndexById(
        activeWorkout.exercises,
        extractedActiveId
      )
      const overExerciseIndex = findIndexById(
        overWorkout.exercises,
        extractedOverId
      )

      if (activeWorkoutId === overWorkoutId) {
        const updatedExercises = arrayMove(
          activeWorkout.exercises,
          activeExerciseIndex,
          overExerciseIndex
        )

        const updatedWorkouts = [...workouts[activeDay]]

        updatedWorkouts[activeWorkoutIndex].exercises = updatedExercises

        setWorkouts(prevData => ({
          ...prevData,
          [activeDay]: updatedWorkouts,
        }))
      } else {
        const movedExercise = activeWorkout.exercises[activeExerciseIndex]
        const updatedSourceExercises = activeWorkout.exercises.filter(
          (_, index) => index !== activeExerciseIndex
        )

        const updatedTargetExercises = [
          ...overWorkout.exercises.slice(0, overExerciseIndex),
          movedExercise,
          ...overWorkout.exercises.slice(overExerciseIndex),
        ]

        const updatedActiveWorkouts = [...workouts[activeDay]]
        const updatedOverWorkouts = [...workouts[overDay]]

        updatedActiveWorkouts[activeWorkoutIndex].exercises =
          updatedSourceExercises
        updatedOverWorkouts[overWorkoutIndex].exercises = updatedTargetExercises

        setWorkouts(prevData => ({
          ...prevData,
          [activeDay]: updatedActiveWorkouts,
          [overDay]: updatedOverWorkouts,
        }))
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='grid grid-cols-7 w-[100vw] h-[85vh] gap-[10px] px-[60px] pb-[24px]'>
        {currentWeek.map(day => (
          <DayColumn key={day.toISOString()} day={day} />
        ))}
      </div>

      <DragOverlay>
        {activeWorkout ? <WorkoutCard workout={activeWorkout} /> : null}
        {activeExercise ? <ExerciseCard exercise={activeExercise} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default WorkoutCalendar
