// const repositories = require('./Data/Repositories.json')
const repositories = require('./Data/test.json')
const { getAllIssues, createUpdateIssues, createUpdatePull } = require('./utils.js');

(async () => {
  repositories.map(async (repo) => {
    const issues = await getAllIssues(repo.owner.login, repo.name);
    issues.map(async (issue) => {
      if (Object.keys(issue.pull_request).length === 0)
        await createUpdateIssues(issue, repo.name)
    })
  });
})();