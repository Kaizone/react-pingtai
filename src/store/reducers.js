const defaultState = {
  avatarReload: 1
}


export default function reducers (state = defaultState, action) {
  let newState = Object.assign({},state);
  switch (action.type) {
    case 'RELOADAVATAR':
      newState.avatarReload++;
      return newState;
  
    default:
      return newState;
  }

  return newState;
}