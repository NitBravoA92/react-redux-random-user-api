import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/users/usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id.value}>{`${user.name.first} ${user.name.last}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
