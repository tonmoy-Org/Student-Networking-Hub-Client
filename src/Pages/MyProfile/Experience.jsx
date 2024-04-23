import { useForm } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import { FaEdit } from 'react-icons/fa';

const Experience = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;

    const onSubmit = (data) => {
        console.log(data);
        fetch(`https://student-networking-server.vercel.app/user-Experience-info/${userProfile._id}`, {
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
                    const modal = document.getElementById('my_modal_2');
                    modal.close();
                }
            })

    };
    return (
        <div>
            <div className='flex justify-between p-4 bg-white shadow-md rounded '>
                <div>
                    <h2 className="text-lg font-semibold">Experience</h2>
                    <div className="mt-4 space-y-2">
                        <div>
                            <h3 className="text-base font-semibold">{userProfile?.jobTitle}</h3>
                            <p className="text-gray-600">Company: {userProfile?.company}</p>
                            <p className="text-gray-600">Duration: {userProfile?.duration}</p>
                            <p className="text-gray-600">Description: {userProfile?.description}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-sm btn-circle p-2" onClick={() => document.getElementById('my_modal_2').showModal()}>
                        <FaEdit />
                    </button>
                </div>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="company">Company</label>
                                <input type="text" id="company" placeholder="Company" {...register("company", { required: true })} defaultValue={userProfile?.company} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.company && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="duration">Duration</label>
                                <input type="text" id="duration" placeholder="Duration" {...register("duration", { required: true })} defaultValue={userProfile?.duration} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.duration && <span role="alert" className="text-red-600">This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea id="description" placeholder="Description" {...register("description", { required: true })} defaultValue={userProfile?.description} className="py-1 w-full border-2 border-black ps-2" />
                                {errors.description && <span role="alert" className="text-red-600">This field is required</span>}
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

export default Experience;