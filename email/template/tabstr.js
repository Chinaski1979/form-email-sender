const FALLBACK_LABELS = {
  name: 'Nombre',
  email: 'Email',
  phone: 'Teléfono',
  company: 'Empresa',
  operation: 'Tipo de operación',
  message: 'Mensaje',
};

const OPERATION_LABELS = {
  'restaurant-multi': 'Restaurante multi-sucursal',
  restaurant: 'Restaurante',
  bar: 'Bar',
  retail: 'Retail',
  other: 'Otro',
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const autoFormatLabel = (key) => key
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/[_-]/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const resolveLabel = (key, customLabels = {}) => (
  customLabels[key] || FALLBACK_LABELS[key] || autoFormatLabel(key)
);

const parseTabstrPayload = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { fields: {}, customLabels: {}, fieldOrder: [] };
  }

  const customLabels = (body._labels && typeof body._labels === 'object' && !Array.isArray(body._labels))
    ? body._labels
    : {};

  const fieldOrder = Array.isArray(body._fieldOrder)
    ? body._fieldOrder.filter((key) => typeof key === 'string')
    : [];

  const fields = Object.fromEntries(
    Object.entries(body).filter(([key]) => !key.startsWith('_')),
  );

  return { fields, customLabels, fieldOrder };
};

const formatValue = (key, value) => {
  if (value === undefined || value === null) return '';

  if (Array.isArray(value)) {
    return escapeHtml(value.map(String).join(', '));
  }

  if (typeof value === 'object') {
    return escapeHtml(JSON.stringify(value, null, 2)).replace(/\n/g, '<br>');
  }

  const str = String(value).trim();
  if (!str) return '';

  if (key === 'email') {
    return `<a href="mailto:${escapeHtml(str)}" style="color:#C14E2D;text-decoration:none;">${escapeHtml(str)}</a>`;
  }
  if (key === 'operation' && OPERATION_LABELS[str]) {
    return escapeHtml(OPERATION_LABELS[str]);
  }
  return escapeHtml(str).replace(/\n/g, '<br>');
};

const buildFieldEntries = (fields, fieldOrder) => {
  const entries = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '');

  if (!fieldOrder.length) return entries;

  const entryMap = new Map(entries);
  const ordered = fieldOrder
    .filter((key) => entryMap.has(key))
    .map((key) => [key, entryMap.get(key)]);

  const remaining = entries.filter(([key]) => !fieldOrder.includes(key));
  return [...ordered, ...remaining];
};

const buildRows = (body) => {
  const { fields, customLabels, fieldOrder } = parseTabstrPayload(body);

  return buildFieldEntries(fields, fieldOrder)
    .map(([key, value]) => (
      `<tr>
        <td style="padding:14px 16px;border-bottom:1px solid #f0e6e2;color:#C14E2D;font-size:13px;font-weight:700;vertical-align:top;width:36%;">
          ${escapeHtml(resolveLabel(key, customLabels))}
        </td>
        <td style="padding:14px 16px;border-bottom:1px solid #f0e6e2;color:#374151;font-size:14px;line-height:1.5;">
          ${formatValue(key, value)}
        </td>
      </tr>`
    ))
    .join('');
};

const tabstrWordmark = () => (
  `<span style="font-size:32px;font-weight:700;color:#C14E2D;letter-spacing:-1px;line-height:1;">
    tab<span style="color:#F6B954;">&#9889;</span>tr<span style="color:#C14E2D;">.</span>
  </span>`
);

const tabstrEmailLayout = ({ title, intro, rows }) => `
  <div style="margin:0;padding:24px 16px;background:#f5f0ec;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eadfd9;box-shadow:0 2px 8px rgba(193,78,45,0.08);">
      <tr>
        <td style="padding:28px 32px 24px;background:#fff9f6;border-top:4px solid #F6B954;border-bottom:1px solid #f0e6e2;">
          ${tabstrWordmark()}
          <p style="margin:10px 0 0;font-size:12px;color:#C14E2D;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;opacity:0.85;">
            Lightning Fast POS
          </p>
          <h1 style="margin:14px 0 0;font-size:20px;font-weight:700;color:#2d2d2d;line-height:1.3;">
            ${escapeHtml(title)}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 8px;color:#6b7280;font-size:14px;line-height:1.5;">
          ${escapeHtml(intro)}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#faf8f7;border:1px solid #f0e6e2;border-radius:8px;overflow:hidden;">
            ${rows || '<tr><td style="padding:14px 16px;color:#6b7280;font-size:14px;">Sin datos</td></tr>'}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 24px;background:#fff9f6;border-top:1px solid #f0e6e2;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
            Mensaje automático ·
            <a href="https://www.tabstr.net" style="color:#C14E2D;text-decoration:none;font-weight:600;">tabstr.net</a>
          </p>
        </td>
      </tr>
    </table>
  </div>`;

const tabstrCommonTemplate = (fields) => tabstrEmailLayout({
  title: 'Nuevo formulario de contacto',
  intro: 'Se recibió una nueva consulta desde el sitio web de Tabstr:',
  rows: buildRows(fields),
});

const tabstrBriefTemplate = (fields) => tabstrEmailLayout({
  title: 'Nuevo Brief recibido',
  intro: 'Se recibió un nuevo Brief desde el sitio web de Tabstr:',
  rows: buildRows(fields),
});

module.exports = { tabstrCommonTemplate, tabstrBriefTemplate };
