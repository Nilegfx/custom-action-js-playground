const core = require('@actions/core');
const github = require('@actions/github');

const getMessage = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ message: core.getInput('greeting-message') });
    }, time);
  });
};

const run = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    const { message } = await getMessage(10000);
    console.log(`${message} ${nameToGreet}!`);
    const time = new Date().toTimeString();
    core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
