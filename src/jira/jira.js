import { JIRA_API_TOKEN, JIRA_ACCOUNT, JIRA_EDNPOINT } from "../../env";
import { common } from "./options";
import { getBodyData } from "./postBodyData"
const encodedPromise = (text) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const offset = reader.result.indexOf(",") + 1;
      resolve(reader.result.slice(offset));
    };
    reader.readAsDataURL(new Blob([text]));
  });


const getOptions = (method, authorizationHeader, bodyData=null)=>{
    if(bodyData){
        return {
            ...common(method, authorizationHeader),
            body: JSON.stringify(bodyData)
        }
    }
    else{
        return { ...common(method, authorizationHeader) }
    }
}
export const sendRequestToJira = async (method, resource, bodyData=null) => {
    const url = JIRA_EDNPOINT + resource;
    const authorizationHeader = await encodedPromise(JIRA_ACCOUNT + ":" + JIRA_API_TOKEN)
    const options = getOptions(method, authorizationHeader, bodyData)

    await fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
        console.log('Success:', result);
        })
        .catch((e)=>{
            throw e
        })
}


export const postLinkToJira = async ({url, title}) =>{
    const path = '/rest/api/3/issue'
    const requestMethod = 'POST'
    await sendRequestToJira(requestMethod, path, getBodyData({url, title}))
}