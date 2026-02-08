import { Outlet } from "react-router"

const AdminLayout = () => {
    return (
        <div>AdminLayout
            {/* children Outlet */}
            <Outlet />
        </div>
    )
}

export default AdminLayout;