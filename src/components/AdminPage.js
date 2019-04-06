import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../styles/AdminPage.css';

class AdminPage extends Component {
    isLogged = sessionStorage.getItem('logged') === 'true';

    handleLogout = () => {
        sessionStorage.clear();
    }

    componentDidMount() {
        const justLoggedMessage = document.querySelector('.just-logged');

        if (justLoggedMessage)
            setTimeout(() => justLoggedMessage.style.opacity = 0, 2500);
    }

    render() {
        const justLogged = this.props.location.search.includes('logged-in');

        if (!this.isLogged) {
            return <Redirect to="/login" />
        }

        return (
            <React.Fragment>
                {justLogged && <div className="just-logged">
                    <i className="fas fa-check-circle"></i>
                    Logged in correctly
                </div>}
                <h2>Admin panel</h2>

                <p className="admin-welcome">Feel free to use all admin tools<i className="far fa-smile-wink"></i></p>

                <section className="admin-panel-nav">
                    <Link to="/login?logged-out" onClick={this.handleLogout} className="primary-btn">
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </Link>
                </section>

            </React.Fragment>
        );
    }
}

export default AdminPage;