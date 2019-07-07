import React from 'react';

class PhoneNumberControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countryCode: '+61',
            contactNumber: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        this.props.update(state);
    }

    render() {
        return (
            <div className="input-group">
                <select name="countryCode" value={this.state.countryCode} onChange={this.handleChange}>
                    <option value="+61">+61</option>
                    <option value="+001">+001</option>
                </select>
                <input type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} />
            </div>
        );
    }
}

export default PhoneNumberControl;