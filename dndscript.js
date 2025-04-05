document.getElementById('character-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form
    const name = document.getElementById('character-name').value;
    const charClass = document.getElementById('character-class').value;
    const charRace = document.getElementById('character-race').value;
    const background = document.getElementById('character-background').value;

    // Display character info
    document.getElementById('display-name').textContent = `Name: ${name}`;
    document.getElementById('display-class').textContent = `Class: ${charClass}`;
    document.getElementById('display-race').textContent = `Race: ${charRace}`;
    document.getElementById('display-background').textContent = `Background: ${background}`;
});
