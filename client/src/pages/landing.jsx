import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Landing() {
    const navigate = useNavigate()
    return (
        <div className="dark:bg-secondaryBlack inset-0 flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-Montserrat">
            <header className="fixed top-0 z-10 w-full backdrop-blur-md py-4 px-5 shadow-md">
                <div className="flex items-center justify-between gap-4">
                    {/* <img
                        src="/logo.png"
                        alt="logo"
                        className="h-10 w-10 rounded-full"
                    /> */}
                    <h1 className="text-2xl font-heading">zBrain</h1>
                    <div className="space-x-4">
                        <Button onClick = {() => navigate('/login')}>Login</Button>
                        <Button onClick = {() => navigate('/signup')}>Sign Up</Button>
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="mx-auto max-w-5xl px-5 py-[110px] text-center lg:py-[150px]">
                <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
                    zBrain
                </h1>
                <p className="my-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl">
                    Your digital memory vault for the content you love.
                </p>

                {/* Buttons Section */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Button size="lg" className="px-6 py-3 text-lg md:text-xl" onClick = {() => navigate('/signup')}>
                        Start collecting
                    </Button>
                </div>
            </div>
        </div>
    )
}