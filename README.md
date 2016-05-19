# Sunnymead

| Environment | Url                                      |
|-------------|------------------------------------------|
| Production  | https://sunnymead.herokuapp.com/         |
| Staging     | https://sunnymead-staging.herokuapp.com/ |

### Dependencies

##### NodeJS 6.x >

```
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

### Deploy

Just push the branch into the correct environment.

##### Staging

```
$ git remote add staging https://git.heroku.com/sunnymead-staging.git 
```

##### Production

```
$ git remote add production https://git.heroku.com/sunnymead.git 
```
