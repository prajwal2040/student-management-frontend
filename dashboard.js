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

            <h3>Upload Certificate</h3>

            <input type="file" id="certificateFile" accept=".jpg,.jpeg,.png">

            <button onclick="uploadCertificate()">
                Upload Certificate
            </button>

            <br><br>

            <h3>Uploaded Certificates</h3>

            <table border="1" cellpadding="10" cellspacing="0">

                <tr>
                    <th>Certificate Name</th>
                    <th>Organization</th>
                    <th>Course Duration</th>
                    <th>Issue Date</th>
                    <th>Action</th>
                </tr>
        `;

        certificates.forEach(certificate => {

            html += `
                <tr>

                    <td>${certificate.certificateName}</td>

                    <td>${certificate.issuingOrganization}</td>

                    <td>${certificate.courseDuration}</td>

                    <td>${certificate.issueDate}</td>

                    <td>
                        <button onclick="deleteCertificate(${certificate.id})">
                            Delete
                        </button>
                    </td>

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
function deleteCertificate(id) {

    if (!confirm("Are you sure you want to delete this certificate?")) {
        return;
    }

    fetch(`http://localhost:8087/certificate/${id}`, {
        method: "DELETE"
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        return response.text();
    })
    .then(result => {

        alert(result);

        loadCertificate();
    })
    .catch(error => {

        console.error(error);

        alert("Unable to delete certificate.");
    });
}
function uploadCertificate() {

    const fileInput = document.getElementById("certificateFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a certificate file.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("studentId", studentId);

    fetch("http://localhost:8087/certificate/gemini-upload", {
        method: "POST",
        body: formData
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Certificate processing failed");
        }

        return response.json();
    })
    .then(certificate => {

        alert("Certificate uploaded and saved successfully!");

        fileInput.value = "";

        // Refresh certificate table
        loadCertificate();
    })
    .catch(error => {

        console.error("Certificate error:", error);

        alert("Certificate upload failed.");
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
                <th>CGPA</th>
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
            <th>CGPA</th>
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

function loadLeetCode() {

    fetch(`http://localhost:8087/leetcode/profile/${studentId}`)

    .then(response => {

        if (response.status === 204) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Unable to fetch LeetCode profile");
        }

        return response.json();

    })

    .then(profile => {

        // Student does NOT have a LeetCode profile
        if (profile === null) {

            document.getElementById("content").innerHTML = `

                <h2>LeetCode Solver</h2>

                <hr>

                <h3>Connect Your LeetCode Profile</h3>

                <p>
                    Enter your LeetCode profile URL to connect your account.
                </p>

                <input
                    type="text"
                    id="leetcodeUrl"
                    placeholder="Enter LeetCode Profile URL"
                >

                <button onclick="saveLeetCodeProfile()">
                    Connect LeetCode
                </button>

            `;

            return;
        }


        // Student already has a LeetCode profile
        document.getElementById("content").innerHTML = `

            <h2>LeetCode Solver</h2>

            <hr>

            <h3>My LeetCode Profile</h3>

            <p>
                <b>Username:</b> ${profile.leetcodeUsername}
            </p>

            <p>
                <b>Profile:</b>

                <a href="${profile.profileUrl}" target="_blank">
                    View LeetCode Profile
                </a>
            </p>

            <hr>

            <h3>LeetCode Statistics</h3>

            <div id="leetcodeStats">

                <p>Loading statistics...</p>

            </div>

            <button onclick="refreshLeetCodeStats()">
                Refresh Statistics
            </button>

        `;

        refreshLeetCodeStats();

    })

    .catch(error => {

        console.error("LeetCode profile error:", error);

        alert("Unable to load LeetCode profile.");

    });

}

function saveLeetCodeProfile() {

    const profileUrl =
        document.getElementById("leetcodeUrl").value.trim();

    if (profileUrl === "") {

        alert("Please enter your LeetCode profile URL.");

        return;
    }


    // Extract username from LeetCode URL
    const parts = profileUrl.split("/");

    const username = parts[parts.length - 1];

    if (username === "") {

        alert("Invalid LeetCode profile URL.");

        return;
    }


    const profile = {

        studentId: studentId,

        leetcodeUsername: username,

        profileUrl: profileUrl

    };


    fetch("http://localhost:8087/leetcode/profile", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(profile)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Failed to save LeetCode profile");

        }

        return response.json();

    })

    .then(savedProfile => {

        alert("LeetCode profile connected successfully!");

        // Reload LeetCode module
        loadLeetCode();

    })

    .catch(error => {

        console.error("LeetCode profile error:", error);

        alert("Unable to connect LeetCode profile.");

    });

}
function refreshLeetCodeStats() {

    fetch(`http://localhost:8087/leetcode/profile/${studentId}`)

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to fetch profile");
        }

        return response.json();

    })

    .then(profile => {

        return fetch(
            `http://localhost:8087/leetcode/stats/${profile.leetcodeUsername}`
        );

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to fetch statistics");
        }

        return response.json();

    })

    .then(stats => {

        console.log("LeetCode Stats:", stats);

        document.getElementById("leetcodeStats").innerHTML = `

            <p>
                <b>Total Solved:</b> ${stats.totalSolved}
            </p>

            <p>
                <b>Easy:</b> ${stats.easySolved}
            </p>

            <p>
                <b>Medium:</b> ${stats.mediumSolved}
            </p>

            <p>
                <b>Hard:</b> ${stats.hardSolved}
            </p>

        `;

    })

    .catch(error => {

        console.error("LeetCode statistics error:", error);

        document.getElementById("leetcodeStats").innerHTML = `
            <p>Unable to load LeetCode statistics.</p>
        `;

    });

}