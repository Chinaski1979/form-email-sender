const feedbackTemplate = () => {
    const GOOGLE_FORM_URL = "https://forms.gle/LFB5UdoqVo6SeqCr9";
    const GOOGLE_REVIEWS_URL = "https://acortar.link/pr2981";
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for choosing us!</h2>
        
        <p>We truly appreciate your trust in us to provide you with a unique culinary experience. We put our heart into every dish, and your satisfaction is our greatest reward.</p>
        
        <p>We would love to hear your feedback! Your comments help us improve and continue offering the best for you.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <p>Leave us your review here:</p>
          <div style="margin: 20px 0;">
            <a href="${GOOGLE_FORM_URL}" style="display: inline-block; text-decoration: none; padding: 10px; color: #666; font-size: 24px;">⭐</a>
            <a href="${GOOGLE_FORM_URL}" style="display: inline-block; text-decoration: none; padding: 10px; color: #666; font-size: 24px;">⭐</a>
            <a href="${GOOGLE_FORM_URL}" style="display: inline-block; text-decoration: none; padding: 10px; color: #666; font-size: 24px;">⭐</a>
            <a href="${GOOGLE_REVIEWS_URL}" style="display: inline-block; text-decoration: none; padding: 10px; color: #666; font-size: 24px;">⭐</a>
            <a href="${GOOGLE_REVIEWS_URL}" style="display: inline-block; text-decoration: none; padding: 10px; color: #666; font-size: 24px;">⭐</a>
          </div>
          <p style="font-size: 14px; color: #666;">Click on a star to leave your rating</p>
        </div>
        
        <p>Looking forward to serving you again soon. Thank you for being part of our culinary family!</p>
      </div>
    `;
};


module.exports = { feedbackTemplate };