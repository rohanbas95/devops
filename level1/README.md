# devops
A very simple project in typescript which has a frondend and two backend api

below commands and process  were ran to set this up

mkdir user-service
cd user-service
npm init -y

create tsconfig.json

create src/index.ts

mkdir product-service
cd  product-service
npm init -y

create tsconfig.json

create src/index.ts

npx create-react-app frontend --template typescript
cd frontend

npm install axios

create src/components/UserList.tsx
create src/components/ProductList.tsx

update src/App.tsx

//
install setup mongo db on local

Install via Homebrew:

If you have Homebrew installed, you can install MongoDB with the following command:
brew tap mongodb/brew
brew install mongodb-community
Start MongoDB:

To start MongoDB, use the following command:
brew services start mongodb/brew/mongodb-community

updateed ~/.bash_profile
vi ~/.bash_profile
run command brew info mongodb-community, to check installation path of mon
export PATH="/opt/homebrew/Cellar/mongodb-community/7.0.11/bin:$PATH"
source ~/.bash_profile

brew install mongosh
brew services start mongodb/brew/mongodb-community


on how to use mongoshell

// Switch to userdb and create a collection
use userdb
db.createCollection("users")

// Switch to productdb and create a collection
use productdb
db.createCollection("products")

// List all databases
show dbs

// Verify collections in userdb
use userdb
show collections

// Verify collections in productdb
use productdb
show collections

Insert Data into
userdb
:

use userdb
db.users.insertOne({ name: "John Doe" })
db.users.find().pretty()
Insert Data into
productdb
:

use productdb
db.products.insertOne({ name: "Sample Product" })
db.products.find().pretty()


//
updated the package.json

// in the frontend, product and service
npm install
npm run build
npm run start

//TODO
//getting this warning while running npm run start for product and user-serivce

(node:78219) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:78219) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

refer https://github.com/rohanbas95/devops/pull/2
// added a git action workflow named pr-build to test the compilation and also added github permission on branches
