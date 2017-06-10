# foodmon-go

## Description
Navigation app for food exploring. Think of Pokemon go, instead of monsters popping out, restaurants will pop out on the map.


## Models
### User

| Field         | Data type     |
| --------------|:-------------:|
| name          | String        |
| username      | String        |
| email         | String        |
| password      | String        |
| interestArr   | Array of String |


### Interest

| Field         | Data type     |
| --------------|:-------------:|
| name          | String        |


## End Points

###Authorization
Sign Up
```
POST - localhost:3000/auth/signup
```
| Field         |      |
| --------------|:-------------:|
| name          | required        |
| username      | required        |
| email         | required        |
| password      | required        |
| interestArr   | optional |



Sign In
```
POST - localhost:3000/auth/signin
```
| Field         |      |
| --------------|:-------------:|
| username      | required        |
| password         | required        |

Return token and username


### Users
```
Get all users - GET - localhost:3000/users

** below endpoints need signin token **

Get one user - GET - localhost:3000/users/:id
Edit a user - PUT - localhost:3000/users/:id
Delete a user - DELETE - localhost:3000/users/:id
```

### Interest
```
Get all interests - GET - localhost:3000/interest

** below endpoints need signin token **

Get one interest - GET - localhost:3000/interest/:id
Create new interest - POST - localhost:3000/interest
Edit an interest - PUT - localhost:3000/interest/:id
Delete an interest - DELETE - localhost:3000/interest/:id

```


### AWS EB
```
http://foodmongo-dev.us-west-2.elasticbeanstalk.com
```
#### Examples
Sign In
```
POST - http://foodmongo-dev.us-west-2.elasticbeanstalk.com/auth/signin
```

Get one interest
```
GET - http://foodmongo-dev.us-west-2.elasticbeanstalk.com/interest/:id
```
