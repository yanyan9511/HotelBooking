const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class DisplayHomepage extends React.Component {
  render() {
    return (
      <div>
        <p className="textstyle">We are able to host maximum 25 guests. Current number of free slots are:</p>
      </div>
    );
  }
}

class CustomerRow extends React.Component {
  render() {
    const customer = this.props.customer;
    return (
      <tr>
        <td>{customer.sn_id}</td>
        <td>{customer.name}</td>
        <td>{customer.contact}</td>
        <td>{customer.created.toDateString()}</td>
      </tr>
    );
  }
}

class CustomerTable extends React.Component {
  render() {
    const customerRows = this.props.customers.map(customer =>
      <CustomerRow key={customer.sn_id} customer={customer} />);
    
    return (
      <div>
        <p>Cusrrent Reservations</p>
        <table className="bordered-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {customerRows}
          </tbody>
        </table>
      </div>
    );
  }
}

class RemoveCustomer extends React.Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(e) {
    e.preventDefault();
    const form = document.forms.CustomerAdd;
    const customer = {
      name: form.name.value, contact: form.contact.value,
    }
    this.props.deleteCustomer(customer);
    form.name.value = ""; form.contact.value = ""; 
  }

  render() {
    return (
      <div>
        <button className= "removebutton" onClick= {this.handleRemove}>Remove</button>
      </div>
    );
  }
}

class AddCustomer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.CustomerAdd;
    const customer = {
      name: form.name.value, contact: form.contact.value,
    }
    this.props.createCustomer(customer);
    form.name.value = ""; form.contact.value = "";
  }

  render() {
    return (
      <div>
        <p>Make/Cancel a reservation by submitting/removing your informaiton</p>
        <form name="CustomerAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" className= "input" />
          <input type="text" name="contact" placeholder="Contact" className= "input" />
          <div>
            <button className= "submitbutton">Submit</button>
          </div>
        </form>
        
      </div>
    );

  }
}


class DisplayFreeSlots extends React.Component {
  render() {
    const number_slot = this.props.freeslot;
    console.log(number_slot);
    return (
      <div className= "number_style">
        {number_slot}
      </div>
    );
  }
}

class ErrorHandling extends React.Component {
  render(){
    const error = this.props.errorMsg;
    return(
      <div className= "error_style">
        {error}
      </div>
    );
  }
}


class Hotelpage extends React.Component {
  constructor() {
    super();
    this.state = { customers: [], freeslot: 25, errorMsg: "" };
    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      customerList {
        sn_id name contact
        created
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    const num_guest = result.data.customerList.length;
    this.setState({ customers: result.data.customerList, freeslot: 25-num_guest });
  }

  async createCustomer(customer) {
    if(this.state.customers.filter(e => e.name === customer.name).length > 0){
      var newerrorMsg = this.state.errorMsg;
      newerrorMsg = 'Sorry, guest already registered!';
      this.setState({ errorMsg: newerrorMsg}); 
    }else{ 
      if(customer.name==''){
      var newerrorMsg = this.state.errorMsg;
      newerrorMsg = 'Sorry, cannot submit empty!';
      this.setState({ errorMsg: newerrorMsg}); 
      }else{ 
        if(this.state.customers.length >= 25){
        var newerrorMsg = this.state.errorMsg;
        newerrorMsg = 'Sorry, no more slot!';
        this.setState({ errorMsg: newerrorMsg}); 
        }else{
          const query = `mutation {
            customerAdd(customer:{
              name: "${customer.name}",
              contact: "${customer.contact}",
            }) {
              sn_id
            }
          }`;
      
          const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
          });

          var newerrorMsg = this.state.errorMsg;
          newerrorMsg = "Reservation successfully added!";
          this.setState({ errorMsg: newerrorMsg}); 
          this.loadData();

          }
        }
      }
    }

  async deleteCustomer(customer) {
    if (this.state.customers.filter(e => e.name === customer.name).length > 0){
      const query = `mutation {
        customerRemove(customer:{
          name: "${customer.name}",
          contact: "${customer.contact}",
        }) {
          sn_id
        }
      }`;
  
      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
      });

      var newerrorMsg = this.state.errorMsg;
      newerrorMsg = "Entry successfully removed!";
      this.setState({ errorMsg: newerrorMsg }); 
      this.loadData();
    }else{
      var newerrorMsg = this.state.errorMsg;
      newerrorMsg = "Sorry, entry not found!";
      this.setState({ errorMsg: newerrorMsg}); 
    }
  }

  render() {
    return (
      <React.Fragment>
          <div className= "mainpage">
            <h1>Welcome to Hotel California!</h1>
            <DisplayHomepage />  
            <DisplayFreeSlots freeslot={this.state.freeslot}/>          
            <AddCustomer createCustomer={this.createCustomer}/>
            <RemoveCustomer deleteCustomer={this.deleteCustomer}/>
            <ErrorHandling errorMsg={this.state.errorMsg}/>
            <hr />
            <CustomerTable customers={this.state.customers}/>
          </div>
      </React.Fragment>
    );
  }

}

const element = <Hotelpage />;

ReactDOM.render(element, document.getElementById('contents'));
