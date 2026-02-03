#!/usr/bin/env python
import sys
import json

# Read the POST data from stdin
post_data = sys.stdin.read()

# Parse the JSON data
request_data = json.loads(post_data)

# Get the parameters from the request data
param1 = request_data.get('param1')
param2 = request_data.get('param2')

# Perform necessary computations or operations
result = int(param1) + int(param2)

# Prepare the response data
response_data = {
    'result': result
}

# Convert the response data to JSON format
response_json = json.dumps(response_data)

# Print the JSON response
print("Content-Type: application/json")
print()
print(response_json)
