import {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_BASE_URL,
    AIRTABLE_TABLE_ID,
    AIRTABLE_STATUS,
    AIRTABLE_FIELD
} from "../env";

const  toLocaleString = (date)=> {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
        ].join( '/' ) + ' '
        + date.toLocaleTimeString();
}

export const createRecord = async (tab) =>{
    const url = AIRTABLE_BASE_URL + "/" + AIRTABLE_BASE_ID + "/" + AIRTABLE_TABLE_ID

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${AIRTABLE_API_KEY}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "records": [
            {
                "fields": {
                    "Name": tab.title,
                    [AIRTABLE_FIELD]: tab.url,
                    "Status": `${AIRTABLE_STATUS}`,
                    "CreateDate": `${new Date().toISOString()}`
                }
            },
        ]
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
