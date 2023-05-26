import { transform } from "typescript";
import EquipmentsContext from "../../context/useEquipments/EquipmentsContext";
import NFCTable from "../NFCTable/NFCTable";
import './Equipments.scss';
import ModalForm from '../ModalForm/ModalForm';
import { useCallback, useContext, useState } from "react";
import { Modal } from "@mui/material";

export const Equipments = () => {

  const { equipments, creteEquipment, deleteEquipment, updateEquipment } = useContext(EquipmentsContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleCreate = useCallback(
    (data: {name: string}) => {
      creteEquipment(data.name);
    },
    [creteEquipment],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteEquipment(id);
    },
    [deleteEquipment],
  );

  const handleUpdate = useCallback(
    (data: {id: string, name: string}) => {
      updateEquipment(data.id, data.name);
    },
    [updateEquipment],
  );
  
  fetch('http://localhost:8080/equipment')
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      console.log(data);
    })
    .catch(error => {
      // this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });

  return (
    <div className="Equipments">
      <div className="header">
        <div className="header__title">
          Equipments List
        </div>
        <button className="dark-btn" onClick={toggleForm}>Add new</button>
        {isFormOpen && 
        <Modal
          open={isFormOpen}
          onClose={toggleForm}
        >
          <ModalForm type="equipment" onSubmit={handleCreate} />
        </Modal>}
      </div>
      <NFCTable onDelete={handleDelete} onUpdate={handleUpdate} tableRows={equipments}></NFCTable>
    </div >
  )
} 