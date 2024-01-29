const companyCollection = require("../models/companyModel");
const freelancerCollection = require("../models/freelancerModel");
const jwt = require("jsonwebtoken");
const messageCollection = require("../models/messageModel");
const userCollection = require("../models/userModel");

//Create Message Room
async function createMessageRoom(req, res) {
  try {
    const checkMessageBox = await messageCollection.findOne({
      messageId: req.body.messageId,
    });
    if (checkMessageBox) {
      res.status(200).json(checkMessageBox);
      return;
    }
    const messageData = new messageCollection({
      messageId: req.body.messageId,
      messages: [],
      freelancer: req.body.freelancer || null,
      user: req.body.user || null,
      company: req.body.company || null,
    });
    const newMessageRoom = await messageData.save();
    if (req.body.freelancer) {
      await freelancerCollection.findByIdAndUpdate(req.body.freelancer, {
        $push: {
          messageRoom: newMessageRoom._id,
        },
      });
    }
    if (req.body.user) {
      await userCollection.findByIdAndUpdate(req.body.user, {
        $push: {
          messageRoom: newMessageRoom._id,
        },
      });
    }
    if (req.body.company) {
      await companyCollection.findByIdAndUpdate(req.body.company, {
        $push: {
          messageRoom: newMessageRoom._id,
        },
      });
    }
    res.status(201).json(newMessageRoom);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Send Messages
async function sendMessages(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const messageRoom = await messageCollection.findOne({
        messageId: req.body.messageId,
      });
      if (!messageRoom) {
        res.status(404).send("Message room not found");
        return;
      }
      if (
        err ||
        (messageRoom.freelancer != authData.user._id &&
          messageRoom.user != authData.user._id &&
          messageRoom.company != authData.user._id)
      ) {
        res.status(404).send("You are not authorized");
        return;
      }

      const updatedMessage = await messageCollection.updateOne(
        { messageId: req.body.messageId },
        { $push: { messages: req.body.message } }
      );

      res.status(200).json(updatedMessage);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Get all messages
async function getAllMessages(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const messageRoom = await messageCollection.findOne({
        messageId: req.params.messageId,
      });
      if (!messageRoom) {
        res.status(404).send("Message room not found");
        return;
      }
      if (
        err ||
        messageRoom.freelancer !== authData.user._id ||
        messageRoom.user !== authData.user._id ||
        messageRoom.company !== authData.user._id
      ) {
        res.status(404).send("You are not authorized");
        return;
      }
      const allMessages = await messageCollection
        .findById(messageRoom._id)
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();

      res.status(200).json(allMessages);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Get ChatRoom of User
async function getChatRoomOfUser(req, res) {
  try {
    let chatRooms;
    if (req.query.type == "user") {
      chatRooms = await messageCollection
        .find({
          user: req.params.userId,
        })
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();
    } else if (req.query.type == "freelancer") {
      chatRooms = await messageCollection
        .find({
          freelancer: req.params.userId,
        })
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();
    } else {
      chatRooms = await messageCollection
        .find({
          company: req.params.userId,
        })
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();
    }
    res.status(200).json(chatRooms);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createMessageRoom,
  sendMessages,
  getAllMessages,
  getChatRoomOfUser,
};
