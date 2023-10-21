// allows the user to see all of their repos
// function viewRepos() {
    
// }

// Prompts the user to create a new repo
function createNewRepo() {
    const h1 = document.createElement("h1");
    h1.innerHTML = "Create a New Repository";
    h1.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';

    const div = document.createElement("div");
    div.style.textAlign = "center";

    const repoNameLabel = document.createElement("label");
    repoNameLabel.innerHTML = "Repository Name";
    repoNameLabel.style.fontSize = "large";
    repoNameLabel.style.left = "0";
    repoNameLabel.style.width = "200px";
    repoNameLabel.style.textAlign = "right";
    
    const repoNameInput = document.createElement("input");
    repoNameInput.setAttribute("type", "text");
    
    const repoDescriptionLabel = document.createElement("label");
    repoDescriptionLabel.innerHTML = "Repository Description";
    repoDescriptionLabel.style.fontSize = "large";
    repoDescriptionLabel.style.width = "200px";
    repoDescriptionLabel.style.textAlign = "right";
    
    const repoDescriptionInput = document.createElement("input");
    repoDescriptionInput.setAttribute("type", "text");

    const form = document.createElement("form");
    
    const createButton = document.createElement("button");
    createButton.innerHTML = "Create repository";
    createButton.style.backgroundColor = "lightgreen";
    createButton.style.marginTop = "20px";
    createButton.style.cursor = "pointer";
    createButton.style.fontSize = "large";
    
    // Append elements to the div
    div.appendChild(h1);
    div.appendChild(repoNameLabel);
    div.appendChild(repoNameInput);
    div.appendChild(repoDescriptionLabel);
    div.appendChild(repoDescriptionInput);
    div.appendChild(createButton);

    // Appends labels and inputs to the form
    form.appendChild(h1);
    form.appendChild(repoNameLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(repoNameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(repoDescriptionLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(repoDescriptionInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(createButton);
    form.appendChild(div);
    
    // Append the div to an existing element with the id "myUL"
    document.body.innerHTML = '';
    document.body.appendChild(form);
}

// Prompts the user to remove a repo
// function deleteRepo() {

// }

// checks if the unordered list is empty 
function isEmpty(id) {
    return document.getElementById(id).innerHTML.trim() == ""
}
if (isEmpty("myUL")) {
    document.getElementById('no-repos').innerHTML = "You currently have no repositories";
}
