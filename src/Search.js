/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */

import React from 'react';
import get from 'lodash.get';
import FuzzySearch from '@reeganexe/react-fuzzy';

import Match from './Match';
import loadRepos from './repos';

import style from './style.css'; // eslint-disable-line no-unused-vars

const renderItem = (props, state, styles, clickHandler) => (
  state.results.map(({ item: val, matches }, i) => {
    const style = state.selectedIndex === i ? { ...styles.selectedResultStyle, backgroundColor: '#e4e4e4' } : styles.resultsStyle;
    const cls = state.selectedIndex === i ? 'selected' : '';

    return (
      <div
        key={val.id}
        className={cls}
        style={style}
        onClick={() => clickHandler(i)}
      >
        <strong>
          <Match matches={matches} field="name" fallback={val} styleName="style.highlight" />
        </strong>
        <span styleName="style.x-project">
          {val.project.key}
        </span>
      </div>
    );
  })
);

export default class Search extends React.Component {
  state = { containers: null, show: false }

  componentDidMount() {
    this.fetch();

    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onDocumentKeyDown = e => {
    if (e.keyCode === 32 && e.ctrlKey) {
      this.setState(state => ({ show: !state.show }));
    } else if (e.keyCode === 27) {
      this.setState({ show: false });
    }
  }

  onItemSelected = ({ item }) => {
    const href = get(item, 'links.self["0"].href');
    href ? (location.href = href) : undefined;
    this.setState({ show: false });
  }

  fetch = () => {
    loadRepos().then(({ values: containers }) => this.setState({ containers }))
      .catch(() => null); // do nothing
  }

  render() {
    const { containers, show } = this.state;
    if (!containers) {
      return null;
    }

    if (!show) {
      return null;
    }

    return (
      <FuzzySearch
        styleName="style.search-box"
        list={containers}
        autoFocus
        keys={['name']}
        onSelect={this.onItemSelected}
        placeholder="Search for name"
        options={{ includeMatches: true, distance: 50, maxPatternLength: 20 }}
        resultsTemplate={renderItem}
        threshold={0.4}
      />
    );
  }
}
