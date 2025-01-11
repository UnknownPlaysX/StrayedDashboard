#!/usr/bin/env node
import chalk from 'chalk';
import { exec } from 'child_process';
import { program } from 'commander';

function runCommand(command, successMessage) {
  console.log(chalk.blue(`Running: ${command}`));
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      return;
    }
    if (stderr) {
      console.error(chalk.yellow(`Warning: ${stderr}`));
    }
    if (stdout) {
      console.log(chalk.green(stdout));
    }
    if (successMessage) {
      console.log(chalk.green(successMessage));
    }
  });
}

program
  .command('commit')
  .description('Commit changes to the site repository')
  .option('-m, --message <message>', 'Commit message')
  .action((options) => {
    const commitMessage = options.message || 'Updated site';
    runCommand('git add .', 'Added all changes.');
    runCommand(`git commit -m "${commitMessage}"`, `Committed with message: "${commitMessage}"`);
    runCommand('git push', 'Changes pushed to the repository.');
  });

program
  .command('status')
  .description('Show the current git status')
  .action(() => {
    runCommand('git status');
  });

program.parse(process.argv);
