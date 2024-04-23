

const Loader = () => {
    return (
        <div>
            <div className="card lg:w-[700px] bg-white shadow-xl rounded-none flex flex-col p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div>
                            <div className="h-2 bg-slate-200 rounded w-20"></div>
                            <div className="h-2 bg-slate-200 rounded w-10 mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="card-body flex-1 py-5">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
                <figure>
                    <div className="h-80 bg-slate-200 rounded-xl"></div>
                </figure>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-10"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-10"></div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;