import UsersContext from "../../context/useUsers/UsersContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

export const Users = () => {

  const { users, createUser, deleteUser } = useContext(UsersContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    if (updateTable) {
      setUpdateTable(false); // Reseta o estado para evitar loop infinito
    }
  }, [updateTable]);

  const handleFormChange = (event: any) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const headers = ['id', 'name', 'email'];

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleCreate = useCallback((event: React.MouseEvent<HTMLButtonElement>, name: string, email: string) => {
    toggleForm();
    // event.preventDefault();
    createUser(name, email);
    setUpdateTable(true);
  },
    [createUser],
  );

  const handleDelete = useCallback((name: string) => {
    deleteUser(name);
    setUpdateTable(true);
  },
    [deleteUser],
  );

  const renderedHeaders = headers.map((header, index) => (
    <th key={index}>{header.toUpperCase()}</th>
  ));

  const renderedRows = users.map((user, index) => (
    <tr key={index}>
      <td>{user._id}</td>
      <td>{user.nome}</td>
      <td>{user.email}</td>
      <td className='btn-row'>
        <button className='dark-btn' onClick={() => handleDelete(user.email)}>delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="table-container">
      <div className="header">
        <div className="header__title">
          Users List
        </div>
        <button className="dark-btn" onClick={toggleForm}>Add new</button>
        {isFormOpen &&
          <Modal
            open={isFormOpen}
            onClose={toggleForm}
          >
            <Box>
              <div className="form" style={{ marginLeft: "30%" }}>
                <form autoComplete="off" className="form__container">
                  Create User
                  <input
                    type='text'
                    placeholder='User Name'
                    onChange={handleFormChange}
                    name='name'
                  />
                  <input
                    type='text'
                    placeholder='Email'
                    onChange={handleFormChange}
                    name='email'
                  />
                  <button className="colored-btn" onClick={(event) => handleCreate(event, formData.name, formData.email)}>Create</button>
                </form>
              </div>
            </Box>
          </Modal>
        }
      </div>
      <table className="table-container__table">
        <thead>
          <tr>
            {renderedHeaders}
          </tr>
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </table>
    </div >
  )
} 