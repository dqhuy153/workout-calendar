import { WorkoutDetail } from '../../queries'
import { TfiMoreAlt } from 'react-icons/tfi'
import ExerciseCard from './exercise-card'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DroppableTypeEnum } from '../workout-calendar.helpers'

type Props = { workout: WorkoutDetail }

const WorkoutCard = ({ workout }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${DroppableTypeEnum.WORKOUT}__${workout.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      className='rounded-[6px] bg-white p-1 shadow border'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className='flex gap-[10px]'>
        <p className='flex-1 text-[10px] font-bold text-[--primary] text-ellipsis overflow-hidden whitespace-nowrap'>
          {workout.name.toUpperCase()}
        </p>
        <button>
          <TfiMoreAlt size={12} className='fill-[--primary]' />
        </button>
      </div>

      {workout.exercises && (
        <SortableContext
          items={workout.exercises.map(
            exercise =>
              `${DroppableTypeEnum.EXERCISE}__${exercise.id}__${workout.id}`
          )}
          strategy={verticalListSortingStrategy}
        >
          <div className='flex flex-col gap-1 mt-1'>
            {workout.exercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                workoutId={workout.id}
                exercise={exercise}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

export default WorkoutCard
