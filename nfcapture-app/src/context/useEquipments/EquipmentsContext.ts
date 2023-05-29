import { createContext } from 'react';

type EquipmentsContextType = {
    equipments: { _id: string, nome: string, usos: string }[];
    createEquipment: (name: string) => void;
    deleteEquipment: (name: string) => void;
};

const EquipmentsContext = createContext<EquipmentsContextType>({
    equipments: [],
    createEquipment: () => { },
    deleteEquipment: () => { },
});

export default EquipmentsContext;
