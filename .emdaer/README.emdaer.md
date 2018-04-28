# <!--emdaer-p
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

## Global Installation

`yarn global add gitsetgo`

 OR

`npm i -g --save gitsetgo`

## Per-Project Installation

`yarn add gitsetgo`

 OR

`npm i --save gitsetgo`

## Usage

1. Configure deployments. gitsetgo uses the [config](https://www.npmjs.com/package/config) module to determine deployment configuration. All you need to do is make sure you have a `./config` directory at the root of your project which contains a `default.yml` file that looks something like this:

   ```yaml
   gitsetgo:
     deployments:
       - name: deployment-name # This is the name you'll enter on the cli.
         source: # Deploy from this configuration.
           remote: git@github.com:chasingmaxwell/gitsetgo.git
           branch: sourceBranch
         destination: # Deploy to this configuration.
           remote: git@github.com:chasingmaxwell/gitsetgo.git
           branch: destinationBranch
         # ... more deployment configurations can go here.
   ```

2. Run gitsetgo from the root of your project.

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
