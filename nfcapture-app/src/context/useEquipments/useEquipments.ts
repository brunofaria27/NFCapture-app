import { useCallback, useEffect, useMemo, useState } from 'react';

const useEquipments = () => {
  const url = "http://localhost:8000";

  const [equipmentsData, setEquipmentsData] = useState([]);

  fetch(url + '/equipments').then(async response => {
    const data = await response.json();
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error)
    }
    setEquipmentsData(data);

  }).catch(error => {
    console.error('There was an error fetching equipments!', error);
  });

  const deleteEquipment = useCallback((name: string) => {
    const equipment = {
      nome: name
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment)
    };

    fetch(url + '/delete-equipment', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

      })
      .catch(error => {
        console.error('There was an error deleting a component!', error);
      });
  }, []);

  const createEquipment = useCallback((name: string) => {
    const equipment = {
      nome: name
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment)
    };

    fetch(url + '/create-equipment', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

      })
      .catch(error => {
        console.error('There was an error creating a component!', error);
      });
  }, []);

  return {
    equipments: equipmentsData,
    deleteEquipment,
    createEquipment,
  };
};

export default useEquipments;
