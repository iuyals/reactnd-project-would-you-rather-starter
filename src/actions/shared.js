import API from '../_DATA';

export const RECEIVE_DATA='RECEIVE_DATA';
export const ADD_ANSWERED_QUESTION = 'ADD_ANSWERED_QUESTION';


function receiveData(users,questions){
    return {
        type:RECEIVE_DATA,
        users,
        questions,
    }
}
//get data from server then dispatch RECEIVE_DATA
export function handleInitialData(){
    return (dispatch,getState)=>{
        return Promise.all([API._getUsers(),API._getQuestions()]).then(
            ([users,questions])=>{
                dispatch(receiveData(users,questions));
                return new Promise(resolve=>{
                    resolve(getState());
                })
            }
        )
    }
}

export function addAnswedQuestion(authedUserID, qid, answer) {
    return {
        type: ADD_ANSWERED_QUESTION,
        answer,
        qid,
        authedUserID
    };
}

export function handleAddAnswerToQuestion(authedUserID, qid, answer) {
    return (dispatch,getState) => {
        //note: api need a ID,but it use authedUser as parameter name,
        let authedUser=authedUserID; 
        API._saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(addAnswedQuestion(authedUserID,qid,answer));
        })
    }
}
