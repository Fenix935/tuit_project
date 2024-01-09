import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={product.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`create/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>Edit</a>
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft: '5px', flex: 1}}
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT' 
                    }]
                })} >
                    Delete
                </button>
            </>
        )
    }
    console.log(product)
    return(
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={product?.preview} alt={'card preview'} />
            <div className="card-body">
                <Link href={`route/${product._id}`}>
                    <a className="link-primary" title={product.title}>
                        {product.title}
                    </a>
                </Link>
                <div className="options">
                    <div className="name">Сложность:</div>
                    <div className="value">
                        <div className="level_wrapper">
                            {
                                product?.level && (
                                    new Array(5).fill(false)
                                        .map((item, index) => (index + 1) <= product?.level)
                                        .map(item => (
                                            <div className={`level_item ${item ? 'active' : ''}`}/>
                                        ))
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="options">
                    <div className="name">Длительность:</div>
                    <div className="value">{product.duration} дней</div>
                </div>
                <div className="options">
                    <div className="name">Длина:</div>
                    <div className="value">{product.range} км</div>
                </div>
                <Link href={`route/${product._id}`}>
                    <button type="button" className="btn btn-outline-primary button">Подробнее</button>
                </Link>

                {/*<div className="row justify-content-between mx-0">*/}
                {/*    <h6 className="text-danger">${product.price}</h6>*/}
                {/*    {*/}
                {/*        product.inStock > 0*/}
                {/*        ? <h6 className="text-danger">In Stock: {product.inStock}</h6>*/}
                {/*        : <h6 className="text-danger">Out Stock</h6>*/}
                {/*    }*/}
                {/*</div>*/}

                {/*<p className="card-text" title={product.description}>*/}
                {/*    {product.description}*/}
                {/*</p>*/}
                {/*    */}
                {/*<div className="row justify-content-between mx-0">*/}
                {/*    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}*/}
                {/*</div>*/}
            </div>
        </div>
    )
}


export default ProductItem