import { useForm } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import { FaEdit } from 'react-icons/fa';

const Education = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;

    const onSubmit = (data) => {
        console.log(data);
        fetch(`https://student-networking-server.vercel.app/user-Education-info/${userProfile._id}`, {
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
                    const modal = document.getElementById('my_modal_3');
                    modal.close();
                }
            })

    };


    return (
        <div>
            <div className="bg-white p-4 rounded shadow-md flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Education</h2>
                    <div className="mt-4 space-y-2">
                        <div>
                            <h3 className="text-base font-semibold">{userProfile?.degree}</h3>
                            <p className="text-gray-600">University: {userProfile?.university}</p>
                            <p className="text-gray-600">School: {userProfile?.school}</p>
                            <p className="text-gray-600">Duration: {userProfile?.eduDuration}</p>
                            <p className="text-gray-600">Edu Description: {userProfile?.eduDescription}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-sm btn-circle p-2" onClick={() => document.getElementById('my_modal_3').showModal()}>
                        <FaEdit />
                    </button>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="degree">Degree</label>
                                <input type="text" id="degree" placeholder="Degree" {...register("degree", { required: true })} defaultValue={userProfile?.degree} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.degree && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="university">University</label>
                                <input type="text" id="university" placeholder="School" {...register("university", { required: true })} defaultValue={userProfile?.university} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.university && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="school">School</label>
                                <input type="text" id="school" placeholder="School" {...register("school", { required: true })} defaultValue={userProfile?.school} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.school && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="eduDuration">Duration</label>
                                <input type="text" id="eduDuration" placeholder="Duration" {...register("eduDuration", { required: true })} defaultValue={userProfile?.eduDuration} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.eduDuration && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="eduDescription">Description</label>
                                <textarea id="eduDescription" placeholder="Description" {...register("eduDescription", { required: true })} defaultValue={userProfile?.eduDescription} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.eduDescription && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded-sm">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Education;