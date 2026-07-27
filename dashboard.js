let studentId = localStorage.getItem("userId");
console.log("Logged Student ID:", studentId);
function loadStudent() {

    fetch(`http://localhost:8087/students/${studentId}`)

    .then(response => response.json())

    .then(student => {

        document.getElementById("content").innerHTML = `

            <h2>Student Profile</h2>

            <hr>

            <p><b>Name :</b> ${student.name}</p>

            <p><b>Roll No :</b> ${student.rollNo}</p>

            <p><b>Year :</b> ${student.yearOfStudy}</p>

            <p><b>Mobile :</b> ${student.mobileNumber}</p>

        `;

    })

    .catch(error => {

        alert("Unable to fetch student details.");

        console.log(error);

    });

}

function loadAcademic() {

    fetch(`http://localhost:8087/academic-records/student/${studentId}`)

    .then(response => response.json())

    .then(records => {

         let html = `
            <h2>Academic Records</h2>
            <hr>

            <table border="1" cellpadding="10" cellspacing="0">

                <tr>
                    <th>Semester</th>
                    <th>SGPA</th>
                    <th>CGPA</th>
                    <th>Backlogs</th>
                </tr>
        `;

        records.forEach(record => {

            html += `
                <tr>
                    <td>${record.semester}</td>
                    <td>${record.sgpa}</td>
                    <td>${record.cgpa}</td>
                    <td>${record.backlogcount}</td>
                </tr>
            `;

        });

        html += `</table>`;

        document.getElementById("content").innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        alert("Unable to fetch Academic Records");

    });
}

function loadAttendance() {

    fetch(`http://localhost:8087/attendance/student/${studentId}`)

    .then(response => response.json())

    .then(records => {

        let html = `
            <h2>Attendance Records</h2>
            <hr>

            <table border="1" cellpadding="10" cellspacing="0">

                <tr>
                    <th>Month</th>
                    <th>Subject</th>
                    <th>Total Classes</th>
                    <th>Attended Classes</th>
                    <th>Attendance %</th>
                </tr>
        `;

        records.forEach(record => {

            html += `
                <tr>
                    <td>${record.month}</td>
                    <td>${record.subject}</td>
                    <td>${record.totalClasses}</td>
                    <td>${record.attendedClasses}</td>
                    <td>${record.attendancePercentage}%</td>
                </tr>
            `;

        });

        html += `</table>`;

        document.getElementById("content").innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        alert("Unable to fetch Attendance Records");

    });

}

function loadCertificate() {

    fetch(`http://localhost:8087/certificate/student/${studentId}`)

    .then(response => response.json())

    .then(certificates => {

        let html = `
            <h2>Certificate Records</h2>
            <hr>

            <table border="1" cellpadding="10" cellspacing="0">

                <tr>
                    <th>Certificate Name</th>
                    <th>Organization</th>
                    <th>Level</th>
                    <th>Points</th>
                </tr>
        `;

        certificates.forEach(certificate => {

            html += `
                <tr>
                    <td>${certificate.certificateName}</td>
                    <td>${certificate.issuingOrganization}</td>
                    <td>${certificate.certificateLevel}</td>
                    <td>${certificate.points}</td>
                </tr>
            `;

        });

        html += `</table>`;

        document.getElementById("content").innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        alert("Unable to fetch Certificate Records");

    });

}

function loadProjects() {

    fetch(`http://localhost:8087/projects/student/${studentId}`)

    .then(response => response.json())

    .then(projects => {

        let html = `
            <h2>Project Records</h2>
            <hr>

            <table border="1" cellpadding="10" cellspacing="0">
                <tr>
                    <th>Project Title</th>
                    <th>Technology</th>
                    <th>Project Type</th>
                    <th>GitHub</th>
                    <th>Completion Date</th>
                    <th>Points</th>
                </tr>
        `;

        projects.forEach(project => {

            html += `
                <tr>
                    <td>${project.projectTitle}</td>
                    <td>${project.technologyUsed}</td>
                    <td>${project.projectType}</td>

                    <td>
                        <a href="${project.githubLink}" target="_blank">
                            View Project
                        </a>
                    </td>

                    <td>${project.completionDate}</td>
                    <td>${project.points}</td>
                </tr>
            `;

        });

        html += `</table>`;

        document.getElementById("content").innerHTML = html;

    });

}

function loadDashboard() {

    fetch(`http://localhost:8087/dashboard/${studentId}`)

    .then(response => response.json())

    .then(student => {


        let html = `

        <h2>My Dashboard</h2>

        <hr>


        <h3>Welcome ${student.studentName}</h3>


        <table border="1" cellpadding="10" cellspacing="0">


            <tr>
                <th>Rank</th>
                <td>${student.rank}</td>
            </tr>


            <tr>
                <th>Overall Score</th>
                <td>${student.overallScore}</td>
            </tr>


            <tr>
                <th>SGPA</th>
                <td>${student.cgpa}</td>
            </tr>


            <tr>
                <th>Attendance</th>
                <td>${student.attendancePercentage}%</td>
            </tr>


            <tr>
                <th>Certificates</th>
                <td>${student.certificateCount}</td>
            </tr>


            <tr>
                <th>Projects</th>
                <td>${student.githubProjectCount}</td>
            </tr>


            <tr>
                <th>Placement Status</th>
                <td>${student.placementStatus}</td>
            </tr>


        </table>


        <br><br>

        <h2>Student Ranking</h2>

        <hr>

        `;


        document.getElementById("content").innerHTML = html;


        loadRanking();


    })


    .catch(error => {

        console.error(error);

        alert("Unable to load Dashboard");

    });


}

function loadRanking() {


    fetch(`http://localhost:8087/dashboard/all`)


    .then(response => response.json())


    .then(students => {


        let html = `


        <table border="1" cellpadding="10" cellspacing="0">


        <tr>

            <th>Rank</th>
            <th>Name</th>
            <th>SGPA</th>
            <th>Attendance</th>
            <th>Certificates</th>
            <th>Projects</th>
            <th>Placement Status</th>

        </tr>


        `;



        students.forEach(student => {


            html += `


            <tr>

                <td>${student.rank}</td>

                <td>${student.studentName}</td>

                <td>${student.cgpa}</td>

                <td>${student.attendancePercentage}%</td>

                <td>${student.certificateCount}</td>

                <td>${student.githubProjectCount}</td>

                <td>${student.placementStatus}</td>


            </tr>


            `;


        });



        html += `</table>`;


        document.getElementById("content").innerHTML += html;



    })


    .catch(error => {

        console.error(error);

        alert("Unable to load Ranking");

    });


}

