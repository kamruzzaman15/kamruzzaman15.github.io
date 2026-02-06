// Minimal JS: tab switching, publication search, theme toggle, timestamps.

(function () {
  const root = document.documentElement;

  // Theme toggle (default light; dark optional)
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // Tabs
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  function setActive(tabName) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
    panels.forEach(p => p.classList.toggle("active", p.dataset.panel === tabName));
    // Update hash for shareable URLs
    history.replaceState(null, "", "#" + tabName);
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => setActive(btn.dataset.tab));
  });

  // Allow sidebar jump links to switch tabs
  const jumps = Array.from(document.querySelectorAll(".js-jump"));
  jumps.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.dataset.target;
      if (target) setActive(target);
      document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Initialize tab from URL hash if available
  const hash = (location.hash || "").replace("#", "").trim();
  if (hash && tabs.some(t => t.dataset.tab === hash)) setActive(hash);

  // Publications search
  const pubSearch = document.getElementById("pubSearch");
  const pubs = Array.from(document.querySelectorAll("#pubList .pub"));

  pubSearch?.addEventListener("input", (e) => {
    const q = (e.target.value || "").toLowerCase().trim();
    pubs.forEach(pub => {
      const text = pub.innerText.toLowerCase();
      const tags = (pub.getAttribute("data-tags") || "").toLowerCase();
      pub.style.display = (text.includes(q) || tags.includes(q)) ? "" : "none";
    });
  });

  // Footer year + last updated
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const last = document.getElementById("lastUpdated");
  if (last) last.textContent = new Date().toLocaleDateString();
})();
