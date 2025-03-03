import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";

export default function Documents() {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchAllContents = async () => {
            const res = await axios.get(import.meta.env.VITE_API_URL + "api/v1/content/document", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.status === 200) {
                setContents(res.data.content);
            }
        };
        fetchAllContents();
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Documents</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    contents.length === 0 &&
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl text-center ">No documents saved yet</h2>
                    </div>
                }
                {contents?.map((content, index) => (
                    <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{content.title}</CardTitle>
                            <CardDescription className="text-sm">{content.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="pb-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-600 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </svg>
                                </span>
                                <a href={content.link} className="text-blue-600 dark:text-blue-400 hover:underline truncate">
                                    {content.link}
                                </a>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                <span>
                                    <FileText size={17} />
                                </span>
                                <span>Document</span>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-2 flex flex-wrap gap-2">
                            {content?.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}