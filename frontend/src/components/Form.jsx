import { useForm } from "react-hook-form";
import axiosAPI from "../api/axiosApi";
import Select from "react-select";
import { useState } from "react";
import toast from "react-hot-toast";

const businessCategories = [
  { value: "retail", label: "Retail" },
  { value: "wholesale", label: "Wholesale" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "manufacturing", label: "Manufacturing & Industrial" },
  { value: "textiles", label: "Textiles & Garments" },
  { value: "electronics", label: "Electronics & Hardware" },
  { value: "pharmaceuticals", label: "Pharmaceuticals & Chemicals" },
  { value: "services", label: "Professional Services" },
  { value: "it-software", label: "IT & Software Development" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "consulting", label: "Consulting Services" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "finance", label: "Finance & Accounting" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "education", label: "Education & Training" },
  { value: "real-estate", label: "Real Estate & Property" },
  { value: "transportation", label: "Transportation & Logistics" },
  { value: "hospitality", label: "Hospitality & Tourism" },
  { value: "construction", label: "Construction & Infrastructure" },
  { value: "agriculture", label: "Agriculture & Farming" },
  { value: "automotive", label: "Automotive & Vehicle Services" },
  { value: "media", label: "Media & Entertainment" },
  { value: "energy", label: "Energy & Renewable Resources" },
  { value: "food-beverage", label: "Food & Beverage" },
  { value: "event-management", label: "Event Management" },
  { value: "other", label: "Other" }
];


const FormComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const axios = axiosAPI();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState("");

  const applyingFor = watch("applyingFor", ""); // Get the selected type
  const mobile = watch("mobile", "");

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Only numbers allowed
    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }
    setValue("mobile", value);
  };

  const onSubmit = async (data) => {
    if (!confirm("Are you sure submitting the form?")) return;
    if (selectedCategory?.value === "other") {
      data.businessCategory = customCategory;
    } else {
      data.businessCategory = selectedCategory?.value;
    }

    try {
      await axios.post("/form", data);
      toast.success("Form submitted successfully!");
      reset();
      setSelectedCategory(null);
      setCustomCategory("");
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  return (
    <div className=" flex bg-white text-gray-900">
      <div className="w-full p-5 md:p-10 shadow-2xl rounded-xl border border-gray-700 relative">
        <p className="text-center">Get Ready to Unlock Endless Opportunities!

          A2Z, your ultimate tender portal, is launching soon!

          Register now and be the first to access.</p>
        <div className="flex justify-center w-full"><div className=" text-nowrap text-center my-4 bg-yellow-400 text-black font-bold px-3 md:px-6 py-2 rounded-full shadow-lg animate-pulse">
          🎉 Early Bird Offer: Apply Free!
        </div></div>
        <h2 className="text-4xl font-semibold text-center mb-10 text-black">
          Apply Now
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Applying For */}
          <div className="md:col-span-2">
            <label className="block text-gray-900 bg-white font-medium mb-1">
              Applying For
            </label>
            <select
              {...register("applyingFor", {
                required: "Applying For is required",
              })}
              required
              className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black"
            >
              <option value="">
                Select Individual/Corporate
              </option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
            </select>
            {errors.applyingFor && (
              <p className="text-red-600 text-sm">
                {errors.applyingFor.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              required
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Company Name (Hidden for Individual) */}
          {applyingFor !== "Individual" && (
            <div>
              <label className="block text-gray-900 bg-white font-medium mb-1">
                Company Name (Optional)
              </label>
              <input
                {...register("companyName")}
                placeholder="Enter company name"
                className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">
              Mobile No
            </label>
            <div className="flex items-center relative rounded-lg">
              <span className="text-gray-900 absolute left-[0.05rem] p-3 px-2 rounded-l-lg bg-gray-200 mr-2">
                +91
              </span>
              <input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="Enter mobile number"
                className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black pl-12"
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-600 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">
              Email (Optional)
            </label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter email"
              className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">
              Business Category
            </label>
            <Select
              options={businessCategories}
              isSearchable
              required
              placeholder="Select or type category"
              className="text-gray-900 w-full p-1 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-0"
              onChange={(selectedOption) => setSelectedCategory(selectedOption)}
            />
            {selectedCategory?.value === "other" && (
              <input
                type="text"
                required
                placeholder="Enter custom category"
                className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black mt-2"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>

          {/* GST Status (Hidden for Individual) */}
          {applyingFor !== "Individual" && (
            <div>
              <label className="block text-gray-900 bg-white font-medium mb-1">
                GST Status
              </label>
              <select
                {...register("gstStatus")}
                className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-black"
              >
                <option value="" disabled>
                  Select GST Status
                </option>
                <option value="gst">GST</option>
                <option value="non-gst">Non-GST</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
