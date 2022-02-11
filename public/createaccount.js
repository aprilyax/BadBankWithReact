 function CreateAccount(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');
  
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow}/> : 
          <CreateMsg setShow={setShow}/>}
      />
    )
  }
  
  function CreateMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>Add another account</button>
    </>);
  }
  
  function CreateForm(props){
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
  
    function handle(){
      console.log(name,email,password);                           // echo the params that we're going to PASS TO back end
      const url = `/account/create/${name}/${email}/${password}`; // set the address/route we are reaching out to
      (async () => {
        var res = await fetch(url);                               // use fetch to reach out/make call
        var data = await res.json();
        console.log(data);                                        // write what we get back from the server to the console
      })();
      props.setShow(false);                                      // update the UI to show we have created a new user
    }    
  
    return (<>
  
      Name<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>
  
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
  
    </>);
  }
   