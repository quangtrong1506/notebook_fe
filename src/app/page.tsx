"use client";

import debounce from "debounce";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Loading from "./components/table/Loading";
import Table from "./components/table/Table";
import "./globals.css";
export default function Home() {
    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("isAdmin")) setIsAdmin(true);
        fetch(process.env.API_DOMAIN + "docs", { method: "GET", redirect: "follow" })
            .then((response) => response.json())
            .then((result) => {
                if (result.data) {
                    setDocs(result.data);
                    setIsLoading(false);
                }
            })
            .catch((error) => console.error(error));
    }, []);
    const handleChangeSearchQuery = debounce((query) => {
        fetch(process.env.API_DOMAIN + "docs?q=" + query, { method: "GET", redirect: "follow" })
            .then((response) => response.json())
            .then((result) => {
                if (result.data) {
                    setDocs(result.data);
                }
            })
            .catch((error) => console.error(error));
    }, 300);

    return (
        <>
            <Header handleChangeSearchQuery={handleChangeSearchQuery} isAdmin={isAdmin}></Header>
            {!isLoading && (
                <Table
                    isAdmin={isAdmin}
                    data={docs?.map((doc: { _id: string; title: string; updated_at: string }) => {
                        return {
                            id: doc._id,
                            title: doc.title,
                            updatedAt: doc.updated_at,
                        };
                    })}
                ></Table>
            )}
            {isLoading && <Loading />}
        </>
    );
}
