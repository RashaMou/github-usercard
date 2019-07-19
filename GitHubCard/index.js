/* Step 1: using axios, send a GET request to the following URL 
(replacing the palceholder with your Github name):
https://api.github.com/users/<your name>
*/

const rashaGitHub = axios.get('https://api.github.com/users/RashaMou')
    .then((data) => {
      new GithubCard(data.data)
    })
    .catch((err) => {
      console.log('error: ', err);
    });

/* Step 2: Inspect and study the data coming back, this is YOUR 
github info! You will need to understand the structure of this 
data in order to use it to build your component function 

Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
follow this link in your browser https://api.github.com/users/<Your github name>/followers, manually find some other users' github handles, or use the list found at the bottom of the page. Get at least 5 different Github usernames and add them as Individual strings to the friendsArray below.
Using that array, iterate over it, requesting data for each user, creating a new card for each user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

// const followersArray = ['https://api.github.com/users/tetondan', 'https://api.github.com/users/dustinmyers', 'https://api.github.com/users/justsml', 'https://api.github.com/users/luishrd', 'https://api.github.com/users/bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// write a class that creates github user cards
// we are passing the data from the API into the constructor

class GithubCard {
  constructor(githubData) { //rashaGithub
    this.githubData = githubData;
    console.log('githubdata object', githubData);
    const cardWrapper = document.querySelector('.cards');
    this.card = document.createElement('div');
    this.card.classList.add('card');
    cardWrapper.appendChild(this.card);
    this.createCard();
  }
  createCard() {
    this.profilePic = document.createElement('img');
    this.cardInfo = document.createElement('div');
    this.name = document.createElement('h3');
    this.username = document.createElement('p');
    this.location = document.createElement('p');
    this.profile = document.createElement('p');
    this.profileURL = document.createElement('a');
    this.followers = document.createElement('p');
    this.following = document.createElement('p');
    this.bio = document.createElement('p');

    this.profilePic.src = this.githubData.avatar_url;
    // console.log(this.githubData.avatar_url)
    this.cardInfo.classList.add('card-info');
    this.name.classList.add('name');
    this.name.textContent = this.githubData.name;
    this.username.classList.add('username');
    this.username.textContent = this.githubData.login;
    this.location.textContent = `Location: ${this.githubData.location}`;
    this.profileURL.href = this.githubData.html_url;
    this.profileURL.innerHTML = this.profileURL.href;
    this.profile.textContent = 'Profile: ';
    this.followers.textContent = `Followers: ${this.githubData.followers}`;
    this.following.textContent = `Following: ${this.githubData.following}`;
    this.bio.textContent = `Bio: ${this.githubData.bio}`;
    this.card.appendChild(this.profilePic);
    this.card.appendChild(this.cardInfo);
    this.cardInfo.appendChild(this.name);
    this.cardInfo.appendChild(this.username);
    this.cardInfo.appendChild(this.location);
    this.cardInfo.appendChild(this.profile);
    this.profile.appendChild(this.profileURL);
    this.cardInfo.appendChild(this.followers);
    this.cardInfo.appendChild(this.following);
    this.cardInfo.appendChild(this.bio);
  }
}

followersArray.forEach(follower => axios.get(`https://api.github.com/users/${follower}`)
.then((data) => {
  new GithubCard(data.data)
})
.catch((err) => {
  console.log('error: ', err);
}));