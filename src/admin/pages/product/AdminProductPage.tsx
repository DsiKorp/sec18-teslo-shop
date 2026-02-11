// https://github.com/Klerith/bolt-product-editor

import { Navigate, useParams } from 'react-router';

import { useQueryProduct } from '@/admin/hooks/useQueryProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
    const { id } = useParams();

    const { isLoading, isError, error, data: product } = useQueryProduct(id || '');

    console.log({ isLoading, product, isError, error })

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    // const [product, setProduct] = useState<Product>({
    //     id: '376e23ed-df37-4f88-8f84-4561da5c5d46',
    //     title: "Men's Raven Lightweight Hoodie",
    //     price: 115,
    //     description:
    //         "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
    //     slug: 'men_raven_lightweight_hoodie',
    //     stock: 10,
    //     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    //     gender: 'men',
    //     tags: ['hoodie'],
    //     images: [
    //         'https://placehold.co/250x250',
    //         'https://placehold.co/250x250',
    //         'https://placehold.co/250x250',
    //         'https://placehold.co/250x250',
    //     ],
    // });

    //const [newTag, setNewTag] = useState('');

    //const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    if (isError) {
        return <Navigate to="/admin/products" />
    }

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    // const handleInputChange = (field: keyof Product, value: string | number) => {
    //     setProduct((prev) => ({ ...prev, [field]: value }));
    // };

    if (!product) {
        return <Navigate to="/admin/products" />
    }

    return <ProductForm
        title={title}
        subTitle={subtitle}
        product={product}
    />

};
