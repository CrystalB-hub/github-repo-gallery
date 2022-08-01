//Target profile info
const profile = document.querySelector (".overview");
const username = "CrystalB-hub";
const repoList = document.querySelector (".repo-list");
const repos = document.querySelector (".repos");
const repoData = document.querySelector (".repo-data");

const gitHub = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`);
    const user = await res.json();
    //console.log(user);
    displayUserInfo(user);
};

gitHub();


const displayUserInfo = function (user) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Bio:</strong> ${user.bio}</p>
      <p><strong>Location:</strong> ${user.location}</p>
      <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div> 
   `;
    profile.append(div);
    fetchRepos();
};

const fetchRepos = async function () {
    const getRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData= await getRepos.json();
    //console.log(repos);
    displayRepoInfo(repoData);
};


//fetchRepos();
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const item = document.createElement ("li");
        item.classList.add("repo");
        item.innerHTML = `
        <h3>${repo.name}</h3>
        `;
        repoList.append(item);   
} 
};

//Click event for repo info
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepoData(repoName);
    }
});

//Fetch specific repo info
const specificRepoData = async function (repoName) {
    const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo= await res.json();
    console.log(repoInfo);
    //get languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //add to languages array
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    }

    showRepoInfo(repoInfo, languages);
};

//Display repo info function
const showRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    const div = document.createElement ("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
};


