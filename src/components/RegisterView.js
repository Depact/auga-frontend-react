import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userActions } from '../actions';
import { validateEmail } from '../utils/misc';



// const style = {
//     marginTop: 50,
//     paddingBottom: 50,
//     paddingTop: 25,
//     width: '100%',
//     textAlign: 'center',
//     display: 'inline-block',
// };

// @connect(mapStateToProps, mapDispatchToProps)
class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/';
        this.state = {
            email: 'user@yandex.ru',
            password: '123456',
            username: 'user',
            email_error_text: null,
            username_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: false,
        };
        // debugger
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;
        let username_is_valid = false;


        if (this.state.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });

        } else {
            this.setState({
                email_error_text: 'Sorry, this is not a valid email',
            });
        }

        if (this.state.username === '' || !this.state.username) {
            this.setState({
                username_error_text: null,
            });
        } else if (this.state.username.length >= 3) {
            username_is_valid = true;
            this.setState({
                username_error_text: null,
            });
        } else {
            this.setState({
                username_error_text: 'Your username must be at least 3 characters',
            });

        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (email_is_valid && password_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.register(this.state.email, this.state.username, this.state.password, this.state.redirectTo);
    }

    emailClasses() {
        return (this.state.email_error_text != null) ? "invalid" : "";
    }

    passwordClasses() {
        return (this.state.password_error_text != null) ? "invalid" : "";
    }

    usernameClasses() {
        return (this.state.username_error_text != null) ? "invalid" : "";
    }

    submitClasses() {
        return (this.state.disabled == true) ? "btn btn-medium waves-effect waves-light s12 disabled" : "btn btn-medium waves-effect waves-light s12";
    }

    render() {
        // debugger
        return (
            <div className="container">
                <div className="row">
                    <div className="col m4 offset-m4 z-depth-3 card-panel">
                        <div className="col hg22 offset-hg1">
                            <h2 className="center-align">Register</h2>
                            {this.props.auth.loading &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                            <div className="row">
                                <form className="col s12">
                                    {
                                        this.props.auth.statusText &&
                                        <div className="row error-container">
                                            <div className="error error-text alert alert-info">
                                                {this.props.auth.statusText}
                                            </div>
                                        </div>
                                    }
                                    <div className="row">
                                        <div className="input-field col s12" >
                                            <input
                                                id="email"
                                                type="email"
                                                value={this.state.email}
                                                className={this.emailClasses()}
                                                onChange={(e) => this.changeValue(e, 'email')}
                                            />
                                            <label htmlFor="email">Email</label>
                                            {
                                                this.state.email_error_text &&
                                                <div className="error-text">
                                                    {this.state.email_error_text}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12" >
                                            <input
                                                id="username"
                                                type="text"
                                                value={this.state.username}
                                                className={this.emailClasses()}
                                                onChange={(e) => this.changeValue(e, 'username')}
                                            />
                                            <label htmlFor="username">Username</label>
                                            {
                                                this.state.username_error_text &&
                                                <div className="error-text">
                                                    {this.state.username_error_text}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                id="pass"
                                                type="password"
                                                value={this.state.password}
                                                className={this.passwordClasses()}
                                                onChange={(e) => this.changeValue(e, 'password')}

                                            />
                                            <label htmlFor="pass">Password</label>
                                            {
                                                this.state.password_error_text &&
                                                <div className="error-text">
                                                    {this.state.password_error_text}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m12">
                                            <div className="col s10  offset-s1">
                                                <button
                                                    className={this.submitClasses()}
                                                    type="button"
                                                    name="action"
                                                    onClick={(e) => this.login(e)}
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );

    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { connectedRegisterPage as RegisterView }; 