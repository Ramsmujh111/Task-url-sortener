# Getting Started with URL shortener Project

This project contain the URL shortener API 
## Available Scripts

In the project directory, you can run:

### `npm install`
Runs the command to get the all dependency install in your local

### `npm run start:dev`

Runs the app in the development mode.\
Open [http://localhost:3001/api/shortener](http://localhost:3000/api/shortener) to make a request through the Postman or https method 

In this request i passed the longUrl in Body so need to make the Post the Data is Body Like That : {
    longUrl:"Enter your url"
}

EndPoint [http://localhost:3001/code] to make redirect the original url when we shorted the our long url

for the Database store the Data i'm using Mongodb ODM(mongoose)

## Learn More About the Tech which i have use in the project
I'm using the express.js framework to implement the rest-apis [express.js](https://expressjs.com/).

I'm using mongodb to store the URL shortener schema [mongoose](https://mongoosejs.com/docs/).

## Learn More About the environment variable

## PORT 
Enter your post here to Listing your server 

## MONGO_URL
Enter your mongodb credential To connect mongodb server

## BASE_URL 
Enter here the base url like that your localhost url whether you want to redirect to store the shorten uri and redirect main long url


