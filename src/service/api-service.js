import { config } from "../constants";

class ApiService {
  Address = config.API_URL;

  getData = (callback) => {
    fetch(this.Address + "/getData")
      .then((res) => res.json())
      .then((result) => {
        callback(result);
      });
  };

  addTimer = (options, callback) => {
    fetch(this.Address + "/addTimer", options)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
      });
  };

  updateTimer = (options, callback) => {
    fetch(this.Address + "/updateTimer", options)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
      });
  };
}

export default ApiService;
