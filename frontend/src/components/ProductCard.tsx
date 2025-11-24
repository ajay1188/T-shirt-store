import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
    category: {
        name: string;
    };
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.slug}`} className="group block">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    src={product.images[0] || 'https://placehold.co/600x400'}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            <p className="text-sm text-gray-500">{product.category.name}</p>
        </Link>
    );
}
