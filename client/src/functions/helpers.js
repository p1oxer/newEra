export const handleNavClick = (event) => {
    if (event.target.closest(".button-intro__link")) {
        return;
    } else {
        event.preventDefault();
        const target = event.target;
        const href =
            target.getAttribute("href") || target.closest("a")?.getAttribute("href");

        if (href) {
            const id = href.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }
};
