import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ProfilePic = () => {
    const { user } = useAuth();
    const { handleSubmit, formState: { errors } } = useForm();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;


    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [, , refetch] = useProfile()


    const uploadToImgbb = async (imageFiles) => {
        try {
            const allowedImageCount = imageFiles.length;

            if (allowedImageCount === null) {
                throw new Error("Invalid image type selected.");
            }

            if (imageFiles.length !== allowedImageCount) {
                throw new Error(`You must upload exactly ${allowedImageCount} image(s) for the selected type.`);
            }

            const promises = imageFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('key', 'b6e270ffa7b7fb4823f1d15c738eb7ef');

                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    },
                });
                return response.data.data.url;
            });

            const uploadedImageUrls = await Promise.all(promises);
            setImageUrls(uploadedImageUrls);
            setApiError(null);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));
        setImagePreviews(previews);
        setImageFiles(files);
        uploadToImgbb(files);
    };

    const removeImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        const updatedFiles = [...imageFiles];
        updatedFiles.splice(index, 1);
        setImagePreviews(updatedPreviews);
        setImageFiles(updatedFiles);
    };

    const onSubmit = async () => {
        setIsUploading(true);
        const saveData = { profilePicture: imageUrls };
        fetch(`https://student-networking-server.vercel.app/user-profilePicture/${userProfile?._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
                setIsUploading(false);
                setImagePreviews([]);
                setImageFiles([]);
                const modal = document.getElementById('my_modal_3');
                modal.close();

            })
            .catch(error => {
                setApiError(error.message);
                setIsUploading(false);
            });
    };


    return (
        <div>
            <img onClick={() => document.getElementById('my_modal_3').showModal()} src={user?.photoURL || userProfile?.profilePicture[0]} alt="Profile" className="h-40 w-40 rounded-full absolute -bottom-14 left-4 border-4 border-white" />
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-3xl rounded-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
                    </form>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {imagePreviews.length === 0 && (
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                )}
                                {errors.image && <span className="text-red-600">This field is required</span>}
                                <div className="mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative  mr-4 flex">
                                            <img src={preview.previewUrl} alt={`Preview ${index}`} className=" h-full object-cover rounded-full w-[400px] mx-auto" />
                                            <button onClick={() => removeImage(index)} className="absolute top-0 right-0  text-black rounded-full p-1 text-xl">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-action">
                                {user === null ? <Link to='/login'><button disabled={imageUrls.length === 0 || isUploading} type="submit" className=" bg-blue-600 rounded-full px-3 py-1 text-white">
                                    Post
                                </button> </Link> :
                                    <button disabled={imageUrls.length === 0 || isUploading} type="submit" className=" bg-blue-600 rounded-full px-3 py-1 text-white">
                                        Post
                                    </button>
                                }
                            </div>
                            {apiError && <div className="w-full text-center my-4 text-error font-semibold">Error: {apiError}</div>}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProfilePic;