# Overview

This Cloud Function is inteded to be used as a Cloud Monitoring Synthetic monitor.

Use it as a base for your own synthetic checks. See `example.spec.ts` for an example. Create test cases in `*.spec.ts` files. Remove the example before deploying.

## Install and develop tests, eg.

```
npm install
npx playwright test

# Run tests with visual debugging:
npx playwright test --debug

# Generate code for a new test:
npx playwright codegen https://www.google.com/
```

See `npx playwright --help` for more information.

## Test Cloud Functions deployment locally

```
npm run build
npm start

curl localhost:8080
```

## Deploy to Cloud Functions

Create new synthetic monitor at https://console.cloud.google.com/monitoring/synthetic-monitoring?project=hion-monitoring. Check frequency of 10 minutes and alert duration 5 min are reasonable values, but this depends on the use case.

Set function region to `europe-north1`. For the Playwright CPU allocation of 1 and 512 MiB memory is needed to run the tests in a reasonable time. Modify the runtime configuration under "Runtime, build, connections and security settings" expansion panel, or later with the `gcloud functions deploy` command below.

Take note of the function name. You can deploy the default placeholder function first and update it with the command below. This will re-deploy the function with the code from current working directory.

TS compilation is done automatically in the cloud build environment, ie. no need to run `npm run build` before deployment.

```
FUNCTION_NAME=client-service-synthetic-check-1
gcloud beta --project=hion-monitoring functions deploy $FUNCTION_NAME \
  --gen2 --cpu=1 --memory=512MB --region=europe-north1

# after deployment, verify it works, eg.
gcloud --project=hion-monitoring functions call $FUNCTION_NAME
gcloud --project=hion-monitoring functions logs read $FUNCTION_NAME
```

## Cleanup

After removing synthetic monitor, remove also the function with:

```
gcloud --project=hion-monitoring functions delete $FUNCTION_NAME
```
