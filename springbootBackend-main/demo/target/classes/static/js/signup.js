document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.querySelector('form'); // Corrected selector
  signupForm.style.opacity = 0;

  setTimeout(() => {
      signupForm.style.transition = 'opacity 1s ease-in-out';
      signupForm.style.opacity = 1;
  }, 500);

  const signupButton = document.querySelector('button[type="submit"]');

  signupButton.addEventListener('click', function (event) {
      event.preventDefault(); // Stop default form submission

      const usernameInput = document.querySelector('input[name="username"]');
      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      const confirmPasswordInput = document.querySelector('input[name="passwordcon"]');
      const roleInput = document.querySelector('select[name="role"]');

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const role = roleInput.value;

      // **Validation Logic**
      let errorMessage = "";

      if (!username) errorMessage = "Username is required.";
      else if (!email) errorMessage = "Email is required.";
      else if (!email.includes("@") || !email.includes(".")) errorMessage = "Invalid email format.";
      else if (password.length < 8) errorMessage = "Password must be at least 8 characters.";
      else if (!/[A-Z]/.test(password)) errorMessage = "Password must contain at least one uppercase letter.";
      else if (!/[a-z]/.test(password)) errorMessage = "Password must contain at least one lowercase letter.";
      else if (!/[0-9]/.test(password)) errorMessage = "Password must contain at least one digit.";
      else if (!/[@#$%^&+=]/.test(password)) errorMessage = "Password must contain at least one special character (@#$%^&+=).";
      else if (password !== confirmPassword) errorMessage = "Passwords do not match.";
      else if (!role) errorMessage = "Please select a role.";

      if (errorMessage) {
          alert(errorMessage);
          signupForm.classList.add('shake');

          setTimeout(() => {
              signupForm.classList.remove('shake');
          }, 1000);
          return;
      }

      // **Send data to backend**
      fetch('/req/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, role })
      })
      .then(response => {
          if (response.ok) {
              alert('Signup successful! Redirecting to login...');
              window.location.href = "/req/login";
          } else {
              alert('Signup failed. Please try again.');
          }
      })
      .catch(error => console.error("Error:", error));
  });
});
