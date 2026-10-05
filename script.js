let wybranyKolor = "#000000";
let trybGumki = false;

const picker = document.querySelector("#picker");
const eraserBtn = document.querySelector("#eraser");

picker.addEventListener("input", () => {
    wybranyKolor = picker.value;
    trybGumki = false;
    eraserBtn.classList.remove("active");
});

eraserBtn.addEventListener("click", () => {
    trybGumki = !trybGumki;

    eraserBtn.classList.toggle("active", trybGumki);
});

document.querySelectorAll(".kraj").forEach(element => {

    element.addEventListener("click", () => {

        let kodKraju = "";

        element.classList.forEach(klasa => {
            if (klasa !== "kraj") kodKraju = klasa;
        });

        document.querySelectorAll("." + kodKraju).forEach(czesc => {

            if (trybGumki) {
                czesc.style.fill = "gray"; // albo "" jeśli chcesz reset SVG
            } else {
                czesc.style.fill = wybranyKolor;
            }

        });

    });

});

// Obsługa przesuwania (drag & drop) oraz zmiany koloru tekstu
document.querySelectorAll(".tekst-blok").forEach(blok => {
    const naglowek = blok.querySelector(".blok-naglowek");
    const colorInput = blok.querySelector(".blok-kolor");
    const textarea = blok.querySelector(".blok-tresc");

    // Zmiana koloru tekstu
    colorInput.addEventListener("input", () => {
        textarea.style.color = colorInput.value;
    });

    // Przeciąganie okienka
    let czyPrzesuwa = false;
    let przesuniecieX = 0;
    let przesuniecieY = 0;

    naglowek.addEventListener("mousedown", (e) => {
        // Ignorujemy kliknięcie w sam próbnik koloru
        if (e.target === colorInput) return;

        czyPrzesuwa = true;
        
        // Obliczamy odległość kursora od lewego górnego rogu bloku
        const rect = blok.getBoundingClientRect();
        przesuniecieX = e.clientX - rect.left;
        przesuniecieY = e.clientY - rect.top;

        // Przenosimy przesuwany blok na wierzch
        document.querySelectorAll(".tekst-blok").forEach(b => b.style.zIndex = "50");
        blok.style.zIndex = "60";
    });

    document.addEventListener("mousemove", (e) => {
        if (!czyPrzesuwa) return;

        // Nowe współrzędne w pikselach
        const nowyX = e.clientX - przesuniecieX;
        const nowyY = e.clientY - przesuniecieY;

        blok.style.left = `${nowyX}px`;
        blok.style.top = `${nowyY}px`;
    });

    document.addEventListener("mouseup", () => {
        czyPrzesuwa = false;
    });
});
const toggleTeamsBtn = document.querySelector("#toggle-teams-btn");
const blokiDruzyn = document.querySelectorAll(".tekst-blok");

let czyDruzynyWidoczne = false;

toggleTeamsBtn.addEventListener("click", () => {
    czyDruzynyWidoczne = !czyDruzynyWidoczne;

    // Przełączamy klasę .pokaz na obu blokach
    blokiDruzyn.forEach(blok => {
        blok.classList.toggle("pokaz", czyDruzynyWidoczne);
    });

    // Wizualne podświetlenie przycisku i zmiana tekstu (opcjonalnie)
    toggleTeamsBtn.classList.toggle("active", czyDruzynyWidoczne);
});

document.querySelectorAll(".tekst-blok").forEach(blok => {
    const uchwyt = blok.querySelector(".uchwyt-rozmiaru");

    let czySkaluje = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    function zacznijSkalowanie(e) {
        czySkaluje = true;
        const punkt = e.touches ? e.touches[0] : e;
        startX = punkt.clientX;
        startY = punkt.clientY;

        const rect = blok.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;

        e.stopPropagation(); // Żeby nie aktywowało przesuwania
    }

    function skaluj(e) {
        if (!czySkaluje) return;

        const punkt = e.touches ? e.touches[0] : e;
        const roznicaX = punkt.clientX - startX;
        const roznicaY = punkt.clientY - startY;

        // Minimalne wymiary okienka
        const nowaSzerokosc = Math.max(140, startWidth + roznicaX);
        const nowaWysokosc = Math.max(80, startHeight + roznicaY);

        blok.style.width = `${nowaSzerokosc}px`;
        blok.style.height = `${nowaWysokosc}px`;
    }

    function zakonczSkalowanie() {
        czySkaluje = false;
    }

    // Obsługa myszki
    uchwyt.addEventListener("mousedown", zacznijSkalowanie);
    document.addEventListener("mousemove", skaluj);
    document.addEventListener("mouseup", zakonczSkalowanie);

    // Obsługa dotyku na smartfonach
    uchwyt.addEventListener("touchstart", zacznijSkalowanie, { passive: false });
    document.addEventListener("touchmove", skaluj, { passive: false });
    document.addEventListener("touchend", zakonczSkalowanie);
});
