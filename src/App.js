import React, { Component } from 'react';
import QuoteForm from './components/QuoteForm';
import ViewQuote from './components/ViewQuote';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Route exact path="/" component={QuoteForm}/>
         <Route exact path="/quote" component={ViewQuote}/>
      </BrowserRouter>
    );
  }
}

export default App;
