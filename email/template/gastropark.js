const gastroparkCommonTemplate = (reqBody) => {
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

module.exports = { gastroparkCommonTemplate };