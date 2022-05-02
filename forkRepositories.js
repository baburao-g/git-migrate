// const repositories = require('./Data/Repositories.json')
const repositories = require('./Data/test.json')
const { forkRepository } = require('./utils.js');

(async () => {
  repositories.map(async (repo) => await forkRepository(repo.owner.login, repo.name));
})();