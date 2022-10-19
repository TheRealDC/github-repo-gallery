//select div overview this is where my profile info will appear
const overview = document.querySelector(".overview");
//my github user name
const username = "TheRealDC";

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
};