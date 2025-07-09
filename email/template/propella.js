const propellaCommonTemplate = (fields) => {
  const list = Object.entries(fields)
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

module.exports = { propellaCommonTemplate };