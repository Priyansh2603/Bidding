import { useState } from "react";

const OtpLessLogin = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize OTPless SDK
  const OTPlessSignin = new OTPless((eventCallback) => {
    console.log(eventCallback)
    if (eventCallback.responseType === "ONETAP") {
      console.log("Login Successful:", eventCallback.response);
      alert("Login Successful!");
    } else if (eventCallback.responseType === "FAILED") {
      console.log("Login Failed:", eventCallback.response);
      alert("Login Failed. Try again.");
    }
  });

  // Function to send login link via SMS
  const requestLoginLink = () => {
    if (!phone) {
      alert("Enter a valid phone number");
      return;
    }

    setLoading(true);
    setMessage("");

    OTPlessSignin.initiate({
      channel: "PHONE",  // SMS me link bhejne ke liye
      phone: phone,
      countryCode: "+91", // India ke liye, apne country code ke hisaab se change kar sakte ho
    });

    setTimeout(() => {
      setLoading(false);
      setMessage("Login link sent! Check your SMS.");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-lg w-80 mx-auto">
      <h2 className="text-xl font-bold">Login via SMS Link</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-full"
      />
      
      <button
        onClick={requestLoginLink}
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Login Link"}
      </button>

      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default OtpLessLogin;
