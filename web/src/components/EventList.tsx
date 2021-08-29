import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Theme, makeStyles, Divider } from '@material-ui/core'

import useTypedSelector from '../hooks/useTypedSelector'
import actions from '../state/actions'
import EventItem from './EventItem/EventItem'
import notFound from '../assets/void.svg'
import Typography from './Typography'
import useCurrentUser from '../hooks/useCurrentUser'

const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
  },

  titleContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}))

const useDateConverter = (date: Date): [string, number] => {
  const day = date.getDate()
  const month = date.getMonth()

  function convertDayToString(): number {
    return day + 1
  }

  function convertMonthToString(): string {
    switch (month) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'October'
      case 10:
        return 'November'
      case 11:
        return 'December'
      default:
        return ''
    }
  }

  return [convertMonthToString(), convertDayToString()]
}

const EventList: FC<{}> = () => {
  const { state } = useLocation<{ day: Date }>()
  const dispatch = useDispatch()
  const { userActions, eventActions } = actions
  const { currentUser } = useCurrentUser()
  const { data, isSuccess } = useTypedSelector((state) => state.event)
  const classes = useStyles()
  const [month, dayOfMonth] = useDateConverter(state.day)

  useEffect(() => {
    const fetchEvents = () =>
      dispatch(eventActions.fetchEventsByDay(state.day, familyId))
    const familyId = currentUser?.FamilyId

    if (familyId) {
      fetchEvents()
    }
  }, [userActions, dispatch, eventActions, state.day, currentUser?.FamilyId])

  const eventItems = data?.map((event: any) => {
    return (
      <EventItem key={event.id} {...event} familyId={currentUser.FamilyId} />
    )
  })

  const noEventsFound = (
    <div className={classes.imageContainer}>
      <Typography variant='h4'>
        No Events Scheduled for{' '}
        {`${month} ${dayOfMonth.toString()}, ${state.day.getFullYear()}`}
      </Typography>
      <div>
        <img src={notFound} alt='No results found' width={400} height={600} />
      </div>
    </div>
  )

  return (
    <div>
      {isSuccess && data.length > 0 && (
        <>
          <div className={classes.titleContainer}>
            <Typography variant='h2'>{`${month} ${dayOfMonth.toString()}, ${state.day.getFullYear()}`}</Typography>
          </div>
          <Divider />
        </>
      )}
      {isSuccess && (data.length > 0 ? eventItems : noEventsFound)}
    </div>
  )
}

export default EventList
