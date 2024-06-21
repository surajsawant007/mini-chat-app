const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
var methodOverride = require("method-override");
const app = express();
const port = 8080;

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Set up views directory for EJS templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Define a route
app.get("/", (req, res) => {
  res.send("Working");
});

// Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create post
app.post("/chats", async (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  try {
    await newChat.save();
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.redirect("/chats/new");
  }
});
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
app.put("/chats/:id", async(req, res) => {
  let { id } = req.params;
  let { message: newMsg } = req.body;
  let updateChat =await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true , new: true }
  );
  console.log(updateChat);
  res.redirect("/chats");
});

app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
    let deletedChat =await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

// Start the server
app.listen(port, () => {
  console.log(`The App is running on port ${port}`);
});
