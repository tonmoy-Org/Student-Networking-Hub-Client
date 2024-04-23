import { useForm } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import { FaEdit } from 'react-icons/fa';

const Skills = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;


    const onSubmit = (data) => {
        console.log(data);
        fetch(`https://student-networking-server.vercel.app/user-Skills-info/${userProfile?._id}`, {
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
                    const modal = document.getElementById('my_modal_4');
                    modal.close();
                }
            })

    };

    return (
        <div>
            <div className="bg-white p-4 rounded shadow-md flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <ul className="mt-4 space-y-2">
                        {userProfile?.skills?.map((skill, index) => (
                            <li key={index} className="inline-block bg-blue-500 text-white px-2 py-1 rounded-md mx-1">{skill}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button className="btn btn-sm btn-circle p-2" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        <FaEdit />
                    </button>
                </div>
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="skills">Skills</label>
                                <select id="skills" {...register("skills", { required: true })} multiple defaultValue={userProfile?.skills} className="py-1 w-full border-2 border-black ps-2">
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="React">React</option>
                                    <option value="Node.js">Node.js</option>
                                    <option value="HTML/CSS">HTML/CSS</option>
                                    <option value="Python">Python</option>
                                </select>
                                {errors.skills && <span role="alert" className="text-red-600">This field is required</span>}
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

export default Skills;