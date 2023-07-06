import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return null
    }
  }
})

export const {setMessage, clearMessage} = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(clearMessage())   
    }, time * 1000);;
    
  }
}

export default notificationSlice.reducer
