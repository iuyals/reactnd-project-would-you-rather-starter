import React from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends React.Component{

    render(){
        let {users}=this.props.state;
        if(!users){
            return <div>wait minute</div>
        }
        console.log("in lb",users);
        let userScoreList= Object.values(users).map((u)=>{
            if(typeof u !=='object'){
                return '';
            }
            let nanswers= Object.keys(u.answers).length;
            let nquestions= u.questions.length;
            return {
                nanswers,
                nquestions,
                total:nanswers+nquestions,
                id: u.id,
                name: u.name,
                avatarURL: u.avatarURL,
            }
        })
        userScoreList=userScoreList.sort(
            (u1,u2)=>{
                return u2.total-u1.total;
            }
        )
        return(
            <div>
                <ol>
                    {userScoreList.map(item=>{
                        if(!item){
                            return '';
                        }
                        return (
                        <li key={item.id}>
                            <img src={item.avatarURL} alt="avatar" width="60px"/>
                            <i style={{color:'green'}}>{item.name} </i><br></br>
                            total:{item.total},<br></br>
                            questions:{item.nquestions} answers: {item.nanswers} <p></p> 
                        </li>)
                    })}
                </ol>
            </div>
        )
    }
}

export default connect(state=>({state}))(LeaderBoard)