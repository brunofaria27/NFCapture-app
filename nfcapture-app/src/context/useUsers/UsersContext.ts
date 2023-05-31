import { createContext } from 'react';

type UsersContextType = {
    users: { _id: string, nome: string, email: string }[];
    createUser: (name: string, email: string) => void;
    deleteUser: (email: string) => void;
};

const UsersContext = createContext<UsersContextType>({
    users: [],
    createUser: () => { },
    deleteUser: () => { },
});

export default UsersContext;
