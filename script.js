document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    // LocalStorage se students ka data nikaalna
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Students ko display karne ka function
    const displayStudents = () => {
        studentTable.innerHTML = ''; // Table ko clear karna
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.class}</td>
                <td>${student.rollNo}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    };

    // Naya student add karna
    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students)); // localStorage mein save karna
        displayStudents(); // Students ko table mein dikhana
    };

    // Student ko edit karna
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('class').value = student.class;
        document.getElementById('rollNo').value = student.rollNo;
        
        deleteStudent(index); // Edit ke baad pehle delete karna
    };

    // Student ko delete karna
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    // Form submit hone par naya student add karna
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Page reload hone se rokna

        const student = {
            name: document.getElementById('name').value,
            id: document.getElementById('studentId').value,
            class: document.getElementById('class').value,
            rollNo: document.getElementById('rollNo').value
        };

        // Data empty na ho iski checking
        if (student.name && student.id && student.class && student.rollNo) {
            addStudent(student); // Student ko add karna
            form.reset(); // Form ko reset karna
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Page load hone par students ko display karna
    displayStudents();
});
