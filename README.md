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
GET - localhost:3000/users
GET - localhost:3000/users/:id
PUT - localhost:3000/users/:id
DELETE - localhost:3000/users/:id
```


##### Examples:
