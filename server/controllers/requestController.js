const requestCityCollection = require("../models/requestCity");

//Request for city
async function requestCityRaise(req, res) {
  try {
    const requestData = new requestCityCollection({
      name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
    });

    await requestData.save();
    res.status(201).json(requestData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Get All Requests
async function getAllRequests(req, res) {
  try {
    const requests = await requestCityCollection.find({});
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Delete A Request
async function deleteCityRequest(req, res) {
  try {
    const request = await requestCityCollection.findByIdAndDelete(
      req.params.requestid
    );
    res.status(200).send("Request deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { requestCityRaise, getAllRequests, deleteCityRequest };
