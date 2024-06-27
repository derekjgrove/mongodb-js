# MERN Boiler back-end app
This is an MVC application that abides by OOPs concepts utilizing Ecmascript. App logic is based off of the MongoDB Atlas test data.

**Features:**
- Plug-n-play architecture
- Singletons
- Injections

</br>

### Technology
- Node.js
- Express.js
- MongoDB

### Running the app
- Install dependencies - `npm install`
- Run the application - `npm start`

### Generate and view swagger spec
`npm run swagger-autogen`
navigate to http://localhost:3000/api-docs/

### Testing
1. Download Postman
2. Import the file in the /test folder

### TODO
- [ x ] Full CRUD on companies
- [ ] Introduce at least 1 more collection
- [ ] MongoDB GridFS
- [ ] CODECs
- [ ] Operational Transformation (versioning)
- [ ] Auth and Access Control

### Inspiration
- Add a new plug-in socket.io with a message layer
- Add a new plug-in redis with configurable cache to utilize redis or MongoDB built-in wiredTiger 
