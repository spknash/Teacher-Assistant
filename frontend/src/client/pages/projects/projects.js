// allows the user to see all of their repos
// function viewRepos() {
    
// }

// Prompts the user to create a new repo
function createNewRepo() {
    const h1 = document.createElement("h1");
    h1.innerHTML = "Create a New Repository";
    h1.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';

    const outerDiv = document.createElement("div");
    outerDiv.style.textAlign = "center";

    const div = document.createElement("div");
    div.style.textAlign = "center";

    const ownerLabel = document.createElement("label");
    ownerLabel.innerHTML = "Owner Name";
    ownerLabel.style.fontSize = "25px";
    ownerLabel.style.left = "0";
    ownerLabel.style.width = "200px";
    ownerLabel.style.textAlign = "right";

    const ownerInput = document.createElement("input");
    ownerInput.setAttribute("type", "text");
    ownerInput.style.fontSize = "22px";

    const repoNameLabel = document.createElement("label");
    repoNameLabel.innerHTML = "Repository Name";
    repoNameLabel.style.fontSize = "25px";
    repoNameLabel.style.left = "0";
    repoNameLabel.style.width = "200px";
    repoNameLabel.style.textAlign = "right";
    
    const repoNameInput = document.createElement("input");
    repoNameInput.setAttribute("type", "text");
    repoNameInput.style.fontSize = "22px";
    
    const repoDescriptionLabel = document.createElement("label");
    repoDescriptionLabel.innerHTML = "Repository Description";
    repoDescriptionLabel.style.fontSize = "25px";
    repoDescriptionLabel.style.width = "200px";
    repoDescriptionLabel.style.textAlign = "right";
    
    const repoDescriptionTextArea = document.createElement("textarea");
    repoDescriptionTextArea.setAttribute("type", "text");
    repoDescriptionTextArea.style.width = "500px";
    repoDescriptionTextArea.style.height = "200px";

    const form = document.createElement("form");
    
    const createButton = document.createElement("button");
    createButton.innerHTML = "Create repository";
    createButton.style.backgroundColor = "lightgreen";
    createButton.style.marginTop = "20px";
    createButton.style.cursor = "pointer";
    createButton.style.fontSize = "large";
    
    // Append elements to the div
    div.appendChild(h1);
    div.appendChild(ownerLabel);
    div.appendChild(ownerInput);
    div.appendChild(repoNameLabel);
    div.appendChild(repoNameInput);
    div.appendChild(repoDescriptionLabel);
    div.appendChild(repoDescriptionTextArea);
    div.appendChild(createButton);

    // Appends labels and inputs to the form
    form.appendChild(h1);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(ownerLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(ownerInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(repoNameLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(repoNameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(repoDescriptionLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(repoDescriptionTextArea);
    form.appendChild(document.createElement("br"));
    form.appendChild(createButton);
    form.appendChild(div);

    outerDiv.appendChild(form);
    
    // Append the div to an existing element with the id "myUL"
    document.body.innerHTML = '';
    document.body.appendChild(outerDiv);

    createButton.addEventListener("click", createNewRepoClicked);
    
    function createNewRepoClicked() {
        const li = document.createElement("li");
        let repoData = repoName + "\n" + repoDesc;
        li.append(repoData);
    }
}

function repoClicked() {
    const h1 = document.createElement("h1");
    h1.innerHTML = "Overview";
    const h2 = document.createElement("h2");
    h2.innerHTML = "Teammates";
    const repo = document.getElementById("repos")
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
