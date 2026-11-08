/* ========================================================
   WELCOME TO MY PORTFOLIO - JAVASCRIPT LOGIC
   Author: Bùi Trần Nhật Anh (BH02569)
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Cập nhật năm tự động ở Footer
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Chế độ Giao diện Sáng / Tối (Dark / Light Theme Toggle)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");

    // Đọc theme đã lưu hoặc mặc định theo hệ thống
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.body.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        document.body.removeAttribute("data-theme");
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }

    themeToggleBtn.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
    });

    // 3. Menu Mobile Toggle
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        menuToggleBtn.innerHTML = isOpen 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Đóng menu khi bấm vào bất kỳ nav link nào
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                menuToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // 4. Hiệu ứng gõ chữ (Typing Effect)
    const typingElement = document.getElementById("typing-text");
    const roles = [
        "Web Developer",
        "Frontend Enthusiast",
        "IT Student @ FPT",
        "Creative Coder"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1800;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentDelay = 400;
        }

        setTimeout(typeEffect, currentDelay);
    }

    typeEffect();

    // 5. Active Nav Link khi cuộn trang (ScrollSpy)
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute("id");
            const targetLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                targetLink?.classList.add("active");
            } else {
                targetLink?.classList.remove("active");
            }
        });
    });

    // 6. Xử lý gửi Form Liên Hệ
    const contactForm = document.getElementById("contact-form");
    const formAlert = document.getElementById("form-alert");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();

            // Hiển thị thông báo gửi thành công
            formAlert.className = "form-alert success";
            formAlert.innerHTML = `
                <i class="fa-solid fa-circle-check"></i> Cảm ơn bạn <strong>${fullname}</strong>! Lời nhắn của bạn đã được gửi thành công. Mình sẽ phản hồi sớm nhất có thể.
            `;

            // Reset form
            contactForm.reset();

            // Tự ẩn thông báo sau 6 giây
            setTimeout(() => {
                formAlert.className = "form-alert";
                formAlert.innerHTML = "";
            }, 6000);
        });
    }
});
