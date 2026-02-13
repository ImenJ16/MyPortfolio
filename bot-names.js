
// -*- coding: utf-8 -*-


// bot-names.js
const APPROVED_BOT_NAMES = [
    "Genie in a widget",
    "Light Yagami",
    "Nef3a Batti5",
    "Portfolio HR Department",
    "العملاق المهاجم",
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