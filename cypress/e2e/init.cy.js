/**
 * init.cy.js
 * 
 * This Cypress test file serves as the entry point for running various test suites
 * to validate API functionality, endpoint behaviors, and Swagger UI interactions.
 * It imports and executes multiple tests organized by functionality.
 */

// Import test suites
import { testEndpointCatalog } from "./Catalog_Endpoint"; // Tests for the /planner/catalog endpoint
import { testEndpointCancelReservation } from "./CancelReservation_Endpoint"; // Tests for canceling reservations
import { testEndpointProgress } from "./Progress_Endpoint"; // Tests for the /planner/progress endpoint
import { testEndpointMyReservations } from "./MyReservations_Endpoint"; // Tests for the /myreservations endpoint
import { APIDownloadURL, CountEndpoints, DropDownNavigation, ReservationAPI, ResourceNavigationTest } from "./api_doc_interaction"; // Tests for API documentation interactions
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from "./http_methods"; // Tests for basic HTTP methods

/**
 * Test suite to count all API endpoints.
 * Ensures all endpoints in the API are counted correctly.
 */
describe('Count All Endpoints', () => {
  CountEndpoints();
});

/**
 * Test suite for resource navigation.
 * Verifies navigation through API resources works as expected.
 */
describe('Resource Navigation Test', () => {
  ResourceNavigationTest();
});

/**
 * Test suite for dropdown navigation.
 * Ensures dropdown menus in the API documentation function correctly.
 */
describe('Dropdown Navigation Test', () => {
  DropDownNavigation(); 
});

/**
 * Test suite for API download URL functionality.
 * Verifies that downloading API data works correctly.
 */
describe('API Download URL Tests', () => {
  APIDownloadURL();
});

/**
 * Test suite for Reservation API functionality.
 * Verifies reservation-related APIs function as expected.
 */
describe('Reservation API Tests', () => {
  ReservationAPI();
});

/**
 * Test suite for HTTP GET method.
 * Tests endpoints that use the GET HTTP method.
 */
describe('GET API Tests', () => {
  GetAPI(); 
});

/**
 * Test suite for HTTP PUT method.
 * Tests endpoints that use the PUT HTTP method.
 */
describe('PUT API Tests', () => {
  PutAPI(); 
});

/**
 * Test suite for HTTP POST method.
 * Tests endpoints that use the POST HTTP method.
 */
describe('POST API Tests', () => {
  PostAPI(); 
});

/**
 * Test suite for HTTP DELETE method.
 * Tests endpoints that use the DELETE HTTP method.
 */
describe('DELETE API Tests', () => {
  DeleteAPI(); 
});

/**
 * Test suite for the /myreservations endpoint.
 * Verifies behaviors specific to the /myreservations endpoint in the Swagger UI.
 */
describe('Swagger UI: Test MyReservations Endpoint', () => {
  testEndpointMyReservations();
});

/**
 * Test suite for the /planner/progress endpoint.
 * Verifies behaviors specific to the /planner/progress endpoint in the Swagger UI.
 */
describe('Swagger UI: Test planner/progress Endpoint', () => {
  testEndpointProgress();
});

/**
 * Test suite for the CancelReservation endpoint.
 * Verifies behaviors specific to the CancelReservation endpoint in the Swagger UI.
 */
describe('Swagger UI: Test CancelReservation Endpoint', () => {
  testEndpointCancelReservation();
});

/**
 * Test suite for the /planner/catalog endpoint.
 * Verifies behaviors specific to the /planner/catalog endpoint in the Swagger UI.
 */
describe('Swagger UI: Test planner/catalog Endpoint', () => {
  testEndpointCatalog();
});
