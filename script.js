// Data Science Roadmap Generator - Vanilla JavaScript

// Roadmap data
const roadmapData = {
    beginner: [
        {
            title: "Master Python Fundamentals",
            description: "Learn Python syntax, data structures, and basic programming concepts",
            duration: "4-6 weeks",
            priority: "high"
        },
        {
            title: "Statistics Foundation",
            description: "Understand descriptive statistics, probability, and hypothesis testing",
            duration: "3-4 weeks",
            priority: "high"
        },
        {
            title: "Data Manipulation with Pandas",
            description: "Learn to clean, transform, and analyze data using Python",
            duration: "2-3 weeks",
            priority: "medium"
        },
        {
            title: "Data Visualization",
            description: "Create meaningful charts and graphs with Matplotlib and Seaborn",
            duration: "2 weeks",
            priority: "medium"
        },
        {
            title: "SQL Basics",
            description: "Learn to query databases and extract insights from data",
            duration: "2-3 weeks",
            priority: "high"
        },
        {
            title: "Introduction to Machine Learning",
            description: "Understand basic ML concepts and build your first models",
            duration: "4-5 weeks",
            priority: "low"
        }
    ],
    intermediate: [
        {
            title: "Advanced Machine Learning",
            description: "Deep dive into ensemble methods, feature engineering, and model evaluation",
            duration: "5-6 weeks",
            priority: "high"
        },
        {
            title: "Deep Learning Fundamentals",
            description: "Neural networks, backpropagation, and popular frameworks like TensorFlow",
            duration: "6-8 weeks",
            priority: "high"
        },
        {
            title: "Advanced SQL & Databases",
            description: "Complex queries, optimization, and working with big data systems",
            duration: "3-4 weeks",
            priority: "medium"
        },
        {
            title: "MLOps & Model Deployment",
            description: "Learn to deploy models to production and monitor performance",
            duration: "4-5 weeks",
            priority: "medium"
        },
        {
            title: "Specialized Domains",
            description: "Choose a specialization: NLP, Computer Vision, or Time Series",
            duration: "8-10 weeks",
            priority: "low"
        }
    ],
    advanced: [
        {
            title: "Research & Innovation",
            description: "Stay current with latest papers and contribute to open source projects",
            duration: "Ongoing",
            priority: "high"
        },
        {
            title: "Advanced Deep Learning",
            description: "Transformers, GANs, reinforcement learning, and cutting-edge architectures",
            duration: "10-12 weeks",
            priority: "high"
        },
        {
            title: "System Design for ML",
            description: "Design scalable ML systems and handle production challenges",
            duration: "6-8 weeks",
            priority: "medium"
        },
        {
            title: "Leadership & Mentoring",
            description: "Develop skills to lead data science teams and mentor junior members",
            duration: "Ongoing",
            priority: "medium"
        },
        {
            title: "Business Strategy",
            description: "Learn to align data science initiatives with business goals",
            duration: "4-6 weeks",
            priority: "low"
        }
    ]
};

// Theme management
class ThemeManager {
    constructor() {
        this.initTheme();
        this.bindEvents();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleFAQ(item));
            }
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Roadmap Generator
class RoadmapGenerator {
    constructor() {
        this.skillLevel = '';
        this.selectedSkills = [];
        this.bindEvents();
    }

    bindEvents() {
        // Skill level selector
        const skillLevelSelect = document.getElementById('skillLevel');
        if (skillLevelSelect) {
            skillLevelSelect.addEventListener('change', (e) => {
                this.skillLevel = e.target.value;
                this.updateGenerateButton();
            });
        }

        // Skill checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleSkillChange(e.target.value, e.target.checked);
            });
        });

        // Generate button
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateRoadmap());
        }

        // Hero CTA button
        const generateRoadmapBtn = document.getElementById('generateRoadmapBtn');
        if (generateRoadmapBtn) {
            generateRoadmapBtn.addEventListener('click', () => this.scrollToRoadmap());
        }
    }

    handleSkillChange(skill, checked) {
        if (checked) {
            this.selectedSkills.push(skill);
        } else {
            this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
        }
    }

    updateGenerateButton() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.disabled = !this.skillLevel;
        }
    }

    scrollToRoadmap() {
        const roadmapSection = document.getElementById('roadmap');
        if (roadmapSection) {
            roadmapSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    generateRoadmap() {
        if (!this.skillLevel) return;

        const roadmapSteps = roadmapData[this.skillLevel] || [];
        this.displayRoadmap(roadmapSteps);
    }

    displayRoadmap(steps) {
        const roadmapResults = document.getElementById('roadmapResults');
        const roadmapStepsContainer = document.getElementById('roadmapSteps');
        
        if (!roadmapResults || !roadmapStepsContainer) return;

        // Clear previous results
        roadmapStepsContainer.innerHTML = '';

        // Create roadmap steps
        steps.forEach((step, index) => {
            const stepElement = this.createStepElement(step, index);
            roadmapStepsContainer.appendChild(stepElement);
        });

        // Show results with animation
        roadmapResults.classList.remove('hidden');
        
        // Scroll to results
        setTimeout(() => {
            roadmapResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    createStepElement(step, index) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'roadmap-step card';
        
        stepDiv.innerHTML = `
            <div class="step-content">
                <div class="step-header">
                    <div class="step-main">
                        <div class="step-top">
                            <div class="step-number">${index + 1}</div>
                            <h4 class="step-title">${step.title}</h4>
                            <span class="step-badge ${step.priority}">${step.priority} priority</span>
                        </div>
                        <p class="step-description">${step.description}</p>
                        <div class="step-meta">
                            <div class="step-duration">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12,6 12,12 16,14"></polyline>
                                </svg>
                                <span>${step.duration}</span>
                            </div>
                            <div class="step-priority-icon">
                                ${this.getPriorityIcon(step.priority)}
                            </div>
                        </div>
                    </div>
                    <svg class="step-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                </div>
            </div>
        `;

        return stepDiv;
    }

    getPriorityIcon(priority) {
        switch (priority) {
            case 'high':
                return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"></polygon>
                </svg>`;
            case 'medium':
                return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                </svg>`;
            case 'low':
                return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                </svg>`;
            default:
                return '';
        }
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        // Handle navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Form validation and enhancement
class FormEnhancer {
    constructor() {
        this.enhanceForms();
    }

    enhanceForms() {
        // Add custom styling to select elements
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            this.enhanceSelect(select);
        });

        // Add custom checkbox styling
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            this.enhanceCheckbox(checkbox);
        });
    }

    enhanceSelect(select) {
        // Add focus and blur events for better styling
        select.addEventListener('focus', () => {
            select.parentElement.classList.add('focused');
        });

        select.addEventListener('blur', () => {
            select.parentElement.classList.remove('focused');
        });
    }

    enhanceCheckbox(checkbox) {
        // Create custom checkbox appearance
        checkbox.style.accentColor = 'var(--color-primary)';
    }
}

// Animation helpers
class AnimationHelpers {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress.toString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight;
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (targetHeight * progress) + 'px';
            
            if (progress >= 1) {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            } else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.setupLazyLoading();
        this.setupDebouncing();
    }

    setupLazyLoading() {
        // Lazy load images if any are added later
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe lazy images
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupDebouncing() {
        // Add debounced scroll handler for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        });
    }

    handleScroll() {
        // Add scroll-based enhancements here if needed
        const scrollTop = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrollTop > 100) {
                header.style.backdropFilter = 'blur(12px)';
            } else {
                header.style.backdropFilter = 'blur(8px)';
            }
        }
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Error handling
class ErrorHandler {
    static handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // In production, you might want to send this to an error tracking service
        // this.sendToErrorService(error, context);
    }

    static sendToErrorService(error, context) {
        // Implementation for error tracking service
        // e.g., Sentry, LogRocket, etc.
    }
}

// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.enhanceAccessibility();
    }

    enhanceAccessibility() {
        // Add keyboard navigation for FAQ
        this.addKeyboardNavigation();
        
        // Add ARIA labels where needed
        this.addAriaLabels();
        
        // Add focus management
        this.manageFocus();
    }

    addKeyboardNavigation() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.setAttribute('tabindex', '0');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    addAriaLabels() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }

        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                const questionId = `faq-question-${index}`;
                const answerId = `faq-answer-${index}`;
                
                question.setAttribute('id', questionId);
                question.setAttribute('aria-expanded', 'false');
                question.setAttribute('aria-controls', answerId);
                
                answer.setAttribute('id', answerId);
                answer.setAttribute('aria-labelledby', questionId);
            }
        });
    }

    manageFocus() {
        // Manage focus for FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const expanded = item.classList.contains('active');
                question.setAttribute('aria-expanded', expanded.toString());
            });
        });
    }
}

// Main application initialization
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            new ThemeManager();
            new FAQAccordion();
            new RoadmapGenerator();
            new SmoothScroll();
            new FormEnhancer();
            new PerformanceOptimizer();
            new AccessibilityEnhancer();

            // Log successful initialization
            console.log('GrowinDataScience app initialized successfully');
            
        } catch (error) {
            ErrorHandler.handleError(error, 'App initialization');
        }
    }
}

// Initialize the application
new App();

// Additional utility functions
const Utils = {
    // Format text for display
    formatText(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Get element by test id (for easier testing)
    getByTestId(testId) {
        return document.querySelector(`[data-testid="${testId}"]`);
    },

    // Simple event emitter for component communication
    createEventEmitter() {
        const events = {};
        
        return {
            on(event, callback) {
                if (!events[event]) {
                    events[event] = [];
                }
                events[event].push(callback);
            },
            
            emit(event, data) {
                if (events[event]) {
                    events[event].forEach(callback => callback(data));
                }
            },
            
            off(event, callback) {
                if (events[event]) {
                    events[event] = events[event].filter(cb => cb !== callback);
                }
            }
        };
    }
};

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        FAQAccordion,
        RoadmapGenerator,
        SmoothScroll,
        Utils,
        roadmapData
    };
}