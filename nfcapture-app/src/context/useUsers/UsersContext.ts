import { createContext } from 'react';

export type SimplifiedUser = {
    id: string;
    name: string;
};

type UsersContextType = {
    users: SimplifiedUser[];
    creteUser: (name: string) => void;
    updateUser: (id: string, name: string) => void;
    deleteUser: (id: string) => void;
};

const UsersContext = createContext<UsersContextType>({
    users: [],
    creteUser: () => { },
    updateUser: () => { },
    deleteUser: () => { },
});

export default UsersContext;
