const fs = require('fs');
const path = require('path');

const LOGO_SVG_PATH = path.resolve(__dirname, '../assets/junglemat-logo.svg');
const logoBase64 = fs.readFileSync(LOGO_SVG_PATH).toString('base64');
const logoDataUri = `data:image/svg+xml;base64,${logoBase64}`;

const junglematCommonTemplate = (fields) => {
  const rows = Object.entries(fields || {}).map(([key, value]) => {
    const safeKey = (key || '').toString().trim();
    const safeValue = (value || '').toString().trim();
    return `
      <tr style="border-bottom: 1px solid #eaeaea;">
        <td style="padding: 18px 10px 18px 0; font-weight: 600; color: #555555; font-size: 13px; vertical-align: top; width: 30%;">
          ${safeKey}
        </td>
        <td style="padding: 18px 0 18px 10px; color: #333333; font-size: 15px; line-height: 1.5; vertical-align: top; width: 70%;">
          ${safeValue}
        </td>
      </tr>`;
  }).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @media screen and (max-width: 600px) {
        .field-row { display: block !important; }
        .label { width: 100% !important; }
        .value { width: 100% !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 20px;">
          <table class="container" width="600" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 12px; overflow: hidden;">
            <!-- Header with Logo -->
            <tr>
              <td style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 36px 30px; text-align: center; border-bottom: 2px solid #e91e63;">
                <a href="https://junglemat.com" target="_blank" style="text-decoration: none;">
                  <img src="${logoDataUri}" alt="JungleMat" width="200" style="display: block; max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                </a>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding: 36px 40px 10px 40px;">
                <h1 style="margin: 0; color: #2c3e50; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Nuevo formulario recibido</h1>
                <p style="margin: 10px 0 0 0; color: #7f8c8d; font-size: 15px; font-weight: 500;">Formulario de contacto desde <strong style="color: #e91e63;">junglemat.com</strong></p>
              </td>
            </tr>

            <!-- Field Grid -->
            <tr>
              <td style="padding: 10px 40px 40px 40px;">
                <table width="100%" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                  ${rows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

module.exports = { junglematCommonTemplate };
