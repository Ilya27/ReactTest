import React, { Component } from "react";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleKeyUp(event) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        event.preventDefault();
        onCloseRequest();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      }
    };

    if (keys[event.keyCode]) {
      keys[event.keyCode]();
    }
  }

  handleOutsideClick(event) {
    const { onCloseRequest } = this.props;
    if (!this.modal.contains(event.target)) {
      onCloseRequest();
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
  }
  render() {
    const { onCloseRequest, children } = this.props;
    return (
      <div className="modal-overlay">
        <div className="modal" ref={node => (this.modal = node)}>
          <div className="modal-content">{children}</div>
          <button
            type="button"
            className="close-button"
            onClick={onCloseRequest}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}
