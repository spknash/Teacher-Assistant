// allows the user to see all of their repos
function viewRepos() {
    // const li = document.createElement("li");
    // const 
}

// Prompts the user to create a new repo
function createNewRepo() {
    const h1 = document.createElement("h1");
    const div = document.createElement("div");
    const repoNameLabel = document.createElement("label");
    const repoNameInput = document.createElement("input");
    const repoDescriptionLabel = document.createElement("label");
    const repoDescriptionInput = document.createElement("input");
    h1.append(div);
    repoNameLabel.append(div);
    repoDescriptionLabel.append(div);
    repoNameInput.append(div);
    repoDescriptionInput.append(div);

    let repoName = repoNameInput.value;
    let repoDesc = repoDescriptionInput.value;



}

// Prompts the user to remove a repo
function deleteRepo() {

}

// checks if the unordered list is empty 
function isEmpty(id) {
    return document.getElementById(id).innerHTML.trim() == ""
}
if (isEmpty("myUL")) {
    document.getElementById('no-repos').innerHTML = "You currently have no repositories";
}
