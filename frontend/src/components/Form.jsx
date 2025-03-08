import { useForm } from 'react-hook-form';
import axiosAPI from '../api/axiosApi';
import Navbar from './Navbar';
import Select from 'react-select';
import { useState } from 'react';
import toast from 'react-hot-toast';

const businessCategories = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'services', label: 'Services' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'construction', label: 'Construction' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'other', label: 'Other' }
];


const FormComponent = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const axios = axiosAPI();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState('');

  const onSubmit = async (data) => {
    if(!confirm('Are you sure submitting the form?')) return;
    if (selectedCategory?.value === 'other') {
      data.businessCategory = customCategory;
    } else {
      data.businessCategory = selectedCategory?.value;
    }

    try {
      await axios.post('/form', data);
      toast.success('Form submitted successfully!');
      reset();
      setSelectedCategory(null);
      setCustomCategory('');
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      <div className="w-full p-10 w-full shadow-2xl max-h-screen rounded-xl border border-gray-700">
        <h2 className="text-4xl font-semibold text-center mb-10 text-blue-500">Apply Now</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-900 bg-white font-medium mb-1">Applying For</label>
            <select {...register('applyingFor', { required: 'Applying For is required' })} required className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600">
              <option value="" disabled>Select Buyer/Supplier</option>
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
            {errors.applyingFor && <p className="text-red-600 text-sm">{errors.applyingFor.message}</p>}
          </div>

          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">Name</label>
            <input {...register('name', { required: 'Name is required' })} required placeholder="Enter your name" className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">Company Name (Optional)</label>
            <input {...register('companyName')} placeholder="Enter company name" required className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600" />
          </div>
          
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">Mobile No</label>
            <div className="flex items-center relative rounded-lg ">
              <span className="text-gray-900 absolute left-[0.05rem] p-3 px-2 rounded-l-lg bg-gray-200 mr-2">+91</span>
              <input {...register('mobile', { required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit mobile number' } })} placeholder="Enter mobile number" className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600 pl-12" />
            </div>
            {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">Email (Optional)</label>
            <input required {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })} placeholder="Enter email" className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">Business Category</label>
            <Select
              options={businessCategories}
              isSearchable
              required
              placeholder="Select or type category"
              className="text-gray-900 w-full p-1 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-0"
              onChange={(selectedOption) => setSelectedCategory(selectedOption)}
            />
            {selectedCategory?.value === 'other' && (
              <input
                type="text"
                required={selectedCategory?.value === 'other'}
                placeholder="Enter custom category"
                className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600 mt-2"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>
          
          <div>
            <label className="block text-gray-900 bg-white font-medium mb-1">GST Status</label>
            <select {...register('gstStatus', { required: 'GST Status is required' })} required className="w-full p-3 border border-gray-700 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600">
            <option value="" disabled>Select GST Status</option>
              <option value="gst">GST</option>
              <option value="non-gst">Non-GST</option>
            </select>
            {errors.gstStatus && <p className="text-red-600 text-sm">{errors.gstStatus.message}</p>}
          </div>
          
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;