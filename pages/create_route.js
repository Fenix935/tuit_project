const CreateRoute = () => {
    return (
        <div>
            <h1>Добавить маршрут</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Заголовок</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateRoute;