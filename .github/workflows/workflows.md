# MongoDB Automation

MongoDB Automation is a way to provide automation for all things MongoDB. 
There are 2 focus points to this repo:

- Deployment Scripts
- Backup/Restore
- Business Manual Data Adjust/Manual Data Entry

## Deployment Scripts

The idea is to push a seperate repository of .js scripts to run against a Mongo Deployment. This could also be run in the working repository if desired

The process can be broken down as the following:
- Staged workflow with a stage per environment
- Add approver/audit step as needed before executing next stage
- Step logic includes the `mongosh --file` command which will connect to a specific cluster and run the specified .js file as a script
  - Sensitive data, such as cluster userName and secret can be configured in [Github Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) and leveraged within Github Actions
  - Example of a [.js file](./deployment-scripts/release-1.0.js) can be found here, checkout all of the [.js commands](https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/)

## Backup/Restore

Automate restores by creating a CD process to restore to the latest backup available

Steps:
1. Get latest backup
2. Restore latest backup through mongosh

## MDA/MDE

Create a CD process to run MongoDB Ops against a particular collection

Steps:
1. Get inputs from user
2. Run operation
