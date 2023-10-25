# Deployment

For deployment Docker and Docker compose has been leveraged to deploy it to heroku.

CD pipeline deploy builds the docker image with the tag and pushes it to docker registry. The pipeline then deploys the image to heroku app.

## Version Management

For version management semantic-release package has been used. It tags the latest version in release pipeline. For more detail once can go to `Release Page`.

## Rollback Strategy

For now there is no rollback but it can be easily achieved with following steps.

- Since we are versioning the package on Release pipeline we can push the image to docker registry using the version
- Deployment pipeline can be a dispatch workflow with the input parameter as version
- From deployment pipeline one can pull the image from registry and deploy it in heroku.

## Environment variables

For environment variables all the required variables are placed in `.env.example` file

## Development

For development easy make file has been created using docker compose.

- Dev Start: `make dev-start`
- Dev Stop: `make dev-stop`
- Test: `make test`
