export function ifUserAnswered(user,ques){
    //ques can be a id or question obj
    if (typeof ques!=="string"){
        ques=ques.id;
    }
    return Object.keys( user.answers ).includes(ques);
}

export function getUserOption(user,ques){
    //ques can be a id or question obj
    if (typeof ques!=="string"){
        ques=ques.id;
    }
    return user.answers[ques];
}