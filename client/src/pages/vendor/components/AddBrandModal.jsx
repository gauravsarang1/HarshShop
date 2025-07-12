import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  LuInfo,
  LuImage,
  LuHeart,
  LuChartBar,
  LuGlobe,
  LuInstagram,
  LuTwitter,
  LuFacebook,
  LuTrash2,
  LuPlus,
  LuSparkles,
  LuUpload,
  LuCheck
} from "react-icons/lu";
import { BarChart3 } from 'lucide-react';


const InputWithLabel = ({ id, label, type = "text", value, onChange = handleChange, placeholder }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="transition-all duration-200 border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 hover:border-slate-300 dark:hover:border-slate-600"
        required
      />
    </div>
  );

const AddBrandModal = ({ 
  isOpen, 
  onClose, 
  onAdd,
  loading,
  error
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    story: '',
    yearFounded: '',
    globalPresence: '',
    employees: '',
    annualRevenue: '',
    instagram: '',
    twitter: '',
    facebook: ''
  });
  const [values, setValues] = useState(['']);
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const addValue = () => {
    if (values.length < 6) {
      setValues([...values, '']);
    }
  };

  const removeValue = (index) => {
    if (values.length > 1) {
      const newValues = values.filter((_, i) => i !== index);
      setValues(newValues);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      story: '',
      yearFounded: '',
      globalPresence: '',
      employees: '',
      annualRevenue: '',
      instagram: '',
      twitter: '',
      facebook: ''
    });
    setValues(['']);
    setLogo(null);
    setCoverImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!logo) {
      toast({
        title: "Error",
        description: "Please select a logo image",
        variant: "destructive"
      });
      return;
    }

    if (!coverImage) {
      toast({
        title: "Error",
        description: "Please select a cover image",
        variant: "destructive"
      });
      return;
    }

    // Filter out empty values
    const filteredValues = values.filter(value => value.trim() !== '');

    const brandData = {
      name: formData.name,
      logo: logo,
      coverImage: coverImage,
      description: formData.description,
      story: formData.story,
      values: filteredValues,
      stats: {
        yearFounded: parseInt(formData.yearFounded),
        globalPresence: formData.globalPresence,
        employees: formData.employees,
        annualRevenue: formData.annualRevenue
      },
      socialLinks: {
        instagram: formData.instagram,
        twitter: formData.twitter,
        facebook: formData.facebook
      }
    };

    onAdd(brandData);
    {/*if(!loading.brands || !error.brands) {
      resetForm();
      onClose();
    }*/}
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const FileUploadCard = ({ id, label, file, onChange, icon: Icon }) => (
    <div className="relative">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
        {label}
      </Label>
      <div className="relative group">
        <Input
          id={id}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          multiple={false}
          required
        />
        <div className={`
          border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer
          ${file 
            ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-600' 
            : 'border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20'
          }
        `}>
          <div className="flex flex-col items-center gap-2">
            {file ? (
              <LuCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            ) : (
              <Icon className="w-8 h-8 text-slate-400 dark:text-slate-500 group-hover:text-violet-500 transition-colors" />
            )}
            <div>
              <p className={`font-medium ${file ? 'text-green-700 dark:text-green-300' : 'text-slate-700 dark:text-slate-300'}`}>
                {file ? file.name : `Upload ${label}`}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {file ? 'File selected' : 'Click to browse or drag and drop'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-slate-900 border-0 shadow-2xl">
        {/* Header with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-600/90 to-pink-600/90"></div>
          <DialogHeader className="relative p-8 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <LuSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Add New Brand
                </DialogTitle>
                <p className="text-violet-100 mt-1">
                  Create a compelling brand presence with detailed information
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-10">
          {/* Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <LuInfo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Basic Information
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Essential details about your brand
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <InputWithLabel
                id="name"
                label="Brand Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your brand name"
              />
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 resize-none dark:bg-slate-800 dark:text-slate-100"
                  rows={3}
                  placeholder="Brief description of your brand and what it represents"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Brand Story
                </Label>
                <textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 resize-none dark:bg-slate-800 dark:text-slate-100"
                  rows={4}
                  placeholder="Tell the inspiring story behind your brand's creation and mission"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                <LuImage className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Brand Assets
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Upload your logo and cover image
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadCard
                id="logo"
                label="Logo"
                file={logo}
                onChange={handleLogoChange}
                icon={LuUpload}
              />
              <FileUploadCard
                id="coverImage"
                label="Cover Image"
                file={coverImage}
                onChange={handleCoverImageChange}
                icon={LuImage}
              />
            </div>
          </div>

          {/* Brand Values */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <LuHeart className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Brand Values
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Define what your brand stands for
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <Input
                      value={value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      placeholder={`Core value ${index + 1}`}
                      className="transition-all duration-200 border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-violet-500/20"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeValue(index)}
                    disabled={values.length === 1}
                    className="border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400 transition-all duration-200"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addValue}
                disabled={values.length >= 6}
                className="flex items-center gap-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50 text-violet-600 dark:border-violet-800 dark:hover:bg-violet-900/20 dark:text-violet-400 transition-all duration-200"
              >
                <LuPlus className="w-4 h-4" />
                Add Value
              </Button>
            </div>
          </div>

          {/* Company Stats */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <LuChartBar className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Company Statistics
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Key metrics and milestones
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel
                id="yearFounded"
                label="Year Founded"
                type="number"
                value={formData.yearFounded}
                onChange={handleChange}
                placeholder="2024"
              />
              <InputWithLabel
                id="globalPresence"
                label="Global Presence"
                value={formData.globalPresence}
                onChange={handleChange}
                placeholder="50+ countries"
              />
              <InputWithLabel
                id="employees"
                label="Employees"
                value={formData.employees}
                onChange={handleChange}
                placeholder="1000+"
              />
              <InputWithLabel
                id="annualRevenue"
                label="Annual Revenue"
                value={formData.annualRevenue}
                onChange={handleChange}
                placeholder="$100M+"
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <LuGlobe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Social Media
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Connect your social presence
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel
                id="instagram"
                label={
                  <span className="flex items-center gap-2">
                    <LuInstagram className="w-4 h-4" />
                    Instagram
                  </span>
                }
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@yourbrand"
              />
              <InputWithLabel
                id="twitter"
                label={
                  <span className="flex items-center gap-2">
                    <LuTwitter className="w-4 h-4" />
                    Twitter
                  </span>
                }
                value={formData.twitter}
                onChange={handleChange}
                placeholder="@yourbrand"
              />
              <InputWithLabel
                id="facebook"
                label={
                  <span className="flex items-center gap-2">
                    <LuFacebook className="w-4 h-4" />
                    Facebook
                  </span>
                }
                value={formData.facebook}
                onChange={handleChange}
                placeholder="facebook.com/yourbrand"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 sm:flex-initial border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading.brands}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading.brands ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4" />
                  Add Brand
                </span>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrandModal;