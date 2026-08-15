document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("show");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                navMenu.classList.contains("show")
            ) {

                navMenu.classList.remove("show");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        window.addEventListener("resize", () => {

            if (window.innerWidth > 700) {

                navMenu.classList.remove("show");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");


    function setTheme(theme) {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "conference-theme",
            theme
        );


        if (themeIcon) {

            if (theme === "dark") {

                themeIcon.textContent = "☀";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            } else {

                themeIcon.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        }

    }


    function getInitialTheme() {

        const savedTheme =
            localStorage.getItem(
                "conference-theme"
            );


        if (savedTheme) {
            return savedTheme;
        }


        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        return prefersDark
            ? "dark"
            : "light";

    }


    /* Apply theme immediately */

    setTheme(getInitialTheme());


    /* Toggle theme */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    document.documentElement
                        .getAttribute("data-theme");

                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";

                setTheme(newTheme);

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;


            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

});