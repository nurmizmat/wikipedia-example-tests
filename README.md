# wikipedia-example-tests

This repository showcases example tests for Wikipedia using the Cypress testing framework.

## Cloning the repository

To get started, first clone the repository to your local machine:

```
git clone https://github.com/nurmizmat/wikipedia-example-tests.git
```

## Installing dependencies

Once you've cloned the repository, navigate to the cloned directory and install the required dependencies:

```
cd wikipedia-example-tests
npm install
```

## Running scripts

This repository provides the following scripts to help you run the tests:

- `cy:open` - Use this script to launch the Cypress Test Runner. It provides an interactive UI which is helpful for debugging and viewing test execution:

```
npm run cy:open
```

- `cy:run` - This script runs the Cypress tests in a headless mode, which is ideal for continuous integration or when you don't need the interactive UI:


```
npm run cy:run
```

## Additional information

1) Integration with faker.js.  
My tests make use of the faker.js library, which helps in generating massive amounts of realistic fake data. This ensures our tests have variability and mimic real-world use cases, enhancing the robustness of our test cases.

2) Using dotenv for Environment Variables.  
I utilize the dotenv package to manage environment variables. Locally, these variables are read from the .env file. When our tests run on GitHub CI, these values are pulled from GitHub's secret environment variables. This practice ensures the security of sensitive information while providing flexibility in different environments.

3) External API for Text Extraction from Images.  
To simulate the account creation process on Wikipedia, I occasionally encounter captchas. To automate this part, I employ an external API that extracts text from images. This helps in automating the process of reading and inputting captcha values during our test runs.

It's essential to be cautious when working with captchas in an automated testing environment. Wikipedia and other platforms use captchas to prevent bot activity, so excessive use of this approach might lead to IP bans or other restrictive actions. Always ensure that you're respectful of platform limits and terms of service.

## GitHub CI Configuration

My testing framework is integrated with GitHub's Continuous Integration (CI) service to run tests automatically based on specific triggers.

Scheduled Runs: Our tests are scheduled to run daily at 8:00 AM UTC. This ensures that our application remains in a healthy state and any overnight changes don't introduce regressions.

Manual Dispatch: The workflow_dispatch event allows for manual triggering of the workflow directly from GitHub's interface, providing flexibility to run tests outside the regular schedule.

Sensitive information like API keys are stored securely using GitHub Secrets and are not exposed in the code or logs. This ensures that our sensitive credentials remain confidential and are not accidentally disclosed.