// var httprequest = require("request-promise");

// module.exports = class TextLocalSMS {
//   constructor() {}

//   async callApi(METHOD, URL, BODY) {
//     var options = {
//       method: METHOD,
//       uri: URL,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache",
//       },
//       json: true,
//     };

//     let response = await httprequest(options)
//       .then((result) => {
//         console.log(`SMS API: ${URL} RESULT =`, result);
//         return result;
//       })
//       .catch(function (err) {
//         console.log(`SMS API: ${URL} ERROR =`, err.message);
//         return err;
//       });
//     return response;
//   }

//   async sendSMS(toNumbers, rawMessage) {
//     let url = "https://api.textlocal.in/send/";
//     let sender = encodeURIComponent("TXTLCL");
//     let encoded_message = encodeURIComponent(rawMessage);
//     let body = {
//       apikey: "NjU2YTZlNjM0MTQzNjk0ZDc0NmU2ZDc5NmM2ZjRhNTg=",
//       numbers: toNumbers.join(","),
//       sender: sender,
//       message: encoded_message,
//     };
//     let result = await this.callApi("POST", url, body);
//     return result;
//   }
// };

const axios = require("axios");

const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: "NjU2YTZlNjM0MTQzNjk0ZDc0NmU2ZDc5NmM2ZjRhNTg=", //Text local api key
    sender: "TXTLCL",
  },
});

const smsClient = {
  sendPartnerWelcomeMessage: (user) => {
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Hi ${user.name}, Welcome to iWheels, Download our app to get bookings from our customers with better pricing. https://iwheels.co`
      );
      tlClient.post("/send", params);
    }
  },
  sendVerificationMessage: (user) => {
    if (user && user.phone) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Hi there, thank you for sending your first test message from Textlocal. Get 20% off today with our code: ${661233}`
      );
      tlClient
        .post("/send", params)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  },
};

module.exports = smsClient;
