import { useCallback, useMemo } from 'react';
import data from "../../data/equipments"

const useEquipments = () => {

  const equipmentsData = useMemo(
    () => data.map((equipment) => ({ id: equipment.id, name: equipment.name })),
    [data],
  );

  const deleteEquipment = useCallback((id: string) => {
    console.log("deleting -> " + id)
  }, []);


  const creteEquipment = useCallback((name: string) => {
    console.log("creating -> " + name)
  }, []);

  const updateEquipment = useCallback((id: string, name: string) => {
    console.log("updating -> " + id + " " + name)
  }, []);


  return {
    equipments: equipmentsData,
    deleteEquipment,
    creteEquipment,
    updateEquipment
  };
};

export default useEquipments;
