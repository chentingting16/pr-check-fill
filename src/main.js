const core = require('@actions/core');
const github = require('@actions/github');

// ************************************************
const context = github.context;

const { createComment } = require('./util');

// ************************************************
async function run() {
  try {
    const owner = context.repo.owner;
    const repo = context.repo.repo;

    const FIXCOMMENT = `<!-- Created by actions-cool/pr-check-fill. Do not remove. -->`;

    if (context.eventName.includes('issues')) {
      const commentBody = core.getInput('comment-body');
      await createComment(owner, repo, 1, commentBody, FIXCOMMENT);
    } else {
      core.setFailed(`This Action only support issues!`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
