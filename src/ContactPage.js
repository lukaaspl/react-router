import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import './ContactPage.css';

class ContactPage extends Component {
    defaultFormValues = {
        username: '',
        useremail: '',
        subject: '',
        message: '',
    };

    state = { ...this.defaultFormValues, isSent: false };

    componentDidMount() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, textarea');
        const labels = form.querySelectorAll('label');

        inputs.forEach((input, index) => {
            input.addEventListener('focus', e => {
                labels[index].classList.add('focused');
            });

            input.addEventListener('blur', () => form.querySelector('label.focused').classList.remove('focused'));
        });
    }

    handleChangeValue = e => {
        this.setState({
            [e.target.id]: e.target.value,
            isSent: false,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ ...this.defaultFormValues, isSent: true });
    }

    render() {
        const fieldsEmpty = !(this.state.username ||
            this.state.useremail ||
            this.state.subject ||
            this.state.message);

        return (
            <React.Fragment>
                <h2>Contact</h2>
                <form id="contact-form" className="contact-form" onSubmit={this.handleSubmit}>
                    <fieldset form="contact-form">
                        <legend>Contact with Us!</legend>
                        <table>
                            <tbody>
                                <tr>
                                    <th><label htmlFor="username">Your name:</label></th>
                                    <td><input type="text" id="username" autoComplete="off" value={this.state.username} onChange={this.handleChangeValue} /></td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="useremail">E-mail address:</label></th>
                                    <td><input type="text" id="useremail" autoComplete="off" value={this.state.useremail} onChange={this.handleChangeValue} /></td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="subject">Subject:</label></th>
                                    <td><input type="text" id="subject" autoComplete="off" value={this.state.subject} onChange={this.handleChangeValue} /></td>
                                </tr>
                                <tr>
                                    <th style={{ verticalAlign: 'top' }}><label htmlFor="message">Message:</label></th>
                                    <td>
                                        <textarea id="message" value={this.state.message} onChange={this.handleChangeValue} ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'right' }}>
                                        <button type="submit">Send message</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {this.state.isSent &&
                            <p className="message-sent">
                                <i className="fas fa-check-circle"></i>Message has been sent, thank You!
                            </p>
                        }
                    </fieldset>
                </form>
                <Prompt
                    when={!fieldsEmpty}
                    message={'Looks like You didn\'t finish sending message.\nAre You sure to leave the page?'}
                />
            </React.Fragment>
        );
    }
}

export default ContactPage;