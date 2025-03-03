
import { useState, useEffect } from "react";
import { Home, Twitter, X, Video, FileText, Link, Menu, X as Close } from "lucide-react";
import Articles from "@/components/Articles";
import Tweets from "@/components/Tweets";
import Videos from "@/components/Videos";
import Documents from "@/components/Documents";
import DashboardComponent from "@/components/DashboardComponent";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import MultiSelect from "@/components/mutilselect";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {

    const tagOptions = [
        "technology", "business", "finance", "health", "entertainment", "sports", "science", "education", "travel", "lifestyle", "other"
    ];

    const [activeTab, setActiveTab] = useState("dashboard");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [contents, setContents] = useState([]);

    const {toast} = useToast();
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const fetchAllContents = async () => {
            const res = await axios.get(import.meta.env.VITE_API_URL + "api/v1/content", {
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

    const renderContent = () => {

        switch (activeTab) {
            case "tweets":
                return <Tweets />;
            case "videos":
                return <Videos />;
            case "documents":
                return <Documents />;
            case "articles":
                return <Articles />;
            default:
                return <DashboardComponent contents={contents} />;
        }
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "tweets", label: "Tweets", icon: Twitter },
        { id: "videos", label: "Videos", icon: Video },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "articles", label: "Articles", icon: Link },
    ];

    const handleSaveChanges = async () => {
        const payload = { title, description, type, tags, link };
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + "api/v1/content", payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(res.status === 200){
                toast({
                    title: "Content Saved"
                })
            }
            else{
                toast({
                    title: "Content Not Saved"
                })
            }
        } catch (error) {
            console.error("Error saving content:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-Montserrat">
            <div className="fixed top-4 left-4 z-30 lg:hidden">
                <Button
                    className="neobrutalism-button p-2 h-10 w-10"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            <div className="fixed top-4 right-4 z-30 lg:hidden">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="neobrutalism-button">Add Content</Button>
                    </DialogTrigger>
                    <DialogContent className="neobrutalism-dialog sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add your content details</DialogTitle>
                            <DialogDescription>Click save when you're done.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label>Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

                            <Label>Description</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

                            <Label>Link</Label>
                            <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />

                            <Label>Type</Label>
                            <Select onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="article">Article</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                        <SelectItem value="document">Document</SelectItem>
                                        <SelectItem value="tweet">Tweet</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Label>Tags</Label>
                            <MultiSelect options={tagOptions} selected={tags} onChange={setTags} />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSaveChanges} className="neobrutalism-button">Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className={`w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] fixed top-0 bottom-0 left-0 z-20 transition-transform duration-300 lg:transform-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}>
                <div className="p-4 border-b-2 border-black flex items-center justify-between">
                    <h1 className="text-xl font-bold">zBrain</h1>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-2">
                    <ul className="space-y-3">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleTabChange(item.id)}
                                    className={`flex items-center gap-3 p-3 w-full text-left font-bold neobrutalism-nav-item ${activeTab === item.id ? "active" : ""
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className={`transition-all duration-300 pt-16 pb-8 px-4 lg:pt-8 lg:pl-72 lg:pr-8`}>
                <div className="hidden lg:block fixed top-8 right-8 z-10">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="neobrutalism-button">Add Content</Button>
                        </DialogTrigger>
                        <DialogContent className="neobrutalism-dialog sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add your content details</DialogTitle>
                                <DialogDescription>Click save when you're done.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Label>Title</Label>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

                                <Label>Description</Label>
                                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

                                <Label>Link</Label>
                                <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />

                                <Label>Type</Label>
                                <Select onValueChange={setType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="article">Article</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                            <SelectItem value="document">Document</SelectItem>
                                            <SelectItem value="tweet">Tweet</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Label>Tags</Label>
                                <MultiSelect options={tagOptions} selected={tags} onChange={setTags} />
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSaveChanges} className="neobrutalism-button">Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="container mx-auto max-w-7xl">
                    {renderContent()}
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
