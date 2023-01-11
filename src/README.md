

## Jira Cloud API

`sendRequestToJira('GET', '/rest/api/3/project')`

- プロジェクト情報が取得できる


`sendRequestToJira('GET', '/rest/api/3/events')`

```
0: {id: 1, name: 'Issue Created'}
1: {id: 2, name: 'Issue Updated'}
2: {id: 3, name: 'Issue Assigned'}
3: {id: 4, name: 'Issue Resolved'}
4: {id: 5, name: 'Issue Closed'}
5: {id: 6, name: 'Issue Commented'}
6: {id: 14, name: 'Issue Comment Edited'}
7: {id: 17, name: 'Issue Comment Deleted'}
8: {id: 7, name: 'Issue Reopened'}
9: {id: 8, name: 'Issue Deleted'}
10: {id: 9, name: 'Issue Moved'}
11: {id: 10, name: 'Work Logged On Issue'}
12: {id: 11, name: 'Work Started On Issue'}
13: {id: 12, name: 'Work Stopped On Issue'}
14: {id: 15, name: 'Issue Worklog Updated'}
15: {id: 16, name: 'Issue Worklog Deleted'}
16: {id: 13, name: 'Generic Event'}
```





### issuetype

`sendRequestToJira('GET', '/rest/api/3/issuetype')`

すべてのissuetypeが表示される。


### create issueする時

- issuetype
    - `sendRequestToJira('GET', '/rest/api/3/project')`で取得できる情報の中に、そのprojectで使用されるissuetypeが返される。
create issueする際にはこれを書かなければならない。
    - [https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-events-get](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-events-get)
- issueのdescriptionにlinkを載せる
    - summaryとともに、fields.description内に以下を書く。
    ```
        description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: title,　// [ココ]()
                        marks: [
                            {
                            type: "link",
                            attrs: {
                                href: url, // [](ココ)
                                title: title
                                }
                            }
                        ]
                    }
                ]
              }
            ]
          },
    ```
    - https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/link/



