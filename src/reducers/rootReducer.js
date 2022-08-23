const initState = {
  messages: []
}

const rootReducer = (state = initState, action) => {
  if(action.type === 'ADD_MESSAGE') {
    let newMessages = [...state.messages, action.data]
    return {
      ...state,
      messages: newMessages
    }
  }
  else if(action.type === 'SET_MESSAGES') {
    return {
      ...state,
      messages: action.data
    }
  }
  return state;
}

export default rootReducer;