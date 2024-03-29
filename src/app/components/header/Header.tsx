import Link from "next/link";

export default function Header({
    handleChangeSearchQuery,
    isAdmin,
}: {
    handleChangeSearchQuery: any;
    isAdmin: any;
}) {
    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center ">
                        <Link href="/" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Notebook
                            </span>
                        </Link>
                        <div>
                            <div className="flex">
                                {isAdmin && (
                                    <Link
                                        href={"/files/new"}
                                        className="pt-[5px] px-3 mx-3 rounded-md border"
                                    >
                                        Create new
                                    </Link>
                                )}

                                <form className="max-w-md mx-auto ">
                                    <label
                                        htmlFor="default-search"
                                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="search"
                                            id="default-search"
                                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                                            placeholder="Search ..."
                                            onChange={(e) => {
                                                handleChangeSearchQuery(e.target.value);
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
