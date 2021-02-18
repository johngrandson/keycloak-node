const session = require("express-session");
const Keycloak = require("keycloak-connect");

let _keycloak;

const keycloakConfig = {
  clientId: "nodejs-microservice",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "Demo-Realm",
  credentials: {
    secret: "e33011e2-e186-4e92-816f-b33f7c291c95",
  },
};

function initKeycloak(memoryStore) {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");

    const memoryStore = new session.MemoryStore();

    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
