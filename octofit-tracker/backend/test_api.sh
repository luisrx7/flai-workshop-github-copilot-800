#!/bin/bash

# OctoFit Tracker API Testing Script
# This script tests all API endpoints using both localhost and Codespace URL

CODESPACE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
LOCALHOST_URL="http://localhost:8000"

# Use Codespace URL if CODESPACE_NAME is set, otherwise use localhost
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="$CODESPACE_URL"
    echo "Testing with Codespace URL: $BASE_URL"
else
    BASE_URL="$LOCALHOST_URL"
    echo "Testing with localhost URL: $BASE_URL"
fi

echo "=================================="
echo "OctoFit Tracker API Test"
echo "Base URL: $BASE_URL"
echo "=================================="
echo ""

# Test API Root
echo "1. Testing API Root:"
echo "   GET $BASE_URL/api/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/"
echo ""
echo "=================================="

# Test Users Endpoint
echo "2. Testing Users Endpoint:"
echo "   GET $BASE_URL/api/users/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/users/"
echo ""
echo "=================================="

# Test Teams Endpoint
echo "3. Testing Teams Endpoint:"
echo "   GET $BASE_URL/api/teams/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/teams/"
echo ""
echo "=================================="

# Test Activities Endpoint
echo "4. Testing Activities Endpoint:"
echo "   GET $BASE_URL/api/activities/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/activities/"
echo ""
echo "=================================="

# Test Leaderboard Endpoint
echo "5. Testing Leaderboard Endpoint:"
echo "   GET $BASE_URL/api/leaderboard/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/leaderboard/"
echo ""
echo "=================================="

# Test Workouts Endpoint
echo "6. Testing Workouts Endpoint:"
echo "   GET $BASE_URL/api/workouts/"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/workouts/"
echo ""
echo "=================================="

echo ""
echo "All tests completed!"
