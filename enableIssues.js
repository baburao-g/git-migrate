// const repositories = require('./Data/Repositories.json')
const repositories = require('./Data/test.json')
const { enableIssues } = require('./utils.js');

(async () => {
  repositories.map(async (repo) => await enableIssues(process.env.SELF, repo.name));
})();