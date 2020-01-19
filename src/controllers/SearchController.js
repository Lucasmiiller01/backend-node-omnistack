const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { techs, latitude, longitude } = req.query;

    console.log(req.query);
    const teachsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: teachsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
            $maxDistance: 10000
          }
        }
      }
    });
    return res.json(devs);
  }
};
