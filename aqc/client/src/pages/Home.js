function Home() {
    return (
      <div className="container" style={{ display: 'flex', flex: 1, height: '100vh', justifyContent: 'center', alignItems:'center' }}>
          <div>
            <div>
                <h1 className="text-center">A-Level Computing</h1>
            </div>
            <div className="row" style={{ marginLeft: 180, marginRight: 180, marginTop: 20 }}>
                <p>A-Level Computing is designed to improve education for young people in the field of computing.</p>
            </div>
          </div>
      </div>
    );
  }
  
  export default Home;