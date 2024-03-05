"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Bounce, toast } from "react-toastify";

import RichTextEditor from "@/app/components/editor/RichTextEditor";
import Loading from "@/app/components/table/Loading";
import Swal from "sweetalert2";

function EditPage({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const saveDocument = useMemo(() => {
        return (data: any) => {
            const raw = JSON.stringify({
                title,
                content,
            });
            Swal.fire({
                title: "Uploading!",
                html: "Please wait! Uploading your documents ",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
            fetch(process.env.API_DOMAIN + "docs/" + (params.id === "new" ? "" : params.id), {
                method: params.id === "new" ? "POST" : "PUT",
                body: raw,
                redirect: "follow",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((result) => {
                    Swal.close();
                    if (result.status_code === 200) {
                        toast.success("Save document successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                        router.push("/files/" + result.data._id);
                    } else {
                        Swal.fire(
                            "Error",
                            "Status: " + result.status_code + "<br/>Message: " + result.message,
                            "error"
                        );
                    }
                })
                .catch((error) => console.error(error));
        };
    }, [title, content, params.id, router]);
    const handleChangeData = useMemo(() => {
        return (data: string) => {
            setContent(data);
        };
    }, []);
    useEffect(() => {
        if (params?.id !== "new")
            fetch(process.env.API_DOMAIN + "docs/" + params.id, {
                method: "GET",
                redirect: "follow",
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.data) {
                        setTitle(result.data.title);
                        setContent(result.data.content);
                        setIsLoading(false);
                    }
                })
                .catch((error) => console.error(error));
        else {
            setContent("");
            setTitle("Document");
        }
    }, [params.id]);
    if (isLoading)
        return (
            <>
                <div className="animate-pulse mt-6 ms-6 mb-6">
                    <div className="flex w-full">
                        <div className="h-5 w-10/12 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <Loading />
            </>
        );
    return (
        <div className="p-2">
            <div className="flex mb-2">
                <input
                    type="text"
                    id="name"
                    className="font-bold text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="File Name"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    required
                />
                <div className="mx-5">
                    <button
                        className="border leading-10 px-6 font-bold rounded-lg"
                        onClick={saveDocument}
                    >
                        Save
                    </button>
                </div>
            </div>
            <RichTextEditor content={content} handleChangeData={handleChangeData} />
        </div>
    );
}

export default EditPage;
