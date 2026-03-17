const LABELS_BRIEF = {
  type: 'Tipo',
  companyName: 'Empresa',
  contactName: 'Nombre contacto',
  email: 'Email',
  website: 'Sitio web',
  sectorOrIndustry: 'Sector/industria',
  timeInMarket: 'Tiempo en mercado',
  starProduct: 'Producto estrella',
  averageValue: 'Valor promedio',
  servicesOfInterest: 'Servicios de interés',
  expectedResults: 'Resultados esperados',
  painPoints: 'Puntos de dolor',
  painPointsOther: 'Otro (puntos de dolor)',
  strategiesTried: 'Estrategias intentadas',
  targetAudience: 'Público objetivo',
  competition: 'Competencia',
  differentiation: 'Diferenciación',
  budget: 'Presupuesto',
  howDidYouHear: 'Cómo nos conoció',
};

const mobulaCommonTemplate = (reqBody) => {
  const fields = Object.entries(reqBody);

  const list = fields
    .map(([key, value]) => {
      return (
        `<li> 
          <b>
            ${key}: 
          </b>
          ${value}
        </li>`
      );
    });

  return `<ul>${list.join('')}</ul>`;
};

const mobulaBriefTemplate = (reqBody) => {
  if (!reqBody || typeof reqBody !== 'object') return '<p>Sin datos</p>';

  const list = Object.entries(reqBody)
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(([key, value]) => {
      const label = LABELS_BRIEF[key] || key;
      return `<li><b>${label}:</b> ${String(value)}</li>`;
    });

  return `<h3>Nuevo Brief Mobula</h3><ul>${list.join('')}</ul>`;
};

module.exports = { mobulaCommonTemplate, mobulaBriefTemplate };