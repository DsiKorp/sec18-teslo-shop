import { useRef, type KeyboardEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";


import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { useAuthStore } from "@/auth/store/auth.store";

export const CustomHeader = () => {


    // get url params: optional query parameters in url
    const [searchParams, setSearchParams] = useSearchParams();

    // get user from auth store
    //const { user, logout } = useAuthStore();
    const { authStatus, isAdmin, logout } = useAuthStore();

    // route segments that are mandatory in url like /gender/men or /gender/women
    const { gender } = useParams();
    console.log({ gender }); // men, women, kid, undefined without /gender/

    const inputRef = useRef<HTMLInputElement>(null);
    const query = searchParams.get("query") || "";

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        // create a new search params object from the current search params
        //const newSearchParams = new URLSearchParams(searchParams);

        // set the search param to the value of the input and delete the others
        const newSearchParams = new URLSearchParams();

        if (!inputRef.current?.value) {
            newSearchParams.delete("query");
        } else {
            // ! the ! operator is used to tell typescript that the value is not null
            newSearchParams.set("query", inputRef.current!.value);
            console.log('enter')
        }

        setSearchParams(newSearchParams);

    };

    return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                {/* <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold tracking-tight">TESLA STYLE</h1>
                </div> */}
                <CustomLogo />

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={cn(`text-sm font-medium transition-all hover:text-primary`,
                        !gender ? "underline underline-offset-4 animate-bounce" : ""
                    )}>
                        Todos
                    </Link>
                    <Link to="/gender/men" className={cn(`text-sm font-medium transition-all hover:text-primary`,
                        gender === "men" ? "underline underline-offset-4 animate-bounce" : ""
                    )}>
                        Hombres
                    </Link>
                    <Link to="/gender/women" className={cn(`text-sm font-medium transition-all hover:text-primary`,
                        gender === "women" ? "underline underline-offset-4 animate-bounce" : ""
                    )}>
                        Mujeres
                    </Link>
                    <Link to="/gender/kid" className={cn(`text-sm font-medium transition-all hover:text-primary`,
                        gender === "kid" ? "underline underline-offset-4 animate-bounce" : ""
                    )}>
                        Niños
                    </Link>
                </nav>

                {/* Search and Cart */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Buscar productos..."
                                className="pl-9 w-64 h-9 bg-white"
                                onChange={(e) => console.log(e.target.value)}
                                ref={inputRef}
                                onKeyDown={handleSearch}
                                defaultValue={query}
                            />
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    {
                        // !user ? (
                        authStatus === 'not-authenticated' ? (
                            <Link to="/auth/login">
                                <Button variant="default" size="sm" className="ml-2">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="outline" size="sm" className="ml-2"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </Button>
                        )
                    }

                    {
                        isAdmin() && (
                            <Link to="/admin">
                                <Button variant="destructive" size="sm" className="ml-2 bg-gradient-to-br from-blue-500 to-purple-600 ml-2">
                                    Admin
                                </Button>
                            </Link>
                        )
                    }



                    {/* <Button variant="ghost" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {cartCount}
                        </span>}
                    </Button> */}
                </div>
            </div>
        </div>
    </header>;
};
export default CustomHeader;