// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


        const toggleBtn = document.getElementById('toggle-projects');
        const projects = document.querySelectorAll('#projects-grid .project');

    toggleBtn.addEventListener('click', () => {
            let hidden = Array.from(projects).slice(3);
        hidden.forEach(p => p.classList.toggle('hidden'));

        // Change button text
        if (toggleBtn.innerText === 'Load More') {
            toggleBtn.innerText = 'Show Less';
        } else {
            toggleBtn.innerText = 'Load More';
        // Scroll back to top of projects
        document.getElementById('projects').scrollIntoView({behavior: 'smooth' });
        }
    });


        // Toggle projects functionality
        document.getElementById('toggle-projects').addEventListener('click', function () {
        const hiddenProjects = document.querySelectorAll('.project-card.hidden');
        const button = this;

        if (hiddenProjects.length > 0) {
            // Show hidden projects
            hiddenProjects.forEach(project => {
                project.classList.remove('hidden');
            });
        button.innerHTML = '<span class="relative z-10">Show Less</span><div class="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>';
        } else {
            // Hide all projects except the first 3
            const allProjects = document.querySelectorAll('.project-card');
            allProjects.forEach((project, index) => {
                if (index >= 3) {
            project.classList.add('hidden');
                }
            });
        button.innerHTML = '<span class="relative z-10">Load More Projects</span><div class="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>';

        // Scroll back to projects section
        document.getElementById('projects').scrollIntoView({behavior: 'smooth', block: 'start' });
        }


    });




