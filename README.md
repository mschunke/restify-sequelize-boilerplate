# restify-sequelize-boilerplate

This template supports out of the box:

- Restify
- Sequelize (with mySQL, but you can change it accordingly)
- JWT access and refresh tokens
- NodeJs Cluster module (multi-process)

## How to use

Install dependencies: `npm install` or `yarn add`.

Use the `template.env` file as a starting point for your `.env` file. Update the database access information as required. Also note the following fileds:

- **MULTI_CORE**: If set to `1` the app will run under multiple clusters.
- **NUM_CPUS**: When set to `0` will use the number of availiable CPU cores in the system, otherwise, the specified number of cores. Avoid setting an value above the number of availiable CPU cores.

Update the `app/config.json` file with your own secret, expiration and algos for the JWT tokens. expiration.

*Optional: Change the dialect of Sequelize, updating the `.env` file accordingly and, if required, the `database/index.js` file on the `sequelize` object declaration.* 

Add new modules and routes as required.

## Basic Directory Structure

- **/app**: Contains the child process initiator and the `config.json` file with the JWT secrets.
- **/controllers**: Has the controllers for the interface between the routes and the database.
- **/database**: Has the database DAO files and model definitions. Create new models as required and import tem to the `models/index.js` file here following the pattern. DO NOT change the `models.js` file at the root of the database folder.
- **/helpers**: General helpers can be placed here. Only the JWT helper is included by default.
- **/middleware**: Includes middlewares such as validators for queries and the APIError function which is extensively used in the app. You can customize to handle errors, like using Winston for logging.
- **/routes**: Routes are defined inside this folder, add new routes following the pattern.

## Contribution

If you would like to help with this code, please contact me or add a request.