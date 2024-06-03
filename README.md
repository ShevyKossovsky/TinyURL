
# TinyUrl Server

TinyUrl Server is a project created to generate a URL shortening service, similar to the popular service TinyUrl.

## Installation

1. Install all dependencies by running the command:
    ```bash
    npm install
    ```

2. Configure your MongoDB database connection URI. As the database is running in the cloud, you may need to provide your connection URI directly in your code or through environment variables.

3. Run the server by executing the command:
    ```bash
    npm start
    ```

## Usage

### Creating a New Link

To create a new link, send a POST request to the `/links` endpoint with the following body:

```json
{
  "originalUrl": "<Original URL of the link>",
  "user": "<User ID or empty if no user is registered>",
  "targetParamName": "<Special parameter name in the URL to store the source of the advertisement>",
  "targetValues": [
    {
      "name": "<Name of the advertisement source>",
      "value": "<Value of the special parameter corresponding to the advertisement source>"
    }
  ]
}
