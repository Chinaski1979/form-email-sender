const confirmationEventTemplate = (item) => {
  const mainEventTemplate = `
    <h3 style='color:black'>
      Hi ${item?.clientName}
    </h3>
    <p style='color:black'>
      Your event has been confirmed for: ${item?.startDate}, in the location: <b style="color:teal">${item?.locationName}</b>
    </p>
    <h5>
      <b style="color:teal">Service Information:</b>
    </h5>
    <ul style='color:black'>
      <li>Event Type: ${item?.eventTypeName}</li>
      <li>PAX#: ${item?.headcount?.toddlers + item?.headcount?.adults}</li>
      <li>Location: ${item?.locationName}</li>
      <li>Date: ${item?.startDate}</li>
      <li>Menu Items: ${item?.menuName}</li>
    </ul>
    <h5>
      <b style="color:teal">Client Information:</b>
    </h5>
    <ul style='color:black'>
      <li>Client Name: ${item?.clientName}</li>
      <li>Client Email: ${item?.clientEmail}</li>
      <li>Client Phone: ${item?.clientPhone}</li>
    </ul>
    <h5>
      <b style="color:teal">Price Breakdown:</b>
    </h5>
    <ul style='color:black'>
      <li>Service Charge: $${item?.serviceCharge?.toFixed(2)}</li>
      <li>Additional Charges: $${item?.additionalCharges?.toFixed(2)}</li>
      <li><b>Total Amount: $${item?.grandTotal?.toFixed(2)}</b></li>
    </ul>
  `;

  // if is parent event and has children events, add the children events to the template
  if (item?.isParentEvent && item?.childrenEvents?.length > 0) {
    const childrenEventsTemplate = item.childrenEvents.map((childEvent, index) => `
      <p style="margin-top: 15px; color:black">
        <b>Event #${index + 1}:</b><br>
        Date: ${childEvent?.startDate}<br>
        Event Type: ${childEvent?.eventType}<br>
        Menu Items: ${childEvent?.menuItems}<br>
        Staff: ${childEvent?.staff}
      </p>
    `).join('');

    return mainEventTemplate + `
      <h4 style="margin-top: 30px; color:teal">Related Events Information:</h4>
      ${childrenEventsTemplate}
    `;
  }

  return mainEventTemplate;
};

module.exports = { confirmationEventTemplate }; 