import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import moment from 'moment';


const PostMedia = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [, refetch] = usePost();


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

    const onSubmit = async (data) => {
        setIsUploading(true);
        const postTime = { postTime: moment().format('LL') }
        const saveData = { ...data, images: imageUrls, user_name: user?.displayName, email: user?.email, user_img: user?.photoURL, ...postTime };
        fetch('https://student-networking-server.vercel.app/post-collection', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                reset();
                setIsUploading(false);
                setImagePreviews([]);
                setImageFiles([]);
                const modal = document.getElementById('my_modal_3');
                modal.close();
                refetch();
                Swal.fire({
                    title: 'Successfully Added',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                setApiError(error.message);
                setIsUploading(false);
            });
    };


    return (
        <div>
            <div className="shadow-lg  lg:w-[690px]">
                {user && <div className="flex items-center justify-center p-4 mb-3 bg-white">
                    <img src={user?.photoURL} alt="Profile Picture" className="w-10 h-10 rounded-full mr-4" />
                    <div className="flex flex-grow" />
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="bg-gray-100 text-gray-900 w-full rounded-full px-4 py-2 me-3 border-2 border-gray-300 flex-grow text-left">
                        Share your thoughts...
                    </button>
                </div>}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl rounded-sm">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className='flex items-center mb-5'>
                            <img src={user?.photoURL} alt="Profile Picture" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="font-bold text-lg">{user?.displayName}</h3>
                                <span>Public</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <textarea  {...register("text", { required: true })} name="text" className="post-textarea focus:outline-none w-full h-52 mx-auto" placeholder="Write something..."></textarea>
                                    {errors.text && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    {imagePreviews.length === 0 && (
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple />
                                            </label>
                                        </div>
                                    )}
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                    <div className="mt-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative inline-block mr-4">
                                                <img src={preview.previewUrl} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md mb-5" />
                                                <button onClick={() => removeImage(index)} className="absolute -top-5 -right-5  text-black rounded-full p-1 text-2xl">
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
        </div>
    );
};

export default PostMedia;
