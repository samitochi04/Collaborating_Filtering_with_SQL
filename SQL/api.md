# Recommendation System API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get Recommendations by Viewed Item

Returns items frequently purchased by users who viewed a specific item.

```
GET /recommendations/viewed/{item_id}
```

**Parameters:**
- `item_id` (path parameter, integer) - ID of the viewed item

**Example Request:**
```
GET http://localhost:5000/recommendations/viewed/1
```

**Example Response:**
```json
[
    {
        "item_id": 2,
        "frequency": 3
    },
    {
        "item_id": 3,
        "frequency": 1
    }
]
```

### 2. Get Recommendations by Purchased Item

Returns items frequently purchased together with a specific item.

```
GET /recommendations/purchased/{item_id}
```

**Parameters:**
- `item_id` (path parameter, integer) - ID of the purchased item

**Example Request:**
```
GET http://localhost:5000/recommendations/purchased/1
```

**Example Response:**
```json
[
    {
        "item_id": 2,
        "frequency": 4
    },
    {
        "item_id": 3,
        "frequency": 2
    }
]
```

## Testing with Postman

1. Open Postman
2. Create a new request
3. Select GET method
4. Enter one of the endpoint URLs above
5. Replace {item_id} with a valid item ID (e.g., 1, 2, or 3)
6. Send the request
