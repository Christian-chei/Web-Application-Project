// In-memory users object (for demo purposes only)
const users = {};

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (signupForm) {
    signupForm.onsubmit = function (e) {
      e.preventDefault();
      const inputs = signupForm.querySelectorAll('input');
      const username = inputs[0].value.trim();
      const email = inputs[1].value.trim();
      const password = inputs[2].value;

      if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
      }

      if (users[username]) {
        alert('Username already exists.');
        return;
      }

      users[username] = { email, password };
      alert('Signup successful. You can now log in.');
      signupForm.reset();
      closeModal('signup-modal');
    };
  }

  if (loginForm) {
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      const inputs = loginForm.querySelectorAll('input');
      const username = inputs[0].value.trim();
      const password = inputs[1].value;

      if (!username || !password) {
        alert('Please fill in all fields.');
        return;
      }

      if (!users[username]) {
        alert('User not found. Please sign up.');
        return;
      }

      if (users[username].password !== password) {
        alert('Incorrect password.');
        return;
      }

      alert(`Welcome back, ${username}!`);
      loginForm.reset();
      closeModal('login-modal');
    };
  }
});

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}
