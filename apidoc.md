# Express API Documentation

## Overview

This API provides access to data management endpoints. It allows querying data in various formats including random samples, fixed datasets, and specific records by ID.

## Base URL

```
http://localhost:3000
```

## Endpoints

### Get Random Data Sample

Returns a random selection of data items.

- **URL**: `/data/all`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**:
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "_id": "string"
        // other item properties
      }
      // Up to 1000 random items
    ],
    "message": null
  }
  ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
  ```json
  {
    "statusCode": 500,
    "data": null,
    "message": "Failed to read JSON file"
  }
  ```

### Get Fixed Data Set

Returns a combined and shuffled dataset with 80 random items from the input data and all items from the sample data.

- **URL**: `/data/fixed`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**:
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "_id": "string",
        "position": number
      },
      // Combined items with random positions
    ],
    "message": null
  }
  ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
  ```json
  {
    "statusCode": 500,
    "data": null,
    "message": "Failed to read JSON file"
  }
  ```

### Get Data by ID

Retrieves a specific data item by its unique ID.

- **URL**: `/data/_id/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: String - The unique identifier of the item
- **Success Response**:
  - **Code**: 200
  - **Content**:
  ```json
  {
    "statusCode": 200,
    "data": {
      "_id": "string"
      // other item properties
    },
    "message": null
  }
  ```
- **Error Responses**:
  - **Code**: 400
    - **Content**:
    ```json
    {
      "statusCode": 400,
      "data": null,
      "message": "ID is required"
    }
    ```
  - **Code**: 404
    - **Content**:
    ```json
    {
      "statusCode": 404,
      "data": null,
      "message": "Entity not found"
    }
    ```
  - **Code**: 500
    - **Content**:
    ```json
    {
      "statusCode": 500,
      "data": null,
      "message": "Failed to read JSON file"
    }
    ```

## Error Handling

### Not Found Route

When accessing a non-existent route, the API returns:

- **Code**: 404
- **Content**:

```json
{
  "statusCode": 404,
  "data": null,
  "message": "Route [requested URL] not found"
}
```

### Server Errors

The API uses a centralized error handler that processes errors and returns appropriate status codes and messages.

## Data Sources

The API reads data from two JSON files:

- `./data/input.json`: Main data source
- `./data/sample.json`: Secondary data source for fixed data endpoint
