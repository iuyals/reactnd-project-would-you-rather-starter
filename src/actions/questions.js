import API from '../_DATA';

export const ADD_NEW_QUESTION='ADD_NEW_QUESTION';

function addNewQuestion(question){
    return {
        type:ADD_NEW_QUESTION,
        question
    }
}

export function handdleAddNewQuestion(question){
    
    return (dispatch)=>{
        API._saveQuestion(question).then((fquestion)=>{
            dispatch(addNewQuestion(fquestion));
        })
    }
}