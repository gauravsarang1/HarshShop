import { v2 as cloudinary } from 'cloudinary';

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
        });

        console.log('Cloudinary delete result:', result);
        return result;
    } catch (error) {
        console.error('Cloudinary deletion failed:', error);
        return null;
    }
};

export { deleteFromCloudinary };
