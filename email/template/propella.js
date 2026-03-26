const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatLabel = (key) => key
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/[_-]/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const propellaCommonTemplate = (fields) => {
  const rows = Object.entries(fields || {})
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => (
      `<tr>
        <td style="padding:12px;border-bottom:1px solid #e8edf5;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;width:34%;">
          ${escapeHtml(formatLabel(key))}
        </td>
        <td style="padding:12px;border-bottom:1px solid #e8edf5;color:#111827;font-size:14px;line-height:1.45;">
          ${escapeHtml(value)}
        </td>
      </tr>`
    ))
    .join('');

  return `
  <div style="margin:0;padding:24px;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #e5eaf3;border-radius:10px;overflow:hidden;">
      <tr>
        <td style="padding:18px 24px;background:#0f172a;color:#ffffff;">
          <h2 style="margin:0;font-size:20px;font-weight:700;">Nuevo formulario recibido</h2>
          <p style="margin:6px 0 0 0;font-size:13px;opacity:.9;">Propella Website</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 8px 24px;color:#374151;font-size:14px;">
          Se registró una nueva consulta desde el sitio. Detalle de campos:
        </td>
      </tr>
      <tr>
        <td style="padding:8px 24px 24px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e8edf5;border-radius:8px;overflow:hidden;">
            ${rows || '<tr><td style="padding:12px;color:#6b7280;font-size:14px;">Sin datos</td></tr>'}
          </table>
        </td>
      </tr>
    </table>
  </div>`;
};

module.exports = { propellaCommonTemplate };