import type { YooptaEmailEditor, YooptaEmailEditorOptions } from '@yoopta/email-builder';
import EmailBuilder, { createYooptaEmailEditor } from '@yoopta/email-builder';
import { actions } from 'astro:actions';
import { getImage } from 'astro:assets';
import { useEffect, useState } from 'react';
import { BASE_URL, SOCIAL_LINKS } from '../../consts';
import facebookImage from '../../images/newsletter/social_facebook.png';
import linkedInImage from '../../images/newsletter/social_linkedin.png';
import xImage from '../../images/newsletter/social_x.png';


function sendNewsletter(newsletterEmailHtml: string) {
  actions.sendNewsletter({
    subject: (document.querySelector('.js-newsletter-subject') as HTMLInputElement).value,
    html: newsletterEmailHtml,
    unsubscribeKeyPlaceholder: 'unsubscribeKey'
  }).then(() => {
    alert('Newsletter sent!');
  }
  ).catch((error) => {
    console.error(error);
    alert('Something went wrong');
  }
  );
}

// Define your email template options
async function getYooptaEmailEditorOptions(): Promise<YooptaEmailEditorOptions> {

  const linkedInImageSrc = (await getImage({ src: linkedInImage, width: 32, height: 32 })).src
  const xImageSrc = (await getImage({ src: xImage, width: 32, height: 32 })).src
  const facebookImageSrc = (await getImage({ src: facebookImage, width: 32, height: 32 })).src

  const yooptaEmailEditorOptions: YooptaEmailEditorOptions = {
    template: {
      head: {
        styles: [
          {
            id: 'email-reset',
            content: `
            table td { border-collapse: collapse; mso-line-height-rule: exactly; }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            * { font-family: Inconsolata,Arial,sans-serif; }
            table { border-collapse: collapse; border-spacing: 0; }
            button { border: 2px solid #000; }
          `,
          },
        ],
        meta: [
          { content: 'width=device-width, initial-scale=1.0', name: 'viewport' },
          { charset: 'UTF-8' },
        ],
      },
      body: {
        attrs: {
          style: {
            backgroundColor: '#fafafa',
            width: '100%',
            margin: '0 auto',
            padding: '0',
          },
        },
      },
      container: {
        attrs: {
          style: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          },
        },
      },
      customTemplate: (content) => `${content}
    <style>
      * { font-family: Inconsolata,Arial,sans-serif; }
      button { border: 2px solid #000 !important; border-radius: 0 !important; }
    </style>
    <table width="100%" align="center" style="table-layout:fixed;width:100%">
      <tr><td>
        <table width="100%">
          <tr><th width="100%" valign="top" style="font-weight:normal">
            <table width="600" align="center" style="table-layout:fixed;width:600px">
              <tr><td valign="top">
                <table width="100%">
                  <tr><td style="display:inline-block">
                    <table width="600" style="table-layout:fixed;width:600px">
                      <tr><td style="padding-left:241px;padding-right:241px;padding-top:40px">
                        <table width="100%">
                          <tr><th style="font-weight:normal">
                            <table width="100%" style="table-layout:fixed;width:100%">
                              <tr><td style="font-size:0px;line-height:0px;padding-bottom:5px;padding-top:5px">
                                <a href="${SOCIAL_LINKS.x}" style="color:#b91c1c;text-decoration:none" target="_blank">
                                  <img src="${xImageSrc}" width="32" border="0" style="display:block;width:100%">
                                </a>
                              </td>
                            </table>
                          </th><th width="" style="font-weight:normal">
                            <table width="100%" style="table-layout:fixed;width:100%">
                              <tr><td style="font-size:0px;line-height:0px;padding-bottom:5px;padding-top:5px">
                                <a href="${SOCIAL_LINKS.facebook}" style="color:#b91c1c;text-decoration:none" target="_blank">
                                  <img src="${facebookImageSrc}" width="32" border="0" style="display:block;width:100%">
                                </a>
                              </td>
                            </table>
                          </th><th width="" style="font-weight:normal">
                            <table width="100%" style="table-layout:fixed;width:100%">
                              <tr><td style="font-size:0px;line-height:0px;padding-bottom:5px;padding-top:5px">
                                <a href="${SOCIAL_LINKS.linkedIn}" style="color:#b91c1c;text-decoration:none" target="_blank">
                                  <img src="${linkedInImageSrc}" width="32" border="0" style="display:block;width:100%">
                                </a>
                              </td></tr>
                            </table>
                          </th></tr>
                        </table>
                      </td></tr>
                    </table>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </th></tr>
        </table>
      </td></tr>
    </table>
    <table width="100%" align="center" style="table-layout:fixed;width:100%">
      <tr><td style="padding-bottom:35px;padding-left:10px;padding-right:10px;padding-top:40px">
        <table width="100%">
          <tr><td valign="top">
            <div>
              <p style="margin:0"><a style="text-decoration: none; color: #000;" href="${`${BASE_URL}/imprint`}">Imprint</a> | <a style="text-decoration: none; color: #000;" href="${`${BASE_URL}/newsletter/unsubscribe/{{unsubscribeKey}}`}">Unsubscribe</a></p>
            </div>
          </td></tr>
          <tr><td></td></tr>
          <tr><td align="left" valign="top" style="">
            <div>
              © ${new Date().getFullYear()} Sebastian Sigl. All rights reserved.
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
    `
    },
  };

  return yooptaEmailEditorOptions;
}

export default function EmailBuilderExample() {
  // Initialize the editor
  const [editor, setEditor] = useState<YooptaEmailEditor | null>(null);
  const [editorOptions, setEditorOptions] = useState<YooptaEmailEditorOptions | null>(null);

  useEffect(() => {
    getYooptaEmailEditorOptions().then((yooptaEmailEditorOptions) => {
      setEditorOptions(yooptaEmailEditorOptions);
      setEditor(createYooptaEmailEditor(yooptaEmailEditorOptions));
    });
  }, []);



  const [value, setValue] = useState<any>({
    "0cd766b5-80bd-4da0-9d3f-96d4299eec7f": {
      "id": "0cd766b5-80bd-4da0-9d3f-96d4299eec7f",
      "type": "HeadingOne",
      "meta": {
        "align": "center",
        "depth": 0,
        "order": 0
      },
      "value": [
        {
          "id": "5ae08fe5-dd24-4694-8232-56682a1b9e9d",
          "type": "heading-one",
          "props": {
            "nodeType": "block"
          },
          "children": [
            {
              "text": "THE "
            },
            {
              "text": "NEWS",
              "underline": true
            }
          ]
        }
      ]
    },
    "c4c2400b-f9ca-48a5-8157-4f31017da76c": {
      "id": "c4c2400b-f9ca-48a5-8157-4f31017da76c",
      "type": "Divider",
      "meta": {
        "depth": 0,
        "order": 1
      },
      "value": [
        {
          "id": "0511807a-2279-4e12-96f9-d7e26bafe027",
          "type": "divider",
          "props": {
            "nodeType": "void",
            "theme": "solid",
            "color": "#EFEFEE"
          },
          "children": [
            {
              "text": ""
            }
          ]
        }
      ]
    },
    "314b8869-6f78-4c49-b0ea-389bdb656cb8": {
      "id": "314b8869-6f78-4c49-b0ea-389bdb656cb8",
      "type": "HeadingTwo",
      "meta": {
        "align": "center",
        "depth": 0,
        "order": 2
      },
      "value": [
        {
          "id": "56fc10e9-55a0-4214-9685-f1a7c703e2cd",
          "type": "heading-two",
          "props": {
            "nodeType": "block"
          },
          "children": [
            {
              "text": "TOP ARTICLES OF "
            },
            {
              "text": "THE WEEK",
              "underline": true
            }
          ]
        }
      ]
    },
    "05088f8e-3cdd-44cc-adf1-dc8367640cd3": {
      "id": "05088f8e-3cdd-44cc-adf1-dc8367640cd3",
      "type": "Image",
      "meta": {
        "depth": 0,
        "order": 3
      },
      "value": [
        {
          "id": "f4f70b49-dc45-42e6-a921-7921e2dd86f4",
          "type": "image",
          "props": {
            "src": "https://www.sebastiansigl.com/images/posts/empowered-execution-in-large-organizations/empowered-execution-in-large-organizations.webp",
            "alt": null,
            "srcSet": null,
            "bgColor": null,
            "fit": "cover",
            "sizes": {
              "width": 596,
              "height": 499
            },
            "nodeType": "void"
          },
          "children": [
            {
              "text": ""
            }
          ]
        }
      ]
    },
    "9bb40f9b-31e6-45b5-8b9b-dd239bf59605": {
      "id": "9bb40f9b-31e6-45b5-8b9b-dd239bf59605",
      "type": "HeadingThree",
      "meta": {
        "align": "center",
        "depth": 0,
        "order": 4
      },
      "value": [
        {
          "id": "b1c265b4-2331-421a-8b96-9023dd948efe",
          "type": "heading-three",
          "props": {
            "nodeType": "block"
          },
          "children": [
            {
              "text": "High-Performing Teams Focus On These 4 Areas to Remain Successful"
            }
          ]
        }
      ]
    },
    "4831a1ac-714d-48ca-b8ee-dc38c9ff21bc": {
      "id": "4831a1ac-714d-48ca-b8ee-dc38c9ff21bc",
      "type": "Button",
      "meta": {
        "align": "center",
        "depth": 0,
        "order": 5
      },
      "value": [
        {
          "id": "f856e72b-1a54-4733-b412-63cdb8baced9",
          "type": "button",
          "props": {
            "href": "",
            "color": "#fff",
            "backgroundColor": "#000",
            "variant": "destructive",
            "size": "default"
          },
          "children": [
            {
              "text": "READ ARTICLE"
            }
          ]
        }
      ]
    },
    "f4985e26-1a16-4c92-bd7a-b6829f742b8c": {
      "id": "f4985e26-1a16-4c92-bd7a-b6829f742b8c",
      "type": "HeadingThree",
      "meta": {
        "depth": 0,
        "order": 7
      },
      "value": [
        {
          "id": "e48e4163-3632-4933-972a-8e6312ac9d23",
          "type": "heading-three",
          "props": {
            "nodeType": "block"
          },
          "children": [
            {
              "text": "Worms should definitely be banned from cherries"
            }
          ]
        }
      ]
    },
    "e2d6c67d-c1c1-4321-9513-71001d797de2": {
      "id": "e2d6c67d-c1c1-4321-9513-71001d797de2",
      "type": "Paragraph",
      "value": [
        {
          "id": "81be5573-e59c-4580-b423-49008f981d12",
          "type": "paragraph",
          "children": [
            {
              "text": ""
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 6
      }
    },
    "36af19bb-329a-4edd-bdf5-2b64e033f4fa": {
      "id": "36af19bb-329a-4edd-bdf5-2b64e033f4fa",
      "type": "Paragraph",
      "value": [
        {
          "id": "2d9e2ee6-cdb2-4ab1-a7bd-ac1323e02f65",
          "type": "paragraph",
          "children": [
            {
              "text": "Hi there !"
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 8
      }
    },
    "c119dd4b-5813-4ef5-b2ed-413468001d2c": {
      "id": "c119dd4b-5813-4ef5-b2ed-413468001d2c",
      "type": "Paragraph",
      "value": [
        {
          "id": "185a3f94-e9e2-4847-b8df-6fcaa85bf70c",
          "type": "paragraph",
          "children": [
            {
              "text": "It’s been a while since you’ve heard from me, but I’m still here—alive and kicking, better than ever! Life has been full of exciting changes and challenges, both personally and professionally, and I thought it was time to share a bit about what’s been going on."
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 9
      }
    },
    "5f2dabb6-952d-4a05-95a3-28004e889956": {
      "id": "5f2dabb6-952d-4a05-95a3-28004e889956",
      "type": "HeadingThree",
      "meta": {
        "depth": 0,
        "order": 10
      },
      "value": [
        {
          "id": "17770ea1-078b-40cc-863c-f0143ba4cb78",
          "type": "heading-three",
          "props": {
            "nodeType": "block"
          },
          "children": [
            {
              "text": "👀 Rediscovering the World Through New Eyes "
            }
          ]
        }
      ]
    },
    "1771841b-8630-401a-ae3f-b2b8989feec8": {
      "id": "1771841b-8630-401a-ae3f-b2b8989feec8",
      "type": "Paragraph",
      "value": [
        {
          "id": "8b8ed9a7-034f-40a9-950f-11164debccf1",
          "type": "paragraph",
          "children": [
            {
              "text": "These days, a lot of my free time is spent with my 2-year-old son. Exploring the world through his eyes has been an incredible experience—there’s so much to learn from a child's curiosity and sense of wonder. It’s been grounding and inspiring in ways I didn’t expect!"
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 11
      }
    },
    "6ce92e74-ee65-42fc-b318-3c8c98d9f985": {
      "id": "6ce92e74-ee65-42fc-b318-3c8c98d9f985",
      "type": "Divider",
      "meta": {
        "depth": 0,
        "order": 13
      },
      "value": [
        {
          "id": "600f2b70-5438-4c46-9660-29a70449c99a",
          "type": "divider",
          "props": {
            "nodeType": "void",
            "theme": "solid",
            "color": "#EFEFEE"
          },
          "children": [
            {
              "text": ""
            }
          ]
        }
      ]
    },
    "2746b39e-e945-4816-889c-f5a9d3c7ca51": {
      "id": "2746b39e-e945-4816-889c-f5a9d3c7ca51",
      "type": "Paragraph",
      "value": [
        {
          "id": "9bbabb1b-2f81-4810-ac4b-6407a5e14d76",
          "type": "paragraph",
          "children": [
            {
              "text": ""
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 12
      }
    },
    "5b3fdb5f-fb03-4f3a-9c8f-e66bddc6bb3b": {
      "id": "5b3fdb5f-fb03-4f3a-9c8f-e66bddc6bb3b",
      "type": "Paragraph",
      "value": [
        {
          "id": "ed1b24c3-df25-49eb-826d-6e069737fea5",
          "type": "paragraph",
          "children": [
            {
              "text": ""
            }
          ]
        }
      ],
      "meta": {
        "align": "left",
        "depth": 0,
        "order": 14
      }
    }
  });

  return (
    <div>
      {
        editor !== null && editorOptions !== null && <>
          <EmailBuilder
            editor={editor}
            value={value}
            onChange={setValue}
          />
          <div>
            <input type="text" placeholder="Newsletter Subject" className="js-newsletter-subject" />
            <button onClick={() =>sendNewsletter(editor.getEmail(value, editorOptions.template))}>
              Send
            </button>
          </div>
        </>
      }



      ----
      {JSON.stringify(value)}
    </div>
  );
}