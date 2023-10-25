# System Architecture

## Tools Used

    1. Node JS
    2. Typescript
    3. Express
    4. Docker
    5. Chai Mocha
    6. Prisma
    7. Postgresql
    8. TimeScale DB
    9. Docker Compose

## API

- Users

  - register: `/api/v1/users`
  - fetch Current user: `/api/v1/me`

- Projects

  - fetch: `/api/v1/projects`

- Project History

  - fetch Year: `/api/v1/projectHistories?type=year&year=${year}&projectIds=${projectIds}`
  - fetch Anomaly: `/api/v1/projectHistories?type=anomaly&projectIds=${projectIds}`

- Map
  fetch Map: `/api/v1/charts/maps`

- Auth
  login: `/api/v1/auth/login`
  refreshToken: `/api/v1/auth/refresh`

## Auth

For authentication JWT token is used with response of `accessToken` and `refreshToken`
Refresh token can be verified and new `accessToken` is sent to user.

## Database

For database `postgresql` is used. For history data real `time scale database` is used.
