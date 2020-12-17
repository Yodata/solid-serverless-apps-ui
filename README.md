This project is the UI for the Forever Cloud App Exchange

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment
 - Staging
	 ### `git push`
	 Push the code into the master branch of the repository to deploy the code into the staging environment
	 Staging url: [solid-serverless-apps-ui.now.sh](https://solid-serverless-apps-ui.now.sh/)
	 * To use it inside the iFrame i.e. we need to embed the express.js url which would redirect the code to respective url
	 
		 For staging express url:  [forevercloud.yodata.me](http://forevercloud.yodata.me/)
	 
 - Production
	### `git push`
	 Push the code into the production branch of the repository to deploy the code into the production environment
	 Production url: [forevercloud.appexchange.yodata.me](http://forevercloud.appexchange.yodata.me/)
	 * To use it inside the iFrame i.e. we need to embed the express.js url which would redirect the code to respective url
	 
	 	For production express url : [forevercloud.production.yodata.me](http://forevercloud.production.yodata.me/)
	 
## Environment Variable
 1. REACT_APP_GLOBALSUBSKEY
 * It is the hostkey for accessing the global subscriptions
 
 2. REACT_APP_GLOBALSUBS
 * It is the domain to access to global subscriptions [different for staging - staging.bhhs and production- bhhs]
 
 3. REACT_APP_HOSTNAME
 * It is the domain for the staging and production pods [different for staging - bhhs.dev.yodata and production- bhhs]
	 
