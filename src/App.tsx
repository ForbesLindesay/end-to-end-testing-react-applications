import * as React from 'react';

interface State {
  value: string;
}
class App extends React.Component<{}, State> {
  state = {value: ''};

  _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({value: e.target.value});
  };

  _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState(s => ({
      value: s.value
        .split('')
        .reverse()
        .join(''),
    }));
  };

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input
          data-test-id="value"
          value={this.state.value}
          onChange={this._onChange}
        />
        <button data-test-id="reverse">Reverse</button>
      </form>
    );
  }
}

export default App;
