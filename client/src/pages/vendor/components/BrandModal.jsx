// FILE: BrandModal.jsx
import React, { useState, useEffect } from 'react';
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
  LuInfo, LuImage, LuHeart, LuChartBar, LuGlobe,
  LuInstagram, LuTwitter, LuFacebook, LuTrash2,
  LuPlus, LuSparkles, LuUpload, LuCheck
} from "react-icons/lu";

const InputWithLabel = ({ id, label, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

const BrandModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = {},
  error = null,
  mode = "add"
}) => {
  const { toast } = useToast();
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        story: initialData.story || '',
        yearFounded: initialData.stats?.yearFounded || '',
        globalPresence: initialData.stats?.globalPresence || '',
        employees: initialData.stats?.employees || '',
        annualRevenue: initialData.stats?.annualRevenue || '',
        instagram: initialData.socialLinks?.instagram || '',
        twitter: initialData.socialLinks?.twitter || '',
        facebook: initialData.socialLinks?.facebook || ''
      });
      setValues(initialData.values || ['']);
      setLogo(initialData.logo || null);
      setCoverImage(initialData.coverImage || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleValueChange = (index, val) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
  };

  const addValue = () => {
    if (values.length < 6) setValues([...values, '']);
  };

  const removeValue = (index) => {
    if (values.length > 1) {
      const filtered = values.filter((_, i) => i !== index);
      setValues(filtered);
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'add' && (!logo || !coverImage)) {
      toast({
        title: "Missing files",
        description: "Please upload both logo and cover image.",
        variant: "destructive"
      });
      return;
    }

    const brandData = {
      name: formData.name,
      logo,
      coverImage,
      description: formData.description,
      story: formData.story,
      values: values.filter(v => v.trim() !== ''),
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

    onSubmit(brandData);
  };

  const FileUploadCard = ({ id, label, file, onChange, icon: Icon, preview }) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`block cursor-pointer border-2 border-dashed p-4 rounded-xl text-center transition ${
          file ? 'border-green-500' : 'hover:border-violet-400'
        }`}
      >
        {file ? (
          <>
            <LuCheck className="mx-auto text-green-600" />
            <p className="text-green-600">{file.name || 'Image Uploaded'}</p>
          </>
        ) : preview ? (
          <img src={preview} alt="preview" className="h-20 mx-auto" />
        ) : (
          <>
            <Icon className="mx-auto text-gray-400" />
            <p className="text-sm">Click to upload {label}</p>
          </>
        )}
      </label>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {mode === 'edit' ? 'Edit Brand' : 'Add New Brand'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithLabel
            id="name"
            label="Brand Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Gaurav Trends"
          />

          <div className="space-y-2">
            <Label>Description</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Describe your brand..."
            />
          </div>

          <div className="space-y-2">
            <Label>Story</Label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Tell your brand story..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadCard
              id="logo"
              label="Logo"
              file={typeof logo === 'object' ? logo : null}
              onChange={handleFileChange(setLogo)}
              icon={LuUpload}
              preview={typeof logo === 'string' ? logo : null}
            />
            <FileUploadCard
              id="coverImage"
              label="Cover Image"
              file={typeof coverImage === 'object' ? coverImage : null}
              onChange={handleFileChange(setCoverImage)}
              icon={LuImage}
              preview={typeof coverImage === 'string' ? coverImage : null}
            />
          </div>

          <div>
            <Label>Brand Values</Label>
            <div className="space-y-2">
              {values.map((val, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={val}
                    onChange={(e) => handleValueChange(i, e.target.value)}
                    placeholder={`Value ${i + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeValue(i)}
                    disabled={values.length === 1}
                  >
                    <LuTrash2 />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addValue}
                disabled={values.length >= 6}
              >
                <LuPlus className="mr-1" />
                Add Value
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithLabel
              id="yearFounded"
              label="Year Founded"
              type="number"
              value={formData.yearFounded}
              onChange={handleChange}
              placeholder="2020"
            />
            <InputWithLabel
              id="globalPresence"
              label="Global Presence"
              value={formData.globalPresence}
              onChange={handleChange}
              placeholder="e.g., 15 countries"
            />
            <InputWithLabel
              id="employees"
              label="Employees"
              value={formData.employees}
              onChange={handleChange}
              placeholder="e.g., 300+"
            />
            <InputWithLabel
              id="annualRevenue"
              label="Annual Revenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              placeholder="e.g., $5M"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithLabel
              id="instagram"
              label="Instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourbrand"
            />
            <InputWithLabel
              id="twitter"
              label="Twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="@yourbrand"
            />
            <InputWithLabel
              id="facebook"
              label="Facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="facebook.com/yourbrand"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading.brands}>
              {loading.brands ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Add Brand'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandModal;
