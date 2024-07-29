# Digital Finance Sandbox

The Digital Finance Sandbox consists of a mock banking website

## Development Environment Setup

### Backend Setup

- The root directory of the repo ( / ) is where a Node.js backend is set up
- After cloning the repo, cd into the folder
  - `cd abc-bank`
- At the root of the repo, run `yarn` to install the project dependencies for the backend
- Once the dependencies have been installed, you will need to configure the environment variables
- At the root of the repo, create a file named `.env`
- Inside the file you just created, copy in the following:

  ```
  NODE_ENV = development
  PORT = 5000
  DYNAMODB_PORT_DEV = 8000
  AWS_ACCESS_KEY_DEV = dev_key
  AWS_SECRET_ACCESS_KEY_DEV = dev_secret_key
  AWS_ACCESS_KEY = <Your AWS Access Key>
  AWS_SECRET_ACCESS_KEY = <Your AWS Secret Access Key>
  AWS_REGION = ca-central-1
  JWT_SECRET = <Your jwt secret key (can be anything)>
  ```

- `NODE_ENV` can be changed to `production` if you want to run the backend in production mode and interact with the production DynamoDB instance
- The `_DEV` environment variables are used for connecting to the local DynamoDB instance
- `JWT_SECRET` is used for signing the JWT tokens that are used for authentication

### Frontend Setup

- `/client` contains the React Frontend, bootstrapped by `create-react-app`
- cd into `/client`
- Run `yarn` to install the project dependencies for the frontend

### Local DynamoDB Instance Setup

- All metrics data collected from the mock banking website is stored in DynamoDB

- Follow the instructions [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)

- Add the following to your `~/.zshrc` or `~/.bashrc` file depending on which shell you are using:

```bash
function dynamo() {
  cd ~/Downloads/dynamodb_local_latest
  java -Djava.library.path=DynamoDBLocal_lib -jar DynamoDBLocal.jar
}
```

- Close and reopen your terminal
- Try running `dynamo` in your terminal. If it works correctly, you should see something similar to:

```bash
Initializing DynamoDB Local with the following configuration:
Port:	8000
InMemory:	false
DbPath:	null
SharedDb:	false
shouldDelayTransientStatuses:	false
CorsParams:	*
```

### Creating and seeding the database tables

1. **Ensure that `NODE_ENV` is set to `development` in the `.env` file**
2. Run `yarn data:createTables` (defined in `/package.json`) to create the tables
3. Run `yarn data:import` to seed the tables with the two admin users

### Tables

All of the user data is stored in 3 tables:

- **Users**: Stores information that the user entered on the website as well as the particular conditions that the user was randomly assigned to. It also stores the survey code that was shown to them at the end of the experiment, which can be used to verify that the user completed the survey on MTurk.
- **PageVisits**: Stores information about all the webpages that each user visited on the website including start and end time.
- **Actions**: Stores information about all the actions that each user took on the website which includes all buttons and checkboxes that they clicked and detailed scroll data.

### Deleting the database tabless

1. Run `yarn data:destroy` to delete all the data in the tables (but not the tables themselves)
2. To delete all the tables, run `yarn data:deleteTables`

### Running the backend and frontend locally

- Go to the root of the repo ( / )
- Run `yarn dev` to spin up the backend and frontend simultaneously
- Run `dynamo` to spin up the local DynamoDBs instance
