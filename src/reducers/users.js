import {CHANGE_AUTHORED_USER} from '../actions/users';
import {RECEIVE_DATA} from '../actions/shared';
import { ADD_ANSWERED_QUESTION } from '../actions/shared'

export default function usersReducer(state={},action){
    
    switch(action.type){
        case CHANGE_AUTHORED_USER:
            return {
                ...state,
                authedUserID:action.authedUserID,
            };
        case ADD_ANSWERED_QUESTION:
            return {
                ...state,
                [action.authedUserID]:{
                    ...(state[action.authedUserID]),
                    'answers':{
                        ...(state[action.authedUserID]['answers']),
                        [action.qid]:action.answer
                    }
                },
                
            }
        case RECEIVE_DATA:
            return action.users;
        default:
            return state;
    }
}