[![CodeQL](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/github-code-scanning/codeql)
[![Node.js CI](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/node.js.yml/badge.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/node.js.yml)
[![njsscan sarif](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/njsscan.yml/badge.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/njsscan.yml)
[![Snyk Security-Monitored](https://img.shields.io/badge/Snyk%20Security-Monitored-purple)](https://app.snyk.io/share/784f6fef-6aaf-47ed-81ba-99e05b854665)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/10677/badge)](https://www.bestpractices.dev/projects/10677)
[![Scorecard supply-chain security](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/scorecard.yml/badge.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/scorecard.yml)
[![Microsoft Defender For Devops](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/defender-for-devops.yml/badge.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/actions/workflows/defender-for-devops.yml)
[![Coverage Status](https://coveralls.io/repos/github/butlergroup/env_encryption_tool_nodejs/badge.svg?branch=main)](https://coveralls.io/github/butlergroup/env_encryption_tool_nodejs?branch=main)
[![Feature Requests](https://img.shields.io/github/issues/butlergroup/env_encryption_tool_nodejs/feature-request.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
[![Bugs](https://img.shields.io/github/issues/butlergroup/env_encryption_tool_nodejs/bug.svg)](https://github.com/butlergroup/env_encryption_tool_nodejs/issues?utf8=✓&q=is%3Aissue+is%3Aopen+label%3Abug)

## env_encryption_tool_nodejs :copyright: Project Goals & Info

**Purpose**: the goal for this project is to encrypt .env files for a given Node.js application and store them in an encrypted state, then decrypt them at runtime using an OS-based environment variable and pass them to the application. This requires any potential/illicit attacker to breach the operating system's security and access its environment variables before any application-level environment variables can be compromised. 

*Disclaimer:* this project is stable and can be used in production environments, but SLA-based support won't be offered until we're at v1.0 and/or sponsored. :bowtie:

## Installation Instructions

1. [Install Node.js](https://nodejs.org/en) or use nvm (Node version manager) to install Node.js [on Linux/MacOS](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) or [on Windows](https://github.com/coreybutler/nvm-windows) :earth_americas:
2. Clone/fork the env_encryption_tool_nodejs repo :zap:
3. Modify the encryption key in encryptConfig.js to your desired content :lock:
4. Run "node encryptConfig.js" in the same folder as your .env file - this outputs a env.enc file :confetti_ball:
5. Integrate the included decryptConfig.js file and its packages/imports into your Node.js project :star:
6. Set an OS-level environment variable named "DECRYPTION_KEY" ( :earth_americas: [for Linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently), :earth_africa: [for Windows](https://phoenixnap.com/kb/windows-set-environment-variable), :earth_asia: [for MacOS](https://stackoverflow.com/questions/65597552/how-exactly-to-set-up-and-use-environment-variables-on-a-mac)) to the same value you placed in encryptConfig.js. 
7. Copy the env.enc file to the same folder your Node.js application runs in and voila! You have encrypted environment variables provided to your application at runtime. :tada:
8. (optional) Install pm2 to manage and enable auto-start of your Node.js app: npm install pm2@latest -g (this is how the files in this project are configured). Then run "pm2 start ecosystem.config.js" to start the application. :sparkles:

## Contributing

We welcome contributions from the community! A simple guide to get started:

1. Fork the repository to your Github account (a.k.a create a branch). 
2. Clone your forked repo/branch to your favorite IDE (VS Code is our editor of choice) and make changes (or use the command-line: git checkout -b feature/your-feature).
3. **Thoroughly test and debug your changes**, then commit and push them to your forked repo/branch.
4. Open a pull request to have your changes reviewed and reintegrated into the main branch.

Contributors are strongly encouraged to read our [CONTRIBUTING.md](https://github.com/butlergroup/env_encryption_tool_nodejs/blob/main/CONTRIBUTING.md) file before opening a pull request. 

## License

env_encryption_tool_nodejs is licensed under the AGPL-3.0 license, making it free to use, modify, and distribute as long as the source code remains open-source. **Using a modified version of this software without disclosing its source code is not in compliance with the AGPL-3.0 license.**

## Acknowledgments

Special thanks to contributors, open-source enthusiasts, and supporters of env_encryption_tool_nodejs's vision.

## Terms of Service

Please read our [Terms of Service](https://github.com/butlergroup/env_encryption_tool_nodejs/blob/main/terms-of-service.md) before using our software. Violators of these Terms are not supported by the community or contributors.

## Privacy Policy

Please also read our [Privacy Policy](https://github.com/butlergroup/env_encryption_tool_nodejs/blob/main/privacy-policy.md) to understand how we handle your personal information. 

## Contact

Have questions or suggestions? Reach out to us at welcome@butlergroup.net. Thank you and happy coding! :)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=butlergroup/env_encryption_tool_nodejs&type=Date)](https://www.star-history.com/#butlergroup/env_encryption_tool_nodejs&Date)
