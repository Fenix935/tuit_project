import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'

import {getData, postData} from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'
import Link from "next/link";

const Home = (props) => {
    console.log(props, 'props')
    const [products, setProducts] = useState(props.products)

    const [isCheck, setIsCheck] = useState(false)
    const [page, setPage] = useState(1)
    const router = useRouter()

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state

    useEffect(() => {
        setProducts(props.products)
    }, [props.products])

    useEffect(() => {
        if (Object.keys(router.query).length === 0) setPage(1)
    }, [router.query])

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const handleCheckALL = () => {
        products.forEach(product => product.checked = !isCheck)
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const handleDeleteAll = () => {
        let deleteArr = [];
        products.forEach(product => {
            if (product.checked) {
                deleteArr.push({
                    data: '',
                    id: product._id,
                    title: 'Delete all selected products?',
                    type: 'DELETE_PRODUCT'
                })
            }
        })

        dispatch({type: 'ADD_MODAL', payload: deleteArr})
    }

    const handleLoadmore = () => {
        setPage(page + 1)
        filterSearch({router, page: page + 1})
    }

    const createRoute = async () => {
        postData('routes', {
                "routes_list": ["город Ташкент", "город Самарканд", "город Бухара", "селение Сумитан", "город Хива"],
                "range": 80,
                "level": 1,
                "group_size": {"from": 6, "to": 17},
                "info": "Чарующая культура Востока ближе, чем кажется, — мы с вами отправляемся в путешествие по самобытному Узбекистану. Он расположен в самом сердце Средней Азии. Это страна солнца и самых вкусных в мире дынь, изящных мечетей и поражающих роскошью дворцов. Именно здесь странствовал Ходжа Насреддин, известный герой мудрого и весёлого фольклора, которого знают и любят все восточные народы. Неудивительно, что в последние годы Узбекистан становится всё более популярным туристическим направлением. Для въезда гражданам России нужен только действующий загранпаспорт, виза не требуется.\nВ этом, по сути, классическом туре по Узбекистану наш маршрут пройдет через древние города, главные жемчужины страны. Это столица, Ташкент, а также Самарканд, Бухара и Хива — город-оазис вблизи раскаленной солнцем пустыни Каракумы.\nИстория Узбекистана повествует о великих правителях и завоевателях, кровавых войнах и борьбе народов за свободу, что отразилось на архитектуре и культуре страны. Когда-то на месте современного Узбекистана находилась могущественная Империя Хорезмшахов. В разные времена эти земли попадали под власть персов, греков во главе с Александром Македонским, арабов, принёсших с собой мусульманство, и татаро-монголов, возглавляемых Чингисханом. Расцвета земли достигли в XIV веке, став центром империи Тимуридов, созданной Тамерланом. А спустя ещё два века здесь возникло узбекское Бухарское ханство.\nВ нашем туре Ташкент — Самарканд — Бухара — Хива мы посетим старинные крепости и медресе, затеряемся в хитросплетении узких улочек, полюбуемся на белоснежную резьбу по ганчу, послушаем крик муэдзина, призывающего к намазу, увидим, как ветер поднимает зыбь на песчаных барханах и ощутим прохладу оазиса после долгого пути. Конечно же, мы заглянем и на настоящий восточный базар! Почти 20 веков Узбекистан был местом пересечения дорог Великого Шелкового Пути, и именно здесь на прилавках купцов Европа встречалась с Азией. Сегодня рынки живут прежней жизнью: кругом суета и оживление, в воздухе — запахи жаровни, специй и лепёше",
                "gallery": ["https://b1.vpoxod.ru/route-photo/93/57/f2/e7/189508_128x114.jpg", "https://b1.vpoxod.ru/route-photo/f4/fb/d7/06/189509_128x114.jpg", "https://b1.vpoxod.ru/route-photo/0a/a8/1c/15/189510_128x114.jpg", "https://b1.vpoxod.ru/route-photo/63/38/02/ca/189511_128x114.jpg", "https://b1.vpoxod.ru/route-photo/06/ca/ef/dc/189512_128x114.jpg", "https://b1.vpoxod.ru/route-photo/0b/eb/27/19/189513_128x114.jpg"]
        })
    }

    return (
        <div className="home_page">
            {/*<button onClick={createRoute}>*/}
            {/*    CLICK ME*/}
            {/*</button>*/}
            <Head>
                <title>Home Page</title>
            </Head>

            {/*<Filter state={state}/>*/}
            <p className="create_route">
                <span>+</span>
                {' '}
                <Link href={"/create_route"}>Добавить маршрут</Link>
            </p>

            {/*{*/}
            {/*    auth.user && auth.user.role === 'admin' &&*/}
            {/*    <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>*/}
            {/*        <input type="checkbox" checked={isCheck} onChange={handleCheckALL}*/}
            {/*               style={{width: '25px', height: '25px', transform: 'translateY(8px)'}}/>*/}

            {/*        <button className="btn btn-danger ml-2"*/}
            {/*                data-toggle="modal" data-target="#exampleModal"*/}
            {/*                onClick={handleDeleteAll}>*/}
            {/*            DELETE ALL*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*}*/}

            <div className="products">
                {
                    products.length === 0
                        ? <h2>No Products</h2>

                        : products.map(product => (
                            <ProductItem key={product._id} product={product} handleCheck={handleCheck}/>
                        ))
                }
            </div>

            {/*{*/}
            {/*    props.result < page * 6 ? ""*/}
            {/*        : <button className="btn btn-outline-info d-block mx-auto mb-4"*/}
            {/*                  onClick={handleLoadmore}>*/}
            {/*            Load more*/}
            {/*        </button>*/}
            {/*}*/}

        </div>
    )
}


export async function getServerSideProps({query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

    // const res = await getData(
    //   `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
    // )
    const res = await getData(
        `routes`
    )
    console.log(res, 'res')
    // server side rendering
    return {
        props: {
            products: res.routes,
            result: 1
        }, // will be passed to the page component as props
    }
}

export default Home