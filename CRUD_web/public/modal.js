document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    const updateUserForm = document.getElementById('updateUserForm');
    const deleteUserForm = document.getElementById('deleteUserForm');
    const usersList = document.getElementById('usersList');

    const updateUserModal = document.getElementById('updateUserModal');
    const deleteUserModal = document.getElementById('deleteUserModal');
    const closeUpdateModal = document.getElementById('closeUpdateModal');
    const closeDeleteModal = document.getElementById('closeDeleteModal');

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows letters with one space between words
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

    // Display an error message
    function showError(form, message) {
        const errorElement = form.querySelector('.error');
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.display = 'block';
    }

    // Clear error messages
    function clearError(form) {
        const errorElement = form.querySelector('.error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Validate name (letters with one space between words)
    function validateName(name) {
        return nameRegex.test(name);
    }

    // Validate email format
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    // Capitalize the first letter of each word
    function capitalizeName(name) {
        return name
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Fetch and display all users
    function fetchUsers() {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                usersList.innerHTML = `
                    <table style="
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 16px;
                    ">
                        <thead style="
                            background-color: #f2f2f2;
                            color: #333;
                        ">
                            <tr>
                                <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">Name</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">Email</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(user => `
                                <tr style="
                                    background-color: #f9f9f9;
                                    border-bottom: 1px solid #ddd;
                                ">
                                    <td style="padding: 10px; text-align: center;">${user.id}</td>
                                    <td style="padding: 10px;text-align: center;">${user.name}</td>
                                    <td style="padding: 10px;text-align: center;">${user.email}</td>
                                    <td style="padding: 10px; text-align: center;">
                                        <span onclick="openUpdateModal(${user.id})" style="cursor: pointer; margin-right: 10px; color: #007bff; text-decoration: underline;">Edit</span>
                                        <span onclick="openDeleteModal(${user.id})" style="cursor: pointer; color: #ff4d4d; text-decoration: underline;">Delete</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            });
    }
    
    fetchUsers(); // Initial load of users
    
    

    // Open modals
    window.openUpdateModal = function(id) {
        document.getElementById('updateId').value = id;
        updateUserModal.style.display = 'block';
    };

    window.openDeleteModal = function(id) {
        document.getElementById('deleteId').value = id;
        deleteUserModal.style.display = 'block';
    };

    // Close modal functions
    closeUpdateModal.addEventListener('click', () => {
        updateUserModal.style.display = 'none';
    });
    closeDeleteModal.addEventListener('click', () => {
        deleteUserModal.style.display = 'none';
    });

    // Close modal if clicked outside content
    window.addEventListener('click', (event) => {
        if (event.target === updateUserModal) {
            updateUserModal.style.display = 'none';
        }
        if (event.target === deleteUserModal) {
            deleteUserModal.style.display = 'none';
        }
    });

    // Create a new user
    createUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        clearError(createUserForm);

        // Validate name and email
        if (!validateName(name)) {
            showError(createUserForm, 'Name must contain only letters with a single space between words');
            return;
        }
        if (!validateEmail(email)) {
            showError(createUserForm, 'Please enter a valid email');
            return;
        }

        // Capitalize the first letter of each word
        name = capitalizeName(name);

        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchUsers();
            createUserForm.reset();
        })
        .catch(error => console.error('Error during user creation:', error));
    });

    // Update a user
    updateUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('updateId').value;
        let name = document.getElementById('updateName').value;
        const email = document.getElementById('updateEmail').value;

        clearError(updateUserForm);

        // Validate name and email
        if (!validateName(name)) {
            showError(updateUserForm, 'Name must contain only letters with a single space between words');
            return;
        }
        if (!validateEmail(email)) {
            showError(updateUserForm, 'Please enter a valid email');
            return;
        }

        // Capitalize the first letter of each word
        name = capitalizeName(name);

        fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchUsers();
            updateUserForm.reset();
            updateUserModal.style.display = 'none'; // Close the modal
        })
        .catch(error => console.error('Error during user update:', error));
    });

    // Delete a user
    deleteUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('deleteId').value;

        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchUsers();
            deleteUserForm.reset();
            deleteUserModal.style.display = 'none'; // Close the modal
        })
        .catch(error => console.error('Error during user deletion:', error));
    });
});
