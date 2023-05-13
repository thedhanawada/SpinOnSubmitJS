// spinnerButton.js
export function createSpinnerButton(formId, onSubmit) {
  const style = document.createElement('style');
  style.innerHTML = `
    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      margin-right: 5px;
      display: none; /* Hide the spinner initially */
    }

    .buttonDisabled {
      pointer-events: none;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  const spinner = document.createElement('span');
  spinner.id = "spinner";
  spinner.className = "loader";

  const submitText = document.createElement('span');
  submitText.id = "submitText";
  submitText.textContent = "Submit";

  const submitBtn = document.createElement('button');
  submitBtn.id = "submitBtn";
  submitBtn.appendChild(spinner);
  submitBtn.appendChild(submitText);
  submitBtn.onclick = function() {
    showLoadingSpinner(onSubmit);
    return false; // Prevent form submission
  };

  const form = document.getElementById(formId);
  form.appendChild(submitBtn);
}

function showLoadingSpinner(onSubmit) {
  var spinner = document.getElementById("spinner");
  var submitBtn = document.getElementById("submitBtn");
  var submitText = document.getElementById("submitText");

  spinner.style.display = "inline-block"; /* Show the spinner */
  submitText.style.display = "none"; /* Hide the "Submit" text */
  submitBtn.classList.add("buttonDisabled");

  // Simulate an asynchronous action (e.g., form submission)
  onSubmit().finally(() => {
    // Hide the spinner and enable the submit button after a delay (5 seconds in this example)
    spinner.style.display = "none";
    submitText.style.display = "inline"; /* Show the "Submit" text */
    submitBtn.classList.remove("buttonDisabled");
  });
}