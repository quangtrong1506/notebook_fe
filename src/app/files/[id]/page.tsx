"use client";
import Loading from "@/app/components/table/Loading";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function Page({ params }: { params: any }) {
    const [doc, setDocs] = useState<{ _id: string; content: any; title: any | null }>();
    useEffect(() => {
        if (params?.id !== "new")
            fetch(process.env.API_DOMAIN + "docs/" + params.id, {
                method: "GET",
                redirect: "follow",
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.data) {
                        setDocs(result.data);
                    }
                })
                .catch((error) => console.error(error));
        else redirect("/files/new/edit");
    }, [params.id]);
    if (!doc)
        return (
            <>
                <div>
                    <div className="animate-pulse flex-col ms-6">
                        <div className="flex h-10 w-full my-2">
                            <div className="bg-gray-200 rounded w-[40px] me-3"></div>
                            <div className="bg-gray-200 rounded w-8/12 "></div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Loading />
                    </div>
                </div>
            </>
        );
    return (
        <>
            <div
                style={{
                    padding: "5px 25px",
                }}
            >
                <h1 className="font-bold text-[40px] flex justify-between mb-4">
                    <div className="flex">
                        <Link
                            href={"/"}
                            className="cursor-pointer rounded-md hover:bg-gray-100 pt-[10px] mt-1 px-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                width={"20px"}
                            >
                                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                            </svg>
                        </Link>
                        <div>{doc?.title}</div>
                    </div>
                    <Link
                        href={"/files/" + doc._id + "/edit"}
                        className="cursor-pointer rounded-md hover:bg-gray-100 pt-[10px] mt-1 px-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={"30px"}
                        >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                    </Link>
                </h1>
                <div dangerouslySetInnerHTML={{ __html: doc?.content }}></div>
            </div>
        </>
    );
}

export default Page;
