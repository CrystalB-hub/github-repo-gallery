//Target profile info
const profile = document.querySelector (".overview");
const username = "CrystalB-hub";

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
};