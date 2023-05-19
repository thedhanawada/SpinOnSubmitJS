export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerColor = 'black', spinnerTemplate = '', position = 'left') {
  const style = document.createElement('style');
  style.innerHTML = `
    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid ${spinnerColor}; // Color change here
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      margin-right: 5px;
      display: none;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  const spinner = document.createElement('span');
  spinner.className = "loader";

  const button = document.getElementById(buttonId);
  const buttonText = button.innerHTML;
  
  button.innerHTML = "";

  const buttonLabel = document.createElement('span');
  buttonLabel.textContent = buttonText;
  buttonLabel.style.display = "inline";
  
  // Add spinner based on position argument
  if (position === 'right') {
    button.appendChild(buttonLabel);
    button.appendChild(spinner);
  } else {
    button.appendChild(spinner);
    button.appendChild(buttonLabel);
  }
  
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    spinner.style.display = "inline-block";
    button.disabled = true;
    buttonLabel.style.display = "none";

    onSubmit(data)
      .then(() => {
        spinner.style.display = "none";
        button.disabled = false;
        buttonLabel.style.display = "inline";
      })
      .catch((error) => {
        spinner.style.display = "none";
        button.disabled = false;
        buttonLabel.style.display = "inline";
        if (onError) {
          onError(error);
        }
      });
  });
}