import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


// import { handleInitialData } from '../actions/shared'
// import { changeAuthedUser, handleAddAnswerQuestion } from '../actions/users'
// import { handleAddNewQuestion } from '../actions/questions'
import { changeAuthedUser } from '../actions/users'


function NavBar(props) {
    //props needed: user a user obj for render user status
    let his = useHistory();
    function goto(path) {
        console.log('goto', path)
        his.push(path);
    }
    function logout() {
        props.dispatch(changeAuthedUser(undefined));
    }
    let { user } = props;
    return (
        <div id='navbar'>
            <button onClick={() => goto("/")}>Home</button>
            <button onClick={() => goto("/add")} > New question</button>
            <button onClick={() => goto("/leaderboard")} > Leader Board</button>
            <StatusBar user={user} />
            <button onClick={() => logout()}>logout</button>
        </div>
    )

}

class StatusBar extends React.Component {

    render() {
        if (!this.props.user) {
            return <span></span>
        }
        return (
            <span>
                hi {this.props.user.name}
            </span>
        )
    }
}

export default connect(state => ({ state: state }))(NavBar);
