"use strict";

//ELEMENTS IN PAGE
//CSV file display
const csvDisplay = document.getElementById("csv-display");
const csvDownloadBtn = document.getElementById("csv-download");
const csvInstruction = document.getElementsByClassName("csv-display")[0];
//Software selection
const softwareSelection = document.getElementById("software");
//Forms
    //Scratch
const scratchForm = document.getElementById("scratch-form");
const scratchUsername = document.getElementById("username");
const scratchPassword = document.getElementById("password-scratch");
const scratchStudentAmount = document.getElementById("scratch-student-amount");
    //Story Jumper
const storyJumperForm = document.getElementById("story-jumper-form");
const storyJumperName = document.getElementById("name");
const storyJumperLastName = document.getElementById("last-name");
const storyJumperUsername = document.getElementById("username-story-jumper");
const storyJumperStudentAmount = document.getElementById("story-jumper-student-amount");

//CSV GENERATION
let csv = "";

const generateCSV = () => {
    const software = softwareSelection.value;
    csv = "";
    if (software === "scratch") {
        for (let i = 1; i <= scratchStudentAmount.value; i++) {
            csv += `${scratchUsername.value}${i},${scratchPassword.value}${i}\n`;
        }
    } else if (software === "story-jumper") {
        for (let i = 1; i <= storyJumperStudentAmount.value; i++) {
            csv += `${storyJumperName.value}${i},${storyJumperLastName.value}${i},${storyJumperUsername.value}${i}\n`;
        }
    }
    return csv;
};

//CSV DOWNLOAD
const downloadCSV = () => {
    if (csv.length === 0) return;
    const csvBlob = new Blob([csv], {type: "text/csv"});
    const csvUrl = URL.createObjectURL(csvBlob);
    const tempLink = document.createElement("a");
    tempLink.setAttribute("href", csvUrl);
    tempLink.setAttribute("download", "accounts.csv");
    tempLink.click();
};

//DATA VALIDATION
const validateForm = () => {
    const software = softwareSelection.value;
    if (software === "scratch") {
        if (scratchUsername.value === "" || scratchPassword.value === "" || scratchStudentAmount.value === "") {
            alert("Please fill all the fields");
            return false;
        }
    } else if (software === "story-jumper") {
        if (storyJumperName.value === "" || storyJumperLastName.value === "" || storyJumperUsername.value === "" || storyJumperStudentAmount.value === "") {
            alert("Please fill all the fields");
            return false;
        }
    }
    return true;
};

//EVENT LISTENERS
//Software selection
const softwareSelectionListener = () => {
    if (softwareSelection.value === "scratch") {
        storyJumperForm.style.display = "none";
        scratchForm.style.display = "flex";
    } else if (softwareSelection.value === "story-jumper") {
        scratchForm.style.display = "none";
        storyJumperForm.style.display = "flex";
    } else {
        scratchForm.style.display = "none";
        storyJumperForm.style.display = "none";
    }
};

//Submit form
const submitForm = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    csv = generateCSV();
    csvDisplay.style.display = "block";
    csvDisplay.style.whiteSpace = "pre";
    csvDownloadBtn.style.display = "block";
    csvInstruction.style.display = "block";
    csvDisplay.textContent = csv;
};

//SET UP
const main = () => {
    scratchForm.style.display = "none";
    storyJumperForm.style.display = "none";
    softwareSelection.value = "none";
    csvDisplay.style.display = "none";
    csvDownloadBtn.style.display = "none";
    csvInstruction.style.display = "none";

    softwareSelection.addEventListener("change", softwareSelectionListener);
    scratchForm.addEventListener("submit", submitForm);
    storyJumperForm.addEventListener("submit", submitForm);
    csvDownloadBtn.addEventListener("click", downloadCSV);
};

main();