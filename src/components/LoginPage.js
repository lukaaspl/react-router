import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import '../styles/LoginPage.css';

class LoginPage extends Component {
    state = {
        login: '',
        password: '',
        loginError: false,
        isLogged: Boolean(sessionStorage.getItem('logged') === 'true'),
    }

    admin = {
        login: 'admin',
        password: `adminLuke${new Date().getFullYear().toString().slice(-2)}`,
    }

    componentDidMount() {
        if (this.state.isLogged)
            return;

        const loginTipBtn = document.querySelector('.login-tip-btn');
        const loginTip = document.querySelector('.login-tip');
        const form = document.getElementById('login-form');
        const inputs = form.querySelectorAll('input');
        const labels = form.querySelectorAll('label');
        const justLoggedMessage = document.querySelector('.just-logged');

        if (justLoggedMessage)
            setTimeout(() => justLoggedMessage.style.opacity = 0, 2500);

        inputs.forEach((input, index) => {
            input.addEventListener('focus', e => {
                labels[index].classList.add('focused');
            });

            input.addEventListener('blur', () => form.querySelector('label.focused').classList.remove('focused'));
        });

        loginTipBtn.addEventListener('click', () => {
            loginTip.classList.toggle('shown');
        });
    }

    handleLogin = e => {
        e.preventDefault();

        if (this.state.login === this.admin.login &&
            this.state.password === this.admin.password) {
            sessionStorage.setItem('logged', 'true');
            this.setState({
                isLogged: true
            });
        } else {
            this.setState({
                loginError: true,
                login: '',
                password: '',
            });
        }
    }

    handleChangeValue = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        if (this.state.isLogged)
            return <Redirect to="/admin?logged-in" />

        const justLogged = this.props.location.search.includes('logged-out');

        return (
            <React.Fragment>
                {justLogged && <div className="just-logged">
                    <i className="fas fa-check-circle"></i>
                    Logged out correctly
                </div>}
                <h2>Log into your account</h2>

                <form id="login-form" className="contact-form" onSubmit={this.handleLogin}>
                    <fieldset>
                        <legend>Admin panel</legend>

                        <table>
                            <tbody>
                                <tr>
                                    <th><label htmlFor="login">Login:</label></th>
                                    <td><input type="text" id="login" autoComplete="off" value={this.state.login} onChange={this.handleChangeValue} /></td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="password">Password:</label></th>
                                    <td><input type="password" id="password" value={this.state.password} onChange={this.handleChangeValue} /></td>
                                </tr>
                                {this.state.loginError && <tr className="login-error">
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
                                        <ErrorMessage closeButton={false}>Incorrect login or password, try again!</ErrorMessage>
                                    </td>
                                </tr>}
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }} className="login-problem">
                                        <button type="button" className="login-tip-btn">
                                            <i className="fas fa-question-circle" />
                                            Having problem with logging to your account?
                                        </button>
                                        <div className="login-tip">
                                            <p>
                                                <code>
                                                    {/* eslint-disable-next-line no-template-curly-in-string */}
                                                    const adminLogin = 'admin';<br />
                                                    {/* eslint-disable-next-line no-template-curly-in-string */}
                                                    const adminPassword = (<span className="tip">`$&#123;adminLogin&#125;Luke$&#123;new Date().getFullYear().toString().slice(-2)&#125;`</span>);
                                                </code>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
                                        <button type="submit">Login</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
            </React.Fragment>
        );
    }
}

export default LoginPage;