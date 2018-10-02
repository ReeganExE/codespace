# Code Space | Browser Extension
Navigate to any repositories made easy.

Your company uses **Microservices**, thus you have a lot of projects, you need something like <kbd>Ctrl + P</kbd> in **Sublime Text**, **VS Code** that helps you navigate to any repsositories easily?

Yes, this is for you.

![image](https://user-images.githubusercontent.com/7277418/46258209-be60a500-c4f0-11e8-85ff-02f9455d78b7.png)

## Build your own one

```sh
export BITBUCKET_ADDR=https://repo.your-company.com
npm run build
```

It will build and extract bundle to `./dist` directory.

## Add to browser
### Google Chrome
- Go to `chrome://extensions/`
- Enable `Developer Mode`
- Click `Load Unpack`
- Navigate to `./dist` and select any file

### Firefox
- Go to `about:debugging`
- Click `Load Temporary Add-on`
- Navigate to `./dist` and select any file

## Run Test

```sh
npm test
```
