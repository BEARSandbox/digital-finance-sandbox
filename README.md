# Digital Finance Sandbox

The Digital Finance Sandbox consists of a mock banking website that can be leveraged to study consumer behaviour during the credit card selection process. As participants enter the website (from MTurk), they will be randomly assigned to different conditions, explained in more detail below. Any action that a participant performs on the website will be tracked with detailed metadata, allowing for highly flexible and versatile data analysis across various parameters and dimensions.

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

### Deleting the database tabless

1. Run `yarn data:destroy` to delete all the data in the tables (but not the tables themselves)
2. To delete all the tables, run `yarn data:deleteTables`

### Running the backend and frontend locally

- Go to the root of the repo ( / )
- Run `yarn dev` to spin up the backend and frontend simultaneously
- Run `dynamo` to spin up the local DynamoDBs instance
- Navigate to `localhost:3000` to view the app

## Project Information

### Database Tables

All of the user data is stored in 3 tables:

- **Users**: Stores information that the user entered on the website as well as the particular conditions that the user was randomly assigned to. It also stores the survey code that was shown to them at the end of the experiment, which can be used to verify that the user completed the survey on MTurk.
- **PageVisits**: Stores information about all the webpages that each user visited on the website including start and end time.
- **Actions**: Stores information about all the actions that each user took on the website which includes all buttons and checkboxes that they clicked and detailed scroll data.

### Conditions

There are two conditions, each with two values, that a participant will be randomly assigned from:

1. Hypothetical Scenario - Can be "Cost Minimization" (CM) or "Reward Maximization" (RM). This condition determines the story they are shown at the start of the experiment.
2. Schumer Box Timing - Can be "Undistinguished" (U) or "Salient" (S). When it is "Salient", the participant will be able to see the schumer box for a card while browsing through the different cards. Otherwise, it will only show up after a participant starts the application process for a credit card.

This means there are 4 options that a participant can be assigned from:

- CM, U
- CM, S
- RM, U
- RM, S

The implementation of the random assignment guarantees that participants will be evenly distributed among all the options. For example, if there are 1000 participants in total, exactly 250 will be assigned to each of the 4 options.

This is done through sampling without replacement. The first participant will be randomly assigned from 1 of the 4 options. Then, that option will be taken out and the next participant will be assigned from 1 of the 3 remaining options. Once all 4 options have been used, we reset the options back to all 4 and the process continues.

Currently, the available options are **not** tracked in the DynamoDB database itself. Instead, a file called `conditionsAvailable.txt` will be created and updated by the backend code, as new participants get assigned. This should eventually be moved to the database.

### URL Structure

In order for a participant to use the website, they need to enter from MTurk because we assume a certain URL structure (that MTurk creates by default). If you try opening the app without the correct structure (`localhost:3000` for example), you will see the consent form but after clicking **"I Consent"**, you will not be able to access the rest of the app.

The correct URL structure is as follows:

`<protocol>://<domain>?assignmentId=<assignment-id>&hitId=<hit-id>&workerId=<worker-id>`

For testing locally, you can use something like this:

`http://localhost:3000/?assignmentId=ABC&hitId=ABC&workerId=worker123`

If you don't want the website to assume this URL structure, you can update the query string parsing logic in `componentDidMount()` in `client/src/root.jsx`.

### Admin View

You can visit the admin view by navigating to `/admin`. Here, you can explore how elements on the banking website will change, based on the different conditions. You can also download all the user data from here by clicking **"Download CSV Data Files"**.

There are two admin users:

1. The main admin who has full access to read all the user data and delete it
2. The secondary admin who can only read all the user data

The default credentials are:

1. Username: 00000, Password: main_user
2. Username: 11111, Password: secondary_user

If you wish to change this, you can navigate to `utils/dbHelpers.js` and change the credentials as desired. Note that you will have to rerun `yarn data:import` for the changes to take effect.
