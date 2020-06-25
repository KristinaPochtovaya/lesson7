import React from "react";
import logo from "./logo.svg";
import "./App.css";

/* В рамках задачи вам нужно реализовать компонеты Toggle, ToggleOn, ToggleOff, ToggleCheckbox так, 
  чтобы заработал пример в App:
  
  * всегда виден checkbox, 
  * если он включен - видны дети компонента ToggleOn
  * если он выключен - видны дети компонента ToggleOff

  "Живой" пример работы https://react-qv6ine.stackblitz.io/
*/

const Switch = ({ value, onClick }) => (
  <input type="checkbox" value={value} onClick={onClick} />
);

class Toggle extends React.Component {
  state = {
    on: false,
    activeItemIndex: 0,
  };

  toggle = () => this.setState({ on: !this.state.on });

  render() {
    return (
      <>
        <div>
          {React.Children.map(this.props.children, (element, index) =>
            React.cloneElement(
              element,

              {
                on: this.state.on,
                toggle: () => {
                  this.setState({
                    on: !this.state.on,
                  });
                },
              }
            )
          )}
        </div>
      </>
    );
  }
}

const ToggleOn = ({ on, children }) => <p>{on ? children : on}</p>;

const ToggleOff = ({ on, children }) => <p>{on ? null : children}</p>;

const ToggleCheckbox = ({ on, toggle }) => {
  return <Switch value={on} onClick={toggle} />;
};

class App extends React.Component {
  render() {
    return (
      <Toggle>
        <ToggleOff>Видим, когда выключен</ToggleOff>
        <ToggleCheckbox />
        <ToggleOn>Видим, когда включен</ToggleOn>
      </Toggle>
    );
  }
}
export default App;
