document.addEventListener('DOMContentLoaded', () => {
    // Get the modal and its elements
    const modal = document.getElementById('requestModal');
    const closeBtn = document.querySelector('.close-btn');
    const openFormBtns = document.querySelectorAll('.open-form-btn');
    const modalTitle = document.getElementById('modal-title');
    const serviceTypeInput = document.getElementById('serviceTypeInput');
    const serviceForm = document.getElementById('serviceForm');

    // Function to show the modal
    const openModal = (serviceName) => {
        // Capitalize the first letter of each word for the title
        const formattedServiceName = serviceName
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        modalTitle.textContent = `Request for ${formattedServiceName}`;
        serviceTypeInput.value = formattedServiceName; // Set the hidden field value
        modal.style.display = 'block';
    }

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
        serviceForm.reset(); // Clear the form fields when closing
    }

    // Add event listeners to all 'Request Service' buttons
    openFormBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            const service = event.target.getAttribute('data-service');
            openModal(service);
        });
    });

    // Close the modal when the 'x' is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close the modal when the user clicks anywhere outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Optional: Add form submission feedback
    serviceForm.addEventListener('submit', async (e) => {
        // This is a client-side placeholder for demonstration.
        // The actual sending is handled by Formspree or your server-side code.
        
        // This prevents the default browser form submission
        // when using a serverless service like Formspree
        if (serviceForm.action.includes('formspree.io')) {
            e.preventDefault();

            try {
                // Submit the form data
                const response = await fetch(serviceForm.action, {
                    method: 'POST',
                    body: new FormData(serviceForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you for your request! We will be in touch soon.');
                    closeModal(); // Close modal on successful send
                } else {
                    alert('There was an issue sending your request. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please check your network connection.');
            }
        } else {
             // Default submission path (will likely fail without a server)
             // You can add a success message here if you implement your own backend
             // alert('Request sent successfully!'); 
        }
    });

});