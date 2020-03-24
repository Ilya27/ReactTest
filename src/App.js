import React, { Component } from "react";
import "./App.css";
import getInfo from "./getInfo";
import Modal from "./Modal";

const header = {
  title: "Title",
  url: "URL",
  created_at: "created_at",
  author: "Author"
};
export default class App extends Component {
  state = {
    hits: [],
    page: 0,
    showModal: false,
    selectedHit: "",
    sortBy: ""
  };
  componentDidMount() {
    this.setInfo();
    this.interval = setInterval(() => this.setInfo(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async setInfo() {
    let answer = await getInfo(this.state.page);
    this.setState({ hits: answer, page: this.state.page + 1 });
  }

  openModal = id => {
    this.handleToggleModal();
    const { hits } = this.state;
    this.setState({ selectedHit: hits[id] });
  };

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  sortBy(fieldName) {
    const { hits } = this.state;
    this.setState({ sortBy: fieldName });
    switch (fieldName) {
      case "title":
        const filteredArray = hits
          .filter((hit, index) => hits.lastIndexOf(hit) === index)
          .sort((a, b) => (a.title < b.title ? -1 : 1));
        this.setState({ hits: filteredArray });
        break;
      case "created_at":
        const filteredArrayCreated_At = hits
          .filter((hit, index) => hits.lastIndexOf(hit) === index)
          .sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
        this.setState({ hits: filteredArrayCreated_At });
        break;
      default:
        break;
    }
  }

  render() {
    const { hits, showModal, selectedHit, sortBy } = this.state;
    return (
      <div className="App">
        <div className="table-wrapper">
          <ul>
            <li className="table-header">
              <span
                className={sortBy === "title" ? "active" : " not-active"}
                onClick={() => this.sortBy("title")}
              >
                {header.title}
              </span>
              <span>{header.url}</span>
              <span
                className={sortBy === "created_at" ? "active" : " not-active"}
                onClick={() => this.sortBy("created_at")}
              >
                {header.created_at}
              </span>
              <span>{header.author}</span>
            </li>
            {hits.map((item, index) => (
              <li
                key={index}
                className="table-item"
                onClick={() => this.openModal(index)}
              >
                <span>{item.title}</span>
                <span>{item.url}</span>
                <span>{item.created_at}</span>
                <span>{item.author}</span>
              </li>
            ))}
          </ul>
        </div>
        {showModal && (
          <Modal onCloseRequest={() => this.handleToggleModal()}>
            {JSON.stringify(selectedHit)}
          </Modal>
        )}
      </div>
    );
  }
}
