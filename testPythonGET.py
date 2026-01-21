#!/etc/python3
# -*- coding: utf-8 -*-

import cgi
import json

# Get the parameters from the client-side script
form = cgi.FieldStorage()
param1 = form.getvalue('param1')
param2 = form.getvalue('param2')

# Perform necessary computations or operations
result = param1 + ' ' + param2

# Prepare the response data
response_data = {
    'result': result
}

# Convert the response data to JSON format
response_json = json.dumps(response_data)

# Return the JSON response
return response_json
