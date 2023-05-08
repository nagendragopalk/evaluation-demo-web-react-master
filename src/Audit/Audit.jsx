import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";

import { Navbar, Nav, Table, Pagination } from "react-bootstrap";
import { useEffect } from "react";
function Auditpage(props) {
  const { user, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.deleteUser(id);
  };
  console.log("no_of_pages", users.no_of_pages);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#features">Auditor</Nav.Link>
          <Nav.Link>
            <Link to="/login">Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All login audit :</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>User Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.items.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.role}</td>
                  <td>{user.createdDate}</td>
                  <td> {user.firstName + " " + user.lastName}</td>
                  <td>
                    {user.deleting ? (
                      <em> - Deleting...</em>
                    ) : user.deleteError ? (
                      <span className="text-danger">
                        - ERROR: {user.deleteError}
                      </span>
                    ) : (
                      <span>
                        - <a onClick={handleDeleteUser(user.id)}>Delete</a>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Pagination>
          <Pagination.First />
          {/* <Pagination.Prev /> */}
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          {/* <Pagination.Next /> */}
          <Pagination.Last />
        </Pagination>
        {/* {users.items && (
          <ul className="user-screen">
            {users.items.map((user, index) => (
              <li key={user.id}>
                {user.id + " " + user.role + " " + user.createdDate + " "}
                {user.firstName + " " + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    - <a onClick={handleDeleteUser(user.id)}>Delete</a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
