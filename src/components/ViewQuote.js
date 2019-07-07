import React from 'react';

class ViewQuote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0,
            fromCurrency: '',
            toCurrency: '',
            fromAmount: 0,
            toAmount: 0
        };
    }

    componentWillMount() {
        this.state = this.props.history.location.state;
        console.log(this.state);
    }

    render() {
        return (
            <div className="box">
                <div className="quote">
                    OFX Customer Rate
                    <div className="rate">{this.state.rate}</div>
                    From
                    <div className="amount">
                        <span className="currency">{this.state.fromCurrency}</span>&nbsp;
                        {this.state.fromAmount}
                    </div>
                    To
                    <div className="amount">
                        <span className="currency">{this.state.toCurrency}</span>&nbsp;
                        {this.state.toAmount}
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewQuote;