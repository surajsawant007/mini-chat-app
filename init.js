const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Sample usage: Create a new Chat document and save it
let chatMessages = [
  { from: "Emma",
   to: "James",
    message: "Remember our trip last summer?"
 },
  { from: "David"
  , to: "Sophie", 
  message: "Thanks for your help yesterday!" 
},
  {
    from: "Lily",
    to: "Oliver",
    message: "Can't wait to see you this weekend!",
  },
  {
    from: "Ella",
    to: "Jack",
    message: "Just got the tickets for the concert!",
  },
  {
    from: "Lucas",
    to: "Isabella",
    message: "Happy birthday! Let's celebrate tonight.",
  },
  { from: "Mia",
   to: "William",
    message: "Are you free for lunch tomorrow?" 
   },
  { from: "Aiden",
   to: "Emily",
    message: "You're the best teammate!"
 },
  { from: "Scarlett",
   to: "Daniel", message:
    "I miss our late-night chats."
 },
  { from: "Henry",
   to: "Grace",
    message: "Good luck on your presentation!" 
},
  { from: "Zoe",
   to: "Logan",
    message: "Let's plan a road trip this summer."
 },
  { from: "Sophia",
   to: "Jacob",
    message: "Thanks for always being there."
 },
  { from: "Benjamin",
   to: "Ava",
    message: "How was your weekend getaway?"
 },
  {
    from: "Charlotte",
    to: "Michael",
    message: "I'm so proud of your achievement!",
  },
  {
    from: "Ethan",
    to: "Abigail",
    message: "Can I borrow your notes from yesterday's class?",
  },
  {
    from: "Madison",
    to: "Alexander",
    message: "Looking forward to our movie night.",
  },
];

Chat.insertMany(chatMessages);