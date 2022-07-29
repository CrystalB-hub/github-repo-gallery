//Target profile info
const profile = document.querySelector (".overview");
const username = "CrystalB-hub";
const repoList = document.querySelector (".repo-list");

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