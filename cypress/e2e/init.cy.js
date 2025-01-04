import { testEndpointCatalog } from "./Catalog_Endpoint";
import { testEndpointCancelReservation } from "./CancelReservation_Endpoint";
import { testEndpointProgress } from "./Progress_Endpoint";
import { testEndpointMyReservations } from "./MyReservations_Endpoint";
import { APIDownloadURL, CountEndpoints, DropDownNavigation, ReservationAPI, ResourceNavigationTest } from "./api_doc_interaction";
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from "./http_methods";

describe('Count All Endpoints', () => {
  CountEndpoints();
});

describe('Resource Navigation Test', () => {
  ResourceNavigationTest();
});

describe('Dropdown Navigation Test', () => {
   DropDownNavigation(); 
});

describe('API Download URL Tests', () => {
    APIDownloadURL();
});

describe('Reservation API Tests', () => {
    ReservationAPI();
});

describe('GET API Tests', () => {
   GetAPI(); 
});

describe('PUT API Tests', () => {
   PutAPI(); 
});

describe('POST API Tests', () => {
   PostAPI(); 
});

describe('DELETE API Tests', () => {
   DeleteAPI(); 
});

describe('Swagger UI: Test MyReservations Endpoint', () => {
  testEndpointMyReservations();
});

describe('Swagger UI: Test planner/progress Endpoint', () => {
  testEndpointProgress();
});

describe('Swagger UI: Test CancelReservation Endpoint', () => {
  testEndpointCancelReservation();
});

describe('Swagger UI: Test planner/catalog Endpoint', () => {
  testEndpointCatalog();
});
