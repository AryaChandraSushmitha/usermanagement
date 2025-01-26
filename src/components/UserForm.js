import React, { Component } from "react";

class UserForm extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    department: "",
  };

  componentDidMount() {
    if (this.props.user) {
      const { id, name, email, department } = this.props.user;
      this.setState({ id, name, email, department });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { name, email, department } = this.state;
    const { isUpdating } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isUpdating}>
            {this.props.user ? "Update User" : "Add User"}
          </button>
          <button type="button" onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm;
