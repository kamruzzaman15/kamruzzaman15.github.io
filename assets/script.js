// Theme toggle (dark/light) + publication search + footer year

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");

  if (saved) root.setAttribute("data-theme", saved);

  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "" : "light";
    if (next) {
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    } else {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
  });

  // Publications search
  const input = document.getElementById("pubSearch");
  const items = Array.from(document.querySelectorAll("#pubList .pub"));

  input?.addEventListener("input", (e) => {
    const q = (e.target.value || "").toLowerCase().trim();
    items.forEach((el) => {
      const text = el.innerText.toLowerCase();
      const tags = (el.getAttribute("data-tags") || "").toLowerCase();
      el.style.display = (text.includes(q) || tags.includes(q)) ? "" : "none";
    });
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
