<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<h1 id="gitsetgo-travis-documented-with-emdaer">gitsetgo · <a href="https://travis-ci.org/chasingmaxwell/gitsetgo"><img src="https://img.shields.io/travis/chasingmaxwell/gitsetgo.svg?branch=master?style=plastic" alt="Travis"></a> <a href="https://github.com/emdaer/emdaer"><img src="https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square" alt="Documented with emdaer"></a></h1>
<p>Deploy all the repositories at once.</p>
<h2 id="installation">Installation</h2>
<p><code>yarn add gitsetgo</code></p>
<p> OR</p>
<p><code>npm i --save gitsetgo</code></p>
<h2 id="usage">Usage</h2>
<ol>
<li><p>Configure deployments. gitsetgo uses the <a href="https://www.npmjs.com/package/config">config</a> module to determine deployment configuration. All you need to do is make sure you have a <code>./config</code> directory at the root of your project which contains a <code>default.yml</code> file that looks something like this:</p>

```yaml
gitsetgo:
  deployments:
    - name: deployment-name # This is the name you'll enter on the cli.
      source: # Deploy from this configuration.
        remote: git@github.com:chasingmaxwell/gitsetgo.git
        branch: sourceBranch
      destination: # Deploy to this configuration.
        remote: git@github.com:chasingmaxwell/gitsetgo.get
        branch: destinationBranch
      # ... more deployment configurations can go here.
```
</li>
<li><p>Run <code>gitsetgo &lt;deployment ...&gt;</code>.</p>
</li>
</ol>
<h2 id="contributors">Contributors</h2>
<details>
<summary><strong>Contributors</strong></summary><br>
<a title="Senior Engineer at @fourkitchens." href="https://github.com/chasingmaxwell">
  <img align="left" src="https://avatars0.githubusercontent.com/u/3128659?s=24">
</a>
<strong>Peter Sieg</strong>
<br><br>
</details>

<h2 id="license">License</h2>
<p>gitsetgo is <a href="./LICENSE">MIT licensed</a>.</p>
