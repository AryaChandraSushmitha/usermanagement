import React, { useState } from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (userId) => {
    setDeletingId(userId);
    await onDelete(userId);
    setDeletingId(null);
  };

  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button
                  onClick={() => onEdit(user)}
                  className="edit-button"
                  disabled={deletingId === user.id}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete-button"
                  disabled={deletingId === user.id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
