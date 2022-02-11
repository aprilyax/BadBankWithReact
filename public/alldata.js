function AllData(){
    const [data, setData] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState('');

    // useEffect hook
    React.useEffect(() => {

      // fetch all accounts from API
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(JSON.stringify(data));
          setLoggedIn('true')
        });
    }, []);  // execute only once when page is loaded

  return (
    <>
    <h5>All Data in Store</h5>
    {data}
    {loggedIn}
    </>
  );
}

