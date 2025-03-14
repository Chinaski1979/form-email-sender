const commissionReportTemplate = (body) => {
    const { startDate, endDate } = body;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Commission Report</h2>
        
       
        
        <p>Please find attached your commission report for the period:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p style="margin: 0;">
            <strong>Period:</strong> ${startDate} to ${endDate}
          </p>
        </div>
        
        <p>The PDF report includes detailed information about:</p>
        <ul style="color: #666;">
          <li>Events managed during this period</li>
          <li>Revenue generated per event</li>
          <li>Commission calculations</li>
          <li>Total earnings</li>
        </ul>
        
        <p>If you have any questions about this report, please don't hesitate to contact our support team.</p>
        
        <p style="margin-top: 30px;">Best regards,<br>Your Management Team</p>
      </div>
    `;
};

module.exports = { commissionReportTemplate }; 