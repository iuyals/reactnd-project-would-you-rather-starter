import React from 'react';
import { connect } from 'react-redux';

import { changeAuthedUser } from '../actions/users'

function Login(props) {
    let { users } = props.state;
    function loginUser(uid) {
        props.dispatch(changeAuthedUser(uid));
    }
    return (
        <div>
            <h3>login first</h3>
            <form>
                <select name="userid" onChange={(event) => loginUser(event.target.value)} >
                    <option value='' style={{ display: 'none' }} defaultValue>select a user</option>
                    {Object.values(users).map(u => {
                        if (!u) {
                            return ''
                        }
                        return (<option key={u.id} value={u.id}>{u.name}</option>)
                    })}
                </select>
            </form>
        </div>
    )

}

export default connect(state => ({ state: state }))(Login);
