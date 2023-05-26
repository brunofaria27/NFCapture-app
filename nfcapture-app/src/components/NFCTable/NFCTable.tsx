import React, { FC, useCallback, useState } from 'react';
import './NFCTable.scss';
import ModalForm from '../ModalForm/ModalForm';
import { Modal } from '@mui/material';

type NFCTableProps = {
  onUpdate: (data: { name: string, id: string }) => void;
  onDelete: (id: string) => void;
  type?: "equipment" | "user";
  tableHeaders?: string[];
  tableRows: { [key: string]: string }[];
};

const NFCTable: FC<NFCTableProps> = ({ type="equipment", onUpdate, onDelete, tableHeaders, tableRows }) => {
  let renderedHeaders: JSX.Element[] | null = null;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen)
  }

  const handleDelete = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  if (tableHeaders) {
    renderedHeaders = tableHeaders.map((header, index) => (
      <th key={index}>{header.toUpperCase()}</th>
    ));
  } else if (tableRows.length > 0) {
    const firstRowKeys = Object.keys(tableRows[0]);
    renderedHeaders = firstRowKeys.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  }

  const renderedRows = tableRows.map((row, index) => (
    <tr key={index}>
      {Object.values(row).map((value, index) => (
        <td key={index}>{value}</td>
      ))}
      <td className='btn-row'>
        <button className='dark-btn' onClick={() => handleDelete(Object.values(row)[0])}>delete</button>
        <button className='dark-btn' onClick={toggleForm}>edit</button>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="NFCTable">
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      {isFormOpen &&
        <Modal
          open={isFormOpen}
          onClose={toggleForm}
        >
          <>
            <ModalForm action="Update" type={type} onSubmit={onUpdate} />
          </>
        </Modal>}
    </>
  );
};

export default NFCTable;
