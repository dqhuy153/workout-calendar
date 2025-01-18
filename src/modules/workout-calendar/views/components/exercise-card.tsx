import { useSortable } from '@dnd-kit/sortable'
import { Exercise } from '../../queries'
import { CSS } from '@dnd-kit/utilities'
import { DroppableTypeEnum } from '../workout-calendar.helpers'

type Props = {
  workoutId?: string
  exercise: Exercise
}

const ExerciseCard = ({ workoutId = '', exercise }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${DroppableTypeEnum.EXERCISE}__${exercise.id}__${workoutId}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='rounded-[6px] bg-white p-1 shadow border flex gap-3 items-end'
    >
      <div>
        <p className='font-bold text-[10px] text-[--text-subtitle]'>
          {exercise.setCount}x
        </p>
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <p className='text-[13px] text-right font-semibold truncate'>
          {exercise.name}
        </p>
        <p className='text-[10px] text-right ml-2 font-light truncate'>
          {exercise.setDescription}
        </p>
      </div>
    </div>
  )
}

export default ExerciseCard
