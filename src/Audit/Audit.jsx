import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";

import {
  Navbar,
  Nav,
  // BootstrapTable,
  Table,
  Pagination,
} from "react-bootstrap";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
function Auditpage(props) {
  const { user, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.deleteUser(id);
  };
  const usersData = users.items;
  // const usersData = users.items.map((user, index) => ({ ...user }));
  const columns = [
    { dataField: "id", text: "Id", sort: true },
    { dataField: "role", text: "Role", sort: true },
    { dataField: "createdDate", text: "Created Date", sort: true },
    { dataField: "firstName", text: "First Name", sort: true },
    { dataField: "lastName", text: "Last Name", sort: true },
    {
      dataField: "deleting",
      text: "Deleting",
      sort: true,
      render: (user) => {
        user.deleting ? (
          <em> - Deleting...</em>
        ) : user.deleteError ? (
          <span className="text-danger">- ERROR: {user.deleteError}</span>
        ) : (
          <span>
            - <a onClick={handleDeleteUser(user.id)}>Delete</a>
          </span>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "role",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={usersData}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={pagination}
          />

          // <Table striped bordered hover>
          //   <thead>
          //     <tr>
          //       <th>ID</th>
          //       <th>Role</th>
          //       <th>Created Date</th>
          //       <th>User Name</th>
          //       <th>Status</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {users.items.map((user, index) => (
          //       <tr key={user.id}>
          //         <td>{user.id}</td>
          //         <td>{user.role}</td>
          //         <td>{user.createdDate}</td>
          //         <td> {user.firstName + " " + user.lastName}</td>
          //         <td>
          // {user.deleting ? (
          //   <em> - Deleting...</em>
          // ) : user.deleteError ? (
          //   <span className="text-danger">
          //     - ERROR: {user.deleteError}
          //   </span>
          // ) : (
          //   <span>
          //     - <a onClick={handleDeleteUser(user.id)}>Delete</a>
          //   </span>
          // )}
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </Table>
        )}

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
