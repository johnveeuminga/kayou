import { HOME_SCREEN } from "src/navigation/Screens";
import { DRAWER_TOGGLE, SET_DRAWER_STATUS, NAV_SET_CURRENT_SCREEN, NAV_SET_CURRENT_COMPONENT_ID } from 'src/constants/action-types'

const INITIAL_STATE = {
  currentScreen: HOME_SCREEN,
  currentNavComponentId: 'HomeStack',
  drawerOpened: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DRAWER_TOGGLE:
      return {
        ...state,
        drawerOpened: !state.drawerOpened,
      }
    
    case SET_DRAWER_STATUS:
      return {
        ...state,
        drawerOpened: action.status
      }

    case NAV_SET_CURRENT_SCREEN:
      return {
        ...state,
        currentScreen: action.screen
      }

    case NAV_SET_CURRENT_COMPONENT_ID:
      return {
        ...state,
        currentNavComponentId: action.id,
      }
    
    default:
      return state
  }
}