document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pizzaForm");
  const nameInput = document.getElementById("name");
  const yearInput = document.getElementById("year");
  const usCheckbox = document.getElementById("usResident");
  const zipcodeContainer = document.getElementById("zipcodeContainer");
  const zipcodeInput = document.getElementById("zipcode");
  const passwordInput = document.getElementById("password");
  const pizzaOptions = document.getElementsByName("pizzaType");
  const successMessage = document.getElementById("successMessage");

  usCheckbox.addEventListener("change", () => {
    zipcodeContainer.style.display = usCheckbox.checked ? "block" : "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    successMessage.textContent = "";

    let valid = true;
    const currentYear = new Date().getFullYear();

    if (nameInput.value.trim().length < 3) {
      showError("nameError", "Name must be at least 3 characters long.");
      valid = false;
    }

    const yearValue = parseInt(yearInput.value.trim());
    if (isNaN(yearValue) || yearValue <= 1900 || yearValue >= currentYear) {
      showError("yearError", `Enter a valid year between 1901 and ${currentYear - 1}.`);
      valid = false;
    }

    if (usCheckbox.checked) {
      const zip = zipcodeInput.value.trim();
      if (!/^[0-9]{5}$/.test(zip)) {
        showError("zipcodeError", "Zipcode must be exactly 5 digits.");
        valid = false;
      }
    }

    if (passwordInput.value.length < 8) {
      showError("passwordError", "Password must be at least 8 characters long.");
      valid = false;
    }

    const pizzaSelected = Array.from(pizzaOptions).some(opt => opt.checked);
    if (!pizzaSelected) {
      showError("pizzaError", "Please select your preferred type of pizza.");
      valid = false;
    }

    // --- Final Output ---
    if (valid) {
      successMessage.textContent = "Accepted! Your pizza is on the way!";
      form.reset();
      zipcodeContainer.style.display = "none";
    }
  });

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  }
});
