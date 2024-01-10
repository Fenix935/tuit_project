import Link from "next/link";
import {useRef, useState} from "react";
import {postData} from "../utils/fetchData";
import Router from 'next/router'

const CreateRoute = () => {
    const [imageData, setImageData] = useState({gallery: [], preview: ''});
    const [imageError, setImageError] = useState({gallery: false, preview: false});
    const timer = useRef();

    const changeHandler = (event, key) => {
        const setGallery = (e, keyName) => {
            const text = e.target.value;
            if (text.trim()) {
                console.log(text.split(","))
                const res = [];
                text.split(",").forEach(item => {
                    try {
                        const url = new URL(item);
                        if (url.origin === 'null') throw new Error('url not right')
                        res.push(item);

                    } catch (error) {
                        console.log(error);
                        setImageError(prev => ({...prev, [keyName]: true}));
                    }
                })

                setImageData(prev => (
                    {
                        ...prev, [keyName]: res
                    }
                ));
                setImageError(prev => ({...prev, [keyName]: false}));
            }
        }

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => setGallery(event, key), 600);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(event)
        const formData = new FormData(event.target);
        console.log(formData)
        const formProps = Object.fromEntries(formData);
        console.log(formProps)
        try {
            const {group_from, group_to} = formProps;
            delete formProps.group_from;
            delete formProps.group_to;

            await postData('routes', {
                ...formProps,
                routes_list: formProps.routes_list.split('-'),
                gallery: formProps.gallery.split(','),
                group_size: {
                    from: group_from,
                    to: group_to
                }
            })
            Router.push('/');
        } catch (e) {
            alert('Произошла ошибка при добавлении')
        }
    }

    return (
        <div className="create_route">
            <span style={{fontSize: '18px', marginTop: '15px', display: 'inline-block'}}>
                    <Link href="/">
                        Назад
                    </Link>
                </span>
            <h1>Добавить маршрут</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Заголовок:</label>
                    <input type="text" name={"title"} className="form-control" id="title" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="routes_list" className="form-label">Маршрут (напишите маршрут через '-'):</label>
                    <input type="text" name={"routes_list"} className="form-control" id="routes_list" required/>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-4">
                        <label htmlFor="duration" className="form-label">Длительность (дней):</label>
                        <input type="number" name="duration" className="form-control" id="duration" required/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="range" className="form-label">Длина: (км)</label>
                        <input type="number" name="range" className="form-control" id="range" required/>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="level" className="form-label">Сложность</label>
                        <select className="form-select dropdown" name="level" id="level"
                                aria-label="Default select example"
                                required>
                            <option selected style={{display: 'none'}}>Выбирите уровень сложности</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="group_from" className="form-label">Размер группы:</label>
                        <input type="number" name="group_from" className="form-control" min={4} max={99} id="group_from"
                               placeholder="От"
                               required/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="group_to" className="form-label">Размер группы:</label>
                        <input type="number" name="group_to" className="form-control" min={4} max={99} id="group_to"
                               placeholder="До"
                               required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="gallery" className="form-label">Галирея (вставте ссылки на изображение через
                        запятую):</label>
                    <textarea className="form-control" id="gallery" rows="2" name="gallery"
                              onChange={(e) => changeHandler(e, 'gallery')} required></textarea>
                    <div className="invalid-feedback" style={{display: imageError.gallery ? 'block' : 'none'}}>
                        Поля заполнено не корректно
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px'}}>
                        {
                            imageData.gallery.map(item => {
                                return (
                                    <img src={item} alt="image"/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="preview" className="form-label">Обложка (вставте ссылки на изображение):</label>
                    <input type="text" className="form-control" id="preview" name="preview"
                           onChange={(e) => changeHandler(e, 'preview')} required/>
                    <div className="invalid-feedback" style={{display: imageError.preview ? 'block' : 'none'}}>
                        Поля заполнено не корректно
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px'}}>
                        {imageData.preview && <img src={imageData.preview} alt="image"/>}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="info" className="form-label">Информация:</label>
                    <textarea className="form-control" name="info" id="info" rows="3" required
                              minLength={2}></textarea>
                </div>
                <button
                    // disabled={!(Object.values(imageError).filter(Boolean).length === 0)}
                    type="submit"
                    className="btn btn-primary">Добавить
                </button>
            </form>
        </div>
    )
}

export default CreateRoute;