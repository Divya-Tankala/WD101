function validateEmail() {
            // Get the input element
            const emailInput = document.getElementById('email');
            // Get the value of the input
            const email = emailInput.value;
            // Regular expression for email validation
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            // Check if the email matches the pattern
            if (emailPattern.test(email)) {
                // Email is valid
                document.getElementById('validationResult').textContent = "";
            } else {
                // Email is not valid
                document.getElementById('validationResult').textContent = "Email is not valid.";
            }
        }
        function formatDate(inputDate) {
  // Split the input date string into day, month, and year parts
  const parts = inputDate.split('/');
  if (parts.length !== 3) {
    return 'Invalid date format';
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are 0-indexed
  const year = parseInt(parts[2], 10);

  // Create a new Date object with the parsed values
  const date = new Date(year, month, day);

  // Format the date as "yyyy-mm-dd"
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
}
        function restrict()
        {
                    var today = new Date();
                   var maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                    var minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
                    //alert(maxDate.toLocaleDateString()+""+minDate.toLocaleDateString());
                   var dateInput = document.getElementById("dob");
                    var selectedDate = new Date(dateInput.value);

                     // Define your condition here
                     //var maxD = new Date("2005-09-20"); // Replace with your minimum date
  		            //var minD = new Date("1969-01-01"); // Replace with your maximum date
                     const inputMaxDate=maxDate.toLocaleDateString();
                     const inputMinDate=minDate.toLocaleDateString();

                     const maxformattedDate = formatDate(inputMaxDate);
                     const minformattedDate = formatDate(inputMinDate);

                     var maxD = new Date(maxformattedDate); // Replace with your minimum date
                     var minD = new Date(minformattedDate); // Replace with your maximum date

                        if (selectedDate < minD) {
                         dateInput.value = ""; // Clear the input if the selected date is before the minimum date
                         //document.getElementById('Error').textContent = "Age should be lessthan" + minD;
                         } else if (selectedDate > maxD) {
                        dateInput.value = ""; // Clear the input if the selected date is after the maximum date
                           // document.getElementById('Error').textContent = "Age should be lessthan" + maxD;
                     }

                    // Set the min and max attributes based on your condition
                     dateInput.setAttribute("min", minD.toISOString().split('T')[0]);
                     dateInput.setAttribute("max", maxD.toISOString().split('T')[0]);
        }
        document.addEventListener("DOMContentLoaded", function () {
            const registrationForm = document.getElementById("registrationForm");
            const userTableBody = document.getElementById("userTableBody");

            // Load existing user entries from local storage
            loadUserEntries();

            registrationForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const pwd = document.getElementById("password").value;
                const terms = document.getElementById("terms").checked;
                const dob = document.getElementById("dob").value;
                
                    const newRow = userTableBody.insertRow();
                    newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
                    clearFormFields();

                    // Save the new entry to local storage
                    saveUserEntry(name, email, pwd, dob, terms);
                
            });

            

            function clearFormFields() {
                registrationForm.reset();
            }

            function loadUserEntries() {
                const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
                userEntries.forEach(({ name, email, pwd, dob, terms }) => {
                    const newRow = userTableBody.insertRow();
                    newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
                });
            }

            function saveUserEntry(name, email, pwd, dob, terms) {
                const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
                userEntries.push({ name, email, pwd, dob, terms });
                localStorage.setItem("userEntries", JSON.stringify(userEntries));
            }
        });


