import Link from "next/link";
import { memo } from "react";
import Swal from "sweetalert2";
const convertTime = (time: string) => {
    let date = new Date(time);
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
        date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
};
function Table({
    data,
    isAdmin,
}: {
    data: Array<{
        id: string;
        title: string;
        updatedAt: string;
    }>;
    isAdmin: any;
}) {
    const handleRemoveButton = (id: string) => {
        Swal.fire({
            title: "Do you want to delete this document?",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
        }).then((result) => {
            if (result.isDenied) {
                fetch(process.env.API_DOMAIN + "/docs/" + id, {
                    method: "DELETE",
                    redirect: "follow",
                })
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.status_code == 200)
                            Swal.fire("Document deleted!", "", "success");
                    })
                    .catch((error) => console.error(error));
            }
        });
    };
    if (data?.length === 0)
        return (
            <>
                <section className="flex justify-center items-center mt-10 p-16">
                    <div className="container flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-6 max-w-md items-center justify-center text-center">
                            <p className="text-2xl md:text-3xl dark:text-gray-300">
                                Sorry, there are no matching results
                            </p>
                            {isAdmin && (
                                <Link
                                    href="/files/new"
                                    className="px-4 py-2 text-xl w-[180px] rounded bg-purple-600 text-gray-50"
                                >
                                    Create new
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Updated at
                        </th>
                        <th className="px-2 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr
                            key={index.toString()}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                            >
                                <Link className="text-black" href={"/files/" + item?.id}>
                                    {item?.title}
                                </Link>
                            </th>
                            <td className="px-6 py-4 text-center">
                                {convertTime(item?.updatedAt)}
                            </td>
                            <td className="px-1 py-4 flex justify-end ">
                                <Link href={"/files/" + item?.id} className="w-4 mx-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                    </svg>
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            href={"files/" + item?.id + "/edit"}
                                            className="w-4 mx-3"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                            </svg>
                                        </Link>
                                        <div
                                            className="w-4 ms-3 me-6"
                                            onClick={() => {
                                                handleRemoveButton(item.id);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                fill="red"
                                            >
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default memo(Table);
