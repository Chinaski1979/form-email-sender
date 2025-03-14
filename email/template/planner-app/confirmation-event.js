const confirmationEventTemplate = (reqBody) => {
    return `<h3 style='color:black'>
            Hi Dear hola !!!
            </h3>`;
  const fields = [reqBody];
  const list = fields.map((item) => {
    return `<h3 style='color:black'>
            Hi Dear ${item.clientName} !!!
            </h3>
        <p  style='color:black'>Your event has been confirmed for: ${item.startDate} at ${item.startTime} , in the location: <b style="color:teal">${item.location.name}</b></p>
          <h5>
            <b style="color:teal">Service Information:</b>
          </h5>
          <ul style='color:black'>
            <li>FAX#: ${item.headcount?.toddlers + item.headcount.adults}</li>
            <li>Location: ${item.location?.name}</li>
            <li>Date: ${item?.startDate}</li>
            <li>Menu Items: ${item?.menuItems[0]?.name}</li>
            <li>Staff: ${item.staff[0].name} ${item?.staff[0]?.lastName}</li>
          </ul>
          <h5>
            <b style="color:teal">Client Information:</b>
          </h5>
          <ul style='color:black'>
            <li>Client Name: ${item.clientName}</li>
            <li> Client Email: ${item.clientEmail} </li>
            <li>Client Phone: ${item.clientPhone} </li>
          </ul>
        `;
  });

  return `${list.join("")}`;
};

module.exports = { confirmationEventTemplate };