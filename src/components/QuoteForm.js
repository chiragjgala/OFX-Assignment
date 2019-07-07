import React from 'react';
import { router } from 'react-router';
import PhoneNumberContact from './PhoneNumberControl';

class QuoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: {
                countryCode: '',
                contactNumber: ''
            },
            fromCurrency: 'AUD',
            toCurrency: 'AUD',
            amount: 0,
            validator: {
                formErrors: [],
                firstNameValid: false,
                lastNameValid: false,
                emailValid: false,
                amountValid: false
            }
        };

        this.quote = {
            rate: 0,
            fromCurrency: '',
            toCurrency: '',
            fromAmount: 0,
            toAmount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();

        var state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state, () => { this.validateField(event.target.name, event.target.value) });
    }

    updateContact(contact) {
        var state = this.state;
        state.phoneNumber = contact;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateForm();

        if (this.state.validator.formErrors.length > 0) {
            return;
        }

        let request = 'https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/' + this.state.fromCurrency +
            '/' + this.state.toCurrency + '/' + this.state.amount + '?format=json'
        fetch(request)
            .then(res => res.json())
            .then((data) => {
                this.props.history.push({
                    pathname: '/quote',
                    state: {
                        rate: data.CustomerRate,
                        fromCurrency: this.state.fromCurrency,
                        toCurrency: this.state.toCurrency,
                        fromAmount: parseInt(this.state.amount),
                        toAmount: data.CustomerAmount
                    }
                });
            })
            .catch(console.log);
    }

    validateField(fieldName, value) {
        let state = this.state;
        let fieldValidationErrors = state.validator.formErrors;
        let emailValid = state.validator.emailValid;

        switch (fieldName) {
            case 'email':
                if (value) {
                    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                } else {
                    emailValid = true;
                }
                if (!emailValid) {
                    fieldValidationErrors['email'] = 'Email is invalid';
                } else {
                    fieldValidationErrors.filter((value, index, arr) => {
                        return value.key === 'email';
                    })
                }
                state.validator.emailValid = emailValid;
                break;
            case 'firstName':
                state.validator.firstNameValid = value.length > 0;
                if (!state.validator.firstNameValid) {
                    fieldValidationErrors.push({ key: 'firstName', error: 'First name is empty' });
                }
                break;
            case 'lastName':
                state.validator.lastNameValid = value.length > 0;
                if (!state.validator.lastNameValid) {
                    fieldValidationErrors.push({ key: 'lastName', error: 'Last name is empty' });
                }
                break;
            case 'amount':
                state.validator.amountValid = parseInt(value, 10) > 0;
                if (!state.validator.amountValid) {
                    fieldValidationErrors.push({ key: 'amount', error: 'Amount is invalid' });
                }
                break;
            default:
                break;
        }

        this.state.validator.formErrors = fieldValidationErrors;

        this.setState(state);
    }

    validateForm() {
        this.validateField('firstName', this.state.firstName);
        this.validateField('lastName', this.state.lastName);
        this.validateField('email', this.state.email);
        this.validateField('amount', this.state.amount);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="box">
                    <div className='errors'>
                        {this.state.validator.formErrors.map((field, i) => {
                            return (<div key={i}>{field.error}</div>);
                        })}
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>First Name: <span>*</span></label>
                                    <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Last Name: <span>*</span></label>
                                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label>Email:</label>
                                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label>Telephone / Mobile:</label>
                                    <PhoneNumberContact update={this.updateContact} onChange={this.handleChange}></PhoneNumberContact>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        From Currency: <span>*</span>
                                        <select name="fromCurrency" value={this.state.fromCurrency} onChange={this.handleChange}>
                                            <option value="AUD">Australian Dollar</option>
                                            <option value="CAD">Canadian Dollar</option>
                                            <option value="CHF">CHF</option>
                                            <option value="EUR">Euro</option>
                                            <option value="GBP">GBP</option>
                                            <option value="HKD">HKD</option>
                                            <option value="ILS">ILS</option>
                                            <option value="MXN">MXN</option>
                                        </select>
                                    </label>
                                </td>
                                <td>
                                    <label>
                                        To Currency: <span>*</span>
                                        <select name="toCurrency" value={this.state.toCurrency} onChange={this.handleChange}>
                                            <option value="AUD">Australian Dollar</option>
                                            <option value="CAD">Canadian Dollar</option>
                                            <option value="CHF">CHF</option>
                                            <option value="EUR">Euro</option>
                                            <option value="GBP">GBP</option>
                                            <option value="HKD">HKD</option>
                                            <option value="ILS">ILS</option>
                                            <option value="MXN">MXN</option>
                                        </select>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <label>
                                        Amount:
            <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default QuoteForm;