const { Octokit } = require('octokit');
const repositories = require('./Data/Repositories.json')

require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const self = process.env.SELF;

const forkRepository = async (owner, repo) => {
  const fork = await octokit.request('POST /repos/{owner}/{repo}/forks', {
    owner,
    repo,
  })
  if (fork.status === 202)
    console.log('Forked: ', repo)
  else
    console.log('Fork Errored: ', repo)
};


const enableIssues = async (repo) => {
  await octokit.request('PATCH /repos/{owner}/{repo}', {
    owner: self,
    repo,
    has_issues: true,
  })
  console.log('Issues Enabled for:', repo);
}

const getAllIssues = async (owner, repo) => {
  let allIssues = [];
  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: owner,
    repo: repo,
    per_page: 200,
    state: 'all',
    sort: 'created',
    direction: 'asc',
    page: 1,
  });

  // iterate through each response
  for await (const { data: issues } of iterator) {
    allIssues = [...allIssues, ...issues]
  }
  return allIssues;
}

const createUpdateIssues = async (issue, repo) => {
  const created = await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: self,
    repo,
    title: issue.title,
    body: issue.body,
    // assignees: issue.assignees,
    milestone: issue.milestone,
    labels: issue.label
  });
  console.log('created issue titled: ', issue.title);
  if (created.status === 201) {
    const updated = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: self,
      repo: repo,
      issue_number: created.data.number,
      state: issue.state,
    })
  }
};

const getAllPulls = async (owner, repo) => {
  let allIssues = [];
  const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
    owner: owner,
    repo: repo,
    per_page: 200,
    state: 'all',
    sort: 'created',
    direction: 'asc',
    page: 1,
  });
  
  // iterate through each response
  for await (const { data: issues } of iterator) {
    allIssues = [...allIssues, ...issues]
  }
  return allIssues;
}

const createUpdatePull = async (issue, repo) => {
  const created = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner: self,
    repo,
    title: issue.title,
    body: issue.body,
    // assignees: issue.assignees,
    milestone: issue.milestone,
    labels: issue.label
  });
  console.log('created issue titled: ', issue.title);
  if (created.status === 201) {
    const updated = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: self,
      repo: repo,
      issue_number: created.data.number,
      state: issue.state,
    })
  }
};

module.exports = {
  forkRepository,
  enableIssues,
  getAllIssues,
  createUpdateIssues,
  getAllPulls,
  createUpdatePull,
}