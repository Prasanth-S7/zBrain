import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(import.meta.env.VITE_API_URL + "api/v1/user/login", {
                email,
                password
            })
            if(res.status === 200){
                toast({
                    title: "Login Successfull"
                })
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
            }
            else{
                toast({
                    title: "Login Failed"
                })
            }
        }
        catch(error){
            toast({
                title: "Login Failed"
            })
        }
    }

    return (
        <div className="dark:bg-secondaryBlack inset-0 flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-Montserrat">
            <Card className="w-[350px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmitHandler} className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-right">
                            <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                        Create New Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
