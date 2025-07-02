const reminderEventTemplate = (item) => {
  // Generar el HTML para cada miembro del staff
  let staffHTML = "";
  item.staffNames.forEach((staff, index) => {
    if (index % 3 === 0) {
      staffHTML += "<tr>";
    }

    staffHTML += `
    <td style="text-align: center; padding: 10px;">
      <img src="${staff.profilePic}" alt="${staff.name} ${staff.lastName}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; display: block; margin: 0 auto;"/>
      
      <p style="margin: 8px 0 0 0; font-size: 14px; color: rgb(20, 20, 20);">
        ${staff.name} ${staff.lastName}
      </p>
    </td>
  `;

    if ((index + 1) % 3 === 0 || index === item.staffNames.length - 1) {
      staffHTML += "</tr>";
    }
  });


  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <!-- Sección centrada (encabezado) -->
      <div style="text-align: center; margin-bottom: 20px; color:rgb(20, 20, 20)">
        <h2 style="color:rgb(20, 20, 20); margin: 0;">
          Hello:
          <b style="color: teal;">${item.clientName || "N/A"}</b>
        </h2>
        <p style="color:rgb(20, 20, 20); margin: 5px 0 0 0;">
          This email is to remind you of your
          <b style="color: teal;">${item?.eventType?.typeName || "N/A"}</b> 
          at: <b style="color: teal;">${item?.startDate}</b> 
          at
          <b style="color: teal;">${item.locationName || "N/A"}</b>
        </p>
      </div>
  
      <!-- Título de la sección de información -->
      <h2 style="color: teal; margin-bottom: 10px; text-align: center;">
        Event Information:
      </h2>
  
      <!-- Contenedor de la información -->
      <div style="padding: 10px;">
        <table style="width: 100%; border-collapse: collapse; table-layout: fixed; color:rgb(20, 20, 20)">
          <tr>
            <td style="width: 40%; padding: 8px; text-align: left; font-weight: bold;">
              Location:
            </td>
            <td style="width: 60%; padding: 8px; text-align: right;">
              ${item.locationName || "N/A"}
            </td>
          </tr>
  
          <tr>
            <td style="width: 40%; padding: 8px; text-align: left; font-weight: bold;">
              Start Date:
            </td>
            <td style="width: 60%; padding: 8px; text-align: right;">
              ${item?.startDate || "N/A"}
            </td>
          </tr>
  
          <tr>
            <td style="width: 40%; padding: 8px; text-align: left; font-weight: bold;">
              Menu Items:
            </td>
            <td style="width: 60%; padding: 8px; text-align: right;">
              ${item.menuItemNames || "N/A"}
            </td>
          </tr>
  
          <tr>
            <td style="width: 40%; padding: 8px; text-align: left; font-weight: bold;">
              Dietary Restrictions/Allergies:
            </td>
            <td style="width: 60%; padding: 8px; text-align: right;">
              ${item?.allergies || "N/A"}
            </td>
          </tr>
        </table>
          <p style='font-weight:bold; margin-left:5px; color:black;'>Total Price: <span style="color: teal;">$
            ${item.grandTotal || "N/A"}
          </span></p>
        <h3 style="color: teal; margin: 20px 0 10px 0; text-align: center;">
          Staff Members
        </h3> 
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
          ${staffHTML}
        </table>
      </div>
    </div>
  `;
};

module.exports = { reminderEventTemplate };