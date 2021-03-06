import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import qs from 'qs';

import { App } from '../components';
import {
  findResultsState,
  indexName,
  searchClient,
} from '../components/instantsearch';

const updateAfter = 700;

const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState);
      Router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);
    this.setState({ searchState });
  };

  async componentDidMount() {
    this.setState({
      searchState: qs.parse(window.location.search.slice(1)),
      resultsState: await findResultsState(App, { indexName, searchClient }),
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
  }

  render() {
    return (
      <>
        <Head title="Home" />
        <div className="container">
          <h1>The Awesome Instant search demo</h1>
        </div>

        {this.state && this.state.resultsState && this.state.searchState && (
          <App
            resultsState={this.state.resultsState}
            onSearchStateChange={this.onSearchStateChange}
            searchState={this.state.searchState}
          />
        )}
      </>
    );
  }
}
