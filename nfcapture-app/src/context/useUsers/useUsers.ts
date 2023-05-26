import { useCallback, useMemo } from 'react';
import data from "../../data/users"

const useUsers = () => {

  const usersData = useMemo(
    () => data.map((equipment) => ({ id: equipment.id, name: equipment.name })),
    [data],
  );

  const deleteUser = useCallback((id: string) => {
    console.log("deleting -> " + id)
  }, []);


  const creteUser = useCallback((name: string) => {
    console.log("creating -> " + name)
  }, []);

  const updateUser = useCallback((id: string, name: string) => {
    console.log("updating -> " + id + " " + name)
  }, []);


  return {
    users: usersData,
    deleteUser,
    creteUser,
    updateUser
  };
};

export default useUsers;
