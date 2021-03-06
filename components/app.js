import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  Pagination,
  InstantSearch,
} from 'react-instantsearch-dom';
import { indexName, searchClient } from './instantsearch';

import styles from './App.module.scss';

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div className="hit-picture">
      <img src={`${hit.image}`} />
    </div>

    <div className="hit-content">
      <div>
        <Highlight attribute="name" hit={hit} />
        <span> - ${hit.price}</span>
        <span> - {hit.rating} stars</span>
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
    </div>
  </div>
);

HitComponent.propTypes = {
  hit: PropTypes.object,
};

export default class App extends Component {
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
  };

  render() {
    return (
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        resultsState={this.props.resultsState}
        onSearchStateChange={this.props.onSearchStateChange}
        searchState={this.props.searchState}
        createURL={this.props.createURL}
        onSearchParameters={this.props.onSearchParameters}
        {...this.props}
      >
        <Configure hitsPerPage={10} />

        <SearchBox />

        <aside>
          <div className="menu">
            <RefinementList attribute="categories" />
          </div>
        </aside>
        <div className="results">
          <Hits hitComponent={HitComponent} />
        </div>

        <div className="pagination">
          <Pagination />
        </div>
      </InstantSearch>
    );
  }
}
