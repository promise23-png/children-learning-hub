document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Navigation buttons
    document.querySelector('.slider-prev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // CTA buttons
    document.getElementById('start-learning').addEventListener('click', function() {
        if (firebase.auth().currentUser) {
            window.location.href = "dashboard.html";
        } else {
            alert('Please login first to access this content');
            window.location.href = "login.html";
        }
    });
    
    document.getElementById('placement-test').addEventListener('click', function() {
        if (firebase.auth().currentUser) {
            // Start placement test
            alert('Placement test would begin here');
        } else {
            alert('Please login first to access this content');
            window.location.href = "login.html";
        }
    });
});