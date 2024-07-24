
import twilio from 'twilio';


// Email

// Notification

// OTP
export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime( new Date().getTime() + (30 * 60 * 1000) );

  return { otp, expiry };
}

export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    const response = await client.message.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_FROM_PHONE_NUMBER as string,
      to: `+212${toPhoneNumber}`
    });
    
    return response;
  }
  catch (error) {
    return false;
  }
}

// Payment notification or Emails