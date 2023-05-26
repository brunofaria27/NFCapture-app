import { createContext } from 'react';

export type SimplifiedEquipment = {
    id: string;
    name: string;
};

type EquipmentsContextType = {
    equipments: SimplifiedEquipment[];
    creteEquipment: (name: string) => void;
    updateEquipment: (id: string, name: string) => void;
    deleteEquipment: (id: string) => void;
};

const EquipmentsContext = createContext<EquipmentsContextType>({
    equipments: [],
    creteEquipment: () => { },
    updateEquipment: () => { },
    deleteEquipment: () => { },
});

export default EquipmentsContext;
