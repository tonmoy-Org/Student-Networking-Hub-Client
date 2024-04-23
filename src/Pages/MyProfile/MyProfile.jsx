import useProfile from '../../hooks/useProfile';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import ProfilePicture from './ProfilePicture';

const MyProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;


    const onSubmit = (data) => {
        console.log(data);
        fetch(`https://student-networking-server.vercel.app/user-details-info/6624c3ad1e9c8f8a9af695e2`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    const modal = document.getElementById('my_modal_1');
                    modal.close();
                }
            })

    };





    return (
        <div>
            <div className="p-4 space-y-4">
                <div className="bg-white rounded shadow-md overflow-hidden">
                    <ProfilePicture></ProfilePicture>
                    <div className='flex justify-between p-2'>
                        <div className="p-4 mt-16 space-y-1">
                            <h1 className="text-2xl font-semibold">{userProfile?.name}</h1>
                            <p className="text-gray-600">{userProfile?.jobTitle}</p>
                            <p className="text-gray-600">Location: {userProfile?.location}</p>
                            <p className="text-gray-600">Email: {userProfile?.email}</p>
                            <p className="text-gray-600">Phone: {userProfile?.phone}</p>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-circle p-2" onClick={() => document.getElementById('my_modal_1').showModal()}>
                                <FaEdit />
                            </button>
                        </div>
                    </div>
                </div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box w-11/12 max-w-2xl rounded-sm">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)} method="dialog">
                                <div>
                                    <label htmlFor="">Name</label>
                                    <input type="text" placeholder="Name" {...register("name", { required: true })} name="name" defaultValue={userProfile?.name} className="py-1 w-full border-2 border-black ps-2" />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="">Job Title</label>
                                    <input type="text" placeholder="Job Title" {...register("jobTitle", { required: true })} name="jobTitle" defaultValue={userProfile?.jobTitle} className="py-1 w-full border-2 border-black ps-2" />
                                    {errors.jobTitle && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="">Location</label>
                                    <input type="text" placeholder="Location" {...register("location", { required: true })} name="location" defaultValue={userProfile?.location} className="py-1 w-full border-2 border-black ps-2" />
                                    {errors.location && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder="Email" {...register("email", { required: true })} name="email" defaultValue={userProfile?.email} className="py-1 w-full border-2 border-black ps-2" />
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="">Phone</label>
                                    <input type="tel" placeholder="Phone" {...register("phone", { required: true })} name="phone" defaultValue={userProfile?.phone} className="py-1 w-full border-2 border-black ps-2" />
                                    {errors.phone && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className=" bg-blue-600 text-white py-1 px-2 rounded-sm">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div>
                    <Experience></Experience>
                </div>
                <div>
                    <Education></Education>
                </div>
                <div>
                    <Skills></Skills>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
