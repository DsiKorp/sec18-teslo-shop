import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"

export const HomePage = () => {



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

            <ProductsGrid products={products} />
            <CustomPagination totalPages={7} />
        </>
    )
}
