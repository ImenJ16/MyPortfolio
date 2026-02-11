// bot-names.js
const APPROVED_BOT_NAMES = [
    "Genie in a widget",
    "3ezzdine",
    "Nef3a Batti5",
    "Portfolio HR Department",
    "The IT person"
];

// Function to get a random name
function getRandomBotName() {
    return APPROVED_BOT_NAMES[Math.floor(Math.random() * APPROVED_BOT_NAMES.length)];
}

// Function to get all names for display
function getAllBotNames() {
    return APPROVED_BOT_NAMES;
}