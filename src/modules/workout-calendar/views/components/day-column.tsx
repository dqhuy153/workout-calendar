import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { FaPlusCircle } from 'react-icons/fa'
import WorkoutCard from './workout-card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useWorkoutContext } from '../context/workouts-context'
import { useDroppable } from '@dnd-kit/core'
import { DroppableTypeEnum } from '../workout-calendar.helpers'

type Props = { day: dayjs.Dayjs }

const DayColumn = ({ day }: Props) => {
  const { workouts: workoutsMap } = useWorkoutContext()

  const { isOver, setNodeRef } = useDroppable({
    id: `${DroppableTypeEnum.DATE}__${day.format('MM-DD-YYYY')}`,
  })

  const style = {
    background: isOver ? '#eee' : undefined,
  }

  const isToday = day.isSame(dayjs(), 'date')
  const workouts = workoutsMap[day.format('MM-DD-YYYY')] || []

  const handleAddWorkout = () => {}

  return (
    <div>
      <p className='text-[10px] mb-[9px] font-semibold text-[--text-title]'>
        {day.format('ddd').toUpperCase()}
      </p>
      <div
        ref={setNodeRef}
        style={style}
        className='bg-[--background] rounded-[6px] h-full p-[10px] flex flex-col gap-[10px]'
      >
        <div className='flex justify-between items-center'>
          <p
            className={cn(
              'text-[11px] font-semibold',
              isToday ? 'text-[--primary]' : 'text-[--text-title-foreground]'
            )}
          >
            {day.format('DD')}
          </p>
          <button onClick={handleAddWorkout}>
            <FaPlusCircle size={12} className='fill-[--secondary]' />
          </button>
        </div>
        {workouts && (
          <SortableContext
            items={workouts.map(
              workout => `${DroppableTypeEnum.WORKOUT}__${workout.id}`
            )}
            strategy={verticalListSortingStrategy}
          >
            <div className='flex flex-col gap-1'>
              {workouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}

export default DayColumn
