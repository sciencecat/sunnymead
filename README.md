# Sunnymead

| Environment | Branch  | Url                                      | Codeship                                                                                                                                                                       |
|-------------|---------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Production  | master  | https://sunnymead.herokuapp.com/         | [ ![Codeship Status for sciencecat/sunnymead](https://codeship.com/projects/1abc13f0-0045-0134-4d8c-1e95689fe79f/status?branch=master)](https://codeship.com/projects/153146)  |
| Staging     | staging | https://sunnymead-staging.herokuapp.com/ | [ ![Codeship Status for sciencecat/sunnymead](https://codeship.com/projects/1abc13f0-0045-0134-4d8c-1e95689fe79f/status?branch=staging)](https://codeship.com/projects/153146) |

### Dependencies

##### NodeJS 5.11.x >

```
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ npm install
```

### Tests

```
$ npm test
```

### Deploy

Deploy is made **automagically** by Codeship when new pushes comes:

- **staging**: for staging environment
- **master**: for production environment
