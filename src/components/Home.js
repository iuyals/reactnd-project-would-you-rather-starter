import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

class Home extends React.Component {
    //this.props.state needed 
    constructor(props) {
        super(props);
        this.state = {
            showAnswered: true,
        }
    }
    render() {
        let { questions, users } = this.props.state;
        if (users['authedUserID']) {
            let questionList = Object.values(questions);
            let authedUser = users[users['authedUserID']];
            let answeredQuestions = questionList.filter(q => Object.keys(authedUser.answers).includes(q.id));
            let unansweredQuestions = questionList.filter(q => !(Object.keys(authedUser.answers).includes(q.id)));
            return (
                <div id='homediv'>
                    <button onClick={() => this.setState({ showAnswered: true })}>
                        Answered
                    </button>
                    <button onClick={() => this.setState({ showAnswered: false })}>
                        Unanswered
                    </button>
                    <Questions questions={answeredQuestions} style={{ display: this.state.showAnswered ? 'inherit' : 'none' }} />
                    <Questions questions={unansweredQuestions} style={{ display: this.state.showAnswered ? 'none' : 'inherit' }} />
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