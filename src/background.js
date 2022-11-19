"use strict";
import {
  ASANA_TOKEN,
  SECTION_GID,
  PROJECT_ID,
  WORKSPACE_ID,
  WEBHOOK,
  TRELLOKEY,
  TRELLOTOKEN,
  TRELLO_USERNAME,
  TRELLO_BOARD_ID,
  TRELLO_LIST_NAME
} from "../env";

const asana = require("asana/dist/asana-min.js");
const client = asana.Client.create().useAccessToken(ASANA_TOKEN);

/** for Trello: get board id list. */
async function getBoardList() {
  const url = `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/lists/?key=${TRELLOKEY}&token=${TRELLOTOKEN}`
  // const url =
  //   "https://api.trello.com/1/members/" +
  //   TRELLO_USERNAME +
  //   "/boards?key=" +
  //   TRELLOKEY +
  //   "&token=" +
  //   TRELLOTOKEN //+
  //   //"&fields=name";
  // console.log(url)
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  };
  // NOTE: https://stackoverflow.com/questions/36840396/fetch-gives-an-empty-response-body
  return await fetch(url, options).then((res)=>{
    if(res.ok) return res.json().then((json)=> json)
  })
  /**
   * {
   * closed:Boolean
   * id:String
   * idBoard:String
   * name:String
   * pos:Number
   * softLimit:null
   * subscribed:Boolean
   * }
   */
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

async function addCardToTrello(item, listId){
  if (!item) return;
  const trello_url = `https://api.trello.com/1/cards?idList=${listId}&key=${TRELLOKEY}&token=${TRELLOTOKEN}`;
  const  payload = {
          name: item.title,
          desc: 'sdfsdfdf',
          idList: listId,
          urlSource: item.url
      }
  const options = {
    method: "POST",
    body: JSON.stringify({
          name: item.title,
          desc: 'sdfsdfdf',
          idList: listId,
          urlSource: item.url
      }),
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json" // NOTE:bodyの中身がjsonの形をした文字列で構成されていることを指定
      }
  }
  fetch(trello_url, options).then((res)=>{
    if(res.ok) return res.json().then((json)=> json)
  })
}


async function addPostToSlack(item) {
  var payload = {
    text: item.title + "  " + item.url,
    username: "TL;DR",
    channel: "#tldr",
  };
  // post to slack
  await fetch(WEBHOOK, {
      method: "POST",
      body: JSON.stringify(payload),
    })

}

async function addTaskToAsana(tab){
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
}


chrome.browserAction.onClicked.addListener(async function (tab) {
  await addPostToSlack({ url: tab.url, title: tab.title });
  const lists = await getBoardList()
  if(!lists) return ;
  const list_info = lists.find(elem => 
    elem.name === TRELLO_LIST_NAME
  );
  // console.log(list_info)
  await addCardToTrello({ url: tab.url, title: tab.title }, list_info.id)
  // Add task card to Asana.
  await addTaskToAsana(tab);
  // client.tasks
  //   .createTask({
  //     body: { data: {} },
  //     name: tab.title,
  //     notes: tab.url,
  //     workspace: WORKSPACE_ID,
  //     projects: PROJECT_ID,
  //     section: SECTION_GID,
  //     pretty: true,
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });
});
