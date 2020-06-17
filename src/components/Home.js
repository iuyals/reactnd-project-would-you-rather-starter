import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

class Home extends React.Component {
    //this.props.state needed 
    constructor(props) {
        super(props);
        this.state = {
            showAnswered: false,
        }
    }
    render() {
        let { questions, users } = this.props.state;
        if (users['authedUserID']) {
            let questionList = Object.values(questions).reverse(); //use reverse to make new poll display first
            let authedUser = users[users['authedUserID']];
            let answeredQuestions = questionList.filter(q => Object.keys(authedUser.answers).includes(q.id));
            let unansweredQuestions = questionList.filter(q => !(Object.keys(authedUser.answers).includes(q.id)));
            return (
                <div id='homediv'>
                    <button onClick={() => this.setState({ showAnswered: true })}
                            style={{backgroundColor:this.state.showAnswered===true?"lightgrey":"white"}}>
                        Answered
                    </button>
                    <button onClick={() => this.setState({ showAnswered: false })}
                            style={{backgroundColor:this.state.showAnswered===false?"lightgrey":"white"}}>
                        Unanswered
                    </button>
                    <Questions questions={unansweredQuestions} style={{ display: this.state.showAnswered ? 'none' : 'inherit' }} />
                    <Questions questions={answeredQuestions} style={{ display: this.state.showAnswered ? 'inherit' : 'none' }} />
                </div>
            )
        }
        return (<div>log in first</div>)
    }
}
class Questions extends React.Component {
    //props.questions need a list

    render() {
        return (
            <ol className='questions' style={this.props.style}>
                {this.props.questions.map(q => {
                    return (<li><Question question={q} /> </li>)
                })}
            </ol>
        )
    }
}

function Question(props) {

    let his = useHistory();
    function gopoll(id='') {
        his.push('/polls/'+id);
    }

    let q = props.question;
    return (
        <div className='questiondiv'>
            <p className="small-font">{q.author} asked:</p>
            <div className="middle-font">would you rather?</div>
            <div className="big-font italic">{q.optionOne.text}</div>
            <div className="big-font italic">{q.optionTwo.text}</div>
            <button onClick={()=>gopoll(q.id)} >
                View Poll
                </button>
        </div>
    )


}

export default connect(state => ({ state: state }))(Home);