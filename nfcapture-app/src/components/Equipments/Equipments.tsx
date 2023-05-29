import { transform } from "typescript";
import EquipmentsContext from "../../context/useEquipments/EquipmentsContext";
import './Equipments.scss';
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

export const Equipments = () => {

  const { equipments, createEquipment, deleteEquipment } = useContext(EquipmentsContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
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

  const headers = ['id', 'name', 'uses'];

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleCreate = useCallback((name: string) => {
    createEquipment(name);
    setUpdateTable(true);
  },
    [createEquipment],
  );

  const handleDelete = useCallback((name: string) => {
    deleteEquipment(name);
    setUpdateTable(true);
  },
    [deleteEquipment],
  );

  const renderedHeaders = headers.map((header, index) => (
    <th key={index}>{header.toUpperCase()}</th>
  ));

  const renderedRows = equipments.map((equipment, index) => (
    <tr key={index}>
      <td>{equipment._id}</td>
      <td>{equipment.nome}</td>
      <td>{equipment.usos}</td>
      <td className='btn-row'>
        <button className='dark-btn' onClick={() => handleDelete(equipment.nome)}>delete</button>
      </td>
    </tr>
  ));

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
            <Box>
              <div className="Form" style={{ marginLeft: "80%" }}>
                <form className="Form__container">
                  Create Equipment
                  <input
                    type='text'
                    placeholder='Equipment Name'
                    onChange={handleFormChange}
                    name='name'
                  />
                  <button className="colored-btn" onClick={() => handleCreate(formData.name)}>Create</button>
                </form>
              </div>
            </Box>
          </Modal>

        }
      </div>
      <table className="Equipments__table">
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