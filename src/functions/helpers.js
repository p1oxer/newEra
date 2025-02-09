export const handleNavClick = (event) => {
    if (event.target.classList.contains("button-intro__link")) {
        window.location.href = event.target.getAttribute("href");
    } else {
        event.preventDefault();
        const target = event.target;
        if (target.getAttribute("href")) {
            const id = target.getAttribute("href").replace("#", "");
            const element = document.getElementById(id);
            element.scrollIntoView({
                behavior: "smooth",
            });
        }

        
    }
};
