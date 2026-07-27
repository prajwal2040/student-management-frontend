function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    fetch("http://localhost:8087/login?studentId=" + username + "&password=" + password, {

        method: "POST"

    })


    .then(response => response.json())


    .then(studentId => {


        console.log("Student ID:", studentId);


        if(studentId != null) {


            // Store logged in student id

            localStorage.setItem("userId", studentId);


            alert("Login Successful");


            // Redirect to dashboard

            window.location.href = "dashboard.html";


        }

        else {


            alert("Invalid Student ID or Password");


        }


    })


    .catch(error => {

        console.log(error);

        alert("Login Failed");

    });

}