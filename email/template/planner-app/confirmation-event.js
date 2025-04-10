
const confirmationEventTemplate = (item) => {
  return (
    `
      <h3 style='color:black'>
        Hi ${item?.clientName}
      </h3>
      <p  style='color:black'>
        Your event has been confirmed for: ${item?.startDate} at ${item?.startTime}, in the location: <b style="color:teal">${item?.locationName}</b>
      </p>
      <h5>
        <b style="color:teal">Service Information:</b>
      </h5>
      <ul style='color:black'>
        <li>PAX#: ${item?.headcount?.toddlers + item?.headcount?.adults}</li>
        <li>Location: ${item?.locationName}</li>
        <li>Date: ${item?.startDate}</li>
        <li>Menu Items: ${item?.menuName}</li>
        <li>Staff: ${item?.staff}</li>
      </ul>
      <h5>
        <b style="color:teal">Client Information:</b>
      </h5>
      <ul style='color:black'>
        <li>Client Name: ${item?.clientName}</li>
        <li> Client Email: ${item?.clientEmail} </li>
        <li>Client Phone: ${item?.clientPhone} </li>
      </ul>
    `
  );
};

module.exports = { confirmationEventTemplate };