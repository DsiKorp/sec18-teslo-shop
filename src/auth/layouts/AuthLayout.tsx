import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <div>
            {/* children Outlet */}
            <Outlet />
        </div>
    )
}

export default AuthLayout;