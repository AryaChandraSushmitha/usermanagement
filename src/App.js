import React, { Component } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import "./components/styles.css";

class App extends Component {
  state = {
    users: [],
    currentUser: null,
    error: null,
    isFormVisible: false,
    isLoading: false,
    isUpdating: false,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      // Add random departments to users
      const departments = [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
      ];
      const usersWithDepartments = response.data.map((user) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
      }));
      this.setState({ users: usersWithDepartments });
    } catch (error) {
      this.setState({ error: "Failed to fetch users" });
    }
    this.setState({ isLoading: false });
  };

  handleAddUser = async (userData) => {
    this.setState({ isUpdating: true });
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userData
      );
      this.setState((prevState) => ({
        users: [...prevState.users, response.data],
        isFormVisible: false,
        isUpdating: false,
      }));
    } catch (error) {
      this.setState({
        error: "Failed to add user",
        isUpdating: false,
      });
    }
  };

  handleEditUser = async (userData) => {
    this.setState({ isUpdating: true });
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userData.id}`,
        userData
      );
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.id === userData.id ? response.data : user
        ),
        currentUser: null,
        isFormVisible: false,
        isUpdating: false,
      }));
    } catch (error) {
      this.setState({
        error: "Failed to update user",
        isUpdating: false,
      });
    }
  };

  handleDeleteUser = async (userId) => {
    this.setState({ isUpdating: true });
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== userId),
        isUpdating: false,
      }));
    } catch (error) {
      this.setState({
        error: "Failed to delete user",
        isUpdating: false,
      });
    }
  };

  render() {
    const { users, currentUser, error, isFormVisible, isLoading, isUpdating } =
      this.state;

    return (
      <ErrorBoundary>
        <div className="App">
          <h1>User Management System</h1>
          {error && <div className="error-message">{error}</div>}

          <button
            onClick={() =>
              this.setState({ isFormVisible: true, currentUser: null })
            }
          >
            Add User
          </button>

          {isFormVisible && (
            <UserForm
              user={currentUser}
              onSubmit={currentUser ? this.handleEditUser : this.handleAddUser}
              onCancel={() =>
                this.setState({ isFormVisible: false, currentUser: null })
              }
              isUpdating={isUpdating}
            />
          )}

          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <UserList
              users={users}
              onEdit={(user) =>
                this.setState({ currentUser: user, isFormVisible: true })
              }
              onDelete={this.handleDeleteUser}
              isUpdating={isUpdating}
            />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
