const confirmationEventToManagerTemplate = (item) => {
    return (
        `
            <h3 style='color:black'>
                Hi ${item?.managerName}
            </h3>
            <p  style='color:black'>New event by <b style="color:teal">${item?.companyName}</b> schenduled at your property.</p>
            <p  style='color:black'>An event has been confirmed at <b style="color:teal">${item?.locationName}</b></p>
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
              <li> Client Email: ${item?.clientEmail} </li>
              <li>Client Phone: ${item?.clientPhone} </li>
            </ul>
            <h5>
              <b style="color:teal">Financial Information:</b>
            </h5>
            <ul style='color:black'>
              <li>Service Charge: $${item?.serviceCharge?.toFixed(2)}</li>
              <li>Additional Charges: $${item?.additionalCharges?.toFixed(2)}</li>
              <li><b>Total Amount: $${item?.grandTotal?.toFixed(2)}</b></li>
            </ul>
        `
    );
};

module.exports = { confirmationEventToManagerTemplate };