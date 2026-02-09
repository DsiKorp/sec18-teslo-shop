import { useParams } from "react-router"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"

export const GenderPage = () => {

    // url segments /gender/men, /gender/women, /gender/kid, /
    const { gender } = useParams();
    console.log({ gender }); // men, women, kid, undefined without /gender/

    const genderLabel = gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : gender === "kid" ? "Niños" : "Todos";

    return (
        <>
            <CustomJumbotron title={`Todos los productos para ${genderLabel}`} />
            <ProductsGrid products={products} />
            <CustomPagination totalPages={7} />
        </>
    )
}
