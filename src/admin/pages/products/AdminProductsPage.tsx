import { Link } from "react-router"

import {
    Table,
    TableBody,
    //TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"
import { useProducts } from "@/shop/hooks/useProducts"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { currencyFormatter } from "@/lib/currency-formatter"

export const AdminProductsPage = () => {

    const { data, isLoading } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <AdminTitle
                    title="Productos"
                    subtitle="Aquí puedes ver y administrar tus productos 📦"
                />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button className="bg-gradient-to-br from-blue-500 to-purple-600"><PlusIcon />Nuevo producto</Button>
                    </Link>
                </div>


            </div>


            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        {/* <TableHead className="w-[100px]">ID</TableHead> */}
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        data?.products.map(product => (
                            <TableRow key={product.id}>
                                {/* <TableCell className="font-medium">{product.id}</TableCell> */}
                                <TableCell>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{currencyFormatter(product.price)}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.sizes.join(', ')}</TableCell>
                                <TableCell className="text-right">
                                    {/* <Link to={`/admin/products/${product.id}`}>Editar</Link> */}
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon className="w-4 h-4 text-blue-500 hover:text-blue-600" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                    {/* https://placehold.co/250x250 */}

                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
