document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18 || age > 55) {
      document.getElementById("dobError").textContent =
        "Age must be between 18 and 55 years.";
      return;
    } else {
      document.getElementById("dobError").textContent = "";
    }

    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    const formData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      termsAccepted: termsAccepted,
    };

    entries.push(formData);
    localStorage.setItem("entries", JSON.stringify(entries));

    document.getElementById("registration-form").reset();
    loadTableData();
  });

function loadTableData() {
  const storedData = JSON.parse(localStorage.getItem("entries")) || [];
  const table = document.getElementById("entries-table");
  table.innerHTML = "";

  storedData.forEach((entry) => {
    const row = `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.termsAccepted ? "true" : "false"}</td>
            </tr>
        `;
    table.innerHTML += row;
  });
}

window.onload = function () {
  loadTableData();
};
