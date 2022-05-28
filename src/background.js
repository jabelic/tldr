"use strict";
import {
  ASANA_TOKEN,
  SECTION_GID,
  PROJECT_ID,
  WORKSPACE_ID,
  WEBHOOK,
} from "../env";

const asana = require("asana/dist/asana-min.js");
const client = asana.Client.create().useAccessToken(ASANA_TOKEN);

/** for Trello: get board id list. */
function getBoardList() {
  var url =
    "https://api.trello.com/1/members/" +
    username +
    "/boards?key=" +
    trelloKey +
    "&token=" +
    trelloToken +
    "&fields=name";
  var options = {
    method: "get",
    muteHttpExceptions: true,
  };
  console.log(fetch(url, options));
}

/** for trello: add list to Trello. */
function addList() {
  //顧客にlistを作る
  const boardId = "5cbd620b7e4b1f684459c5e5";
  const url =
    "https://api.trello.com/1/boards/" +
    boardId +
    "/lists/?key=" +
    trelloKey +
    "&token=" +
    trelloToken;
  const options = {
    method: "post",
    muteHttpExceptions: true,
    payload: {
      name: "Test List",
      pos: "top",
    },
  };
  console.log(fetch(url, options));
}

function addCard(item) {
  var payload = {
    text: item.title + "  " + item.url,
    username: "TL;DR",
    channel: "#tldr",
  };
  // slack post
  console.log(
    fetch(WEBHOOK, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  );
}

chrome.browserAction.onClicked.addListener(function (tab) {
  addCard({ url: tab.url, title: tab.title });
  // Add task card to Asana.
  client.tasks
    .createTask({
      body: { data: {} },
      name: tab.title,
      notes: tab.url,
      workspace: WORKSPACE_ID,
      projects: PROJECT_ID,
      section: SECTION_GID,
      pretty: true,
    })
    .then((result) => {
      console.log(result);
    });
});
