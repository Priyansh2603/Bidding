import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormComponent = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/form', data);
      alert('Form submitted successfully!');
      reset();
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100 ">
      <div className="w-full bg-gray-800 p-10 w-full shadow-2xl max-h-screen rounded-xl border border-gray-700">
        <h2 className="text-4xl font-semibold text-center mb-10 text-emerald-400">Apply Now</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-1">Applying For</label>
            <select {...register('applyingFor')} className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Name</label>
            <input {...register('name')} placeholder="Enter your name" className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500" required />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-1">Company Name (Optional)</label>
            <input {...register('companyName')} placeholder="Enter company name" className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-1">Mobile No</label>
            <input {...register('mobile')} placeholder="Enter mobile number" className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500" required />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-1">Email (Optional)</label>
            <input {...register('email')} placeholder="Enter email" className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-1">Business Category</label>
            <input {...register('businessCategory')} placeholder="Enter business category" className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500" required />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-1">GST Status</label>
            <select {...register('gstStatus')} className="w-full p-3 border border-gray-700 bg-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="gst">GST</option>
              <option value="non-gst">Non-GST</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition duration-300">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
