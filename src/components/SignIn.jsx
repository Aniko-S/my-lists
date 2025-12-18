function SignIn() {
  return (
    <>
      <div className="box">
        <h2 className="pb-5">Bejelentkezés</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail cím</label>
            <input id="email" type="email" className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Jelszó</label>
            <input
              id="password"
              type="password"
              className="form-control"
            ></input>
          </div>
          <button className="btn btn-success mt-5">Bejelentkezés</button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
