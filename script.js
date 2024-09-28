document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    // Retrieve students data from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to display students
    const displayStudents = () => {
        studentTable.innerHTML = ''; // Clear the table
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    };

    // Function to add a new student
    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students)); // Save to localStorage
        displayStudents(); // Update the table
    };

    // Function to edit a student
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
        
        deleteStudent(index); // Remove the current entry
    };

    // Function to delete a student
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        const student = {
            name: document.getElementById('name').value,
            id: document.getElementById('studentId').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value
        };

        // Custom validation for empty fields and contact number length
        if (!student.name || !student.id || !student.email || !student.contact) {
            alert('Please fill in all fields.');
            return;
        }

        // Contact number validation for 10 digits
        if (student.contact.length !== 10 || isNaN(student.contact)) {
            alert('Contact number must be exactly 10 digits.');
            return;
        }

        // Add the student if validation passes
        addStudent(student);
        form.reset(); // Reset the form
    });

    // Load and display students on page load
    displayStudents();
});
