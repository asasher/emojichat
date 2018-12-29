# Emoji Chat

# Start local dynamo db

```
cd ./resources
sls dynamodb install --stage dev
sls dynamodb start --stage dev 
```

Can skip install, if already done

# Start serverless offline

```
AWS_PROFILE=asher AWS_REGION=localhost sls offline start --stage dev
```

# Deploying

```
cd ./resources
sls deploy --stage prod --aws-profile asher
cd ../
sls deploy --stage prod --aws-profile asher
```
