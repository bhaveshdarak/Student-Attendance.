import React, { useEffect, useState } from "react";
import "./Student.css";

function Student() {
  const [students, setStudents] = useState([]);

  const [studentCount, setStudentCount] = useState(0);

  const checkIn = (rollNumber, name) => {
    const newStudent = {
      rollNumber,
      name,
      checkInTime: new Date(),
    };

    setStudents([...students, newStudent]);
  };

  const checkOut = (rollNumber) => {
    const studentIndex = students.findIndex(
      (student) => student.rollNumber === rollNumber
    );

    if (studentIndex !== -1) {
      const updatedStudents = [...students];
      updatedStudents[studentIndex].checkOutTime = new Date();
      setStudents(updatedStudents.filter((_, index) => index !== studentIndex));
    }
  };

  useEffect(() => {
    setStudentCount(students.length);
  }, [students]);

  return (
    <div className="attendance-system">
      <h1 className="title">Attendance System</h1>
      {/* <h2 className="student-count">Number of students currently in the school: {studentCount}</h2> */}
      <h2 className="total-students">
        Total number of students in the school: {students.length}
      </h2>
      <form className="form">
        <label htmlFor="rollNumber" className="label">
          Roll Number:
        </label>
        <input type="text" id="rollNumber" className="input" />
        <label htmlFor="name" className="label">
          Name:
        </label>
        <input type="text" id="name" className="input" />

        <div className="btn">

        <button
          type="button"
          onClick={() => {
            const rollNumber = document.getElementById("rollNumber").value;
            const name = document.getElementById("name").value;
            checkIn(rollNumber, name);
          }}
          className="button"
        >
          Check In
        </button>
        <button
          type="button"
          onClick={() => {
            const rollNumber = document.getElementById("rollNumber").value;
            checkOut(rollNumber);
          }}
          className="button"
        >
          Check Out
        </button>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime.toString()}</td>
              <td>
                {student.checkOutTime ? student.checkOutTime.toString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
