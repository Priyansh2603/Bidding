
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UserAxiosAPI from "../api/userAxiosAPI";
// import { login } from "../redux/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
// import { clearCart, setCart } from "../redux/cart/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login({ setUser }) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    //   const cart = useSelector((state) => state.cart.items)
    //   const axios = UserAxiosAPI();
    //   const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authMethod, setAuthMethod] = useState("PHONE");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    useEffect(() => {
        if (!sdkLoaded) {
            const script = document.createElement("script");
            script.id = "otpless-sdk";
            script.src = "https://otpless.com/v4/headless.js";
            script.setAttribute("data-appid", "E3Q3X8BESP4COB9TORA6");
            script.onload = () => {
                setSdkLoaded(true);
                initializeOtpless();
            };
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [sdkLoaded]);

    const initializeOtpless = () => {
        if (!window.OTPless) return;

        const callback = (eventCallback) => {
            const eventHandlers = {
                ONETAP: () => {
                    const { response } = eventCallback;
                    console.log(response);
                    if (response.status === "SUCCESS") {
                    }
                    setToken(response.token);
                    console.log("Authenticated Token:", response.token);
                },
                OTP_AUTO_READ: () => {
                    const { response: { otp } } = eventCallback;
                    setOtp(otp);
                    console.log("Auto-read OTP:", otp);
                },
                FAILED: () => console.error("Authentication Failed", eventCallback),
                FALLBACK_TRIGGERED: () => console.warn("Fallback Triggered", eventCallback),
            };

            if (eventHandlers[eventCallback.responseType]) {
                eventHandlers[eventCallback.responseType]();
            }
        };

        window.OTPlessSignin = new window.OTPless(callback);
    };
    const initiateAuth = (channel) => {
        if (!window.OTPlessSignin) return;

        const options = { channel };
            if (!phone.trim()) return toast("Please enter a phone number.");
            options.phone = phone;
            options.countryCode = "+91"; 
        toast(`Check your ${authMethod}`)
        setOtpSent(true);
        setIsResendDisabled(true);
        setResendTimer(60);
        startResendTimer();
        window.OTPlessSignin.initiate(options);
    };
    const verifyOTP = async () => {
        const response = await window.OTPlessSignin.verify({
            channel: "PHONE",
            phone,
            otp,
            countryCode: "+91",
        });
        if (response.success) {
            setError('');
            setUser(true)
        } else {
            if (response.statusCode == 400) {
                setError("Invalid Otp!")
            } else {
                setError("Something went wrong!")
            }
        }
    };
    const startResendTimer = () => {
        let timeLeft = 60;
        const interval = setInterval(() => {
            timeLeft -= 1;
            setResendTimer(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(interval);
                setIsResendDisabled(false);
            }
        }, 1000);
    };

    return (
        <div className={`flex items-center justify-center ${ "min-h-[80vh] bg-transparent"} px-4`}>
            <div className={`bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-xl`}>
                <h2 className="text-center text-black text-2xl font-semibold mb-6">Verify Number</h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

                <form  className="space-y-4">

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Phone Number *"
                            value={phone}
                            onChange={(e) => { if (e.target.value?.length > 10) { return }; setPhone(e.target.value) }}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
                        /><span className="absolute left-0 bg-gray-200 px-2 h-full rounded-l-md py-2">+91</span></div>

                        {otpSent ? (
                            <input
                                type="text"
                                placeholder="Enter OTP *"
                                value={otp}
                                onChange={(e) => { setOtp(e.target.value) }}
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        ) : (
                            <button
                                type="button"
                                onClick={() => initiateAuth("PHONE")}
                                className="w-full bg-teal-600 text-white py-2 rounded-md mt-2 hover:bg-gray-700 transition"
                            >
                                Request OTP
                            </button>
                        )}
                    
                    {otpSent && <button
                        type="button"
                        onClick={verifyOTP}
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition"
                    >
                       Verify OTP
                    </button>}
                </form>
                {  otpSent && <div className="flex justify-center">
                    <div className="flex justify-center">
                        {isResendDisabled ? <p
                            onClick={() => initiateAuth("PHONE")}
                            className="px-2 py-1 my-2 text-blue-500 "
                        // disabled={isResendDisabled}
                        >
                            {`Resend OTP in ${resendTimer}s`}
                        </p>
                            : <button
                                onClick={() => initiateAuth("PHONE")}
                                className="px-2 py-1 my-2 text-blue-500 underline bg-gray-100"
                                disabled={isResendDisabled}
                            >
                                Resend OTP
                            </button>}
                    </div>
                </div>}
            </div>
        </div>
    );
}