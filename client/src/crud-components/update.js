import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';

const UpdateComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserData, setSelectedUserData] = useState([]);
    const [errors, setErrors] = useState({});

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateUser = async () => {

        try {
            const response = await axios.put(`http://localhost:3001/api/users/${selectedUserId}`, {
                name,
                email,
                age
            });

            console.log('User updated:', response.data);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    useEffect(() => {
        if (selectedUserId) {
            // Find the selected user's data by their ID
            const selectedUser = users.find(user => user._id === selectedUserId);
            setSelectedUserData(selectedUser);

            // Set the input fields with the selected user's data
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setAge(selectedUser.age);
        } else {
            setSelectedUserData([]);
            setName('');
            setEmail('');
            setAge('');
        }
    }, [selectedUserId, users]);

    return (
        <div>
            {/* ... */}
            <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {selectedUserId && (

                <div>
                    {console.log(selectedUserData, ' selected user data')}
                    <h2>Edit User</h2>

                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label>Age:</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                    </div>

                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default UpdateComponent;
