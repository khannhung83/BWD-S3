/* Main JavaScript */
(function () {
    'use strict';

    // Set current year in footer copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize Swiper sliders
    const teamSlider = new Swiper('.team-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.team-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.team-slider-container .swiper-button-next',
            prevEl: '.team-slider-container .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }
    });

    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.testimonials-slider .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // Counter animation
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Multi-step form
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const registerForm = document.getElementById('registerForm');

    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function () {
                const nextStep = parseInt(this.getAttribute('data-next'));
                const currentStepEl = document.querySelector('.form-step.active');
                const currentStep = parseInt(currentStepEl.getAttribute('data-step'));

                const currentInputs = currentStepEl.querySelectorAll('input, select, textarea');
                let isValid = true;

                currentInputs.forEach(input => {
                    
                    // Các loại input khác
                    if (input.required && !input.value.trim()) {
                        input.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        input.classList.remove('is-invalid');
                    }
                });


                if (isValid) {
                    formSteps.forEach(step => step.classList.remove('active'));
                    const nextStepEl = document.querySelector(`.form-step[data-step="${nextStep}"]`);
                    nextStepEl.classList.add('active');

                    // Update step progress UI
                    steps.forEach(step => step.classList.remove('active'));
                    const progressStep = document.querySelector(`.step[data-step="${nextStep}"]`);
                    if (progressStep) progressStep.classList.add('active');
                }
            });
        });
    }

    if (prevButtons.length > 0) {
        prevButtons.forEach(button => {
            button.addEventListener('click', function () {
                const currentStep = parseInt(this.getAttribute('data-prev'));
                const prevStep = parseInt(this.getAttribute('data-prev')) - 1;

                // Hide current step
                formSteps[currentStep].classList.remove('active');

                // Show previous step
                formSteps[prevStep].classList.add('active');
                stepIndicators[currentStep].classList.remove('active');
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const requiredInputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!input.value) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });


            if (isValid) {
    // 🌟 LẤY DỮ LIỆU TỪ FORM:
    const registration = {
        parentName: document.getElementById('parentName').value.trim(),
        parentPhone: document.getElementById('parentPhone').value.trim(),
        parentEmail: document.getElementById('parentEmail').value.trim(),
        studentName: document.getElementById('studentName').value.trim(),
        studentGrade: document.getElementById('studentGrade').value,
        studentSchool: document.getElementById('studentSchool').value.trim(),
        subject: document.getElementById('subject').value,
        requirements: document.getElementById('requirements').value.trim()
    };

    // 🌟 LƯU VÀO localStorage
    const existing = JSON.parse(localStorage.getItem('tutorRegistrations')) || [];
    existing.push(registration);
    localStorage.setItem('tutorRegistrations', JSON.stringify(existing));
    registerForm.submit();
    // ❗️Lưu xong rồi mới hiện success message
    const formContent = registerForm.innerHTML;
    registerForm.innerHTML = `
        <div class="text-center py-5">
            <div class="mb-4">
                <i class="fas fa-check-circle text-success fa-5x"></i>
            </div>
            <h3>Đăng Ký Thành Công!</h3>
            <p class="mb-4">Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            <button type="button" class="btn btn-primary" id="resetForm">Đăng Ký Mới</button>
        </div>
    `;


                // Reset form button
                document.getElementById('resetForm').addEventListener('click', function () {
                    registerForm.innerHTML = formContent;
                    registerForm.reset();
                    formSteps.forEach((step, index) => {
                        if (index === 0) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                    stepIndicators.forEach((indicator, index) => {
                        if (index === 0) {
                            indicator.classList.add('active');
                        } else {
                            indicator.classList.remove('active', 'completed');
                        }
                    });
                });
            }
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const originalFormHTML = contactForm.innerHTML;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const requiredInputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // 🌟 Lấy dữ liệu
                const contactData = {
                    name: document.getElementById('contactName').value.trim(),
                    email: document.getElementById('contactEmail').value.trim(),
                    subject: document.getElementById('contactSubject').value.trim(),
                    message: document.getElementById('contactMessage').value.trim()
                };

                // (Tuỳ chọn) Lưu vào localStorage:
                const existing = JSON.parse(localStorage.getItem('contactMessages')) || [];
                existing.push(contactData);
                localStorage.setItem('contactMessages', JSON.stringify(existing));

                 this.submit();

                // 🌟 Giao diện thông báo gửi thành công
                contactForm.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="fas fa-check-circle text-success fa-5x"></i>
                        </div>
                        <h3>Gửi Tin Nhắn Thành Công!</h3>
                        <p class="mb-4">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                        <button type="button" class="btn btn-primary" id="resetContactForm">Gửi Tin Nhắn Khác</button>
                    </div>
                `;

                // 🌟 Reset form khi bấm lại
                document.getElementById('resetContactForm').addEventListener('click', function () {
                    contactForm.innerHTML = originalFormHTML;
                    contactForm.reset();
                });
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Chat widget
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPopup = document.querySelector('.chat-popup');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-footer input');
    const sendBtn = document.querySelector('.send-btn');
    const chatBody = document.querySelector('.chat-body');

    if (chatToggle && chatPopup) {
        chatToggle.addEventListener('click', function () {
            chatPopup.classList.toggle('active');
        });

        if (chatClose) {
            chatClose.addEventListener('click', function () {
                chatPopup.classList.remove('active');
            });
        }

        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    function sendMessage() {
        if (chatInput.value.trim() !== '') {
            const message = chatInput.value;

            // Add user message
            const userMessage = `
                <div class="chat-message user">
                    <div class="message">
                        <p>${message}</p>
                        <span class="time">Bây giờ</span>
                    </div>
                    <div class="avatar">
                        <img src="images/user2.png" alt="User">
                    </div>
                </div>
            `;

            chatBody.insertAdjacentHTML('beforeend', userMessage);
            chatInput.value = '';

            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simulate bot response after 1 second
            setTimeout(function () {
                const botMessage = `
                    <div class="chat-message bot">
                        <div class="avatar">
                            <img src="images/bot.png" alt="Bot">
                        </div>
                        <div class="message">
                            <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!</p>
                            <span class="time">Bây giờ</span>
                        </div>
                    </div>
                `;

                chatBody.insertAdjacentHTML('beforeend', botMessage);

                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }

    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem();
})();


