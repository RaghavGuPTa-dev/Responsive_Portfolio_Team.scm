// login.js - Add this file to your project and link to it in your HTML

document.addEventListener('DOMContentLoaded', () => {
    // Get references to form elements
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');
    
    // Check if there are stored credentials and fill them in
    if (localStorage.getItem('rememberedEmail')) {
      emailInput.value = localStorage.getItem('rememberedEmail');
      rememberMeCheckbox.checked = true;
    }
  
    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      if (!emailInput.value.trim()) {
        showMessage('Please enter your email address', 'error');
        return;
      }
      
      if (!isValidEmail(emailInput.value)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }
      
      if (!passwordInput.value) {
        showMessage('Please enter your password', 'error');
        return;
      }
      
      // Save to localStorage if "Remember me" is checked
      if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '⏳ Logging in...';
      
      // Simulate API call (replace with your actual authentication API)
      setTimeout(() => {
        // For demo purposes, always "succeed" login
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect after a short delay (replace with your dashboard URL)
        setTimeout(() => {
          window.location.href = '/dashboard.html';  // Replace with your dashboard page
        }, 1500);
        
      }, 1000);
    });
    
    // Handle "Forgot password" link
    document.querySelector('a[href="#"]').addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      if (email && isValidEmail(email)) {
        showMessage(`Password reset instructions sent to ${email}`, 'success');
      } else {
        showMessage('Please enter your email first', 'error');
        emailInput.focus();
      }
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Helper function to show messages
    function showMessage(message, type = 'info') {
      // Remove any existing message
      const existingMessage = document.querySelector('.message-alert');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Create message element
      const messageElement = document.createElement('div');
      messageElement.className = `message-alert fixed top-4 right-4 py-2 px-4 rounded-lg transition-opacity duration-500 z-50`;
      
      // Set style based on message type
      if (type === 'error') {
        messageElement.classList.add('bg-red-500', 'text-white');
      } else if (type === 'success') {
        messageElement.classList.add('bg-green-500', 'text-white');
      } else {
        messageElement.classList.add('bg-blue-500', 'text-white');
      }
      
      messageElement.textContent = message;
      document.body.appendChild(messageElement);
      
      // Fade out and remove after delay
      setTimeout(() => {
        messageElement.classList.add('opacity-0');
        setTimeout(() => {
          messageElement.remove();
        }, 500);
      }, 3000);
    }
  });