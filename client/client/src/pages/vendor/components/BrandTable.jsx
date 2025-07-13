import React from 'react';
import { Button } from "@/components/ui/button";
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { Loading } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBrand } from '../../../features/vendorSlice';

const BrandTable = ({handleAddBrandModal, onDelete }) => {
  const dispatch = useDispatch();
  const { loading, error, selectedBrand, brands } = useSelector(state => state.vendor);

  const handleSelectedBrand = (brand, type='add') => {
    dispatch(setSelectedBrand({...brand, mode: type}))
  }

  if (!brands || brands.length === 0) {
    return <Loading />
  }
  return (
    <div className="overflow-x-auto">
    <div className='flex justify-end mb-4'>
      <Button 
        size={'lg'}
        onClick={() =>{
          handleAddBrandModal(),
          handleSelectedBrand(null, 'add')

        }}
      >
        Add New Brand
      </Button>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
          {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>*/}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full object-cover" src={brand.logo} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                  <div className="text-sm text-gray-500">{brand.website}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{brand.products}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-900">{brand.rating}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{brand.followers}</div>
            </td>
            {/*<td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                brand.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {brand.status}
              </span>
            </td>*/}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Button 
              onClick={() => {
                handleSelectedBrand(brand, 'edit'),
                handleAddBrandModal()
              }}
              variant="ghost" className="text-primary hover:text-primary-dark mr-2">
                <FiEdit2 className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => onDelete(brand)}
                variant="ghost" className="text-red-600 hover:text-red-900">
                <FiTrash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default BrandTable;