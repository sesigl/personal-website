import { getImage } from 'astro:assets';
import facebookImage from '../../images/newsletter/social_facebook.png';
import linkedInImage from '../../images/newsletter/social_linkedin.png';
import xImage from '../../images/newsletter/social_x.png';
import { BASE_URL, SOCIAL_LINKS } from '../../consts';

async function newsletterFooter() {

    const linkedInImageSrc = (await getImage({ src: linkedInImage, width: 32, height: 32 })).src
    const xImageSrc = (await getImage({ src: xImage, width: 32, height: 32 })).src
    const facebookImageSrc = (await getImage({ src: facebookImage, width: 32, height: 32 })).src

    return `
    <style>
      * { font-family: Inconsolata,Arial,sans-serif; }
      button { 
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          justify-content: center;
          border-radius: 0.375rem;
          transition: 0.2s;
          border-width: 0px;
          background-color: rgb(59, 130, 246);
          color: rgb(255, 255, 255);
          box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px;
          height: 2.25rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
      }
      button a { color: #fff !important; text-decoration: none !important; }
      .js-button-div a { color: #fff !important; text-decoration: none !important; }
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
}

export default newsletterFooter;
