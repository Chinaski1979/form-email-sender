const staffPaymentReportTemplate = (body) => {
    const { startDate, endDate, staffName } = body;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Staff Payment Report</h2>
        
        <p>Please find attached your payment report for the period:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p style="margin: 0;">
            <strong>Staff:</strong> ${staffName}
          </p>
          <p style="margin: 5px 0 0 0;">
            <strong>Period:</strong> ${startDate} to ${endDate}
          </p>
        </div>
        
        <p>The PDF report includes detailed information about:</p>
        <ul style="color: #666;">
          <li>Events worked during this period</li>
          <li>Breakdown by event type</li>
          <li>Dates, client names, and locations</li>
          <li>Total events per category</li>
        </ul>
        
        <p>If you have any questions about this payment report, please don't hesitate to contact our accounting department.</p>
        
        <p style="margin-top: 30px;">Best regards,<br>Hermosa Software Management Team</p>
      </div>
    `;
};

module.exports = { staffPaymentReportTemplate };
