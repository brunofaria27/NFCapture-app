import { transform } from "typescript";
import NFCTable from "../NFCTable/NFCTable";
import './Users.scss';
import ModalForm from '../ModalForm/ModalForm';
import { useCallback, useContext, useState } from "react";
import { Modal } from "@mui/material";
import UsersContext from "../../context/useUsers/UsersContext";

export const Users = () => {

  const { users, creteUser, deleteUser, updateUser } = useContext(UsersContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleCreate = useCallback(
    (data: {name: string}) => {
      creteUser(data.name);
    },
    [creteUser],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteUser(id);
    },
    [deleteUser],
  );

  const handleUpdate = useCallback(
    (data: {id: string, name: string}) => {
      updateUser(data.id, data.name);
    },
    [updateUser],
  );

  return (
    <div className="Users">
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
          <ModalForm type="user" onSubmit={handleCreate} />
        </Modal>}
      </div>
      <NFCTable type="user" onDelete={handleDelete} onUpdate={handleUpdate} tableRows={users}></NFCTable>
    </div >
  )
} 