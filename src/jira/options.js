// 共通のAPI request options
export const common = (method, authorizationHeader) =>({
    method,
    headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Basic " + authorizationHeader,
        'Accept': 'application/json',
    },
})