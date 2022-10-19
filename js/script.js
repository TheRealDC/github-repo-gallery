//select div overview this is where my profile info will appear
const overview = document.querySelector(".overview");
//my github user name
const username = "TheRealDC";
//repo list
const repoList = document.querySelector(".repo-list");

const gitHubProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    //console.log(profile);
    displayUserInfo(profile);
};
gitHubProfile();

const displayUserInfo = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
        <img alt="user avatar" src=${profile.user_avatar} />
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

const repositories = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const myRepos = await res.json();
    //console.log(myRepos);
    displayReposInfo(myRepos);
};
//repositories();

const displayReposInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; 
        repoList.append(repoItem);
    }
};