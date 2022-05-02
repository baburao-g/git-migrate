// const repositories = require('./Data/Repositories.json')
const repositories = require('./Data/test.json')
const { getAllPulls, createUpdatePull } = require('./utils.js');

(async () => {
  repositories.map(async (repo) => {
    const pulls = await getAllPulls(repo.owner.login, repo.name);
    console.log('--getAllPulls', JSON.stringify(pulls, '', '\t'));
    // pulls.map(async (issue) => {
    //   await createUpdatePull(issue, repo.name)
    // })
  });
})();