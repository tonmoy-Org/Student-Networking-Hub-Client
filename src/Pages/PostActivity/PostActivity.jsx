import { useEffect, useRef, useState } from "react";
import usePostActivity from "../../hooks/usePostActivity";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../../component/Loader/Loader";
import Carousel from "react-material-ui-carousel";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";


const PostActivity = () => {
    const { user, loading } = useAuth();
    const [PostActivity, refetch, isLoading] = usePostActivity();
    console.log(PostActivity)
    const [showComments, setShowComments] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dropdownRef = useRef(null);

    const reverse = PostActivity.slice().reverse();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the dropdown, close it
                setShowComments({});
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // Other code...

    const handleAddLikes = (postId) => {
        const saveData = {
            likes_user: user?.displayName,
            likes_user_img: user?.photoURL,
            email: user?.email,
            userId: postId
        }
        const newLikes = { userId: user?.id, ...saveData };

        // Assuming you have an array of likes to send
        const likesArray = [newLikes];

        fetch(`https://student-networking-server.vercel.app/likes/post-collection/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likesId: postId, likes: likesArray, email: user?.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
            .catch(error => {
                console.error('Error toggling likes:', error);
                // Handle error
            });
    };


    const handleAddComments = (postId, commentText) => {
        const saveData = {
            comment_user: user?.displayName,
            comment_user_img: user?.photoURL
        }
        const newComment = { text: commentText, ...saveData };

        // Assuming you have an array of comments to send
        const commentsArray = [newComment];

        fetch(`https://student-networking-server.vercel.app/comments/post-collection/${postId}`, {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, comments: commentsArray }) // Sending array of comments
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch(); // Fetch posts after adding comments
                reset(); // Reset the form
                Swal.fire({
                    title: 'Successfully Added Comment',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            })
            .catch(error => {
                console.error('Error adding comment:', error);
                // Handle error
            });
    };

    const toggleComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };



    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://student-networking-server.vercel.app/delete/post/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your post has been deleted.',
                                'success'
                            );
                            refetch();
                        }
                    });
            }
        });
    };

    const handleLikeDoubleTap = (postId) => {
        handleAddLikes(postId);
    };


    return (
        <div>
            {isLoading || loading || reverse === null ? (
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>
            ) : (

                reverse.map((post, index) => (
                    <div key={index} className="card lg:w-[690px] bg-white shadow-xl rounded-none flex flex-col lg:p-6 mb-6 p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Link title={post?.user_name} to={`/userDetails/${post?.email}`}>
                                    <img src={post.user_img} alt="Profile Picture" className="w-10 h-10 rounded-full mr-4" />
                                </Link>
                                <div>
                                    <Link title={post?.user_name} to={`/userDetails/${post?.email}`}>
                                        <h2 className="font-semibold">{post.user_name}</h2>
                                    </Link>

                                    <p className="text-gray-500">{post.postTime}</p>

                                </div>
                            </div>
                            <div>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="m-2">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-none w-52">
                                        {user?.email === post.email &&
                                            <li><a className='font-semibold' onClick={() => handleDelete(post._id)}>Delete</a></li>}
                                        <li><a className='font-semibold'>Copy link to post</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 py-5">
                            <p className='text-sm lg:text-[17px] text-neutral'>{post.text}</p>
                        </div>
                        <div onClick={() => document.getElementById(`my_modal_${post._id}`).showModal()} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                            {post.images.slice(0, 1).map((image, imgIndex) => (
                                <div key={imgIndex} className="relative group col-span-3 lg:col-span-3">
                                    <img
                                        src={image}
                                        alt="Post"
                                        className={`w-full  rounded-lg object-cover`}
                                        onDoubleClick={() => handleLikeDoubleTap(post._id)}
                                    />
                                </div>
                            ))}
                            {post.images.slice(1, 4).map((image, imgIndex) => (
                                <div key={imgIndex + 1} className="relative group">
                                    <img
                                        src={image}
                                        alt="Post"
                                        className="lg:w-full w-24 h-28 lg:h-32 rounded-lg object-cover"
                                        onDoubleClick={() => handleLikeDoubleTap(post._id)}
                                    />
                                    {imgIndex === 2 && post.images.length > 3 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black bg-opacity-50 rounded-lg text-center flex justify-center items-center w-full h-full text-white text-lg font-semibold">
                                                +{post.images.length - 4} more
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <dialog id={`my_modal_${post._id}`} className="modal">
                            <div className="modal-box w-full lg:max-w-6xl p-6 rounded-sm">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
                                </form>

                                <div className='lg:flex lg:gap-7 gap-5'>
                                    <div>
                                        <Carousel className='lg:w-[700px]'>
                                            {post.images.map((image, imgIndex) => (
                                                <div key={imgIndex}>
                                                    <img className='w-full h-60 lg:h-[500px]' src={image} />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <img src={post.user_img} alt="Profile Picture" className="w-10 h-10 rounded-full mr-4" />
                                            <div>
                                                <h2 className="font-semibold">{post.user_name}</h2>
                                                <p className="text-gray-500">{post.postTime}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 py-3">
                                            <p className='text-sm text-neutral'>{post.text}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-3">
                                                <button onClick={() => handleAddLikes(post._id)} className="flex items-center space-x-2">
                                                    {post.likes?.filter(data => data.email === user?.email).length > 0 ? <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh"><svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8" fill="red" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span> : <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh"><svg aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></span>}
                                                    <span className="text-gray-500 font-bold">{post.likes?.length}</span>
                                                </button>
                                                <button onClick={() => toggleComments(post._id)} className="flex items-center space-x-2">
                                                    <FaRegComment className='w-6 h-6' />
                                                    <span className="text-gray-500 font-bold">{post.comments?.length}</span>
                                                </button>
                                                <button className="flex items-center space-x-2">
                                                    <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                                    <span className="text-gray-500">{post.shares}</span>
                                                </button>
                                            </div>

                                            <div>
                                                <svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                            </div>
                                        </div>
                                        <div className="collapse  collapse-open bg-base-100 mt-3 py-2">
                                            <form onSubmit={handleSubmit((data) => handleAddComments(post._id, data.comment))}>
                                                {user &&
                                                    <div className="flex lg:items-center">
                                                        <img src={user?.photoURL} alt="Profile Picture" className="w-10 h-10 rounded-full mr-4" />
                                                        <div className="lg:flex lg:flex-grow">
                                                            <input
                                                                name="comment"
                                                                type="text"
                                                                {...register("comment", { required: true })}
                                                                className="bg-gray-100 text-gray-900 rounded-full px-4 py-1 me-3 lg:flex-grow focus:outline-none w-60 lg:w-full"
                                                                placeholder="Share your thoughts..."
                                                            />
                                                            {errors.comment && <span className="text-red-600">This field is required</span>}
                                                            <div>
                                                                {user === null ? <Link to='/login'> <button
                                                                    type="submit"
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                                >
                                                                    Share
                                                                </button></Link> :
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold lg:py-2 lg:px-4 py-1 px-2 mt-5 lg:mt-0 rounded-full"
                                                                    >
                                                                        Share
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </form>
                                            <div>
                                                <div className="text-left lg:p-4 mb-8 bg-white mt-3">
                                                    {post?.comments?.map((comment, idx) => (
                                                        <div key={idx} className="flex mb-1">
                                                            <img src={comment.comment_user_img} alt="Profile Picture" className="w-9 h-9 rounded-full mr-4" />
                                                            <div className="bg-base-200 p-2 rounded-sm">
                                                                <p className="font-bold">{comment.comment_user}</p>
                                                                <span className="text-gray-500 text-sm">{comment.text}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                                <button onClick={() => handleAddLikes(post._id)} className="flex items-center space-x-2">
                                    {post.likes?.filter(data => data.email === user?.email).length > 0 ? <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh"><svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8" fill="red" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span> : <span className="x1ykxiw6 x1ahuga x4hg4is x3oybdh"><svg aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></span>}
                                    <span className="text-gray-500 font-bold">{post.likes?.length}</span>
                                </button>
                                <button onClick={() => toggleComments(post._id)} className="flex items-center space-x-2">
                                    <FaRegComment className='w-6 h-6' />
                                    <span className="text-gray-500 font-bold">{post.comments?.length}</span>
                                </button>
                                <button className="flex items-center space-x-2">
                                    <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                    <span className="text-gray-500">{post.shares}</span>
                                </button>
                            </div>

                            <div>
                                <svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            </div>
                        </div>
                        {
                            showComments[post._id] && (
                                <div className="collapse bg-base-100 mt-3 py-2">
                                    <form onSubmit={handleSubmit((data) => handleAddComments(post._id, data.comment))}>
                                        {user &&
                                            <div className="flex lg:items-center">
                                                <img src={user?.photoURL} alt="Profile Picture" className="w-10 h-10 rounded-full mr-4" />
                                                <div className="lg:flex lg:flex-grow">
                                                    <input
                                                        name="comment"
                                                        type="text"
                                                        {...register("comment", { required: true })}
                                                        className="bg-gray-100 text-gray-900 rounded-full px-4 py-1 me-3 lg:flex-grow focus:outline-none w-60 lg:w-full"
                                                        placeholder="Share your thoughts..."
                                                    />
                                                    {errors.comment && <span className="text-red-600">This field is required</span>}
                                                    <div>
                                                        {user === null ? <Link to='/login'> <button
                                                            type="submit"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Share
                                                        </button></Link> :
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold lg:py-2 lg:px-4 py-1 px-2 mt-5 lg:mt-0 rounded-full"
                                                            >
                                                                Share
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>}
                                    </form>
                                    <div>
                                        <div className="text-left lg:p-4 mb-8 bg-white mt-3">
                                            {post?.comments?.map((comment, idx) => (
                                                <div key={idx} className="flex mb-1">
                                                    <img src={comment.comment_user_img} alt="Profile Picture" className="w-9 h-9 rounded-full mr-4" />
                                                    <div className="bg-base-200 p-2 rounded-sm">
                                                        <p className="font-bold">{comment.comment_user}</p>
                                                        <span className="text-gray-500 text-sm">{comment.text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </div >
                ))

            )}
        </div >
    );
};

export default PostActivity;