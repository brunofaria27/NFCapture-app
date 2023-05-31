import EquipmentsContext from "../../context/useEquipments/EquipmentsContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

export const Equipments = () => {

  const { equipments, createEquipment, deleteEquipment, addUseToEquipment } = useContext(EquipmentsContext);
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

  const headers = ['name', 'uses'];

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleCreate = useCallback((event: React.MouseEvent<HTMLButtonElement>, name: string) => {
    toggleForm();
    // event.preventDefault();
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

  const handleUse = useCallback((name: string) => {
    addUseToEquipment(name);
    setUpdateTable(true);
  },
    [addUseToEquipment],
  );

  const renderedHeaders = headers.map((header, index) => (
    <th key={index}>{header.toUpperCase()}</th>
  ));

  const renderedRows = equipments.map((equipment, index) => (
    <tr key={index}>
      <td>{equipment.nome}</td>
      <td>{equipment.usos}</td>
      <td className='btn-row'>
        <button className='dark-btn' onClick={() => handleUse(equipment.nome)}>use</button>
        <button className='dark-btn' onClick={() => handleDelete(equipment.nome)}>delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="table-container">
      <div className="header">
        <div
          className="header__title"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Equipments List
        </div>
        <button className="dark-btn" onClick={toggleForm}>Add new</button>
        {isFormOpen &&
          <Modal
            open={isFormOpen}
            onClose={toggleForm}
          >
            <Box>
              <div className="form" style={{ marginLeft: "80%" }}>
                <form autoComplete="off" className="form__container">
                  Create Equipment
                  <input
                    type='text'
                    placeholder='Equipment Name'
                    onChange={handleFormChange}
                    name='name'
                  />
                  <button className="colored-btn" onClick={(event) => { handleCreate(event, formData.name) }}>Create</button>
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