# :checkered_flag: <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
--> · <!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'Travis'
        image: 'travis/chasingmaxwell/gitsetgo.svg?branch=master'
        link: 'https://travis-ci.org/chasingmaxwell/gitsetgo'
      - alt: 'Documented with emdaer'
        image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
        link: 'https://github.com/emdaer/emdaer'
        style: 'flat-square'
      -->

<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: description
-->

## Why?

Let's say you have an ecosystem of applications and services, each with its own git repository. Let's also say you use a CI service like [Travis](https://travis-ci.org/) to manage the deployment for each application upon a push to an environment git branch. Manually pushing all the repositories to the appropriate environment remote/branch from the appropriate source remote/branch could be time consuming and error prone. With gitsetgo you use configuration to define repeatable deployment procedures which you can invoke with a single command. You could, for instance, deploy all of your repositories from their QA environment to a staging environment, or to a separate environment for load testing, or perform both procedures at the same time!

## How?

gitsetgo uses the [config](https://www.npmjs.com/package/config) module to determine deployment configuration. In your project's configuration you can define any number of "deployments" each with its own set of repositories. Each repository defines its source and destination remotes and branches. When gitsetgo is invoked with a valid deployment (example: `gitsetgo stage-to-prod`), it will iterate over each repository, cloning from the source remote at the specified branch and force-pushing to the destination remote at the specified branch.

## Installation

### Global

`yarn global add gitsetgo`

 OR

`npm i -g --save gitsetgo`

### Per-Project

`yarn add gitsetgo`

 OR

`npm i --save gitsetgo`

## Usage

1. Configure deployments. Make sure you have a `./config` directory at the root of your project which contains a `default.yml` file that looks something like this:

   ```yaml
   gitsetgo:
     deployments:
       - name: deployment-name # This is the name you'll enter on the cli.
         someRepository:
           source: # Deploy from this configuration.
             remote: git@github.com:chasingmaxwell/example.git
             branch: sourceBranch
           destination: # Deploy to this configuration.
             remote: git@github.com:chasingmaxwell/example.git
             branch: destinationBranch
         someOtherRepository:
           source: # Deploy from this configuration.
             remote: git@github.com:chasingmaxwell/anotherExample.git
             branch: sourceBranch
           destination: # Deploy to this configuration.
             remote: git@github.com:chasingmaxwell/anotherExample.git
             branch: destinationBranch
         # ... more repositories can go here.
       # ... more deployment configurations can go here.
   ```

2. Ensure you have access to the remotes in your configuration from the environment in which you run the command. gitsetgo just spawns git commands under the hood so if you can't clone/push from the command line, neither can gitsetgo.

3. Run gitsetgo from the root of your project.

   If you installed globally:

   ```sh
   gitsetgo <deployment ...>
   ```

   If you installed per-project:

   ```sh
   npx gitsetgo <deployment ...>
   ```

## Contributors

<!--emdaer-p
  - '@emdaer/plugin-contributors-details-github'
-->

## License

<!--emdaer-p
  - '@emdaer/plugin-license-reference'
-->
