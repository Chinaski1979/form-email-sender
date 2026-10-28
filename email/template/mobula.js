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
  // --- New fields for Content Brief ---
  socialMedia: 'Redes sociales',
  location: 'Ubicación',
  whatYouSell: 'Qué venden / Qué ofrecen',
  mainProduct: 'Producto principal',
  whyChooseYou: 'Por qué los eligen',
  projectGoal: 'Objetivo del proyecto',
  projectGoalOther: 'Otro (objetivo)',
  audienceInterests: 'Intereses de la audiencia',
  audienceInterestsOther: 'Otro (intereses de audiencia)',
  availableMaterials: 'Materiales disponibles',
  materialsLink: 'Enlace a materiales',
  visualStyleAction: 'Acción sobre estilo visual',
  visualStyleLookingFor: 'Estilo visual deseado',
  visualReferences: 'Referencias visuales',
  visualDislikes: 'Lo que NO les gusta visualmente',
  toneOfVoice: 'Tono de voz',
  pronoun: 'Pronombre',
  needsToDevelop: 'Piezas a desarrollar',
  needsToDevelopOther: 'Otro (piezas a desarrollar)',
  channels: 'Canales',
  channelsOther: 'Otro (canales)',
  formats: 'Formatos',
  formatsOther: 'Otro (formatos)',
  quantity: 'Cantidad / Frecuencia',
  deliveryDate: 'Fecha de entrega estimada',
  additionalInfo: 'Información adicional',
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

  const rows = Object.entries(reqBody)
    .filter(([, value]) => value != null && String(value).trim() !== '')
    .map(([key, value]) => {
      const label = LABELS_BRIEF[key] || key;
      const formattedValue = String(value).replace(/\n/g, '<br>');
      return `
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-weight: bold; width: 35%; color: #1a1a1a;">${label}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; color: #4a4a4a; line-height: 1.5;">${formattedValue}</td>
        </tr>
      `;
    });

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: #211ee1; color: #ffffff; padding: 25px 30px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">MOBULA ESTUDIO</h2>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #cccccc; text-transform: uppercase; letter-spacing: 2px;">Nuevo Brief Recibido</p>
      </div>
      <div style="padding: 30px;">
        <p style="margin-top: 0; margin-bottom: 25px; color: #666666; font-size: 15px;">Hola, se ha recibido una nueva solicitud a través del formulario de Brief. Aquí están los detalles proporcionados por el cliente:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background-color: #fafafa; border-radius: 6px; overflow: hidden;">
          <tbody>
            ${rows.join('')}
          </tbody>
        </table>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px 30px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee;">
        Este es un mensaje automático generado desde el sitio web de Mobula Estudio.
      </div>
    </div>
  `;
};

module.exports = { mobulaCommonTemplate, mobulaBriefTemplate };