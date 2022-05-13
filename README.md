# ULVENTECH
------------------
This is simple REST API

**Prerequisite**
1. NodeJs >=14.17
2. NPM or YARN

**How to configure project**
Open Project folder in terminal and execute below commands
```bash
1. yarn install or npm install
2. touch .env // if you are using windows create .env file in your root folder
```
Add below mentioned attributes to ``.env`` file.
| Attribute   |  Value |
|   ---     |   ---  |
|PORT        |<port app should be bind>|
|JWT_SECRET  |<some secret key for jwt>|

If you are did above steps execute below command in terminal
```sh
1. yarn dev or npm run dev // for development server
2. yarn build or npm run build // build for production
3. yarn start or npm start // for production server
```

### Docs
  {hostname}/api/docs