### npm install all packages:

npm i
### install pm2 for start alication in backgroud
npm install pm2 -g
### start application using pm2 
pm2 start App.js --name uploads3


### check pm2 list for our aplications our application start or not
pm2 list

### our application name is uploads3. so check log  
pm2 logs {id-of-our-application-pm2-list}

## or 
### our application name is uploads3. so check log  
## like: 
pm2 logs 
## or
pm2 logs uploads3


### check our application on port:

http://locahost:4000/upload


## in postman 
### For Step 1 and 2 
### when you upload multiple file for step1 or step2 then key=images as a file.


### For Step 3 : for the upload files in upload folder 
### key=avatar   and  key=resume


