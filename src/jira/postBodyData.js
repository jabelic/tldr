export const getBodyData = ({url, title}) => {
    const obj = {
        fields: {
          summary: title,
          project: {
            id: "10004" // TLDR
          },
          issuetype: {
            id: "10020" // "さまざまな小規模作業。"
          },
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: title,
                        marks: [
                            {
                            type: "link",
                            attrs: {
                                href: url,
                                title: title
                                }
                            }
                        ]
                    }
                ]
              }
            ]
          },
        }
      };
    return obj
}
