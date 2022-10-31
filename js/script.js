//select div overview this is where my profile info will appear
const overview = document.querySelector(".overview");
//my github user name
const username = "TheRealDC";
//repo list
const repoList = document.querySelector(".repo-list");
const repoClass = document.querySelector(".repos");
const repoDataClass = document.querySelector(".repo-data");
const viewRepos = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//this fetches the user profile from github
const gitHubProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    console.log(profile);
    displayUserInfo(profile);
};
gitHubProfile();

//this pulls the selected user data from github profile
const displayUserInfo = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
        <img alt="user avatar" src=${profile.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
      </div>`;
    overview.append(div);
    repositories();
};
//this fetches the repositories from github
const repositories = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const myRepos = await res.json();
    //console.log(myRepos);
    displayReposInfo(myRepos);
};
//repositories();
//this displays a list of repositories
const displayReposInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; 
        repoList.append(repoItem);
    }
};

//this allows visitor to click on title of repo
repoList.addEventListener("click" , function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepoInfo(repoName);
    }
});

//this fetches and displays all of the repos i've uploaded to github
const getRepoInfo = async function (repoName) {
    let repoTitle = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await repoTitle.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(fetchLanguages);
    const languages = [];
    for (language in languageData) {
        languages.push(language);
    //console.log(languages);
    }
    displaySpecificRepos(repoInfo, languages);
};

//this will display specific information when the repo title is clicked
const displaySpecificRepos = function (repoInfo, languages) {
    viewRepos.classList.remove("hide");
    repoDataClass.innerHTML = "";
    repoDataClass.classList.remove("hide");
    repoClass.classList.add("hide");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataClass.append(newDiv);
};

//this displays the back to repo gallery button then removes it when clicked
viewRepos.addEventListener("click" , function () {
    repoClass.classList.remove("hide");
    repoDataClass.classList.add("hide");
    viewRepos.classList.add("hide");
});

filterInput.addEventListener("input" , function (e) {
     const searchText = e.target.value;
     //console.log(searchText);
     const repos = document.querySelectorAll(".repo");
     const lowerSearchText = searchText.toLowerCase();

     for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
     }
});