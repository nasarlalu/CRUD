import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';

const CreateComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState({});


    const validateInputs = () => {
        const newErrors = {};

        if (!validator.isLength(name, { min: 2 })) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!validator.isEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!validator.isInt(age, { min: 1 })) {
            newErrors.age = 'Age must be a positive integer';
        }

        return newErrors;
    };

    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    async function createUser() {

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {

            console.error(Object.keys, 'objKeys');
            setErrors(newErrors);
            console.error(errors, ' validation error');
            return;
        }  //the code wil stop here if there are errors

        try {
            const response = await axios.post('http://localhost:3001/api/users', {
                name,
                email,
                age
            });
            console.log('User created:', response.data);
            fetchUsers();
            setName('');
            setEmail('');
            setAge('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} {user.email} {user.age}</li>
                ))}
            </ul>


            <div>
                <h1>User Management</h1>

                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                    {errors.age && <div className="error">{errors.age}</div>}
                </div>
                
                <button onClick={createUser}>Create User</button>
            </div>


        </div>
    );
};

export default CreateComponent;
