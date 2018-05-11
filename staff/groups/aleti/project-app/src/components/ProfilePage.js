import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Account from '../components/Account'
import Update from '../components/Update'

class ProfilePage extends Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
        //console.log('token',localStorage.getItem('token'))
    }

    handleLogoutUser() {
        //localStorage.setItem('token', '')
    }

    handleDeleteUser(id) {
        //return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">

                        {<h1> {localStorage.getItem('userName')}'s Profile </h1>}

                        <div>
                            <Link to="/profile/update" className="btn btn-link">Public</Link><br />
                            <Link to="/profile/account" className="btn btn-link">Account</Link>
                        </div>

                        <div>
                            <Route exact path="/profile/update" component={Update} />
                            <Route exact path="/profile/account" component={Account} />
                        </div>

                        {<Link to="/" className="btn btn-link">Home</Link>}

                    </div>
                    
                </div>

            </div>
            
        );
    }
}

export default ProfilePage;