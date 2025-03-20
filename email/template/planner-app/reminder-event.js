const reminderEventTemplate = (item) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    
        <!-- Sección centrada (encabezado) -->
        <div style="text-align: center; margin-bottom: 20px; color:rgb(20, 20, 20)">
          <h2 style="color:rgb(20, 20, 20); margin: 0;">
          Hello:
            <b style="color: teal;">${item.clientName || ''}</b>
          </h2>
          <p style="color:rgb(20, 20, 20; margin: 5px 0 0 0;">
           This email is to remind you of your
            <b style="color: teal;">${item?.eventType || ''}</b> 
            at: <b style="color: teal;">${item.startDate || ''}</b> 
           at
            <b style="color: teal;">${item.locationName || ''}</b>
          </p>
        </div>
    
        <!-- Título de la sección de información -->
        <h2 style="color: teal; margin-bottom: 10px; text-align: center;">
         Event Information:
        </h2>
    
        <!-- Contenedor de la información -->
        <div style="padding: 10px;">
          <table 
            style="
              width: 100%; 
              border-collapse: collapse; 
              table-layout: fixed; /* Para respetar los anchos fijos */
              color:rgb(20, 20, 20)
            "
          >
            <tr>
              <td 
                style="
                  width: 40%; 
                  padding: 8px; 
                  text-align: left; 
                  font-weight: bold;
                "
              >
                Location:
              </td>
              <td 
                style="
                  width: 60%; 
                  padding: 8px; 
                  text-align: right;
                "
              >
                ${item.locationName || 'N/A'}
              </td>
            </tr>
    
            <tr>
              <td 
                style="
                  width: 40%; 
                  padding: 8px; 
                  text-align: left; 
                  font-weight: bold;
                "
              >
                Start Date:
              </td>
              <td 
                style="
                  width: 60%; 
                  padding: 8px; 
                  text-align: right;
                "
              >
                ${item.startDate || 'N/A'}
              </td>
            </tr>
    
            <tr>
              <td 
                style="
                  width: 40%; 
                  padding: 8px; 
                  text-align: left; 
                  font-weight: bold;
                "
              >
                Menu Items:
              </td>
              <td 
                style="
                  width: 60%; 
                  padding: 8px; 
                  text-align: right;
                "
              >
                ${(item.menuItems.toString() || [])}
              </td>
            </tr>
    
            <tr>
              <td 
                style="
                  width: 40%; 
                  padding: 8px; 
                  text-align: left; 
                  font-weight: bold;
                "
              >
                Staff Members:
              </td>
              <td 
                style="
                  width: 60%; 
                  padding: 8px; 
                  text-align: right;
                "
              >
                ${(item?.staff || [])
                    .map((i) => `${i.name || ''} ${i.lastName || ''}`)
                    .join(', ') || 'N/A'
                }
              </td>
            </tr>
          </table>
        </div>
      </div>
      `;
};

module.exports = { reminderEventTemplate };