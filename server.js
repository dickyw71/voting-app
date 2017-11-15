const express = require("express");
const data = require("./data.json");
const fs = require("fs");

const app = express();

// Set the static file root
app.use(express.static("public"));

// Get the polls for a specific author
const getAuthorData = polls => author =>
  polls.filter(poll => poll.author === author);
const getAuthorPolls = getAuthorData(data.polls);

// Create poll data
const addPoll = data => newPoll => {
  const newPolls = data.polls.concat(newPoll);
  fs.writeFileSync(
    "./data.json",
    JSON.stringify(
      Object.assign(data, { polls: newPolls, id: data.id + 1 }),
      null,
      2
    ),
    "utf-8"
  );
};
addPoll(data)({
  id: 1, // FIXME
  title: "ML frameworks",
  author: "Elon Musk",
  options: [
    {
      option: "Python",
      votes: 3
    },
    {
      option: "R",
      votes: 1
    }
  ]
});

// Read poll data
app.get("/polldata", (req, res) => res.send(data));

// Update poll data - add option
const updatePollOptions = data => pollData => {
  const newPolls = data.polls.map(poll => {
    if (poll.id === pollData.id) {
      // make sure option doesn't already exist
      if (
        poll.options.filter(option => option.option === pollData.newOption)
          .length === 0
      ) {
        poll.options = poll.options.concat({
          option: pollData.newOption,
          votes: 0
        });
      }
    }
    return poll;
  });
  fs.writeFileSync(
    "./data.json",
    JSON.stringify(Object.assign(data, { polls: newPolls }), null, 2),
    "utf-8"
  );
};
const updatePollAddOption = updatePollOptions(data);
updatePollAddOption({ id: 0, newOption: "Scala" });

// Delete poll data
const deletePollData = data => pollId => {
  const newPolls = data.polls.filter(poll => poll.id !== pollId);
  fs.writeFileSync(
    "./data.json",
    JSON.stringify(Object.assign(data, { polls: newPolls }), null, 2),
    "utf-8"
  );
};
const deletePoll = deletePollData(data);
deletePoll(2);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
