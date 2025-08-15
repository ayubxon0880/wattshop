import {Link} from "react-router-dom";
import {currency} from "../fakeapi.jsx";

export default function ProductCard({ product, onAdd }) {
    return (
        <article className="border rounded overflow-hidden group hover:shadow-lg transition-shadow">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
                <h3 className="font-semibold text-lg"><Link to={`/product/${product.id}`}>{product.title}</Link></h3>
                <div className="mt-2 font-bold">{currency(product.price)}</div>
                <div className="mt-4 flex items-center justify-between">
                    <button onClick={() => onAdd(product)} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Add to cart</button>
                    <Link to={`/product/${product.id}`} className="text-sm text-indigo-600 hover:underline">Details</Link>
                </div>
            </div>
        </article>
    )
}