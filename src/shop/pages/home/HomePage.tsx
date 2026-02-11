import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
//import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

    const { data, isLoading } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <>
            {/* <h1>HomePAge</h1>
            <h1 className="font-montserrat font-thin">HomePAge</h1>
            <h1 className="font-montserrat font-normal">HomePAge</h1>
            <h1 className="font-montserrat font-semibold">HomePAge</h1>
            <h1 className="font-montserrat font-bold">HomePAge</h1>

            <div className="flex min-h-svh flex-col items-center justify-center">
                <Button className="font-montserrat font-bold">Click me</Button>
            </div> */}

            <CustomJumbotron title="Todos los productos" />

            <ProductsGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
