document.addEventListener("DOMContentLoaded", function() {
    const year = new Date().getFullYear();
    const copyrightElement = document.getElementById("copyright-year");
    if (copyrightElement) {
        copyrightElement.textContent = year;
    }
});
