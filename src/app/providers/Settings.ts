let ENVITOMENT = "DEV"
let server_url;

switch (ENVITOMENT) {
    case "PROD":
        server_url = "http://vps-1575977-x.dattaweb.com:8080/atscom";
    case "ST":
        server_url = "http://vps-1575977-x.dattaweb.com:8080/atscom";
    case "QA":
        server_url = "http://vps-1575977-x.dattaweb.com:8080/atscom";
    case "DEV":
        server_url = "http://vps-1575977-x.dattaweb.com:8080/atscom";
    default:
        server_url = "http://vps-1575977-x.dattaweb.com:8080/atscom";
}

export const SERVER_URL = server_url