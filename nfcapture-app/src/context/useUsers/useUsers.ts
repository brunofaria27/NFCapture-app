import { useCallback, useState } from 'react';

const useUsers = () => {
  const url = "http://localhost:8000";

  const [usersData, setUsersData] = useState([]);

  fetch(url + '/users').then(async response => {
    const data = await response.json();
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error)
    }
    setUsersData(data);

  }).catch(error => {
    console.error('There was an error fetching users!', error);
  });

  const deleteUser = useCallback((email: string) => {
    const user = {
      email: email
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch(url + '/delete-user', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

      })
      .catch(error => {
        console.error('There was an error deleting an user!', error);
      });
  }, []);

  const createUser = useCallback((name: string, email:string) => {
    const user = {
      nome: name,
      email: email
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch(url + '/create-user', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.error('There was an error creating an user!', error);
      });
  }, []);

  return {
    users: usersData,
    deleteUser,
    createUser,
  };
};

export default useUsers;
