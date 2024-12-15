console.log("Welcome to the page");

document.addEventListener('DOMContentLoaded', function() {
    let SignUp = document.getElementById('SignUp');
    
    SignUp.addEventListener('submit', async function(event) {
        let isValid = true;
        const fields = this.querySelectorAll('input[required]');

        // Clear previous error messages
        const errorMessages = this.querySelectorAll('.error-message');
        errorMessages.forEach(function(msg) {
            msg.remove();
        });

        // Validate required fields
        fields.forEach(function(field) {
            if (!field.value) {
                isValid = false;
                // Add error class for styling
                field.classList.add('error'); 

                // Create and display an error message
                const errorMessage = document.createElement('span');
                // Add a class for styling
                errorMessage.className = 'error-message'; 
                errorMessage.textContent = `${field.placeholder} is required.`;
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            } else {
                field.classList.remove('error');
            }
        });

        // If the form is not valid, prevent submission
        if (!isValid) {
            event.preventDefault(); 
            return; 
        }

        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        // Log the data to see what is being sent
        console.log(data); 
        try {
            
            if(!data.FirstName || !data.LastName){
                //For LogIn Page
                    const response = await fetch("/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
        
                    const result = await response.json();
        
                    if (response.ok) {
                        // Show success alert
                        Swal.fire({
                            title: "Good job!",
                            text: result.message,
                            icon: "success"
                        });
                    } else {
                        // Show error alert
                        Swal.fire({
                            title: "Error!",
                            text: result.message,
                            icon: "error"
                        });
                    }
            }else{

             //For SignUp Page   
            const response = await fetch("/SignUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Show success alert
                Swal.fire({
                    title: "Good job!",
                    text: result.message,
                    icon: "success"
                });
            } else {
                // Show error alert
                Swal.fire({
                    title: "Error!",
                    text: result.message,
                    icon: "error"
                });
            }
        }
        } catch (error) {
            console.error("Fetch error:", error); // Log the error
            Swal.fire({
                title: "Error!",
                text: "An unexpected error occurred.",
                icon: "error"
            });
        }
    });

    // Add event listeners to input fields for immediate feedback
    const fields = SignUp.querySelectorAll('input[required]');
    fields.forEach(function(field) {
        field.addEventListener('pointerdown', function() {
            if (this.value) {
                this.classList.remove('error');
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            } else {
                this.classList.add('error');
            }
        });
    });
});