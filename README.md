## Install

Copy and rename `.env.sample` to `.env`

Replace `JIRA_TOKEN`, `JIRA_DOMAIN`, and `JIRA_EMAIL` with your info. [See below](#auth)

Example `.env`

```
JIRA_DOMAIN=<Jira domain>
JIRA_TOKEN=<See README Auth>
JIRA_EMAIL=<Jira Token>
```

`npm i` - install dependencies

`npx tsc` - compile TypeScript

If you want to install and use globally:

`npm link`

Binaries will be installed

```
/usr/local/bin/jinfo -> /usr/local/lib/node_modules/jira-ticket-info/index.js
/usr/local/bin/ji -> /usr/local/lib/node_modules/jira-ticket-info/index.js
```

## Usage:

`ji TICKET-123` - If you `npm link` you can use this command anywhere

Alternatively, you can run from the package

`./index.js TICKET-123`

## Auth

- Create a new atlassin token:
  https://id.atlassian.com/manage-profile/security/api-tokens

## Links

https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/
