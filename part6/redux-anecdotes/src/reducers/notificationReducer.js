import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      state = message
      return state
    },
    removeMessage(state) {
      state = null
      return state
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
