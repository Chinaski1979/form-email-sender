const confirmationEventToManagerTemplate = (item) => {
  const mainEventTemplate = `
    <h3 style='color:black'>
      Hi ${item?.managerName}
    </h3>
    <p style='color:black'>New event by <b style="color:teal">${item?.companyName}</b> scheduled at your property.</p>
    <p style='color:black'>An event has been confirmed at <b style="color:teal">${item?.locationName}</b></p>
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
      <b style="color:teal">Financial Information:</b>
    </h5>
    <ul style='color:black'>
      <li>Service Charge: $${item?.serviceCharge?.toFixed(2)}</li>
      <li>Additional Charges: $${item?.additionalCharges?.toFixed(2)}</li>
      <li><b>Total Amount: $${item?.grandTotal?.toFixed(2)}</b></li>
    </ul>
  `;

  // If it's a parent event, add the information of the children events
  if (item?.isParentEvent && item?.childrenEvents?.length > 0) {
    const childrenEventsTemplate = item.childrenEvents.map((childEvent, index) => `
      <div style="margin-top: 20px; padding: 10px; border: 1px solid teal; border-radius: 5px;">
        <h4 style="color:teal">Related Event #${index + 1}</h4>
        <ul style='color:black'>
          <li>Event Type: ${childEvent?.eventType}</li>
          <li>PAX#: ${childEvent?.headcount?.toddlers + childEvent?.headcount?.adults}</li>
          <li>Location: ${childEvent?.location}</li>
          <li>Date: ${childEvent?.startDate}</li>
          <li>Menu Items: ${childEvent?.menuItems}</li>
          <li>Staff: ${childEvent?.staff}</li>
        </ul>
      </div>
    `).join('');

    return mainEventTemplate + `
      <h4 style="margin-top: 30px; color:teal">Related Events Information:</h4>
      <p style='color:black'>This is a multiple event booking. Below you can find the details for all related events:</p>
      ${childrenEventsTemplate}
    `;
  }

  return mainEventTemplate;
};

module.exports = { confirmationEventToManagerTemplate }; 