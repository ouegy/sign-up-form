// Form Validation Script

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const phone = document.getElementById('tel');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const submitButton = document.querySelector('button');

  // Validation patterns
  const phonePattern = /^\d+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper function to show error
  const showError = (input) => {
    input.classList.add('error');
    input.classList.remove('valid');
  };

  // Helper function to show success
  const showSuccess = (input) => {
    input.classList.remove('error');
    input.classList.add('valid');
  };

  // Validate required field
  const validateRequired = (input) => {
    if (input.value.trim() === '') {
      showError(input);
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  };

  // Validate email
  const validateEmail = () => {
    if (email.value.trim() === '') {
      showError(email);
      return false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email);
      return false;
    } else {
      showSuccess(email);
      return true;
    }
  };

  // Validate phone (numbers only)
  const validatePhone = () => {
    if (phone.value.trim() === '') {
      showError(phone);
      return false;
    } else if (!phonePattern.test(phone.value.trim())) {
      showError(phone);
      return false;
    } else {
      showSuccess(phone);
      return true;
    }
  };

  // Validate passwords match
  const validatePasswordsMatch = () => {
    const passwordValid = validateRequired(password);
    const confirmValid = confirmPassword.value.trim() !== '';

    if (!passwordValid || !confirmValid) {
      if (!passwordValid) showError(password);
      if (!confirmValid) showError(confirmPassword);
      return false;
    }

    if (password.value !== confirmPassword.value) {
      showError(password);
      showError(confirmPassword);
      return false;
    } else {
      showSuccess(password);
      showSuccess(confirmPassword);
      return true;
    }
  };

  // Add event listeners for real-time validation
  firstName.addEventListener('blur', () => validateRequired(firstName));
  firstName.addEventListener('input', () => {
    if (firstName.classList.contains('error')) {
      validateRequired(firstName);
    }
  });

  lastName.addEventListener('blur', () => validateRequired(lastName));
  lastName.addEventListener('input', () => {
    if (lastName.classList.contains('error')) {
      validateRequired(lastName);
    }
  });

  email.addEventListener('blur', validateEmail);
  email.addEventListener('input', () => {
    if (email.classList.contains('error')) {
      validateEmail();
    }
  });

  phone.addEventListener('blur', validatePhone);
  phone.addEventListener('input', () => {
    if (phone.classList.contains('error')) {
      validatePhone();
    }
  });

  password.addEventListener('blur', validatePasswordsMatch);
  password.addEventListener('input', () => {
    if (password.classList.contains('error') || confirmPassword.value !== '') {
      validatePasswordsMatch();
    }
  });

  confirmPassword.addEventListener('blur', validatePasswordsMatch);
  confirmPassword.addEventListener('input', () => {
    if (confirmPassword.classList.contains('error')) {
      validatePasswordsMatch();
    }
  });

  // Form submission handler
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateRequired(firstName);
    const isLastNameValid = validateRequired(lastName);
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const arePasswordsValid = validatePasswordsMatch();

    // If all validations pass
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneValid &&
      arePasswordsValid
    ) {
      alert('Form submitted successfully!');
      // form.reset();
    }
  });
});
