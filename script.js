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