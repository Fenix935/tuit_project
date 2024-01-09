import Head from 'next/head'
import {useState, useContext, useMemo, useCallback} from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import Link from "next/link";

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    const description = useMemo(() => {
        if(product.info) {
            const parsedInfo = product.info.replaceAll('\n', '<br /><br />')
            console.log(parsedInfo)
            return parsedInfo;
        }
        return '';
    }, [product.info]);

    const renderUrl = useCallback((url) => {
        if(url) {
            const [parsedUrl, format] = url.split('_');
            return parsedUrl + `_1041.${format.split('.')[1]}`;
        }

        return url
    }, [])

    return(
        <div className="row detail_page">
            <div className="col-md-12">
                <span style={{fontSize: '18px', marginTop: '15px', display: 'inline-block'}}>
                    <Link  href="/">
                        Назад
                    </Link>
                </span>
                <h1 className="mb-3 mt-3">{product.title}</h1>
                <div className="page_container">
                    <div className="top_container">
                        <img src={product.preview} className="preview" alt="preview"/>
                        <div className="content_wrapper">
                            <p className="title">Маршрут:</p>
                            <div className="value" style={{width: '605px'}}>
                                {product.routes_list.map((item, index, array) => (
                                    item + (index === array.length - 1 ? '' : ' - ')
                                ))}
                            </div>
                            <p className="title">Длина:</p>
                            <div className="value">
                                {product.range} км (пешком)
                            </div>
                            <div className="title" style={{display: 'flex', alignItems: 'center'}}>
                                Сложность:
                                <div className="level_wrapper" style={{marginLeft: '15px'}}>
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
                            <div className="value">
                                легкий, опыт не обязателен
                            </div>
                            <p className="title">Длительность:</p>
                            <div className="value">
                                {product.duration} дней (без дороги на поезде или самолете)
                            </div>
                            <p className="title">Размер группы:</p>
                            <div className="value">
                                от {product.group_size.from} человек до {product.group_size.to} человек
                            </div>
                        </div>
                    </div>

                    <div className="description_block row">
                        <div className="col-md-7" >
                            <h2 className="mt-3">Описание</h2>
                            <div dangerouslySetInnerHTML={{__html: description}} />
                        </div>
                        <div className="col-md-5">
                            <h2 className="mt-3">Галерея</h2>
                            <div className="gallery_wrapper">
                                {
                                    product.gallery.map(item => (
                                        <a className="image_wrapper" href={renderUrl(item)} target="_blank">
                                            <img src={item} alt="gallery"/>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Head>*/}
            {/*    <title>Detail Product</title>*/}
            {/*</Head>*/}

            {/*<div className="col-md-6">*/}
            {/*    <img src={ product.gallery[tab] } alt={ product.gallery[tab] }*/}
            {/*         className="d-block img-thumbnail rounded mt-4 w-100"*/}
            {/*         style={{height: '350px'}} />*/}

            {/*    <div className="row mx-0" style={{cursor: 'pointer'}} >*/}

            {/*        {product.gallery.map((img, index) => (*/}
            {/*            <img key={index} src={img} alt={img}*/}
            {/*                 className={`img-thumbnail rounded ${isActive(index)}`}*/}
            {/*                 style={{height: '80px', width: '20%'}}*/}
            {/*                 onClick={() => setTab(index)} />*/}
            {/*        ))}*/}

            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="col-md-6 mt-3">*/}
            {/*    <h2 className="text-uppercase">{product.title}</h2>*/}
            {/*    <h5 className="text-danger">${product.price}</h5>*/}

            {/*    <div className="row mx-0 d-flex justify-content-between">*/}
            {/*        {*/}
            {/*            product.inStock > 0*/}
            {/*                ? <h6 className="text-danger">In Stock: {product.inStock}</h6>*/}
            {/*                : <h6 className="text-danger">Out Stock</h6>*/}
            {/*        }*/}

            {/*        <h6 className="text-danger">Sold: {product.sold}</h6>*/}
            {/*    </div>*/}

            {/*    <div className="my-2">{product.description}</div>*/}
            {/*    <div className="my-2">*/}
            {/*        {product.content}*/}
            {/*    </div>*/}

            {/*    <button type="button" className="btn btn-dark d-block my-3 px-5"*/}
            {/*            onClick={() => dispatch(addToCart(product, cart))} >*/}
            {/*        Buy*/}
            {/*    </button>*/}

            {/*</div>*/}
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {
    console.log(id)
    const res = await getData(`routes/${id}`)
    // server side rendering
    console.log(res, 'RES')
    return {
        props: { product: res.routes }, // will be passed to the page component as props
    }
}


export default DetailProduct